import { ChannelInfo } from "@/app/app/utils/socket_utils";
import { create } from "zustand";

export interface ChannelInfosStore {
    infos: ChannelInfo[];
    fetching: string[],
    setInfos: (infos: ChannelInfo[]) => void;
    setInfosLambda: (f: (prevInfos: ChannelInfo[]) => ChannelInfo[]) => void;
    addInfo: (info: ChannelInfo) => void;
    removeInfo: (infoId: string) => void;
    replaceInfo: (id: string, newInfo: ChannelInfo) => void;
    getExistingInfo: (id: string) => ChannelInfo | undefined;
    addInfos: (infos: ChannelInfo[]) => void;
    addfetchingInfo: (infoId: string) => void;
    removefetchingInfo: (infoId: string) => void;
}

export const useChannelInfoStore = create<ChannelInfosStore>((set, get) => ({
    infos: [],
    fetching: [],
    addInfo: (info) => {
        if(get().infos.find(x => x.channelId === info.channelId)) return;
        set(({ infos: [...get().infos, info] }));
    },
    removeInfo: (infoId) => {
        if(!get().infos.find(x => x.channelId === infoId)) return;
        set(({ infos: get().infos.filter(x => x.channelId !== infoId) }));
    },
    setInfos: (infos) => {
        set(({ infos }));
    },
    setInfosLambda: (f) => {
        const prevState = get().infos;
        set({ infos: f(prevState) });
    },
    replaceInfo: (oldInfoId, newInfo) => {
        const oldState = get().infos;
        set({ infos: oldState.map(x => (x.channelId === oldInfoId) ? newInfo : x)});
    },
    getExistingInfo: (infoId) => {
        return get().infos.find(x => x.channelId === infoId);
    },
    addInfos: (infosList) => {
        infosList.forEach(info => {
            if(!get().infos.find(x => x.channelId === info.channelId))
                set({infos: [...get().infos, info]});
        })
    },
    addfetchingInfo: (info) => {
        set((state) => ({fetching: [...state.fetching, info]}));
    },
    removefetchingInfo: (info) => {
        set((state) => ({fetching: state.fetching.filter(x => x !== info)}));
    },
}))