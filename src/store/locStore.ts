import { ServerInfo, User } from "@/app/app/utils/socket_utils";
import { create } from "zustand";

type StoreType = 'userStore' | 'mlLocal' | 'serverinfoStore';

interface StoreElements {
    userStore: { id: string, value: User }[]; // Example Usage
    mlLocal: { id: string, value: { userFetchOnProgess: boolean } }[];
    serverinfoStore: {id: string, value: ServerInfo }[];
}

interface LocalStore {
    stores: { storeType: StoreType, elements: { id: string, value: StoreElements[StoreType] }[] }[];
    setStore: (storeType: StoreType, store: { storeType: StoreType, elements: { id: string, value: StoreElements[StoreType] }[] }) => void;
    getStore: (storeType: StoreType) => StoreElements[StoreType] | undefined;
    addStoreValue: (storeType: StoreType, valueId: string, value: StoreElements[StoreType]) => void;
    getStoreValue: (storeType: StoreType, valueId: string) => StoreElements[StoreType];
    removeStoreValue: (storeType: StoreType, valueId: string) => void;
    clearStore: (storeType: StoreType) => void;
    clearAllStores: () => void;
    replaceStoreValue: (storeType: StoreType, valueId: string, value: StoreElements[StoreType]) => void;
    setStoreValueLamda: (storeType: StoreType, f: (value: StoreElements[StoreType]) => StoreElements[StoreType]) => void;
    getStoreValueLamda: (storeType: StoreType, f: (value: StoreElements[StoreType]) => StoreElements[StoreType]) => StoreElements[StoreType][];
}

export const useLocalStore = create<LocalStore>((set, get) => ({
    stores: [],
    clearAllStores: () => set({ stores: [] }),
    getStore: (storeType) => {
        const store = get().stores.find(x => x.storeType === storeType);
        return store ? (store.elements as unknown as StoreElements[typeof storeType]) : undefined;
    },
    setStore: (storeType, store) => {
        set((state) => ({
            stores: state.stores.some(x => x.storeType === storeType) ?
                state.stores.map(x => x.storeType === storeType ? store : x) :
                [...state.stores, store],
        }))
    },
    clearStore: (store) => {
        set((state) => ({
            stores: state.stores.map(x => {
                if (x.storeType === store) {
                    return { storeType: x.storeType, elements: [] };
                } else return x;
            })
        }))
    },
    getStoreValue: (store, valueId) => {
        const storeElement = get().stores.find(x => x.storeType === store)?.elements.find(x => x.id === valueId);
        return storeElement?.value as StoreElements[typeof store];
    },
    removeStoreValue: (store, valueId) => {
        set((state) => ({
            stores: state.stores.map(x =>
                x.storeType === store
                    ? { storeType: x.storeType, elements: x.elements.filter(e => e.id !== valueId) }
                    : x
            )
        }))
    },
    addStoreValue: (store, valueId, value) => {
        set((state) => ({
            stores: state.stores.some(x => x.storeType === store) ? state.stores.map(x => {
                if (x.storeType === store) {
                    return { storeType: x.storeType, elements: [...x.elements, { id: valueId, value: value }] }
                }
                return x;
            }) : [...state.stores, { storeType: store, elements: [{ id: valueId, value: value }] }]
        }))
    },
    getStoreValueLamda: (store, f) => {
        return get().stores.find(x => x.storeType === store)?.elements.map((el) => {
            return {
                id: el.id,
                value: f(el.value)
            };
        });
    },
    replaceStoreValue: (store, valueId, value) => {
        set((state) => ({
            stores: state.stores.map(x => {
                if (x.storeType === store) {
                    return {
                        storeType: x.storeType, elements: x.elements.map(y => {
                            if (y.id === valueId) {
                                return { id: valueId, value: value };
                            }
                            return y;
                        })
                    }
                }
                return x;
            })
        }))
    },
    setStoreValueLamda: (store, valueId, f) => {
        set((state) => ({
            stores: state.stores.some(st => st.storeType === store) ? state.stores.map(x => {
                if (x.storeType === store) {
                    return {
                        storeType: x.storeType,
                        elements: x.elements.map(y => ({
                            id: valueId,
                            value: y.id === valueId && y.value !== undefined ? f(y.value) : y.value
                        }))
                    };
                }
                return x;
            }) : [...state.stores, { storeType: store, elements: [] }]
        }))
    }
}));