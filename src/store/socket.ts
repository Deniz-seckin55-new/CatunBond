import * as socketutils from "@/app/app/utils/socket_utils";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { io, Socket } from "socket.io-client";
import { create } from "zustand";
import useChannelBoxStore from "./channelBoxStore";
import { useChannelInfoStore } from "./channelInfos";
import { useCurrents } from "./currents";
import { useMessagesStore } from "./messages";
import { useWritingUsers } from "./writingusers";
import { isElectron } from "@/app/app/utils/utils";

interface SocketStore {
    socket: Socket | undefined;
    connect: () => Socket | undefined;
    disconnect: () => void;
    getSocket: () => Socket | undefined;
}

export const useSocketStore = create<SocketStore>((set, get) => ({
    socket: undefined,
    getSocket: () => {
        return get().socket;
    },
    connect: () => {
        const userId = useCurrents.getState().user?.id;

        let initSocket = undefined;
        if (isElectron()) {
            // electron path
            // @ts-ignore
            (window as any).electronAPI.connect(userId);

            isElectronSocket = true

            console.log("Electron detected", initSocket)
        } else {
            console.log("No electron detected; on web")
            // web path
            const SocketURL = `http://${window.location.hostname}:3001`;
            initSocket = io(SocketURL, {
                query: { id: userId },
                transports: ["websocket", "polling"],
            });
        }

        set({ socket: initSocket });
        return initSocket;
    },
    disconnect: () => {
        const { socket } = useSocketStore.getState();
        if (isElectron()) {
            // @ts-ignore
            (window as any).electronAPI.disconnect();
        } else {
            socket?.disconnect();
        }
        set({ socket: undefined });
    }
}))

const awaitingDeletionMessages: string[] = [];
const awaitingEditionMessages: socketutils.EditContext[] = [];

let isElectronSocket = false

export const socketOn = (ev: string, fn: any) => {
    if (isElectronSocket) {
        // @ts-ignore
        (window as any).electronAPI.on(ev, fn);
    } else {
        useSocketStore.getState().socket?.on(ev, fn)
    }
}

interface ElectronAPI {
    emit: (event: string, ...args: any[]) => void;
    on: (event: string, listener: (...args: any[]) => void) => void;
    connect: (userId: string) => void;
    disconnect: () => void;
}

type SocketEmitFn = (...args: any[]) => void;

export const socketEmit = (ev: string, ...fn: any[]): void => {
    if (isElectronSocket) {
        // @ts-ignore
        (window as any).electronAPI.emit(ev, ...fn);
    } else {
        useSocketStore.getState().socket?.emit(ev, ...fn);
    }
}

export const socketOff = (ev: string): void => {
    if (isElectronSocket) {
        // @ts-ignore
        (window as any).electronAPI.off(ev);
    } else {
        useSocketStore.getState().socket?.off(ev);
    }
}

