import { Message } from "@/app/app/utils/socket_utils";
import { create } from "zustand";

interface MessagesStore {
    messages: Message[],
    replyingTo: Message | null;
    setreplyingTo: (replyingTo: Message | null) => void;
    setMessages: (messages: Message[]) => void;
    setMessagesLambda: (f: (prevMessages: Message[]) => Message[]) => void;
    addMessage: (message: Message) => void;
    removeMessage: (messageId: string) => void;
    replaceMessage: (messageId: string, newMessage: Message) => void;
    replaceMessageLambda: (messageId: string, fn: ((oldMessage: Message) => Message)) => void;
}

export const useMessagesStore = create<MessagesStore>((set, get) => ({
    messages: [],
    replyingTo: null,
    setreplyingTo: (replyingTo) => { set({ replyingTo }) },
    addMessage: (message) => {
        set((state) => ({ messages: [...state.messages, message] }));
        console.log("New Message add: ", get());
    },
    removeMessage: (messageId) => {
        set((state) => ({ messages: state.messages.filter(x => x.id !== messageId) }));
    },
    setMessages: (messages) => {
        set(({ messages }));
    },
    setMessagesLambda: (f) => {
        const prevState = get().messages;
        set({ messages: f(prevState) });
    },
    replaceMessage: (oldMessage, newMessage) => {
        set((state) => ({
            messages: state.messages.map(x => (x.id === oldMessage) ? newMessage : x)
        }));
    },
    replaceMessageLambda: (messageId, fn) => {
        set((state) => ({
            messages: state.messages.map(x => (x.id === messageId) ? fn(x) : x)
        }));
    }
}))