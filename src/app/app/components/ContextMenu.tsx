import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import styles from '../page.module.css';
import {
    ExploreBoxMode,
    OpenConfirmationMenu,
    SettingsMode,
    UpdateMessageInfo,
    OpenConfirmationMenuWithRetype
} from '../utils/utils';
import { useCurrents } from '@/store/currents';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
    Channel,
    DetailedDBUser,
    Message,
    Server,
    User
} from '../utils/socket_utils';
import useUserProfileStore from '@/store/userProfile';
import { useMessagesStore } from '@/store/messages';
import { useSocketStore } from '@/store/socket';
import { useMessageInfoStore } from '@/store/messageInfos';
import { useUserInfoStore } from '@/store/userInfos';
import { useSettings } from '@/store/settings';
import { useChannelInfoStore } from '@/store/channelInfos';
import { useCopyToClipboard } from 'usehooks-ts';

interface Props {
    onClickDirectMessageWithCallback: (user: User, fn: () => void) => void;
    sendFriendRequestWithId: (id: string) => void;
    onClickCall: () => void;
    openExploreBox: (mode: ExploreBoxMode) => void;
    openSettings: (mode: SettingsMode, object: any) => void;
}

const ContextMenu: React.FC<Props> = (props) => {
    const [showElement, setshowElement] = useState<boolean>(false);
    const ContextMenuRef = useRef<HTMLDivElement | null>(null);
    const settingsStore = useSettings();

    const { socket } = useSocketStore();

    const messageInfoStore = useMessageInfoStore();
    const userInfoStore = useUserInfoStore();
    const channelInfoStore = useChannelInfoStore();

    const [_, copyToClipboard] = useCopyToClipboard();

    const currents = useCurrents();
    const { messages, setreplyingTo } = useMessagesStore();
    const pp = useUserProfileStore();

    useEffect(() => {
        if (!currents.contextmenu.shown) {
            setTimeout(() => {
                setshowElement(false);
            }, 100);
        } else {
            setshowElement(true);
        }
    }, [currents.contextmenu.shown]);

    const CheckRect = () => {
        const menu = ContextMenuRef.current;
        if (menu) {
            console.log("Checking rect");
            const menuBoundingClientRect = menu.getBoundingClientRect();
            const windowHeight = window.screen.availHeight;
            const windowWidth = window.screen.availWidth;

            console.log([menuBoundingClientRect, windowHeight, windowWidth])
            const padding = 10; // optional margin from screen edges
            let x = menuBoundingClientRect.x;
            let y = menuBoundingClientRect.y;

            // Adjust X position if overflowing to the right
            if (x + menuBoundingClientRect.width > window.innerWidth - padding) {
                x = window.innerWidth - menuBoundingClientRect.width - padding;
                console.log("Adjusted X to stay within screen");
            }

            // Adjust Y position if overflowing to the bottom
            if (y + menuBoundingClientRect.height > window.innerHeight - padding) {
                y = window.innerHeight - menuBoundingClientRect.height - padding;
                console.log("Adjusted Y to stay within screen");
            }

            // Ensure it doesn’t go to negative values
            x = Math.max(padding, x);
            y = Math.max(padding, y);

            currents.setContextMenuXY(x, y);
        }
    }

    const CheckRectWait = () => {
        if (ContextMenuRef.current) {
            CheckRect();
        } else {
            setTimeout(() => {
                CheckRectWait();
            }, 25);
        }
    }

    useLayoutEffect(() => {
        if (!currents.contextmenu.shown) return;

        if (ContextMenuRef.current) {
            CheckRect();
        } else {
            CheckRectWait();
        }
    }, [!!ContextMenuRef.current, currents.contextmenu.shown, currents.contextmenu.x, currents.contextmenu.y]);

    const UserViewProfile = useCallback(() => {
        currents.setBgBlurV(true);
        console.log("openning with ", currents.contextmenu.currentID);
        pp.setUserProfile(currents.contextmenu.currentID);
        pp.setisFull(true);
        pp.setisShown(true);
        currents.setContextMenuShown(false);
    }, [currents.contextmenu.currentID]);
    const UserCall = useCallback(() => {
        const currentUser: User | null = (currents.contextmenu.currentObject as any).author ?? currents.contextmenu.currentObject
        console.log("WUSS",currentUser)

        if (!currentUser) return;

        props.onClickDirectMessageWithCallback(currentUser, () => {
            currents.setServer(null);
            currents.setCategories([]);
            props.onClickCall();
        });
    }, [currents.contextmenu.currentObject, props.onClickDirectMessageWithCallback, currents.setServer, currents.setCategories, props.onClickCall]);
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
    const UserSendFriendRequest = useCallback(() => {
        props.sendFriendRequestWithId(currents.contextmenu.currentID);
    }, [props.sendFriendRequestWithId, currents.contextmenu.currentID]);

    const UserContextMenuButtons = useMemo(() => [
        { label: "View User Profile", action: UserViewProfile },
        { label: "Send Friend Request", action: UserSendFriendRequest },
        { label: "Call User", action: UserCall },
        { label: "Block User", action: UserBlock },
    ], [UserViewProfile, UserSendFriendRequest, UserCall, UserBlock]);

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

    const ServerSettings = () => {
        props.openSettings('Server', currents.contextmenu.currentObject);
    }

    const ServerDelete = () => {
        const server = currents.contextmenu.currentObject as Server;

        OpenConfirmationMenuWithRetype(currents, "Are you sure you want to delete this server? This action cannot be undone.", server.name, (answer: boolean) => {
            if (!answer) {
                toast("Server deletion cancelled.");
                return;
            }

            const serverId = currents.contextmenu.currentID;
            axios.delete(`/api/v1/servers/${serverId}`).then(response => {

                if (response.status === 200) {
                    const userBefore = useCurrents.getState().user;

                    if (!userBefore) return;

                    const updatedUser = {
                        ...userBefore,
                        servers: userBefore.servers.filter(x => x.id !== serverId),
                    };

                    currents.setUser(updatedUser);
                    currents.setServer(null);
                    currents.setCategories([]);
                    toast("Server deleted successfully.");
                } else {
                    toast("An error occurred while deleting the server.");
                }
            }).catch(error => {
                console.error("Error deleting server:", error);
                toast("An error occurred while deleting the server.");
            });
        });
    }
    const ServerInviteFriends = () => {
        props.openExploreBox(ExploreBoxMode.UserSelectionScreen);
    }

    const ServerModerationContextMenuButtons = useMemo(() => [
        { label: "View Server Settings", action: ServerSettings },
        { label: "Delete Server", action: ServerDelete },
        { label: "Invite Friends", action: ServerInviteFriends },
    ], [ServerSettings, ServerDelete, ServerInviteFriends]);

    const ServerLeave = useCallback(async () => {
        const serverId = currents.contextmenu.currentID;
        const response = await axios.delete("/api/v1/user/servers", {
            data: JSON.stringify({
                serverId: serverId,
            }),
        });

        if (response.status === 200) {

            const userBefore = useCurrents.getState().user;

            if (!userBefore) return;

            const updatedUser = {
                ...userBefore,
                servers: userBefore.servers.filter(x => x.id !== serverId),
            };

            currents.setUser(updatedUser);

            if (currents.server?.id === serverId)
                currents.onClickAppIcon();

            toast("Left server.");
        } else {
            toast("An error accured while leaving the server.");
        }
    }, [currents.contextmenu.currentID]);
    
    const CopyServerId = useCallback(async () => {
        await copyToClipboard(currents.contextmenu.currentID);
    }, [currents.contextmenu.currentID]);

    const ServerContextMenuButtons = useMemo(() => [
        { label: "Copy Server Id", action: CopyServerId },
        { label: "Leave Server", action: ServerLeave },
    ], [ServerLeave]);

    const ChannelSettings = useCallback(() => {
        console.log("Channel ", currents.contextmenu.currentObject);
        props.openSettings('Channel', currents.contextmenu.currentObject);
    }, [props.openSettings, currents.contextmenu.currentObject]);
    const ChannelDelete = useCallback(() => {
        if (!currents.user) return;

        const channel = currents.contextmenu.currentObject as Channel;

        OpenConfirmationMenu(useCurrents.getState(), "Are you sure you want to delete this channel?", async (answer: boolean) => {
            console.log("C.M. Answer: ", answer);
            if (!currents.server) return;
            if (!answer) return;

            const channelId = channel.id;

            await axios.delete(`/api/v1/channels/${channelId}`);
            channelInfoStore.removeInfo(channelId);

            const current_user = currents.user!;
            const new_current_user: DetailedDBUser = {
                // Top‑level copy
                ...current_user,

                // Deep‑clone every server, category, and channel,
                // filtering out the deleted channel
                servers: current_user.servers.map(server => ({
                    ...server, // new server object
                    categories: server.categories.map(category => ({
                        ...category, // new category object
                        channels: category.channels
                            // remove our channel
                            .filter(c => c.id !== channelId)
                            // clone each remaining channel just in case
                            .map(channel => ({ ...channel })),
                    })),
                })),
            };

            currents.setUser(new_current_user);

            const current_server = currents.server!;
            const new_server = {
                // Top‑level copy
                ...current_server,

                // Rebuild every category & channel
                categories: current_server.categories.map(category => ({
                    ...category, // new category object
                    channels: category.channels
                        // filter out the deleted channel
                        .filter(c => c.id !== channelId)
                        // clone each remaining channel
                        .map(channel => ({ ...channel })),
                })),
            };
            currents.setServer(new_server);

            const current_categories = currents.Categories;
            const new_categories = current_categories.map(category => ({
                ...category, // new category object
                channels: category.channels
                    // filter out the deleted channel
                    .filter(c => c.id !== channelId)
                    // clone each remaining channel
                    .map(channel => ({ ...channel })),
            }));
            currents.setCategories(new_categories);
        });
    }, [currents.user, currents.contextmenu.currentObject, currents.server, currents.Categories]);

    const ChannelModerationContextMenuButtons = useMemo(() => [
        { label: "Channel Settings", action: ChannelSettings },
        { label: "Delete Channel", action: ChannelDelete },
    ], [ChannelSettings, ChannelDelete]);

    const ChannelMute = () => {
    };
    const CopyChannelId = useCallback(async () => {
        await copyToClipboard(currents.contextmenu.currentID);
    }, [currents.contextmenu.currentID]);

    const ChannelContextMenuButtons = useMemo(() => [
        // { label: "Mute Channel", action: ChannelMute }
        { label: "Copy Channel Id", action: CopyChannelId }
    ], [ChannelMute, CopyChannelId]);

    const CopyMessageId = useCallback(async () => {
        await copyToClipboard(currents.contextmenu.currentID);
    }, [currents.contextmenu.currentID]);
    const CopyMessageContent = useCallback(() => {
        const messageInfo = messageInfoStore.MessageInfos.find(x => x.Message.id === currents.contextmenu.currentID);
        if (messageInfo) {
            copyToClipboard(messageInfo.Message.content);
        }
    }, [messageInfoStore, currents.contextmenu.currentID]);
    const MessageReply = useCallback(async () => {
        setreplyingTo(messages.find(msg => msg.id === currents.contextmenu.currentID) ?? null);
    }, [setreplyingTo, messages, currents.contextmenu.currentID]);

    const MessageDelete = useCallback(() => {
        const deleteMessage = async (message: Message) => {
            const resp = await axios.delete(`api/v1/channels/${message.channelId}/messages/${message.id}`);
            if (resp.status === 200) {
                return { success: true, message: resp.data.message };
            } else {
                return { success: false, message: resp.data.message };
            }
        }

        const message = messages.find(msg => msg.id === currents.contextmenu.currentID);
        if (message)
            deleteMessage(message);
    }, [messages, currents.contextmenu.currentID]);

    const MessageEdit = useCallback(() => {
        const message = messages.find(msg => msg.id === currents.contextmenu.currentID);
        if (message) {
            const messageInfo = messageInfoStore.MessageInfos.find(info => info.Message.id);
            if (!messageInfo) {
                console.warn("No message info, returning", { message });
                return;
            }
            UpdateMessageInfo(message, "editMode", true, messageInfoStore.setMessageInfos);
        } else {
            console.log("No message found, returning", { message });
        }
    }, [messages, currents.contextmenu.currentID]);

    const MessageOwnerOrModerationContextMenuButtons = useMemo(() => [
        { label: "Edit", action: MessageEdit },
        { label: "Delete", action: MessageDelete },
    ], [MessageEdit, MessageDelete]);

    const MessageContextMenuButtons = useMemo(() => [
        { label: "Copy Message Content", action: CopyMessageContent },
        { label: "Copy Message Id", action: CopyMessageId },
        { label: "Reply", action: MessageReply }
    ], [CopyMessageContent, CopyMessageId, MessageReply]);

    const includes = useMemo(() => {
        return (
            <>
                {currents.contextmenu.includes.map(button => {
                    return (
                        <button className={styles.context_menu_button} onClick={button.action} key={button.label}
                            onContextMenuCapture={(ev) => ev.preventDefault()}>
                            <p className={styles.context_menu_button_text}>{button.label}</p>
                        </button>
                    )
                })}
            </>
        )
    }, [currents.contextmenu.includes]);

    return (
        <>
            {showElement && (<>
                <div className={`${styles.context_menu} ${currents.contextmenu.shown ? styles.context_menu_shown : ''}`}
                    style={{ left: currents.contextmenu.x, top: currents.contextmenu.y }} ref={ContextMenuRef}>
                    <>
                        {currents.contextmenumode === 'User' && (
                            <div className={styles.context_menu_div}>
                                {includes}
                                {UserContextMenuButtons.map(button => {
                                    return (
                                        <button className={styles.context_menu_button} onClick={button.action}
                                            key={button.label} onContextMenuCapture={(ev) => ev.preventDefault()}>
                                            <p className={styles.context_menu_button_text}>{button.label}</p>
                                        </button>
                                    )
                                })}
                                {currents.user?.id === currents.server?.ownerId && UserModerationContextMenuButtons.map(button => {
                                    return (
                                        <button className={styles.context_menu_button} onClick={button.action}
                                            key={button.label} onContextMenuCapture={(ev) => ev.preventDefault()}>
                                            <p className={styles.context_menu_button_text}>{button.label}</p>
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                        {currents.contextmenumode === 'Server' && (
                            <div className={styles.context_menu_div}>
                                {includes}
                                {ServerContextMenuButtons.map(button => {
                                    return (
                                        <button className={styles.context_menu_button} onClick={button.action}
                                            key={button.label} onContextMenuCapture={(ev) => ev.preventDefault()}>
                                            <p className={styles.context_menu_button_text}>{button.label}</p>
                                        </button>
                                    )
                                })}
                                {currents.user?.id === (currents.contextmenu.currentObject as Server).ownerId && ServerModerationContextMenuButtons.map(button => {
                                    return (
                                        <button className={styles.context_menu_button} onClick={button.action}
                                            key={button.label} onContextMenuCapture={(ev) => ev.preventDefault()}>
                                            <p className={styles.context_menu_button_text}>{button.label}</p>
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                        {currents.contextmenumode === 'Channel' && (
                            <div className={styles.context_menu_div}>
                                {includes}
                                {ChannelContextMenuButtons.map(button => {
                                    return (
                                        <button className={styles.context_menu_button} onClick={button.action} key={button.label} onContextMenuCapture={(ev) => ev.preventDefault()}>
                                            <p className={styles.context_menu_button_text}>{button.label}</p>
                                        </button>
                                    )
                                })}
                                {currents.user?.id === currents.server?.ownerId && ChannelModerationContextMenuButtons.map(button => {
                                    return (
                                        <button className={styles.context_menu_button} onClick={button.action}
                                            key={button.label} onContextMenuCapture={(ev) => ev.preventDefault()}>
                                            <p className={styles.context_menu_button_text}>{button.label}</p>
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                        {currents.contextmenumode === 'Message' && (
                            <div className={styles.context_menu_div}>
                                {includes}
                                {MessageContextMenuButtons.map(button => {
                                    return (
                                        <button className={styles.context_menu_button} onClick={button.action}
                                            key={button.label} onContextMenuCapture={(ev) => ev.preventDefault()}>
                                            <p className={styles.context_menu_button_text}>{button.label}</p>
                                        </button>
                                    )
                                })}
                                {currents.user?.id === (currents.contextmenu.currentObject as Message).authorId && MessageOwnerOrModerationContextMenuButtons.map(button => {
                                    return (
                                        <button className={styles.context_menu_button} onClick={button.action}
                                            key={button.label} onContextMenuCapture={(ev) => ev.preventDefault()}>
                                            <p className={styles.context_menu_button_text}>{button.label}</p>
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                    </>
                </div>
            </>)}
        </>
    );
}

export default ContextMenu;