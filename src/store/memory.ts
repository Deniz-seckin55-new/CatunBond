import { create } from "zustand";

interface MemoryStore {
    nsfwProceededChannels: string[],
    addnsfwProceededChannel: (channelId: string) => void;
    removensfwProceededChannel: (channelId: string) => void;
    setnsfwProceededChannels: (channels: string[]) => void;
}

export const useMemory = create<MemoryStore>((set) => ({
    nsfwProceededChannels: [],
    addnsfwProceededChannel: (channelId) => {
        set((state) => ({nsfwProceededChannels: [...state.nsfwProceededChannels, channelId]}));
    },
    removensfwProceededChannel: (channelId) => {
        set((state) => ({nsfwProceededChannels: state.nsfwProceededChannels.filter(x => x !== channelId)}));
    },
    setnsfwProceededChannels: (nsfwProceededChannels) => {
        set(({nsfwProceededChannels}));
    },
}));