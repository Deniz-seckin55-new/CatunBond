import { EmojiClickData } from "emoji-picker-react";
import { create } from "zustand";

interface ReactionMenuStore {
    position: { x: number; y: number };
    messageId?: string;
    setmessageId: (messageId: string) => void;
    onSelect: (emoji: EmojiClickData) => void;
    setOnSelect: (onSelect: (emoji: EmojiClickData) => void) => void;
    shown: boolean;
    setShown: (shown: boolean) => void;
    setPosition: (x: number, y: number) => void;
    ref: HTMLDivElement | null;
    __setRef: (ref: HTMLDivElement | null) => void;
}

const useReactionMenuStore = create<ReactionMenuStore>((set) => ({
    position: { x: 0, y: 0 },
    messageId: undefined,
    setmessageId: (messageId) => set({ messageId }),
    onSelect: () => {},
    setOnSelect: (onSelect) => set({ onSelect }),
    shown: false,
    setShown: (shown) => {if(!shown) set({messageId: undefined}); set({ shown }); },
    setPosition: (x, y) => set({ position: { x, y } }),
    ref: null,
    __setRef: (ref) => set({ref})
}));

export default useReactionMenuStore;