import { create } from "zustand";

interface HoveringElementStore {
    x: number;
    y: number;
    videoId: string;
    setPosition: (x: number, y: number) => void;
    shown: boolean;
    setShown: (shown: boolean) => void;
    setVideoId: (id: string) => void;
}

export const useHoveringElement = create<HoveringElementStore>((set, get) => ({
    x: 0,
    y: 0,
    videoId: "",
    shown: false,
    setPosition: (x, y) => {set({x, y})},
    setShown: (shown) => {set({shown})},
    setVideoId: (videoId) => {set({videoId})},
}));