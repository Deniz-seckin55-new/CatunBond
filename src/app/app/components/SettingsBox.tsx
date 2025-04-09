import { componentMap, Currents, SettingsProps, SettingUpdateType } from "../utils/utils";
import styles from "../page.module.css";
import React, { useEffect, useState } from "react";
import { ClerkProvider, useClerk } from "@clerk/nextjs"
import { useCurrents } from "@/store/currents";
import axios from "axios";
import { Channel, ChannelInfo, ServerInfo, UserInfo } from "../utils/socket_utils";
import { useUserInfoStore } from "@/store/userInfos";
import { useSettings } from "@/store/settings";
import { useLocalStore } from "@/store/locStore";
import { useServerInfoStore } from "@/store/serverInfos";
import { useChannelInfoStore } from "@/store/channelInfos";

interface Props {

}

const SettingsBox: React.FC<Props> = () => {
    const currents = useCurrents();
    const userInfoStore = useUserInfoStore();
    const serverInfoStore = useServerInfoStore();
    const channelInfoStore = useChannelInfoStore();
    const settings = useSettings();

    const [showElement, setshowElement] = useState<boolean>(false);
    const [searchInput, setsearchInput] = useState<string>("");
    const clerk = useClerk();

    const UserSettingOptions = [
        "Appearance",
    ];

    const AppSettingOptions = [
        "Voice & Video",
        "Text & Images",
        "App Appearance",
        "Notifications",
        "Keybinds",
        "Language",
        "Modes",
    ];

    const ServerSettingOptions = [
        "Server Information",
        "Channels",
        "Text & Audio",
        "Invites",
    ]

    const ChannelSettingOptions = [
        "Channel Information",
        "Channel Rules",
    ]

    const updateSettings = async (setting: string, data: any, dataType: SettingUpdateType, callbackFn: () => void) => {
        if (!currents.user) return;

        settings.setsaveLoading(true);

        switch (dataType) {
            case "UserInfo":
                const userres = await axios.put(`/api/v1/users/${currents.user.id}/info`, data);
                const newuserInfo: UserInfo = userres.data.data;
                userInfoStore.replaceUserInfo(currents.user.id, newuserInfo);

                break;
            case "ServerInfo":
                if(!currents.server) return;
                const serverres = await axios.patch(`/api/v1/servers/${currents.server.id}/info`, data);
                const newserverInfo: ServerInfo = serverres.data.data;
                serverInfoStore.replaceServerInfo(currents.server.id, newserverInfo);

                break;
            case "ChannelInfo":
                if(!currents.settingsObject) return;
                const channel: Channel = currents.settingsObject;
                const channelinfores = await axios.patch(`/api/v1/channels/${channel.id}/info`, data);
                const newchannelinfo: ChannelInfo = channelinfores.data.data;
                channelInfoStore.replaceInfo(channel.id, newchannelinfo);

            default:
                break;
        }

        settings.setsaveLoading(false);

        callbackFn();
    }

    const SettingsProps: SettingsProps = {
        Currents: currents,
        updateSettings: updateSettings,
    };

    useEffect(() => {
        if (currents.settingsDivV) {
            setshowElement(true);
        } else {
            setTimeout(() => {
                setshowElement(false);
            }, 200);
        }
    }, [currents.settingsDivV]);

    const onClickClose = () => {
        currents.setSettingsObject(null);
        currents.setSettingsDivV(false);
    }

    const Search = async (search: string) => {

    }

    const onSearchInput = (ev: React.KeyboardEvent) => {
        const textbox = ev.currentTarget as HTMLTextAreaElement;
        if (ev.key == "Enter") {
            ev.preventDefault();
            Search(searchInput);
        }
    }

    const SelectSetting = (setting: string) => {
        currents.setSetting(setting);
    }

    return (
        <>
            {(<div className={`${styles.settings_box} ${currents.settingsDivV ? styles.settings_box_active : ''}`} style={{ visibility: showElement ? 'visible' : 'hidden' }}>
                <div className={styles.settings_box_left}>
                    <textarea className={styles.settings_search} placeholder="Search" onInput={(ev) => setsearchInput(ev.currentTarget.value)} onKeyDown={(ev) => onSearchInput(ev)}></textarea>
                    <div className={styles.pad} />
                    {currents.settingsMode === 'UserApp' && (
                        <div className={styles.settings_options_container}>
                            <p className={styles.settings_nav_header}>User Settings</p>
                            <button className={styles.settings_user_button} onClick={() => clerk.openUserProfile()}>Profile Settings</button>
                            {UserSettingOptions.map((setting) =>
                                <p className={`${styles.settings_nav_element} ${currents.setting == setting ? (styles.settings_nav_element_active) : ''}`} onClick={() => SelectSetting(setting)} key={setting}>{setting}</p>
                            )}
                            <p className={styles.settings_nav_header}>App Settings</p>
                            {AppSettingOptions.map((setting) =>
                                <p className={`${styles.settings_nav_element} ${currents.setting == setting ? (styles.settings_nav_element_active) : ''}`} onClick={() => SelectSetting(setting)} key={setting}>{setting}</p>
                            )}
                        </div>
                    )}
                    {currents.settingsMode === 'Server' && (
                        <div className={styles.settings_options_container}>
                            <p className={styles.settings_nav_header}>Server Settings</p>
                            {ServerSettingOptions.map((setting) =>
                                <p className={`${styles.settings_nav_element} ${currents.setting == setting ? (styles.settings_nav_element_active) : ''}`} onClick={() => SelectSetting(setting)} key={setting}>{setting}</p>
                            )}
                        </div>
                    )}
                    {currents.settingsMode === 'Channel' && (
                        <div className={styles.settings_options_container}>
                            <p className={styles.settings_nav_header}>Channel Settings</p>
                            {ChannelSettingOptions.map((setting) =>
                                <p className={`${styles.settings_nav_element} ${currents.setting == setting ? (styles.settings_nav_element_active) : ''}`} onClick={() => SelectSetting(setting)} key={setting}>{setting}</p>
                            )}
                        </div>
                    )}
                </div>
                <div className={styles.settings_box_right}>
                    {currents.setting ? React.createElement(componentMap.get(currents.setting) || (() => null), { ...SettingsProps }) : ''}
                    <button className={styles.settings_box_close}>
                        <img src={'/clear.svg'} width={"50vh"} height={"50vh"} alt={'Close'} onClick={onClickClose} className={styles.settings_box_close_icon}></img>
                    </button>
                </div>
            </div>)}
        </>
    );
}

export default SettingsBox;