import { create } from "zustand";

interface LandingPageStore {
    loadingButtons: string[],
    waitingTextV: boolean,
    setWaitingTextV: (visible: boolean) => void;
    addLoadingButton: (button: string) => void;
    removeLoadingButton: (button: string) => void;
    hasLoadingButton: (button: string) => boolean;
}

const useLandingPage = create<LandingPageStore>((set, get) => ({
    loadingButtons: [],
    waitingTextV: false,
    setWaitingTextV: (visible) => { set({waitingTextV: visible}) },
    addLoadingButton: (button) => {
        set({loadingButtons: [...get().loadingButtons, button]});
    },
    removeLoadingButton: (button) => {
        set({loadingButtons: get().loadingButtons.filter(x => x !== button)});
    },
    hasLoadingButton: (button) => {
        return get().loadingButtons.includes(button);
    }
}))

export default useLandingPage;