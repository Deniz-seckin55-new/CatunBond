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

interface SocketStore {
    socket: Socket | undefined;
    connect: () => Socket;
    disconnect: () => void;
    getSocket: () => Socket | undefined;
}

const SocketURL = "http://localhost:3001";

export const useSocketStore = create<SocketStore>((set, get) => ({
    socket: undefined,
    getSocket: () => {
        return get().socket;
    },
    connect: () => {
        const initSocket = io(SocketURL, { query: { id: useCurrents.getState().user?.id } }); set({ socket: initSocket }); return initSocket;
    },
    disconnect: () => {
        const { socket } = useSocketStore.getState();
        if (socket) {
            socket.disconnect();
            set({ socket: undefined });
        }
    },
}))

let awaitingDeletionMessages: string[] = [];
let awaitingEditionMessages: socketutils.EditContext[] = [];

export const useSocket = () => {
    const { socket, connect, disconnect } = useSocketStore();
    const { user } = useCurrents();
    const { messages, addMessage, removeMessage, setMessagesLambda, replaceMessageLambda } = useMessagesStore();
    const currents = useCurrents();
    const writingUsers = useWritingUsers();
    const chStore = useChannelBoxStore();
    const channelInfoStore = useChannelInfoStore();

    const GetUser = socketutils.usegetUserSR;

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
            socket.on("message", (recievedMessage: socketutils.Message) => {
                console.log("message data recieved ", recievedMessage);

                if (!user.blocked.includes(recievedMessage.author.id)) {
                    addMessage(recievedMessage);
                    chStore.setendMessageId(recievedMessage.id);
                }
            });
            socket.on("delete_message", (messageId: string) => {
                console.log("delete message ", messageId);
                removeMessage(messageId);
            });
            socket.on("edit_message", (messageId: string, messageUpdate: socketutils.MessageUpdate) => {
                setMessagesLambda((prevMessages) =>
                    prevMessages.map((msg) =>
                        msg.id === messageId ? { ...msg, ...messageUpdate } : msg
                    )
                );
            });
            socket.on("user_mentioned", (serverId: string, channel: socketutils.Channel, mentioner: socketutils.User) => {
                if(currents.channel?.id !== channel.id)
                    toast(`${mentioner.username} mentioned you on ${channel.name}`); // Make it so when clicked goes to message
            });
            socket.on("friend_request_send", (friendRequest: socketutils.PendingFriendRequest) => {
                if (friendRequest.receiverId == user.id) {
                    // Notification
                    toast(`${friendRequest.sender.username} sent you a friend request`);
                }
            });
            socket.on("friend_request_answer", (data: socketutils.FriendRequestAnswer) => {
                const { friendRequest, answer } = data;
                console.log("friend_request_answer", friendRequest, answer);
                GetUser(friendRequest.senderId).then((sender) => {
                    if (!sender) return;
                    switch (answer) {
                        case "accept":
                            toast(`${sender.username} accepted your friend request`);
                            break;
                        case "decline":
                            toast(`${sender.username} declined your friend request`);
                            break;
                        default:
                            break;
                    }
                })
            });
            socket.on("writing_event", (eventUser: socketutils.User, eventType: string) => {
                if (eventUser.id !== currents.user?.id) {
                    if (eventType === "start") {
                        writingUsers.addUser(eventUser.id);
                    } else {
                        writingUsers.removeUser(eventUser.id);
                    }
                }
            });
            socket.on("category_channel_order_change", (serverId: string, data: { id: string, channels: string[] }[]) => {
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

            socket.on("channel_info_update", (data: socketutils.ChannelInfo) => {
                channelInfoStore.replaceInfo(data.channelId, data);
            });

            socket.on("reaction_message", (messageId: string, data: socketutils.MessageReactionUpdate) => {
                replaceMessageLambda(messageId, (state) => {
                    return { ...state,
                        reactions: data.reactions,
                    }
                });
            });

            socket.on("nya", (data: string) => {
                console.log("Recieved a nya! ",data);
            })

            socket.on("reconnect", () => {
                const data: socketutils.ReconnectData = {
                    channelId: currents.channel?.id,
                    lastSeenMessageTimestamp: (messages.length > 0) ? messages[messages.length - 1].timestamp : undefined,
                }

                const packet: socketutils.ClientResponsePacket = {
                    dataType: socketutils.AllowedTypes.ReconnectData,
                    data: data,
                };

                console.log("client reconnected", data);

                socket.emit("client_reconnect", packet, (response: { newMessagesSentSince: socketutils.Message[] }) => {
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