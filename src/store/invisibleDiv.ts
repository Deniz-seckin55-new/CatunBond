import { create } from "zustand";

interface InvisibleDivStore {
    element: HTMLDivElement | null;
    setElement: (element: HTMLDivElement | null) => void;
}

export const useInvisibleDiv = create<InvisibleDivStore>((set, get) => ({
    element: null,
    setElement: (element) => { set({ element }) },
}));