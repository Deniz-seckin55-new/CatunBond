import { Server } from "@/app/app/utils/socket_utils";
import { create } from "zustand";

interface ServerStore {
    servers: Server[];
    fetchingServers: string[];
    setServers: (servers: Server[]) => void;
    setServersLambda: (f: (prevServers: Server[]) => Server[]) => void;
    addServer: (server: Server) => void;
    removeServer: (serverId: string) => void;
    replaceServer: (serverId: string, newServer: Server) => void;
    getExistingServer: (serverId: string) => Server | undefined;
    addServers: (servers: Server[]) => void;
    addFetchingServer: (serverId: string) => void;
    removeFetchingServer: (serverId: string) => void;
}

export const useServerStore = create<ServerStore>((set, get) => ({
    servers: [],
    fetchingServers: [],
    addServer: (server) => {
        if (get().servers.find(x => x.id === server.id)) return;
        set(({ servers: [...get().servers, server] }));
    },
    removeServer: (serverId) => {
        if (!get().servers.find(x => x.id === serverId)) return;
        set(({ servers: get().servers.filter(x => x.id !== serverId) }));
    },
    setServers: (servers) => {
        set(({ servers }));
    },
    setServersLambda: (f) => {
        const prevState = get().servers;
        set({ servers: f(prevState) });
    },
    replaceServer: (serverId, newServer) => {
        const oldState = get().servers;
        set({ servers: oldState.map(x => (x.id === serverId) ? newServer : x) });
    },
    getExistingServer: (serverId) => {
        return get().servers.find(x => x.id === serverId);
    },
    addServers: (serversList) => {
        serversList.forEach(server => {
            if (!get().servers.find(x => x.id === server.id))
                set({ servers: [...get().servers, server] });
        });
    },
    addFetchingServer: (serverId) => {
        set((state) => ({ fetchingServers: [...state.fetchingServers, serverId] }));
    },
    removeFetchingServer: (serverId) => {
        set((state) => ({ fetchingServers: state.fetchingServers.filter(x => x !== serverId) }));
    },
}));