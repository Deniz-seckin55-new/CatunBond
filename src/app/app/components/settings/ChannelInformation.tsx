import { useChannelInfoStore } from "@/store/channelInfos";
import { useCurrents } from "@/store/currents";
import { useSettings } from "@/store/settings";
import axios from "axios";
import equal from "fast-deep-equal";
import React, { useEffect, useState } from "react";
import Switch from "react-switch";
import styles from "../../page.module.css";
import { channelParse } from "../../utils/schemas";
import { Channel, ChannelInfo, DetailedDBUser } from "../../utils/socket_utils";
import { OpenConfirmationMenu, SettingsProps } from "../../utils/utils";

const currentSetting = "Channel Information";

const ChannelInformation: React.FC<SettingsProps> = ({ updateSettings }) => {
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

    // Fetch channel information
    useEffect(() => {
        const fetchChannelInfo = async () => {
            try {
                if (!currents.settingsObject) return;

                const parse = channelParse(currents.settingsObject);

                if(!parse.success) return;

                const channel: Channel = parse.data;

                const channelInfoExists = channelInfoStore.getExistingInfo(channel.id);
                if (channelInfoExists) {
                    setOldChannelInfo(channelInfoExists);
                    setChannelInfo(channelInfoExists);
                } else {
                    if(channelInfoStore.fetching.includes(channel.id)) return;

                    channelInfoStore.addfetchingInfo(channel.id);
                    const response = await axios.get(`/api/v1/channels/${channel.id}/info`); // Adjust API endpoint
                    setOldChannelInfo(response.data.data);
                    setChannelInfo(response.data.data);

                    channelInfoStore.addInfo(response.data.data);
                    channelInfoStore.removefetchingInfo(channel.id);
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

    const handleInputChange = (field: keyof ChannelInfo, value: string | boolean) => {
        setChannelInfo((prev) => ({ ...prev, [field]: value }));
    };

    const onClickSaveButton = async () => {
        updateSettings(currentSetting, channelInfo, "ChannelInfo", () => {
            setOldChannelInfo(channelInfo);
            setUnsavedChanges(false);
        })
    };

    const onClickDeleteChannel = () => {
        if (!currents.settingsObject) return;
        if (!currents.user) return;

        OpenConfirmationMenu(currents, "Are you sure you want to delete this channel?", async (answer: boolean) => {
            console.log("C.M. Answer: ", answer);
            if (!currents.server) return;
            if (!answer) return;

            const channelId = (currents.settingsObject as Channel).id;

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

            currents.setSettingsObject(null);
            currents.setSettingsDivV(false);
        });
    }

    if (loading) return <p>Loading...</p>;

    return (
        <div className={styles.settings_page}>
            <p className={styles.setting_page_header}>{currents.setting}</p>
            <div className={styles.small_pad} />

            {/* Channel Name */}
            <p className={styles.appearance_etitle}>Channel Name</p>
            <input
                className={`${styles.setting_field_input_text} ${styles.settings_styles_text_input_one}`}
                value={channelInfo.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
            />

            {/* Channel Description */}
            <p className={styles.appearance_etitle}>Channel Description</p>
            <textarea
                className={`${styles.setting_field_input_text} ${styles.settings_styles_text_input_two}`}
                value={channelInfo.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
            ></textarea>

            <div className={styles.small_pad} />

            {/* Channel Nsfw */}
            <div className={styles.flex_rowa}>
                <p className={styles.appearance_etitle}>Channel NSFW</p>
                <div className={styles.pad_s1} />
                <Switch onChange={(checked) => handleInputChange("nsfw", checked)} checked={channelInfo.nsfw} onColor="#17B890" offColor="#FF3A20" />
            </div>

            <div className={styles.pad} />

            <button className={`${styles.server_delete_button}`} onClick={onClickDeleteChannel}>
                <div className={styles.flex_rowa}>
                    <p>Delete Channel</p>
                </div>
            </button>

            {/* Save Button */}
            <div className={`${styles.setting_save_div} ${(unsavedChanges === true) ? (styles.setting_save_div_active) : ''}`}>
                <p className={styles.setting_save_text}>You have unsaved changes</p>
                <button className={`${settings.saveLoading && styles.setting_save_button_disabled} ${styles.setting_save_button} ${!settings.saveLoading && styles.on_hover}`} disabled={settings.saveLoading} onClick={onClickSaveButton}>Save</button>
            </div>
        </div>
    );
};

export default ChannelInformation;