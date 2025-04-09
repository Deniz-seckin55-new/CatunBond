import { create } from "zustand";

interface kStateStore {
    kbState: String[],
    setkbState: (kbState: String[]) => void,
    setkbStateLambda: (f: (kbState: String[]) => String[]) => void,
}

export const useKBState = create<kStateStore>((set, get) => ({
    kbState: [],
    setkbState: (kbState) => { set({ kbState }) },
    setkbStateLambda: (f) => { set({ kbState: f(get().kbState) }) },
}));