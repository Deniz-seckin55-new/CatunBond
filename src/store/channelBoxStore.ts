import { create } from "zustand";

interface ChannelBoxStore {
    endMessageId: string;
    startMessageId: string;
    acceptedFiles: File[];
    setacceptedFiles: (files: File[]) => void;
    setacceptedFilesLambda: (f: (state: File[]) => File[]) => void;
    setendMessageId: (id: string) => void;
    setstartMessageId: (id: string) => void;
}

const useChannelBoxStore = create<ChannelBoxStore>((set,) => ({
    endMessageId: "",
    startMessageId: "",
    acceptedFiles: [],
    setacceptedFiles: (acceptedFiles) => { set({ acceptedFiles }) },
    setacceptedFilesLambda: (f) => { set((state) => ({acceptedFiles: f(state.acceptedFiles)})) },
    setendMessageId: (id: string) => set({ endMessageId: id }),
    setstartMessageId: (id: string) => set({ startMessageId: id }),
}));

export default useChannelBoxStore;