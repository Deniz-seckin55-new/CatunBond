import { MessageInfo } from "@/app/app/utils/utils";
import { create } from "zustand";

interface MessageInfoStore {
    MessageInfos: MessageInfo[],
    setMessageInfos: (f: ((messagesList: MessageInfo[]) => MessageInfo[])) => void;
    addMessageInfo: (messageInfo: MessageInfo) => void;
    removeMessageInfo: (messageId: string) => void;
}

export const useMessageInfoStore = create<MessageInfoStore>((set, get) => ({
    MessageInfos: [],
    setMessageInfos: (f) => {
        set({MessageInfos: f(get().MessageInfos)});
    },
    addMessageInfo: (info) => {
        set((state) => ({MessageInfos: [...state.MessageInfos, info]}));
    },
    removeMessageInfo: (info) => {
        set((state) => ({MessageInfos: state.MessageInfos.filter((messageInfo) => messageInfo.Message.id !== info)}));
    }
}));