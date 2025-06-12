import { User, UserInfo } from "@/app/app/utils/socket_utils";
import { create } from "zustand";

interface UserProfileStore {
    userProfile: string | null;
    setUserProfile: (userProfile: string) => void;
    renderingUser: User | null;
    renderingUserInfo: UserInfo | null;
    isShown: boolean;
    isFull: boolean;
    notesText: string;
    setisShown: (isShown: boolean) => void;
    setisFull: (isFull: boolean) => void;
    setrenderingUser: (user: User) => void;
    setrenderingUserInfo: (renderingUserInfo: UserInfo) => void;
    setnotesText: (newText: string) => void;
}

const useUserProfileStore = create<UserProfileStore>((set) => ({
    userProfile: null,
    isShown: false,
    isFull: false,
    renderingUser: null,
    renderingUserInfo: null,
    notesText: "",
    setUserProfile: (userProfile) => { set({ userProfile }); },
    setisShown: (isShown) => { set({ isShown }); if (!isShown) { set({ userProfile: null, renderingUser: null, renderingUserInfo: null, notesText: "", }) } },
    setisFull: (isFull) => { set({ isFull }) },
    setrenderingUser: (user) => { set({ renderingUser: user }); },
    setrenderingUserInfo: (renderingUserInfo) => { set({ renderingUserInfo }); },
    setnotesText: (notesText) => { set({ notesText }); }
}));

export default useUserProfileStore;