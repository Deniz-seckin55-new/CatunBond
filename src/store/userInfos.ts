import { UserInfo } from "@/app/app/utils/socket_utils";
import { create } from "zustand";

interface UserInfosStore {
    userInfos: UserInfo[],
    setUserInfos: (users: UserInfo[]) => void;
    setUserInfosLambda: (f: (prevUsers: UserInfo[]) => UserInfo[]) => void;
    addUserInfo: (user: UserInfo) => void;
    removeUserInfo: (userInfo: UserInfo) => void;
    replaceUserInfo: (userId: string, newUser: UserInfo) => void;
    getExistingUserInfo: (userId: string) => UserInfo | undefined;
    addUserInfos: (users: UserInfo[]) => void;
}

export const useUserInfoStore = create<UserInfosStore>((set, get) => ({
    userInfos: [],
    addUserInfo: (user) => {
        if(get().userInfos.find(x => x.userId === user.userId)) return;
        set(({ userInfos: [...get().userInfos, user] }));
    },
    removeUserInfo: (user) => {
        if(!get().userInfos.find(x => x.userId === user.userId)) return;
        set(({ userInfos: get().userInfos.filter(x => x.userId !== user.userId) }));
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
        set({ userInfos: oldState.map(x => (x.userId === oldUser) ? newUser : x)});
    },
    getExistingUserInfo: (userId) => {
        return get().userInfos.find(x => x.userId === userId);
    },
    addUserInfos: (usersList) => {
        usersList.forEach(user => {
            if(!get().userInfos.find(x => x.userId === user.userId))
                set({userInfos: [...get().userInfos, user]});
        })
    }
}))