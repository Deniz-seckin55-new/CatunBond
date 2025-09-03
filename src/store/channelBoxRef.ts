import { create } from "zustand";

interface ChannelBoxRefStore {
    element: HTMLDivElement | null;
    setElement: (element: HTMLDivElement | null) => void;
}

export const useChannelBoxRef = create<ChannelBoxRefStore>((set, get) => ({
    element: null,
    setElement: (element) => { set({ element }) },
}));