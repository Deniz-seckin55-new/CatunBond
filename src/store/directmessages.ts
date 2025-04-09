import { DirectMessage, Message } from "@/app/app/utils/socket_utils";
import { create } from "zustand";

interface DirectMessagesStore {
    directmessages: DirectMessage[],
    setDirectMessages: (directmessages: DirectMessage[]) => void;
    setDirectMessagesLamda: (f: (prevDirectMessages: DirectMessage[]) => DirectMessage[]) => void;
    addDirectMessage: (directmessage: DirectMessage) => void;
    removeDirectMessage: (directmessage: DirectMessage) => void;
    replaceDirectMessage: (directmessage: DirectMessage, newDirectMessage: DirectMessage) => void;
}

export const useDirectMessageStore = create<DirectMessagesStore>((set, get) => ({
    directmessages: [],
    addDirectMessage: (message) => {
        set(({ directmessages: [...get().directmessages, message] }));
    },
    removeDirectMessage: (message) => {
        set(({ directmessages: get().directmessages.filter(x => x !== message) }));
    },
    setDirectMessages: (directmessages) => {
        set(({ directmessages }));
    },
    setDirectMessagesLamda: (f) => {
        const prevState = get().directmessages;
        set({ directmessages: f(prevState) });
    },
    replaceDirectMessage: (oldMessage, newMessage) => {
        const oldState = get().directmessages;
        set({ directmessages: oldState.map(x => (x === oldMessage) ? newMessage : x)});
    }
}))