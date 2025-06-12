import { User } from "@/app/app/utils/socket_utils";
import { create } from "zustand";

interface UsersStore {
    users: User[],
    setUsers: (users: User[]) => void;
    setUsersLambda: (f: (prevUsers: User[]) => User[]) => void;
    addUser: (user: User) => void;
    removeUser: (user: User) => void;
    replaceUser: (user: User, newUser: User) => void;
    getExistingUser: (userId: string) => User | undefined;
    addUsers: (users: User[]) => void;
}

export const useUserStore = create<UsersStore>((set, get) => ({
    users: [],
    addUser: (user) => {
        if(get().users.find(x => x.id === user.id)) return;
        set(({ users: [...get().users, user] }));
    },
    removeUser: (user) => {
        if(!get().users.find(x => x.id === user.id)) return;
        set(({ users: get().users.filter(x => x.id !== user.id) }));
    },
    setUsers: (users) => {
        set(({ users }));
    },
    setUsersLambda: (f) => {
        const prevState = get().users;
        set({ users: f(prevState) });
    },
    replaceUser: (oldUser, newUser) => {
        const oldState = get().users;
        set({ users: oldState.map(x => (x === oldUser) ? newUser : x)});
    },
    getExistingUser: (userId) => {
        return get().users.find(x => x.id === userId);
    },
    addUsers: (usersList) => {
        usersList.forEach(user => {
            if(!get().users.find(x => x.id === user.id))
                set({users: [...get().users, user]});
        })
    }
}))