export const useSocket = () => {
    const { socket, connect, disconnect } = useSocketStore();
    const { user } = useCurrents();
    const { messages, addMessage, removeMessage, setMessagesLambda, replaceMessageLambda } = useMessagesStore();
    const currents = useCurrents();
    const writingUsers = useWritingUsers();
    const chStore = useChannelBoxStore();
    const channelInfoStore = useChannelInfoStore();

    // const GetUser = socketutils.usegetUserSR;

    useEffect(() => {
        console.log(`${window.location.hostname}:3001 as socketio port 3001`);
    }, []);

    useEffect(() => {
        if (user) {
            console.log("Connected to socket.");
            const s = connect(); // Connect to the socket when the user is logged in
        }

        return () => {
            disconnect(); // Disconnect the socket when the component unmounts or the user logs out
        };
    }, [user, connect, disconnect]);

    useEffect(() => {
        if (socket && user) {
            // Listen for socket events
            socketOn("message", (recievedMessage: socketutils.Message) => {
                console.log("message data recieved ", recievedMessage);

                if (!user.blocked.includes(recievedMessage.author.id)) {
                    addMessage(recievedMessage);
                    chStore.setendMessageId(recievedMessage.id);
                }
            });
            socketOn("delete_message", (messageId: string) => {
                console.log("delete message ", messageId);
                removeMessage(messageId);
            });
            socketOn("edit_message", (messageId: string, messageUpdate: socketutils.MessageUpdate) => {
                setMessagesLambda((prevMessages) =>
                    prevMessages.map((msg) =>
                        msg.id === messageId ? { ...msg, ...messageUpdate } : msg
                    )
                );
            });
            socketOn("user_mentioned", (serverId: string, channel: socketutils.Channel, mentioner: socketutils.User) => {
                if (currents.channel?.id !== channel.id)
                    toast(`${mentioner.username} mentioned you on ${channel.name}`); // Make it so when clicked goes to message
            });
            // socketOn("friend_request_send", (friendRequest: socketutils.PendingFriendRequest) => {
            //     if (friendRequest.receiverId == user.id) {
            //         Notification
            //         toast(`${friendRequest.sender.username} sent you a friend request`);
            //     }
            // });
            // socketOn("friend_request_answer", (data: socketutils.FriendRequestAnswer) => {
            //     const { friendRequest, answer } = data;
            //     console.log("friend_request_answer", friendRequest, answer);
            //     GetUser(friendRequest.senderId).then((sender) => {
            //         if (!sender) return;
            //         switch (answer) {
            //             case "accept":
            //                 toast(`${sender.username} accepted your friend request`);
            //                 break;
            //             case "decline":
            //                 toast(`${sender.username} declined your friend request`);
            //                 break;
            //             default:
            //                 break;
            //         }
            //     })
            // });
            socketOn("writing_event", (eventUser: socketutils.User, eventType: string) => {
                if (eventUser.id !== currents.user?.id) {
                    if (eventType === "start") {
                        writingUsers.addUser(eventUser.id);
                    } else {
                        writingUsers.removeUser(eventUser.id);
                    }
                }
            });
            socketOn("category_channel_order_change", (serverId: string, data: { id: string, channels: string[] }[]) => {
                console.log("recieved category_channel_order_change", [serverId, data]);
                console.log("Current server", currents.server);
                const currentServer = currents.server;
                const currentCategories = currents.Categories;

                if (!currentServer) return;
                if (!currentCategories) return;

                const newCategories: socketutils.Category[] = [];

                data.forEach(async (category, cIndex) => {
                    const cc = currentCategories.find(x => x.id === category.id);
                    if (!cc) return;

                    newCategories.push({ ...cc, index: cIndex, channels: [], });

                    category.channels.forEach(async (channel) => {
                        const ch = cc.channels.find(x => x.id === channel);
                        if (!ch) return;

                        const ccc = newCategories.find(c => c.id === category.id);
                        if (!ccc) return;

                        ccc.channels.push(ch);
                    });

                });

                currents.setCategories(newCategories);
                currents.setServer({ ...currentServer, categories: newCategories });

                console.log({ newCategories });
            });

            socketOn("channel_info_update", (data: socketutils.ChannelInfo) => {
                channelInfoStore.replaceInfo(data.channelId, data);
            });

            socketOn("reaction_message", (messageId: string, data: socketutils.MessageReactionUpdate) => {
                replaceMessageLambda(messageId, (state) => {
                    return {
                        ...state,
                        reactions: data.reactions,
                    }
                });
            });

            socketOn("nya", (data: string) => {
                console.log("Recieved a nya! ", data);
            })

            socketOn("reconnect", () => {
                const data: socketutils.ReconnectData = {
                    channelId: currents.channel?.id,
                    lastSeenMessageTimestamp: (messages.length > 0) ? messages[messages.length - 1].timestamp : undefined,
                }

                const packet: socketutils.ClientResponsePacket = {
                    dataType: socketutils.AllowedTypes.ReconnectData,
                    data: data,
                };

                console.log("client reconnected", data);

                socketEmit("client_reconnect", packet, (response: { newMessagesSentSince: socketutils.Message[] }) => {
                    console.log("reconnect response", response);
                    setMessagesLambda((prev) => [...prev, ...response.newMessagesSentSince]);
                });
            })

            // Cleanup event listeners
            return () => {
                socket.off();
            };
        }
    }, [socket, user]);
}