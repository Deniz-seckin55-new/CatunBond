import { create } from "zustand";

interface ImagePreviewStore {
    shown: boolean;
    setShown: (shown: boolean) => void;
    fileUrl: string;
    setFileUrl: (url: string) => void;
    zoomFactor: number;
    setZoomFactor: (f: ((currentZoom: number) => number) | number) => void;
    pos: { x: number, y: number },
    setPos: (f: ((currentPos: { x: number, y: number }) => { x: number, y: number }) | { x: number, y: number }) => void;
}

export const useImagePreviewStore = create<ImagePreviewStore>((set, get) => ({
    shown: false,
    fileUrl: "",
    zoomFactor: 1,
    pos: { x: 0, y: 0 },
    setShown: (shown) => { set({ shown }) },
    setFileUrl: (fileUrl) => { set({ fileUrl }) },
    setZoomFactor: (zoomFactorF) => { if (typeof zoomFactorF === "number") { set({ zoomFactor: zoomFactorF }) } else { set(s => ({ zoomFactor: zoomFactorF(s.zoomFactor) })); } },
    setPos: (
        posF:
            | ((currentPos: { x: number; y: number }) => { x: number; y: number })
            | { x: number; y: number }
    ) => {
        if (typeof posF === "function") {
            set(s => ({ pos: posF(s.pos) }));
        } else {
            set({ pos: posF });
        }
    },
}));