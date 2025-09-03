import { create } from "zustand";

interface MessageDataStore {
    getData: (key: string) => string;
    setData: (key: string, data: string) => void;
    dataStorage: {[key: string]: string};
}

export const useMessageDataStore = create<MessageDataStore>((set, get) => ({
    dataStorage: {},
    getData(key) {
        return get().dataStorage[key];
    },
    setData(key, data) {
        let dt = get().dataStorage;
        dt[key] = data;

        set({dataStorage: dt});
    },
}));