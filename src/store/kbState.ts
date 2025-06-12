import { create } from "zustand";

interface kStateStore {
    kbState: string[],
    setkbState: (kbState: string[]) => void,
    setkbStateLambda: (f: (kbState: string[]) => string[]) => void,
}

export const useKBState = create<kStateStore>((set, get) => ({
    kbState: [],
    setkbState: (kbState) => { set({ kbState: Array.from(new Set<string>(kbState)) }) },
    setkbStateLambda: (f) => { set({ kbState: Array.from(new Set<string>(f(get().kbState))) }) },
}));