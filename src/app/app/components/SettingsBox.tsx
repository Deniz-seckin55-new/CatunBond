import { useChannelInfoStore } from "@/store/channelInfos";
import { useCurrents } from "@/store/currents";
import { useServerInfoStore } from "@/store/serverInfos";
import { useSettings } from "@/store/settings";
import { useSocketStore } from "@/store/socket";
import { useUserInfoStore } from "@/store/userInfos";
import { useClerk } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../page.module.css";
import { Channel, ChannelInfo, ServerInfo, ServerInvites, UserInfo } from "../utils/socket_utils";
import { componentMap, SettingsProps, SettingUpdateType } from "../utils/utils";
import { ChannelSchema } from "../utils/schemas";
import { DefaultUserVariables, UserVariables, useVariablesStore } from "@/store/variablesStore";

const SettingsBox: React.FC = () => {
    const currents = useCurrents();
    const { socket } = useSocketStore();
    const userInfoStore = useUserInfoStore();
    const serverInfoStore = useServerInfoStore();
    const channelInfoStore = useChannelInfoStore();
    const variablesStore = useVariablesStore();
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

    const updateSettings = async (setting: string, data: UserInfo | ServerInfo | ChannelInfo | UserVariables | ServerInvites, dataType: SettingUpdateType, callbackFn: () => void) => {
        if (!currents.user) return;

        settings.setsaveLoading(true);

        switch (dataType) {
            case "UserInfo":
                const userres = await axios.put(`/api/v1/users/${currents.user.id}/info`, data);
                const newuserInfo: UserInfo = userres.data.data;
                userInfoStore.replaceUserInfo(currents.user.id, newuserInfo);

                break;
            case "ServerInfo":
                if (!currents.server) return;
                const serverres = await axios.patch(`/api/v1/servers/${currents.server.id}/info`, data);
                const newserverInfo: ServerInfo = serverres.data.data;
                serverInfoStore.replaceServerInfo(currents.server.id, newserverInfo);

                break;
            case "ChannelInfo":
                if (!currents.settingsObject) return;

                const channel: Channel = currents.settingsObject as Channel;
                const channelinfores = await axios.patch(`/api/v1/channels/${channel.id}/info`, data);
                const newchannelinfo: ChannelInfo = channelinfores.data.data;
                channelInfoStore.replaceInfo(channel.id, newchannelinfo);
                socket?.emit("channel_info_update", newchannelinfo);

                break;
            case "UserVariables":
                console.log("Sending ", data);

                const uservariablesres = await axios.put(`/api/v1/user/variables`, data);
                const newuservariables: UserVariables = uservariablesres.data.data;

                console.log("Got response ", newuservariables);

                variablesStore.setVariables(newuservariables);

                break;
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
        const _searchRegex = new RegExp(search, 'gmi');
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
            {(<div className={`${styles.settings_box} ${currents.settingsDivV ? styles.settings_box_active : ''}`} style={{ fontSize: currents.userVariables?.appFontSize ?? DefaultUserVariables.appFontSize, visibility: showElement ? 'visible' : 'hidden' }}>
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
                        <img src={'/clear.svg'} alt={'Close'} width={currents.userVariables?.appFontSize ?? DefaultUserVariables.appFontSize} onClick={onClickClose} className={styles.settings_box_close_icon}></img>
                    </button>
                </div>
            </div>)}
        </>
    );
}

export default SettingsBox;