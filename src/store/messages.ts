import { Message } from "@/app/app/utils/socket_utils";
import { create } from "zustand";

interface MessagesStore {
    messages: Message[],
    setMessages: (messages: Message[]) => void;
    setMessagesLambda: (f: (prevMessages: Message[]) => Message[]) => void;
    addMessage: (message: Message) => void;
    removeMessage: (message: Message) => void;
    replaceMessage: (message: Message, newMessage: Message) => void;
}

export const useMessagesStore = create<MessagesStore>((set, get) => ({
    messages: [],
    addMessage: (message) => {
        set((state) => ({ messages: [...state.messages, message] }));
        console.log("New Message add: ", get());
    },
    removeMessage: (message) => {
        set((state) => ({ messages: state.messages.filter(x => x !== message) }));
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
            messages: state.messages.map(x => (x === oldMessage) ? newMessage : x)
        }));
    }
}))