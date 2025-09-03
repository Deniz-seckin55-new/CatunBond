import { useCurrents } from "@/store/currents";
import { useSettings } from "@/store/settings";
import { DefaultUserVariables, UserVariables, useVariables, useVariablesStore } from "@/store/variablesStore";
import equal from "fast-deep-equal";
import React, { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import styles from "../../page.module.css";
import { SettingsProps } from "../../utils/utils";
import ReactSwitch from "react-switch";

const currentSetting = "Appearance";
const AppLayout: React.FC<SettingsProps> = ({ updateSettings }) => {
    const currents = useCurrents();
    const settings = useSettings();
    const variablesStore = useVariablesStore();

    const [unsavedChanges, setunsavedChanges] = useState<boolean>(false);
    const [localUserVariables, setlocalUserVariables] = useState<UserVariables>(DefaultUserVariables);

    const [hexpickerV, sethexpickerV] = useState<boolean>(false);
    const [oldUserVariables, setoldUserVariables] = useState<UserVariables | null>(null);

    const onClickColorButton = () => {
        sethexpickerV(!hexpickerV);
    }

    const handleInputChange = (field: keyof UserVariables, value: string | number | boolean | string[] | null) => {
        setlocalUserVariables((prev) => ({ ...prev, [field]: value }));
    };

    const onClickSaveButton = () => {
        if (!oldUserVariables) return;

        const newUserVariables: UserVariables = localUserVariables;

        updateSettings(currentSetting, newUserVariables, "UserVariables", () => {
            console.log("Got call back.");

            setoldUserVariables(newUserVariables);
            variablesStore.setVariables(newUserVariables);
            currents.setUserVariables(newUserVariables);
            setunsavedChanges(false);
        });
    }

    useEffect(() => {
        if (!equal(localUserVariables, oldUserVariables)) {
            setunsavedChanges(true);
            console.log(localUserVariables, oldUserVariables);
        }
        else
            setunsavedChanges(false);
    }, [localUserVariables]);

    useEffect(() => {
        const fetchUserVariables = async () => {
            if (!currents.user) return;

            const info = await variablesStore.getVariables();

            setoldUserVariables(info);
            setlocalUserVariables(info);
        }

        fetchUserVariables();
    }, [currents.user]);

    if (!oldUserVariables) return (
        <>
            <p>Loading...</p>
        </>
    );

    return (
        <div className={styles.settings_page}>
            <p className={styles.setting_page_header}>{currents.setting}</p>
            <div className={styles.small_pad} />
            <p className={styles.appearance_etitle}>Channel Font Size</p>
            <input
                className={`${styles.setting_field_input_text} ${styles.settings_styles_text_input_one}`}
                value={localUserVariables.channelFontSize || DefaultUserVariables.channelFontSize}
                type="number"
                onChange={(e) => handleInputChange("channelFontSize", e.target.value !== "" ? parseInt(e.target.value) : "0")}
            />
            <p className={styles.appearance_etitle}>App Font Size</p>
            <input
                className={`${styles.setting_field_input_text} ${styles.settings_styles_text_input_one}`}
                value={localUserVariables.appFontSize || DefaultUserVariables.appFontSize}
                type="number"
                onChange={(e) => handleInputChange("appFontSize", e.target.value !== "" ? parseInt(e.target.value) : "0")}
            />
            <p className={styles.appearance_etitle}>Default Zoom Factor</p>
            <input
                className={`${styles.setting_field_input_text} ${styles.settings_styles_text_input_one}`}
                value={localUserVariables.defaultZoomFactor || DefaultUserVariables.defaultZoomFactor}
                type="number"
                onChange={(e) => handleInputChange("defaultZoomFactor", e.target.value !== "" ? parseInt(e.target.value) : "0")}
            />
            <p className={styles.appearance_etitle}>Magnifying Glass On Previews</p>
            <ReactSwitch onChange={(checked) => handleInputChange("magnifyingGlassOnPreviews", checked)} checked={localUserVariables.magnifyingGlassOnPreviews ?? DefaultUserVariables.magnifyingGlassOnPreviews} onColor="#17B890" offColor="#FF3A20" />
            <p className={styles.appearance_etitle}>Show Usernames Under Avatars In Voice Chats</p>
            <ReactSwitch onChange={(checked) => handleInputChange("showUsernamesUnderAvatarsInVoiceChats", checked)} checked={localUserVariables.showUsernamesUnderAvatarsInVoiceChats ?? DefaultUserVariables.showUsernamesUnderAvatarsInVoiceChats} onColor="#17B890" offColor="#FF3A20" />
            <p className={styles.appearance_etitle}>Mirror Camera When Shared</p>
            <ReactSwitch onChange={(checked) => handleInputChange("mirrorCameraWhenShared", checked)} checked={localUserVariables.mirrorCameraWhenShared ?? DefaultUserVariables.mirrorCameraWhenShared} onColor="#17B890" offColor="#FF3A20" />
            <div className={`${styles.setting_save_div} ${(unsavedChanges === true) ? (styles.setting_save_div_active) : ''}`}>
                <p className={styles.setting_save_text}>You have unsaved changes</p>
                <button className={`${settings.saveLoading && styles.setting_save_button_disabled} ${styles.setting_save_button} ${!settings.saveLoading && styles.on_hover}`} disabled={settings.saveLoading} onClick={onClickSaveButton}>Save</button>
            </div>
        </div>
    )
}

export default AppLayout;