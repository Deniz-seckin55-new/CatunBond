import { useEffect, useMemo, useRef, useState } from 'react';
import styles from '../page.module.css';
import { copyToClipboard, ExploreBoxMode, OpenConfirmationMenu, SettingsMode, UpdateMessageInfo, isObjectNotNull } from '../utils/utils';
import { useCurrents } from '@/store/currents';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AllowedTypes, Channel, DetailedDBUser, Message, Server, SocketData, SocketInformationType, User } from '../utils/socket_utils';
import useUserProfileStore from '@/store/userProfile';
import { useMessagesStore } from '@/store/messages';
import { useSocketStore } from '@/store/socket';
import { useMessageInfoStore } from '@/store/messageInfos';
import { useUserInfoStore } from '@/store/userInfos';
import { useSettings } from '@/store/settings';
import { useChannelInfoStore } from '@/store/channelInfos';

interface Props {
    onClickDirectMessageWithCallback: (user: User, fn: () => void) => void;
    sendFriendRequestWithId: (id: string) => void;
    onClickCall: () => void;
    openExploreBox: (mode: ExploreBoxMode) => void;
    openSettings: (mode: SettingsMode, object: unknown) => void;
}

const ContextMenu: React.FC<Props> = (props) => {
    const [showElement, setshowElement] = useState<boolean>(false);
    const ContextMenuRef = useRef<HTMLDivElement | null>(null);
    const settingsStore = useSettings();

    const { socket } = useSocketStore();

    const messageInfoStore = useMessageInfoStore();
    const userInfoStore = useUserInfoStore();
    const channelInfoStore = useChannelInfoStore();

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
            setTimeout(() => { CheckRectWait(); }, 25);
        }
    }

    useEffect(() => {
        if (!currents.contextmenu.shown) return;

        if (ContextMenuRef.current) {
            CheckRect();
        } else {
            CheckRectWait();
        }
    }, [ContextMenuRef.current, currents.contextmenu.shown, currents.contextmenu.x, currents.contextmenu.y]);

    const UserViewProfile = () => {
        currents.setBgBlurV(true);
        console.log("openning with ", currents.contextmenu.currentID);
        pp.setUserProfile(currents.contextmenu.currentID);
        pp.setisFull(true);
        pp.setisShown(true);
        currents.setContextMenuShown(false);
    }
    const UserCall = () => {
        const currentUser: User | null = isObjectNotNull(currents.contextmenu.currentObject) ? currents.contextmenu.currentObject as User : null;

        if (!currentUser) return;

        props.onClickDirectMessageWithCallback(currentUser, () => {
            currents.setServer(null);
            currents.setCategories([]);
            props.onClickCall();
        });
    }
    const UserBlock = () => {
        const blockUser = async (userId: string) => {
            const resp = await axios.post(`/api/v1/user/blocked`, userId);
            if (resp.status !== 200) {
                toast("Couldn't block user.");
            } else {
                toast(`Blocked ${userInfoStore.getExistingUserInfo(userId) ?? (currents.contextmenu.currentObject as User).username}`);
            }
        }

        blockUser(currents.contextmenu.currentID);
    }
    const UserSendFriendRequest = () => {
        props.sendFriendRequestWithId(currents.contextmenu.currentID);
    }

    const UserContextMenuButtons = [
        { label: "View User Profile", action: UserViewProfile },
        { label: "Send Friend Request", action: UserSendFriendRequest },
        { label: "Call User", action: UserCall },
        { label: "Block User", action: UserBlock },
    ]

    const UserMute = async () => {
        props.openExploreBox(ExploreBoxMode.UserMute);
    }
    const UserKick = async () => {
        props.openExploreBox(ExploreBoxMode.UserKick);
    }
    const UserBan = async () => {
        props.openExploreBox(ExploreBoxMode.UserBan);
    }

    const UserModerationContextMenuButtons = [
        { label: "Mute User", action: UserMute },
        { label: "Kick User", action: UserKick },
        { label: "Ban User", action: UserBan },
    ]

    const ServerSettings = () => { props.openSettings('Server', currents.server); }
    const ServerDelete = () => { }
    const ServerInviteFriends = () => { }

    const ServerModerationContextMenuButtons = [
        { label: "View Server Settings", action: ServerSettings },
        { label: "Delete Server", action: ServerDelete },
        { label: "Invite Friends", action: ServerInviteFriends },
    ]

    const ServerLeave = async () => {
        const serverId = currents.contextmenu.currentID;
        const response = await axios.delete("/api/v1/user/servers", {
            data: JSON.stringify({
                serverId: serverId,
            }),
        });

        if (response.status === 200) {

            const userBefore = useCurrents.getState().user;

            if (!userBefore) return;

            userBefore.servers = userBefore?.servers.filter(x => x.id !== serverId);

            currents.setUser(userBefore);

            toast("Left server.");
        } else {
            toast("An error accured while leaving the server.");
        }
    }

    const ServerContextMenuButtons = [
        { label: "Leave Server", action: ServerLeave },
    ]

    const ChannelSettings = () => { props.openSettings('Channel', currents.contextmenu.currentObject); };
    const ChannelDelete = () => {
        if (!currents.user) return;

        const channel = currents.contextmenu.currentObject as Channel;

        OpenConfirmationMenu(currents, "Are you sure you want to delete this channel?", async (answer: boolean) => {
            console.log("C.M. Answer: ", answer);
            if (!currents.server) return;
            if (!answer) return;

            const channelId = channel.id;

            await axios.delete(`/api/v1/channels/${channelId}`);
            channelInfoStore.removeInfo(channelId);

            const current_user = currents.user!;
            const new_current_user: DetailedDBUser = {
                ...current_user, servers: current_user.servers.map(server => {
                    if (server.categories.some(x => x.channels.some(c => c.id === channelId))) {
                        return {
                            ...server,
                            categories: server.categories.map(category => ({
                                ...category,
                                channels: category.channels.filter(c => c.id !== channelId),
                            })),
                        };
                    } else {
                        return server;
                    }
                })
            }
            currents.setUser(new_current_user);

            const current_server = currents.server!;
            currents.setServer({
                ...current_server, categories: current_server.categories.map(category => ({
                    ...category,
                    channels: category.channels.filter(c => c.id !== channelId),
                })),
            });

            const current_categories = currents.Categories;
            currents.setCategories(current_categories.map(category => {
                if (category.channels.some(c => c.id === channelId)) {
                    return {
                        ...category,
                        channels: category.channels.filter(c => c.id !== channelId),
                    };
                }
                else {
                    return category;
                }
            }));
        });
    };

    const ChannelModerationContextMenuButtons = [
        { label: "Channel Settings", action: ChannelSettings },
        { label: "Delete Channel", action: ChannelDelete },
    ]

    const ChannelMute = () => { };

    const ChannelContextMenuButtons = [
        { label: "Mute Channel", action: ChannelMute }
    ]

    const CopyMessageId = async () => { await copyToClipboard(currents.contextmenu.currentID); }
    const CopyMessageContent = () => {
        const messageInfo = messageInfoStore.MessageInfos.find(x => x.Message.id === currents.contextmenu.currentID);
        if (messageInfo) {
            copyToClipboard(messageInfo.Message.content);
        }
    }
    const MessageReply = async () => {
        setreplyingTo(messages.find(msg => msg.id === currents.contextmenu.currentID) ?? null);
    }

    const MessageDelete = () => {
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
    };

    const MessageEdit = () => {
        const message = messages.find(msg => msg.id === currents.contextmenu.currentID);
        if (message) {
            const messageInfo = messageInfoStore.MessageInfos.find(info => info.Message.id);
            if (!messageInfo) { console.warn("No message info, returning", { message }); return; }
            UpdateMessageInfo(message, "editMode", true, messageInfoStore.setMessageInfos);
        } else {
            console.log("No message found, returning", { message });
        }
    }

    const MessageOwnerOrModerationContextMenuButtons = [
        { label: "Edit", action: MessageEdit },
        { label: "Delete", action: MessageDelete },
    ]

    const MessageContextMenuButtons = [
        { label: "Copy Message Content", action: CopyMessageContent },
        { label: "Copy Message Id", action: CopyMessageId },
        { label: "Reply", action: MessageReply }
    ]

    const includes = useMemo(() => {
        return (
            <>
                {currents.contextmenu.includes.map(button => {
                    return (
                        <button className={styles.context_menu_button} onClick={button.action} key={button.label} onContextMenuCapture={(ev) => ev.preventDefault()}>
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
                <div className={`${styles.context_menu} ${currents.contextmenu.shown ? styles.context_menu_shown : ''}`} style={{ left: currents.contextmenu.x, top: currents.contextmenu.y }} ref={ContextMenuRef}>
                    <>
                        {currents.contextmenumode === 'User' && (
                            <div className={styles.context_menu_div}>
                                {includes}
                                {UserContextMenuButtons.map(button => {
                                    return (
                                        <button className={styles.context_menu_button} onClick={button.action} key={button.label} onContextMenuCapture={(ev) => ev.preventDefault()}>
                                            <p className={styles.context_menu_button_text}>{button.label}</p>
                                        </button>
                                    )
                                })}
                                {currents.user?.id === currents.server?.ownerId && UserModerationContextMenuButtons.map(button => {
                                    return (
                                        <button className={styles.context_menu_button} onClick={button.action} key={button.label} onContextMenuCapture={(ev) => ev.preventDefault()}>
                                            <p className={styles.context_menu_button_text}>{button.label}</p>
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                        {currents.contextmenumode === 'Server' && (
                            <div className={styles.context_menu_div}>
                                {includes}
                                {currents.user?.id === (currents.contextmenu.currentObject as Server).ownerId && ServerModerationContextMenuButtons.map(button => {
                                    return (
                                        <button className={styles.context_menu_button} onClick={button.action} key={button.label} onContextMenuCapture={(ev) => ev.preventDefault()}>
                                            <p className={styles.context_menu_button_text}>{button.label}</p>
                                        </button>
                                    )
                                })}
                                {ServerContextMenuButtons.map(button => {
                                    return (
                                        <button className={styles.context_menu_button} onClick={button.action} key={button.label} onContextMenuCapture={(ev) => ev.preventDefault()}>
                                            <p className={styles.context_menu_button_text}>{button.label}</p>
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                        {currents.contextmenumode === 'Channel' && (
                            <div className={styles.context_menu_div}>
                                {includes}
                                {currents.user?.id === currents.server?.ownerId && ChannelModerationContextMenuButtons.map(button => {
                                    return (
                                        <button className={styles.context_menu_button} onClick={button.action} key={button.label} onContextMenuCapture={(ev) => ev.preventDefault()}>
                                            <p className={styles.context_menu_button_text}>{button.label}</p>
                                        </button>
                                    )
                                })}
                                {/* {ChannelContextMenuButtons.map(button => {
                                    return (
                                        <button className={styles.context_menu_button} onClick={button.action} key={button.label} onContextMenuCapture={(ev) => ev.preventDefault()}>
                                            <p className={styles.context_menu_button_text}>{button.label}</p>
                                        </button>
                                    )
                                })} */}
                            </div>
                        )}
                        {currents.contextmenumode === 'Message' && (
                            <div className={styles.context_menu_div}>
                                {includes}
                                {MessageContextMenuButtons.map(button => {
                                    return (
                                        <button className={styles.context_menu_button} onClick={button.action} key={button.label} onContextMenuCapture={(ev) => ev.preventDefault()}>
                                            <p className={styles.context_menu_button_text}>{button.label}</p>
                                        </button>
                                    )
                                })}
                                {currents.user?.id === (currents.contextmenu.currentObject as Message).authorId && MessageOwnerOrModerationContextMenuButtons.map(button => {
                                    return (
                                        <button className={styles.context_menu_button} onClick={button.action} key={button.label} onContextMenuCapture={(ev) => ev.preventDefault()}>
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