import * as utils from "@/app/app/utils/utils"
import * as socketutils from "@/app/app/utils/socket_utils"
import { create } from "zustand"
import { io, Socket } from "socket.io-client";
import { useEffect } from "react";
import { useCurrents } from "./currents";
import { useMessagesStore } from "./messages";
import { toast } from "react-toastify";
import { useWritingUsers } from "./writingusers";

interface SocketStore {
    socket: Socket | undefined;
    connect: () => void;
    disconnect: () => void;
}

export const useSocketStore = create<SocketStore>((set, get) => ({
    socket: undefined,
    connect: () => {
        const initSocket = io("http://localhost:3001", {query: {id: useCurrents.getState().user?.id}}); set({ socket: initSocket });
    },
    disconnect: () => {
        const { socket } = useSocketStore.getState();
        if (socket) {
            socket.disconnect();
            set({ socket: undefined });
        }
    },
}))

var awaitingDeletionMessages: string[] = [];
var awaitingEditionMessages: socketutils.EditContext[] = [];

export const useSocket = () => {
    const { socket, connect, disconnect } = useSocketStore();
    const { user } = useCurrents();
    const { setMessages, addMessage, removeMessage, setMessagesLambda: setMessagesLamda, replaceMessage} = useMessagesStore();
    const currents = useCurrents();
    const writingUsers = useWritingUsers();

    const GetUser = socketutils.getUserSR;

    useEffect(() => {
        if (user) {
            console.log("Connected to socket.");
            connect(); // Connect to the socket when the user is logged in
        }

        return () => {
            disconnect(); // Disconnect the socket when the component unmounts or the user logs out
        };
    }, [user, connect, disconnect]);

    useEffect(() => {
        if (socket && user) {
            // Listen for socket events
            socket.on("message", (data: socketutils.ClientResponsePacket) => {
                console.log("message data recieved ", data);
                if (data.dataType === socketutils.AllowedTypes.Message) {
                    const recievedMessage = data.data as socketutils.Message;
                    console.log("Got message: ", recievedMessage);
                    addMessage(recievedMessage);
                } else if (data.dataType === socketutils.AllowedTypes.MessageI) {
                    const recievedMessage: socketutils.SendMessageI = data.data;
                    console.log("Got message: ", recievedMessage);

                    const newMessage = utils.tempMessageToMessage(recievedMessage);

                    addMessage(newMessage);
                }
            });
            socket.on("db_message", (tempID: string, message: socketutils.Message) => {
                setMessagesLamda((prevMessages: socketutils.Message[]) => prevMessages.map(x => (x.id === tempID) ? message : x));
                console.log("Replaced ", tempID, message.id);

                if (awaitingDeletionMessages.includes(tempID)) {
                    socket?.emit("db_delete_message", message.id, () => { awaitingDeletionMessages = awaitingDeletionMessages.filter(x => x !== tempID); });
                } else if (awaitingEditionMessages.find(x => x.messageId === tempID)) {
                    socket?.emit("db_edit_message", message.id, awaitingEditionMessages.find(x => x.messageId === tempID), () => { awaitingEditionMessages = awaitingEditionMessages.filter(x => x.messageId !== tempID); });
                }
            });
            socket.on("temp_messages", (awaitingMessagesI: socketutils.SendMessageI[]) => {
                const messagesToAdd = awaitingMessagesI.map(x => utils.tempMessageToMessage(x));

                setMessagesLamda((prevMessages: socketutils.Message[]) => [...prevMessages, ...messagesToAdd].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()));
            });
            socket.on("delete_message", (message: socketutils.Message) => {
                console.log("delete message ", message);
                removeMessage(message);
            });
            socket.on("edit_message", (edit: socketutils.EditContext) => {
                setMessagesLamda((prevMessages: socketutils.Message[]) =>
                    prevMessages.map((msg) =>
                        (msg.id === edit.messageId) ? { ...msg, content: edit.newContent } : msg
                    )
                );
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
                    if(!sender) return;
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
            // Cleanup event listeners
            return () => {
                socket.off();
            };
        }
    }, [socket, user]);
}