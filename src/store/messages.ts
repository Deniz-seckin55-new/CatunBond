import { Message } from "@/app/app/utils/socket_utils";
import { create } from "zustand";

interface MessagesStore {
    messages: Message[],
    setMessages: (messages: Message[]) => void;
    setMessagesLamda: (f: (prevMessages: Message[]) => Message[]) => void;
    addMessage: (message: Message) => void;
    removeMessage: (message: Message) => void;
    replaceMessage: (message: Message, newMessage: Message) => void;
}

export const useMessagesStore = create<MessagesStore>((set, get) => ({
    messages: [],
    addMessage: (message) => {
        set(({ messages: [...get().messages, message] }));
    },
    removeMessage: (message) => {
        set(({ messages: get().messages.filter(x => x !== message) }));
    },
    setMessages: (messages) => {
        set(({ messages }));
    },
    setMessagesLamda: (f) => {
        const prevState = get().messages;
        set({ messages: f(prevState) });
    },
    replaceMessage: (oldMessage, newMessage) => {
        const oldState = get().messages;
        set({ messages: oldState.map(x => (x === oldMessage) ? newMessage : oldMessage)});
    }
}))