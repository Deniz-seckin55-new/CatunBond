import { useChannelInfoStore } from "@/store/channelInfos";
import { useCurrents } from "@/store/currents";
import { useSettings } from "@/store/settings";
import axios from "axios";
import equal from "fast-deep-equal";
import React, { useEffect, useState } from "react";
import Switch from "react-switch";
import styles from "../../page.module.css";
import { Channel, ChannelInfo } from "../../utils/socket_utils";
import { SettingsProps } from "../../utils/utils";

const currentSetting = "Channel Rules";

const ChannelRules: React.FC<SettingsProps> = ({ updateSettings }) => {
    const currents = useCurrents();
    const settings = useSettings();
    const channelInfoStore = useChannelInfoStore();

    const [loading, setLoading] = useState<boolean>(true);
    const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
    const [channelInfo, setChannelInfo] = useState<ChannelInfo>({
        channelId: "",
        name: "",
        description: "",
        nsfw: false,
        pinnedMessages: [],
        readOnly: false,
        slowMode: 0,
        type: "TEXT",
    });

    const [oldChannelInfo, setOldChannelInfo] = useState<ChannelInfo | null>(null);
    const [slowModeEnabled, setslowModeEnabled] = useState<boolean>(false);

    // Fetch channel information
    useEffect(() => {
        const fetchChannelInfo = async () => {
            try {
                if (!currents.settingsObject) return;

                const channel: Channel = currents.settingsObject as Channel;

                const channelInfoExists = channelInfoStore.getExistingInfo(channel.id);
                if (channelInfoExists) {
                    setOldChannelInfo(channelInfoExists);
                    setChannelInfo(channelInfoExists);
                    setslowModeEnabled(channelInfoExists.slowMode !== 0);
                } else {
                    const response = await axios.get(`/api/v1/channels/${channel.id}/info`); // Adjust API endpoint
                    setOldChannelInfo(response.data.data);
                    setChannelInfo(response.data.data);
                    setslowModeEnabled(response.data.data.slowMode !== 0);

                    channelInfoStore.addInfo(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching server info:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchChannelInfo();
    }, []);

    // Detect unsaved changes
    useEffect(() => {
        setUnsavedChanges(!equal(channelInfo, oldChannelInfo));
    }, [channelInfo]);

    const handleInputChange = (field: keyof ChannelInfo, value: string | number | boolean | string[] | null) => {
        setChannelInfo((prev) => ({ ...prev, [field]: value }));
    };

    const onClickSaveButton = async () => {
        updateSettings(currentSetting, channelInfo, "ChannelInfo", () => {
            setOldChannelInfo(channelInfo);
            setUnsavedChanges(false);
        })
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className={styles.settings_page}>
            <p className={styles.setting_page_header}>{currents.setting}</p>
            <div className={styles.small_pad} />

            {/* Read Only */}
            <div className={styles.flex_rowa}>
                <p className={styles.appearance_etitle}>Channel Read Only</p>
                <div className={styles.pad_s1} />
                <Switch onChange={(checked) => handleInputChange("readOnly", checked)} checked={channelInfo.readOnly} onColor="#17B890" offColor="#FF3A20" />
            </div>

            <div className={styles.small_pad} />

            {/* Channel slow mode */}
            <div>
                <div className={styles.flex_rowa}>
                    <p className={styles.appearance_etitle}>Channel Slow Mode</p>
                    <div className={styles.pad_s1} />
                    <Switch onChange={(checked) => {setslowModeEnabled(checked); handleInputChange("slowMode", 5); (!checked) ? handleInputChange("slowMode", 0) : () => {}}} checked={slowModeEnabled} onColor="#17B890" offColor="#FF3A20" />
                </div>
                <div className={styles.channel_settings_slow_mode_div} style={{ maxHeight: slowModeEnabled ? "2em" : "0em" }}>
                    <input
                        className={`${styles.setting_field_input_text} ${styles.settings_styles_text_input_one}`}
                        value={channelInfo.slowMode}
                        type="number"
                        onChange={(e) => handleInputChange("slowMode", e.target.value !== "" ? parseInt(e.target.value) : "0")}
                    />
                    <div className={styles.lpad5} />
                    <p style={{fontSize: "0.6em", color: "var(--cb-color-black-transparent)"}}>seconds</p>
                </div>
            </div>

            <div className={styles.pad} />

            {/* Save Button */}
            <div className={`${styles.setting_save_div} ${(unsavedChanges === true) ? (styles.setting_save_div_active) : ''}`}>
                <p className={styles.setting_save_text}>You have unsaved changes</p>
                <button className={`${settings.saveLoading && styles.setting_save_button_disabled} ${styles.setting_save_button} ${!settings.saveLoading && styles.on_hover}`} disabled={settings.saveLoading} onClick={onClickSaveButton}>Save</button>
            </div>
        </div>
    );
};

export default ChannelRules;