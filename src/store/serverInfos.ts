import { ServerInfo } from "@/app/app/utils/socket_utils";
import { create } from "zustand";

interface ServerInfosStore {
    serverInfos: ServerInfo[];
    fetchingServers: string[],
    setServerInfos: (servers: ServerInfo[]) => void;
    setServerInfosLambda: (f: (prevServers: ServerInfo[]) => ServerInfo[]) => void;
    addServerInfo: (server: ServerInfo) => void;
    removeServerInfo: (serverId: string) => void;
    replaceServerInfo: (serverId: string, newServer: ServerInfo) => void;
    getExistingServerInfo: (serverId: string) => ServerInfo | undefined;
    addServerInfos: (servers: ServerInfo[]) => void;
    addfetchingServer: (serverId: string) => void;
    removefetchingServer: (serverId: string) => void;
}

export const useServerInfoStore = create<ServerInfosStore>((set, get) => ({
    serverInfos: [],
    fetchingServers: [],
    addServerInfo: (user) => {
        if(get().serverInfos.find(x => x.serverId === user.serverId)) return;
        set(({ serverInfos: [...get().serverInfos, user] }));
    },
    removeServerInfo: (user) => {
        if(!get().serverInfos.find(x => x.serverId === user)) return;
        set(({ serverInfos: get().serverInfos.filter(x => x.serverId !== user) }));
    },
    setServerInfos: (userInfos) => {
        set(({ serverInfos: userInfos }));
    },
    setServerInfosLambda: (f) => {
        const prevState = get().serverInfos;
        set({ serverInfos: f(prevState) });
    },
    replaceServerInfo: (oldUser, newUser) => {
        const oldState = get().serverInfos;
        set({ serverInfos: oldState.map(x => (x.serverId === oldUser) ? newUser : x)});
    },
    getExistingServerInfo: (userId) => {
        return get().serverInfos.find(x => x.serverId === userId);
    },
    addServerInfos: (usersList) => {
        usersList.forEach(user => {
            if(!get().serverInfos.find(x => x.serverId === user.serverId))
                set({serverInfos: [...get().serverInfos, user]});
        })
    },
    addfetchingServer: (server) => {
        set((state) => ({fetchingServers: [...state.fetchingServers, server]}));
    },
    removefetchingServer: (server) => {
        set((state) => ({fetchingServers: state.fetchingServers.filter(x => x !== server)}));
    },
}))