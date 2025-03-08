import { create } from "zustand";

interface WritingUsersStore {
    writingUsers: string[],
    addUser: (userId: string) => void;
    removeUser: (userId: string) => void;
    setUsers: (users: string[]) => void;
    length: () => number;
}

export const useWritingUsers = create<WritingUsersStore>((set, get) => ({
    writingUsers: [],
    addUser: (user) => {set(({writingUsers: [...get().writingUsers, user]}))},
    removeUser: (user) => {set(({writingUsers: get().writingUsers.filter(x => x !== user)}))},
    setUsers: (users) => {set(({writingUsers: users}))},
    length: () => get().writingUsers.length,
}));