import { componentMap, Currents } from "../utils/utils";
import styles from "../page.module.css";
import React, { useEffect, useState } from "react";
import { ClerkProvider, useClerk } from "@clerk/nextjs"
import { useCurrents } from "@/store/currents";

interface Props {
    setsettingsDivV: React.Dispatch<React.SetStateAction<boolean>>;
    settingsDivV: boolean,
}

const SettingsBox: React.FC<Props> = ({ setsettingsDivV, settingsDivV }) => {
    const currents = useCurrents();

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
    ]

    const updateSettings = (setting: string, data: any) => {

    }

    const SettingsProps = {
        Currents: currents,
        updateSettings: updateSettings,
    };

    useEffect(() => {
        if (settingsDivV) {
            setshowElement(true);
        } else {
            setTimeout(() => {
                setshowElement(false);
            }, 200);
        }
    }, [settingsDivV]);

    const onClickClose = () => {
        setsettingsDivV(false);
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
            {(<div className={`${styles.settings_box} ${settingsDivV ? styles.settings_box_active : ''}`} style={{ visibility: showElement ? 'visible' : 'hidden' }}>
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