import React, { useEffect, useRef, useState } from "react";
import styles from "../../page.module.css";
import { Currents, SettingsProps } from "../../utils/utils";
import { HexColorPicker } from "react-colorful";
import { useCurrents } from "@/store/currents";
import { useGetUserInfo } from "../common/GetUser";
import { UserInfo } from "../../utils/socket_utils";
import { useSettings } from "@/store/settings";
import equal from "fast-deep-equal";

const currentSetting = "Appearance";
const Appearance: React.FC<SettingsProps> = ({ updateSettings }) => {
    const currents = useCurrents();
    const settings = useSettings();

    const [unsavedChanges, setunsavedChanges] = useState<boolean>(false);
    const [localUserInfo, setlocalUserInfo] = useState<UserInfo>({
        biography: "",
        mainLink: "",
        shortDescription: "",
        userId: "",
        usernameColor: ""
    })

    const [hexpickerV, sethexpickerV] = useState<boolean>(false);
    const [oldUserInfo, setolduserInfo] = useState<UserInfo | null>(null);
    const [updater, setUpdater] = useState<boolean>(true);
    const hexpickerRef = useRef<any | null>(null);

    const getUserInfo = useGetUserInfo();
    const onClickColorButton = (ev: React.MouseEvent) => {
        sethexpickerV(!hexpickerV);
    }

    const onClickResetColorButton = () => {
        if (!oldUserInfo) return;

        setlocalUserInfo((state) => ({ ...state, usernameColor: oldUserInfo.usernameColor }));
    }

    const onClickSaveButton = () => {
        if (!oldUserInfo) return;

        const newUserInfo: UserInfo = localUserInfo;

        updateSettings(currentSetting, newUserInfo, "UserInfo", () => {
            console.log("Got call back.");

            setolduserInfo(newUserInfo);
            setunsavedChanges(false);
        });
    }

    const onInputShortDesc = (text: string) => {
        setlocalUserInfo((state) => ({ ...state, shortDescription: text }));
    }

    const onInputBio = (text: string) => {
        setlocalUserInfo((state) => ({ ...state, biography: text }));
    }

    const onInputMainLink = (text: string) => {
        setlocalUserInfo((state) => ({ ...state, mainLink: text }))
    }

    const onChangeColor = (color: string) => {
        setlocalUserInfo((state) => ({...state, usernameColor: color}));
    }

    useEffect(() => {
        if (!equal(localUserInfo, oldUserInfo)) {
            setunsavedChanges(true);
            console.log(localUserInfo, oldUserInfo);
        }
        else
            setunsavedChanges(false);
    }, [localUserInfo]);

    useEffect(() => {
        if (!currents.user) return;

        getUserInfo(currents.user.id).then(info => {
            if (info) {
                setolduserInfo(info);
                setlocalUserInfo(info);
                console.log("Ee, ", info);
            }
        });
    }, [currents.user]);

    if (!oldUserInfo) return (
        <>
            <p>Loading...</p>
        </>
    );

    return (
        <div className={styles.settings_page}>
            <p className={styles.setting_page_header}>{currents.setting}</p>
            <div className={styles.small_pad} />
            <div className={styles.flex_rowa}>
                <img src={currents.user?.avatarUrl || ''} className={styles.appearance_userimage} />
                <p className={styles.appearance_username} style={{ color: localUserInfo.usernameColor }}>{currents.user?.username}</p>
                <button className={styles.setting_field_input_color_button} onClick={(ev) => onClickColorButton(ev)}>
                    <svg className={styles.setting_field_input_color_button_image} xmlns="http://www.w3.org/2000/svg" width="10vh" height="10vh" viewBox="0 0 24 24" id="palette">
                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                        <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill={`${localUserInfo.usernameColor}`}></path>
                    </svg>
                </button>
                <button className={styles.appearance_reset} onClick={onClickResetColorButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="refresh">
                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                        <path d="M17.65 6.35c-1.63-1.63-3.94-2.57-6.48-2.31-3.67.37-6.69 3.35-7.1 7.02C3.52 15.91 7.27 20 12 20c3.19 0 5.93-1.87 7.21-4.56.32-.67-.16-1.44-.9-1.44-.37 0-.72.2-.88.53-1.13 2.43-3.84 3.97-6.8 3.31-2.22-.49-4.01-2.3-4.48-4.52C5.31 9.44 8.26 6 12 6c1.66 0 3.14.69 4.22 1.78l-1.51 1.51c-.63.63-.19 1.71.7 1.71H19c.55 0 1-.45 1-1V6.41c0-.89-1.08-1.34-1.71-.71l-.64.65z"></path>
                    </svg>
                </button>
            </div>
            <HexColorPicker className={`${styles.setting_field_input_color} ${hexpickerV == true ? styles.setting_field_input_color_active : ''}`} color={localUserInfo.usernameColor} onChange={onChangeColor} />
            <div className={styles.small_pad} />
            <p className={styles.appearance_etitle}>Short Description</p>
            <textarea className={`${styles.appearance_main_link} ${styles.setting_field_input_text}`} defaultValue={localUserInfo?.shortDescription} onInput={(ev) => onInputShortDesc(ev.currentTarget.value)}></textarea>
            <p className={styles.appearance_etitle}>Main Link</p>
            <div className={styles.flex_rowa}>
                <textarea className={`${styles.appearance_main_link} ${styles.setting_field_input_text}`} placeholder="https://..." defaultValue={oldUserInfo?.mainLink} onInput={(ev) => onInputMainLink(ev.currentTarget.value)}></textarea>
                { /* Mutual servers & friends */}
            </div>
            <p className={styles.appearance_title}>Biography</p>
            <textarea className={`${styles.appearance_biography} ${styles.setting_field_input_text}`} defaultValue={localUserInfo?.biography} onInput={(ev) => onInputBio(ev.currentTarget.value)}></textarea>
            <div className={`${styles.setting_save_div} ${(unsavedChanges === true) ? (styles.setting_save_div_active) : ''}`}>
                <p className={styles.setting_save_text}>You have unsaved changes</p>
                <button className={`${settings.saveLoading && styles.setting_save_button_disabled} ${styles.setting_save_button} ${!settings.saveLoading && styles.on_hover}`} disabled={settings.saveLoading} onClick={onClickSaveButton}>Save</button>
            </div>
        </div>
    )
}

export default Appearance;