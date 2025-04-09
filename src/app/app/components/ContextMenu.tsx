import { useContext, useEffect, useState } from 'react';
import styles from '../page.module.css';
import { Currents, ExploreBoxMode, SettingsMode } from '../utils/utils';
import { useCurrents } from '@/store/currents';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Server } from '../utils/socket_utils';
import useUserProfileStore from '@/store/userProfile';

interface Props {
    openExploreBox: (mode: ExploreBoxMode) => void;
    openSettings: (mode: SettingsMode) => void;
}

const ContextMenu: React.FC<Props> = (props) => {
    const [showElement, setshowElement] = useState<boolean>(false);

    const currents = useCurrents();
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

    const UserViewProfile = () => {
        currents.setBgBlurV(true);
        console.log("openning with ",currents.contextmenu.currentID);
        pp.setUserProfile(currents.contextmenu.currentID);
        pp.setisFull(true);
        pp.setisShown(true);
        currents.setContextMenuShown(false);
    }
    const UserCall = () => { }
    const UserBlock = () => { }
    const UserSendFriendRequest = () => { }

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

    const ServerSettings = () => { props.openSettings('Server'); }
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

            var userBefore = useCurrents.getState().user;

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

    const ChannelSettings = () => { props.openSettings('Channel'); };
    const ChannelDelete = () => { };

    const ChannelModerationContextMenuButtons = [
        { label: "Channel Settings", action: ChannelSettings },
        { label: "Delete Channel", action: ChannelDelete },
    ]

    const ChannelMute = () => { };

    const ChannelContextMenuButtons = [
        { label: "Mute Channel", action: ChannelMute }
    ]

    return (
        <>
            {showElement && (<>
                <div className={`${styles.context_menu} ${currents.contextmenu.shown ? styles.context_menu_shown : ''}`} style={{ left: currents.contextmenu.x, top: currents.contextmenu.y }}>
                    <>
                        {currents.contextmenumode === 'User' && (
                            <div className={styles.context_menu_div}>
                                {currents.user?.id === currents.server?.id && UserModerationContextMenuButtons.map(button => {
                                    return (
                                        <button className={styles.context_menu_button} onClick={button.action} key={button.label} onContextMenuCapture={(ev) => ev.preventDefault()}>
                                            <p className={styles.context_menu_button_text}>{button.label}</p>
                                        </button>
                                    )
                                })}
                                {UserContextMenuButtons.map(button => {
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
                                {currents.user?.id === currents.contextmenu.currentID && ServerModerationContextMenuButtons.map(button => {
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
                                {currents.user?.id === currents.contextmenu.currentID && ChannelModerationContextMenuButtons.map(button => {
                                    return (
                                        <button className={styles.context_menu_button} onClick={button.action} key={button.label} onContextMenuCapture={(ev) => ev.preventDefault()}>
                                            <p className={styles.context_menu_button_text}>{button.label}</p>
                                        </button>
                                    )
                                })}
                                {ChannelContextMenuButtons.map(button => {
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