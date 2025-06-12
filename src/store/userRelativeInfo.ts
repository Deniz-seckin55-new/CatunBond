import { UserRelativeInfo as UserInfo } from "@/app/app/utils/socket_utils";
import { create } from "zustand";

interface UserRelativeInfosStore {
    userInfos: UserInfo[],
    setUserInfos: (users: UserInfo[]) => void;
    setUserInfosLambda: (f: (prevUsers: UserInfo[]) => UserInfo[]) => void;
    addUserInfo: (user: UserInfo) => void;
    removeUserInfo: (userInfo: UserInfo) => void;
    replaceUserInfo: (user: UserInfo, newUser: UserInfo) => void;
    getExistingUserInfo: (userId: string) => UserInfo | undefined;
    addUserInfos: (users: UserInfo[]) => void;
}

export const useUserRelativeInfoStore = create<UserRelativeInfosStore>((set, get) => ({
    userInfos: [],
    addUserInfo: (user) => {
        if(get().userInfos.find(x => x.user.id === user.user.id)) return;
        set(({ userInfos: [...get().userInfos, user] }));
    },
    removeUserInfo: (user) => {
        if(!get().userInfos.find(x => x.user.id === user.user.id)) return;
        set(({ userInfos: get().userInfos.filter(x => x.user.id !== user.user.id) }));
    },
    setUserInfos: (userInfos) => {
        set(({ userInfos }));
    },
    setUserInfosLambda: (f) => {
        const prevState = get().userInfos;
        set({ userInfos: f(prevState) });
    },
    replaceUserInfo: (oldUser, newUser) => {
        const oldState = get().userInfos;
        set({ userInfos: oldState.map(x => (x === oldUser) ? newUser : x)});
    },
    getExistingUserInfo: (userId) => {
        return get().userInfos.find(x => x.user.id === userId);
    },
    addUserInfos: (usersList) => {
        usersList.forEach(user => {
            if(!get().userInfos.find(x => x.user.id === user.user.id))
                set({userInfos: [...get().userInfos, user]});
        })
    }
}))