import { Channel } from '@/app/app/utils/socket_utils';
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface persistantUserStorage {
    getLastChannelOfServer: (serverId: string) => Channel;
    serverLastChannelList: { [serverId: string]: Channel };
    setLastChannelOfServer: (serverId: string, lastChannel: Channel) => void;
}

// the store itself does not need any change
export const usePersistantUserStorage = create(
    persist<persistantUserStorage>(
        (set, get) => ({
                serverLastChannelList: {},
                getLastChannelOfServer: (serverId) => { return get().serverLastChannelList[serverId]; },
                setLastChannelOfServer: (serverId, channel) => {
                        set((state) => ({
                                serverLastChannelList: {
                                        ...state.serverLastChannelList,
                                        [serverId]: channel,
                                },
                        }));
                }
        }),
        {
            name: 'user-storage',
        },
    ),
)