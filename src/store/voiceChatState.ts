import { create } from "zustand";
import { types } from "mediasoup-client";

interface VoiceChatState {
    isStarted: boolean;
    setIsStarted: (isStarted: boolean) => void;
    roomId: string | undefined;
    setRoomId: (roomId: string) => void;
    userId: string | undefined;
    setUserId: (userId: string) => void;
    isConnecting?: boolean;
    setIsConnecting: (isConnecting: boolean) => void;
    GetConnectedUsers: () => string[];
    setGetConnectedUsers: (getConnectedUsers: () => string[]) => void;
    leaveCall: () => void;
    setLeaveCall: (leaveCall: () => void) => void;
    consumers: Map<string, types.Consumer>;
    setConsumers: (consumers: Map<string, types.Consumer>) => void;
}

export const useVoiceChatState = create<VoiceChatState>((set, get) => ({
    isStarted: false,
    setIsStarted: (isStarted: boolean) => set({ isStarted }),
    roomId: undefined,
    setRoomId: (roomId: string) => set({ roomId }),
    userId: undefined,
    setUserId: (userId: string) => set({ userId }),
    isConnecting: undefined,
    setIsConnecting: (isConnecting: boolean) => set({ isConnecting }),
    GetConnectedUsers: () => [],
    setGetConnectedUsers: (getConnectedUsers: () => string[]) => set({ GetConnectedUsers: getConnectedUsers }),
    leaveCall: () => {},
    setLeaveCall: (leaveCall: () => void) => set({ leaveCall }),
    consumers: new Map<string, types.Consumer>(),
    setConsumers: (consumers: Map<string, types.Consumer>) => set({ consumers }),
}))