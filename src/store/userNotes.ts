import { UserNote, UserNotes } from "@/app/app/utils/socket_utils";
import { create } from "zustand";

interface UserNotesStore {
    userNotes: UserNotes | null,
    setUserNotes: (notes: UserNotes) => void;
    setUserNotesLambda: (f: (prevNotes: UserNotes | null) => UserNotes) => void;
    setUserNote: (otherUserId: string, newNote: string) => void;
    getExistingUserNote: (otherUserId: string) => UserNote | undefined;
}

export const useUserNotesStore = create<UserNotesStore>((set, get) => ({
    userNotes: null,
    setUserNotes: (userNotes) => {
        set(({ userNotes }));
    },
    setUserNotesLambda: (f) => {
        const prevState = get().userNotes;
        set({ userNotes: f(prevState) });
    },
    setUserNote: (otherUserId, newNote) => {
        const oldState = get().userNotes;
        
        if(oldState)
            set({ userNotes: { userId: oldState.userId, notes: oldState.notes.find(x => x.otherUserId === otherUserId) ? oldState.notes.map(x => x.otherUserId === otherUserId ? { userId: oldState.userId, otherUserId: otherUserId, note: newNote } : x) : [...oldState.notes, { userId: oldState.userId, otherUserId: otherUserId, note: newNote }] } });
    },
    getExistingUserNote: (otherUserId) => {
        const oldState = get().userNotes;
        if(oldState)
            return oldState.notes.find(x => x.otherUserId === otherUserId);
        else return undefined;
    },
}))