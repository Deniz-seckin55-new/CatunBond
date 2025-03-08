import { EditContext, Message } from "@/app/app/utils/socket_utils";
import { create } from "zustand";

interface AwaitingStore {
    awaitingDeletionMessages: string[];
    awaitingEditionMessages: EditContext[];
    setAwaitingDeletionMessages: (adm: string[]) => void;
    addAwaitingDeletionMessages: (adm: string) => void;
    removeAwaitingDeletionMessages: (adm: string) => void;
    setAwaitingEditionMessages: (aem: EditContext[]) => void;
    addAwaitingEditionMessages: (aem: EditContext) => void;
    removeAwaitingEditionMessages: (aem: EditContext) => void;
}

export const useAwaiting = create<AwaitingStore>((set, get) => ({
    awaitingDeletionMessages: [],
    awaitingEditionMessages: [],
    setAwaitingDeletionMessages: (adm) => {set({awaitingDeletionMessages: adm})},
    addAwaitingDeletionMessages: (adm) => {set({awaitingDeletionMessages: [...get().awaitingDeletionMessages, adm]})},
    removeAwaitingDeletionMessages: (adm) => {set({awaitingDeletionMessages: get().awaitingDeletionMessages.filter(x => x !== adm)})},
    setAwaitingEditionMessages: (aem) => {set({awaitingEditionMessages: aem})},
    addAwaitingEditionMessages: (aem) => {set({awaitingEditionMessages: [...get().awaitingEditionMessages, aem]})},
    removeAwaitingEditionMessages: (aem) => {set({awaitingEditionMessages: get().awaitingEditionMessages.filter(x => x !== aem)})},
}));