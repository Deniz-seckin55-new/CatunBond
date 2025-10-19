import styles from "@/app/app/page.module.css";
import { useCurrents } from "@/store/currents";
import useUserProfileStore from "@/store/userProfile";
import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useGetUser, useGetUserInfo, useGetUserNotes } from "./common/GetUser";
import { User } from "../utils/socket_utils";
import axios from "axios";
import { useUserNotesStore } from "@/store/userNotes";
import { ExploreBoxMode, onMouseLeaveTooltipElement, onMouseOverTooltipElement } from "@/app/app/utils/utils";
import { toast } from "react-toastify";
import { useUserInfoStore } from "@/store/userInfos";

interface ContextProps {
    showUserProfile: (userId: string, fullMode: boolean) => void;
}

interface Props {
    onClickDirectMessage: (user: User) => void;
    sendFriendRequestWithId: (id: string) => void;
    UserProfileOtherActionsMenuProps: OtherProps;
}

const LoadingJSX = (
    <>
        <img alt={"Loading"} className={styles.loading_icon_center} src="/load.svg" />
    </>
)

export const UserProfileContext = createContext<ContextProps | null>(null);

export const UserProfile: React.FC<Props> = (props) => {
    const currents = useCurrents();
    const profile = useUserProfileStore();
    const getUser = useGetUser();
    const getUserInfo = useGetUserInfo();
    const getUserNote = useGetUserNotes(useCurrents.getState().user!.id);
    const uns = useUserNotesStore();
    // const getUserByUsername = useGetUserByUsername();

    const [initalNote, setinitalNote] = useState<string>("");
    const [initalNoteReady, setinitalNoteReady] = useState<boolean>(false);

    let updated = false;

    const onClickSendMessage = (withUser: User) => {
        props.onClickDirectMessage(withUser);
    }

    // const UpdateUserInfo = (userInfo: UserInfo, fn: ((res: AxiosResponse<any, any>) => void)) => {
    //     axios.put(`/api/user/info`, {
    //         userInfo: userInfo,
    //     }).then((res) => {
    //         fn(res);
    //     });
    // }

    const UpdateUserNote = (userId: string, note: string, fn: () => void) => {
        axios.put(`/api/v1/user/${userId}/note`, {
            note: note,
        }).then((res) => {
            console.log(res.data);
            fn();
        }).catch((err) => {
            console.log(err);
        });
    }

    const onClickAddFriendRequest = (userId: string | null) => {
        if (userId)
            props.sendFriendRequestWithId(userId);
    }

    const onClickOtherActions = (ev: React.MouseEvent) => {
        ev.preventDefault();

        if(profile.isSubMenuShown) {
            profile.setIsSubMenuShown(false);
            return;
        }

        const x = ev.currentTarget.getBoundingClientRect().right + 40;
        const y = ev.currentTarget.getBoundingClientRect().top - 20;

        profile.setSubMenuPosition(x, y);
        profile.setIsSubMenuShown(true);
    }

    const notesTimeout = useRef<NodeJS.Timeout | null>(null);
    const onNotesInput = (newText: string) => {
        profile.setnotesText(newText);
        updated = true;

        // Clear the previous timeout
        if (notesTimeout.current) {
            clearTimeout(notesTimeout.current);
        }

        // Set a new timeout
        notesTimeout.current = setTimeout(() => {
            if (updated && profile.renderingUser) {
                const cid = profile.renderingUser.id;

                updated = false;
                UpdateUserNote(cid, newText, () => {
                    console.log("Set new user note", newText)
                    uns.setUserNote(cid, newText);
                });
            }
        }, 1000);
    };

    const onKeyDown = (ev: KeyboardEvent) => {
        if (ev.key === "Escape") {
            profile.setisShown(false);
            currents.setBgBlurV(false);
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
        }
    }, []);

    useEffect(() => {
        if (!profile.userProfile) return;
        getUser(profile.userProfile).then(user => {
            if (user)
                profile.setrenderingUser(user);
            else {
                console.log("Error while finding the user. " + profile.userProfile);
            }
        });
    }, [profile.userProfile]);
    useEffect(() => {
        if (!profile.userProfile) return;
        getUserInfo(profile.userProfile).then(userInfo => {
            if (userInfo)
                profile.setrenderingUserInfo(userInfo);
            else
                console.log("No user info.");
        });
    }, [profile.userProfile]);
    useEffect(() => {
        if (!profile.userProfile) {
            console.log("No userProfile.");
            return;
        }

        console.log("Getting user note", profile.userProfile);
        getUserNote(profile.userProfile).then(userNote => {
            console.log("Got user note", userNote);
            if (userNote) {
                setinitalNote(userNote.note);
                setinitalNoteReady(true);
            } else
                console.log("No user note.");
        });
    }, [profile.userProfile]);

    // Order matters
    if (!profile.isShown) return;
    if (!profile.renderingUser) return LoadingJSX;
    if (!initalNoteReady) return LoadingJSX;

    if (!currents.user) return (<></>);

    return (
        <>
            {profile.isFull && (<div className={styles.user_profile_holder}>
                <div className={styles.user_profile_full}>
                    <div className={styles.user_profile_actions}>
                        { /* Options Menu && Add Friend */}
                        {(profile.renderingUser.id !== currents.user.id && !currents.user.friends.find(x => x.id === profile.renderingUser?.id)) && (<button onMouseLeave={() => onMouseLeaveTooltipElement(currents)}
                            onMouseOver={(ev) => onMouseOverTooltipElement(ev, "Send Friend Request", currents)}
                            className={styles.normal_icon} style={{ width: 32, height: 32 }} onClick={() => onClickAddFriendRequest(profile.userProfile)}>
                            <img alt={"Friend Request"} src={"/add-person-white.svg"} width={32} height={32} />
                        </button>)}
                        {profile.renderingUser.id !== currents.user.id && (<button id="user-profile-other-actions-button" onMouseLeave={() => onMouseLeaveTooltipElement(currents)}
                            onMouseOver={(ev) => onMouseOverTooltipElement(ev, "Other Actions...", currents)}
                            className={styles.normal_icon} style={{ width: 32, height: 32 }} onClick={onClickOtherActions}>
                            <img id="user-profile-other-actions-button" alt={"Other Actions"} src={"/dots-three-white.svg"} width={32} height={32}
                                onClick={() => {
                                }} />
                        </button>)}
                    </div>
                    <div className={styles.user_profile_content}>
                        <div className={styles.user_profile_pad}>
                            <div className={styles.flex_rowa}>
                                <img className={styles.user_profile_avatar}
                                    src={profile.renderingUser.avatarUrl ? profile.renderingUser.avatarUrl : ''}
                                    alt={profile.renderingUser.username} width={128} height={128} />
                                <p className={styles.user_profile_name}
                                    style={{ color: profile.renderingUserInfo?.usernameColor ?? "#000D1E" }}>{profile.renderingUser.username}</p>
                            </div>
                            <p className={styles.user_profile_short_description}>{profile.renderingUserInfo?.shortDescription}</p>
                        </div>
                        <div className={styles.user_profile_bottom}>
                            <div className={styles.user_profile_pad}>
                                <div className={styles.flex_rowa}>
                                    <p className={styles.user_profile_main_link}>{profile.renderingUserInfo?.mainLink}</p>
                                    { /* Mutual servers & Mutual friends */}
                                </div>
                                <div className={styles.flex_rowa}>
                                    <p className={styles.user_profile_header}>Biography</p>
                                    <button className={`${styles.user_profile_message_button} ${currents.user.id === profile.renderingUser.id ? styles.disable_hover : ''}`} disabled={currents.user.id === profile.renderingUser.id}
                                        onClick={() => profile.renderingUser && onClickSendMessage(profile.renderingUser)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                            viewBox="0 0 20 20" id="message">
                                            <g id="Page-1" fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                                                <g id="Dribbble-Light-Preview" fill="#000"
                                                    transform="translate(-60 -919)">
                                                    <g id="icons" transform="translate(56 160)">
                                                        <path id="message-[#1579]"
                                                            d="M13.958 759C8 759 3.265 764.127 4.095 770.125c.529 3.822 3.428 7.031 7.225 8.043 1.414.377 2.874.457 4.34.204 1.224-.212 2.48-.117 3.679.183l1.457.364c1.889.473 3.605-1.208 3.122-3.06l-.278-1.069c-.302-1.16-.367-2.385-.055-3.542a9.657 9.657 0 0 0 .104-4.588c-.918-4.245-4.816-7.66-9.731-7.66m0 2c3.952 0 7.047 2.71 7.776 6.083a7.649 7.649 0 0 1-.08 3.643c-1.35 4.992 2.598 6.996-1.83 5.888-1.473-.368-3.008-.472-4.505-.213a8.09 8.09 0 0 1-3.484-.165c-3.027-.807-5.342-3.373-5.76-6.385-.67-4.854 3.194-8.851 7.883-8.851"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                        <p>Message</p>
                                    </button>
                                </div>
                                <p className={`${styles.user_profile_biography} ${styles.up_element}`}>{profile.renderingUserInfo?.biography}</p>
                                <p className={`${styles.user_profile_header} ${styles.up_element}`}>My Notes</p>
                                <textarea className={`${styles.user_profile_notes} ${styles.up_element}`}
                                    onInput={(ev) => onNotesInput(ev.currentTarget.value)}
                                    defaultValue={initalNote}></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}
            {!profile.isFull && (<div className={styles.user_profile_overlay}>

            </div>)}
            <UserProfileOtherActionsMenu {...props.UserProfileOtherActionsMenuProps} />
        </>
    )
}

interface OtherProps {
    onClickDirectMessageWithCallback: (user: User, fn: () => void) => void;
    onClickCall: () => void;
    openExploreBox: (mode: ExploreBoxMode) => void;
}

const UserProfileOtherActionsMenu: React.FC<OtherProps> = (props) => {
    const { isSubMenuShown: Shown, subMenuPosition: Position, renderingUser, ...ups  } = useUserProfileStore();
    const currents = useCurrents();

    const UserCall = useCallback(() => {
        if (!renderingUser) return;

        props.onClickDirectMessageWithCallback(renderingUser, () => {
            currents.setServer(null);
            currents.setCategories([]);
            props.onClickCall();
            ups.setisShown(false)
            ups.setIsSubMenuShown(false)
            currents.setBgBlurV(false)
        });
    }, [currents.contextmenu.currentObject, props.onClickDirectMessageWithCallback, currents.setServer, currents.setCategories, props.onClickCall]);

    const userInfoStore = useUserInfoStore();

    const UserBlock = useCallback(() => {
        const blockUser = async (userId: string) => {
            const resp = await axios.post(`/api/v1/user/blocked`, userId);
            if (resp.status !== 200) {
                toast("Couldn't block user.");
            } else {
                toast(`Blocked ${userInfoStore.getExistingUserInfo(userId) ?? (currents.contextmenu.currentObject as User).username}`);
            }
        }

        blockUser(currents.contextmenu.currentID);
    }, [currents.contextmenu.currentID, currents.contextmenu.currentObject, userInfoStore]);

    const UserContextMenuButtons = useMemo(() => [
        { label: "Call User", action: UserCall },
        { label: "Block User", action: UserBlock },
    ], [UserCall, UserBlock]);

    const UserMute = useCallback(async () => {
        props.openExploreBox(ExploreBoxMode.UserMute);
    }, [props.openExploreBox]);
    const UserKick = useCallback(async () => {
        props.openExploreBox(ExploreBoxMode.UserKick);
    }, [props.openExploreBox]);
    const UserBan = useCallback(async () => {
        props.openExploreBox(ExploreBoxMode.UserBan);
    }, [props.openExploreBox]);

    const UserModerationContextMenuButtons = useMemo(() => [
        { label: "Mute User", action: UserMute },
        { label: "Kick User", action: UserKick },
        { label: "Ban User", action: UserBan },
    ], [UserMute, UserKick, UserBan]);
    return (
        <>
            <div id={"user-profile-sub-menu"} className={styles.user_profile_other_actions} style={{
                position: "absolute",
                left: Position.x,
                top: Position.y,
                opacity: Shown ? 1 : 0,
                pointerEvents: Shown ? "auto" : "none",
            }}>
                <div className={styles.context_menu_div}>
                    {UserContextMenuButtons.map(button => {
                        return (
                            <button className={styles.context_menu_button} onClick={button.action} key={button.label}
                                onContextMenuCapture={(ev) => ev.preventDefault()}>
                                <p className={styles.context_menu_button_text}>{button.label}</p>
                            </button>
                        )
                    })}
                    {currents.user?.id === currents.server?.ownerId && UserModerationContextMenuButtons.map(button => {
                        return (
                            <button className={styles.context_menu_button} onClick={button.action} key={button.label}
                                onContextMenuCapture={(ev) => ev.preventDefault()}>
                                <p className={styles.context_menu_button_text}>{button.label}</p>
                            </button>
                        )
                    })}
                </div>
            </div>
        </>
    );
}