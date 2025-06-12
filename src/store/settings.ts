import { create } from "zustand";

interface SettingsStore {
    saveLoading: boolean;
    setsaveLoading: (saveLoading: boolean) => void;
}

export const useSettings = create<SettingsStore>((set) => ({
    saveLoading: false,
    setsaveLoading: (saveLoading) => { set({ saveLoading }); }
}))