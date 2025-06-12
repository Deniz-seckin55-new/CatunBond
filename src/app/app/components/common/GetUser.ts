import { useUserStore } from "@/store/users";
import axios from "axios";
import { useCallback } from "react";
import { User, UserInfo, UserNote, UserRelativeInfo } from "../../utils/socket_utils";
import { useUserInfoStore } from "@/store/userInfos";
import { useUserRelativeInfoStore } from "@/store/userRelativeInfo";
import { useUserNotesStore } from "@/store/userNotes";

export const useGetUser = () => {
    const userStore = useUserStore();

    return useCallback(async (userID: string): Promise<User | undefined> => {
        console.log("Getting user: " + userID);
        if (userID === "" || !userID) return;

        const userExists = userStore.users.find(x => x.id === userID);
        if (userExists) {
            console.log("GE return ", userExists);
            return userExists;
        }

        const resp = await axios.get(`/api/v1/users/${userID}`);

        if (!resp.data.data) { return; }

        const newUser: User = resp.data.data;

        userStore.addUser(newUser);

        console.log("Got user with id: ", newUser);

        return newUser;
    }, [userStore.users]);
}
export const useGetUserInfo = () => {
    const userInfoStore = useUserInfoStore();

    return useCallback(async (userID: string): Promise<UserInfo | undefined> => {
        if (userID === "" || !userID) return;

        const userExists = userInfoStore.userInfos.find(x => x.userId === userID);
        if (userExists) {
            return userExists;
        }

        const resp = await axios.get(`/api/v1/users/${userID}/info`);

        if (!resp.data.data) return;

        const newUser: UserInfo = resp.data.data;

        userInfoStore.addUserInfo(newUser);

        console.log("Got user with id: ", newUser);

        return newUser;
    }, [userInfoStore.userInfos]);
}

export const useGetUserNotes = (userId: string) => {
    const userNotesStore = useUserNotesStore();

    return useCallback(async (otherUserId: string): Promise<UserNote | undefined> => {
        console.log("Getting user note: " + otherUserId);
        if (otherUserId === "" || !otherUserId) return;

        if (!userNotesStore.userNotes) {
            userNotesStore.setUserNotes({ userId, notes: [] });
        }

        const userExists = userNotesStore.getExistingUserNote(otherUserId);
        if (userExists) {
            console.log("exists, ", userExists);
            return userExists;
        }

        const resp = await axios.get(`/api/v1/user/${otherUserId}/note`);

        if (!resp.data.data) { console.warn("No data from resp.", resp.data); return; }

        const newNote: UserNote = resp.data.data;

        userNotesStore.setUserNote(otherUserId, newNote.note);

        console.log("Got user note with id: ", newNote);

        return newNote;
    }, [userNotesStore.userNotes]);
}

export const useGetUserByUsername = () => {
    const userStore = useUserStore();

    return useCallback(async (userName: string): Promise<User | undefined> => {
        if (userName === "" || !userName) return;

        if (userStore.users.find(x => x.username === userName)) {
            return userStore.users.find(x => x.username === userName);
        }

        const resp = await axios.get(`/api/v1/users/withName/${userName}`);

        if (!resp.data.data) return;

        const newUser: User = resp.data.data;

        userStore.addUser(newUser);

        return newUser;
    }, [userStore.users]);
}

export const useGetUserByUsernameSync = () => {
    const userStore = useUserStore();

    return useCallback((userName: string): User | undefined => {
        if (userName === "" || !userName) return;

        if (userStore.users.find(x => x.username === userName)) {
            return userStore.users.find(x => x.username === userName);
        }

        axios.get(`/api/v1/users/withName/${userName}`).then(resp => {
            if (!resp.data.data) return;

            const newUser: User = resp.data.data;

            userStore.addUser(newUser);

            return newUser;
        });
    }, [userStore.users]);
}

export const useGetUserRelativeInfo = () => {
    const userInfoStore = useUserRelativeInfoStore();

    return useCallback(async (userID: string): Promise<UserRelativeInfo | undefined> => {
        if (userID === "" || !userID) return;

        const userExists = userInfoStore.userInfos.find(x => x.user.id === userID);
        if (userExists) {
            return userExists;
        }

        const resp = await axios.get(`/api/v1/users/${userID}/info`);

        if (!resp.data.data) return;

        const newUser: UserRelativeInfo = resp.data.data;

        userInfoStore.addUserInfo(newUser);

        console.log("Got user with id (relative): ", newUser);

        return newUser;
    }, [userInfoStore.userInfos]);
}