import { ServerInvites } from "@/app/app/utils/socket_utils";
import { create } from "zustand";

interface ServerInvitesStore {
    serverInvitesAll: ServerInvites[],
    addServerInvites: (serverInvite: ServerInvites) => void;
    removeServerInvites: (serverId: string) => void;
    replaceServerInvites: (serverId: string, serverInvite: ServerInvites) => void;
    getExistingServerInvite: (serverId: string) => ServerInvites | undefined;
}

export const useServerInvitesStore = create<ServerInvitesStore>((set, get) => ({
    serverInvitesAll: [],
    getExistingServerInvite: (serverId) => {
        return get().serverInvitesAll.find(x => x.serverId === serverId);
    },
    addServerInvites: (invites) => {
        set((state) => ({serverInvitesAll: [...state.serverInvitesAll, invites]}))
    },
    removeServerInvites: (serverId) => {
        set((state) => ({serverInvitesAll: state.serverInvitesAll.filter(x => x.serverId !== serverId)}));
    },
    replaceServerInvites: (serverId, serverInvites) => {
        set((state) => ({serverInvitesAll: state.serverInvitesAll.map(x => x.serverId === serverId ? serverInvites : x)}));
    }
}))