import { useCurrents } from "@/store/currents";
import { useServerInfoStore } from "@/store/serverInfos";
import { useSettings } from "@/store/settings";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import axios from "axios";
import equal from "fast-deep-equal";
import React, { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import styles from "../../page.module.css";
import { DetailedDBUser, ServerInfo } from "../../utils/socket_utils";
import { isObjectNotNull, OpenConfirmationMenuWithRetype, SettingsProps } from "../../utils/utils";

const currentSetting = "Server Information";

const ServerInformation: React.FC<SettingsProps> = ({ updateSettings }) => {
    const currents = useCurrents();
    const settings = useSettings();
    const serverInfoStore = useServerInfoStore();

    const [loading, setLoading] = useState<boolean>(true);
    const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
    const [rulesHeight, setrulesHeight] = useState<string>("0px");
    const [serverInfo, setServerInfo] = useState<ServerInfo>({
        serverId: "",
        iconUrl: "",
        slogan: null,
        name: "",
        maxUsers: 50,
        color: "#ffffff",
        description: "",
        rules: [],
    });

    const [hexpickerV, sethexpickerV] = useState<boolean>(false);
    const [oldServerInfo, setOldServerInfo] = useState<ServerInfo | null>(null);

    // Fetch server information
    useEffect(() => {
        const fetchServerInfo = async () => {
            try {
                if (!currents.server) return;

                const serverInfoExists = serverInfoStore.getExistingServerInfo(currents.server.id);
                if (serverInfoExists) {
                    setOldServerInfo(serverInfoExists);
                    setServerInfo(serverInfoExists);
                } else {
                    const response = await axios.get(`/api/v1/servers/${currents.server.id}/info`); // Adjust API endpoint
                    setOldServerInfo(response.data.data);
                    setServerInfo(response.data.data);

                    serverInfoStore.addServerInfo(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching server info:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServerInfo();
    });

    // Detect unsaved changes
    useEffect(() => {
        setUnsavedChanges(!equal(serverInfo, oldServerInfo));
    }, [serverInfo]);

    useEffect(() => {
        if (!serverInfo.rules) return;

        setrulesHeight(serverInfo.rules.length * 1.75 + "em");
    }, [serverInfo.rules]);

    const onClickColorButton = () => {
        sethexpickerV(!hexpickerV);
    };

    const onChangeColor = (color: string) => {
        setServerInfo((state) => ({ ...state, color: color }));
    };

    const handleInputChange = (field: keyof ServerInfo, value: string[] | string | number | null) => {
        setServerInfo((prev) => ({ ...prev, [field]: value }));
    };

    const onClickResetColorButton = () => {
        if (!oldServerInfo) return;
        setServerInfo((prev) => ({ ...prev, color: oldServerInfo.color }));
    };

    const onClickSaveButton = async () => {
        updateSettings(currentSetting, serverInfo, "ServerInfo", () => {
            setOldServerInfo(serverInfo);
            setUnsavedChanges(false);
        })
    };

    const handleAddRule = () => {
        setServerInfo((prev) => ({
            ...prev,
            rules: [...prev.rules, ""], // Add an empty rule
        }));
    };

    const handleEditRule = (index: number, value: string) => {
        const updatedRules = [...serverInfo.rules];
        updatedRules[index] = value;
        setServerInfo((prev) => ({ ...prev, rules: updatedRules }));
    };

    const handleRemoveRule = (index: number) => {
        const updatedRules = serverInfo.rules.filter((_, i) => i !== index);
        setServerInfo((prev) => ({ ...prev, rules: updatedRules }));
    };

    const handleDragEnd = (result: unknown) => {
        if(!isObjectNotNull(result)) return;
        if(!("source" in result && "destination" in result &&
            isObjectNotNull(result.source) && "index" in result.source && typeof result.source.index === "number" &&
            isObjectNotNull(result.destination) && "index" in result.destination && typeof result.destination.index === "number")) return;
            // Man Why just why TypeScript (type "any" isnt allowed)
        if (!result.destination) return;

        const reorderedRules = Array.from(serverInfo.rules);
        const [movedRule] = reorderedRules.splice(result.source.index, 1);
        reorderedRules.splice(result.destination.index, 0, movedRule);

        setServerInfo((prev) => ({ ...prev, rules: reorderedRules }));
    };

    const onClickDeleteServer = () => {
        if(!currents.server) return;
        if(!currents.user) return;

        OpenConfirmationMenuWithRetype(currents, "Are you sure you want to delete this server?", currents.server.name, async (answer: boolean) => {
            console.log("C.M. Answer: ",answer);
            if (!currents.server) return;
            if (!answer) return;

            const serverId = currents.server.id;

            await axios.delete(`/api/v1/servers/${serverId}`);
            serverInfoStore.removeServerInfo(serverId);

            const current_user = currents.user!;
            const new_current_user: DetailedDBUser = {...current_user, servers: current_user.servers.filter((server) => server.id !== serverId)};
            currents.setUser(new_current_user);
            
            currents.onClickAppIcon();
        });
    }

    if (loading) return <p>Loading...</p>;

    return (
        <div className={styles.settings_page}>
            <p className={styles.setting_page_header}>{currents.setting}</p>
            <div className={styles.small_pad} />

            <div className={styles.flex_rowa}>
                <img src={serverInfo.iconUrl || ''} className={styles.appearance_userimage} />
                <p className={styles.appearance_username} style={{ color: serverInfo.color }}>{serverInfo.name}</p>
                <button className={styles.setting_field_input_color_button} onClick={onClickColorButton}>
                    <svg className={styles.setting_field_input_color_button_image} xmlns="http://www.w3.org/2000/svg" width="10vh" height="10vh" viewBox="0 0 24 24" id="palette">
                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                        <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill={`${serverInfo.color}`}></path>
                    </svg>
                </button>
                <button className={styles.appearance_reset} onClick={onClickResetColorButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="refresh">
                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                        <path d="M17.65 6.35c-1.63-1.63-3.94-2.57-6.48-2.31-3.67.37-6.69 3.35-7.1 7.02C3.52 15.91 7.27 20 12 20c3.19 0 5.93-1.87 7.21-4.56.32-.67-.16-1.44-.9-1.44-.37 0-.72.2-.88.53-1.13 2.43-3.84 3.97-6.8 3.31-2.22-.49-4.01-2.3-4.48-4.52C5.31 9.44 8.26 6 12 6c1.66 0 3.14.69 4.22 1.78l-1.51 1.51c-.63.63-.19 1.71.7 1.71H19c.55 0 1-.45 1-1V6.41c0-.89-1.08-1.34-1.71-.71l-.64.65z"></path>
                    </svg>
                </button>
            </div>
            <HexColorPicker className={`${styles.setting_field_input_color} ${hexpickerV == true ? styles.setting_field_input_color_active : ''}`} color={serverInfo.color} onChange={onChangeColor} />
            <div className={styles.pad5} />

            {/* Server Name */}
            <p className={styles.appearance_etitle}>Server Name</p>
            <input
                className={`${styles.setting_field_input_text} ${styles.settings_styles_text_input_one}`}
                value={serverInfo.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
            />

            {/* Max Server Users */}
            <p className={styles.appearance_etitle}>Max Server User Limit</p>
            <input
                type="number"
                className={`${styles.setting_field_input_text} ${styles.input_hide_arrows} ${styles.settings_styles_text_input_one}`}
                value={serverInfo.maxUsers}
                onChange={(e) => handleInputChange("maxUsers", Number(e.target.value))}
            />

            {/* Server Description */}
            <p className={styles.appearance_etitle}>Server Description</p>
            <textarea
                className={`${styles.setting_field_input_text} ${styles.settings_styles_text_input_two}`}
                value={serverInfo.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
            ></textarea>

            {/* Server Rules with Drag & Drop */}
            <p className={styles.appearance_etitle}>Server Rules</p>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="rules-list">
                    {(provided) => (
                        <ul className={styles.rules_list} style={{ maxHeight: rulesHeight }} {...provided.droppableProps} ref={provided.innerRef}>
                            {serverInfo.rules.map((rule, index) => (
                                <Draggable key={index} draggableId={index.toString()} index={index}>
                                    {(provided) => (
                                        <li
                                            className={styles.rules_list_item}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <div className={styles.flex_rowa}>
                                                <p className={styles.bullet_index_number}>{index}.</p>
                                                <input
                                                    className={`${styles.setting_field_input_text} ${styles.settings_styles_text_input_one}`}
                                                    value={rule}
                                                    onChange={(e) => handleEditRule(index, e.target.value)}
                                                />
                                                <button className={`${styles.normal_icon_black}`} onClick={() => handleRemoveRule(index)}>
                                                    <img className={styles.image_render_one} src="clear.svg" />
                                                </button>
                                            </div>
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
            <button className={styles.normalw_icon_black} onClick={handleAddRule}>
                <div className={styles.flex_rowa}>
                    <img className={styles.image_render_two} src="addwhite.svg" />
                    <p>Add Rule</p>
                    <div className={styles.lpad3} />
                </div>
            </button>

            <div className={styles.pad} />

            <button className={`${styles.server_delete_button}`} onClick={onClickDeleteServer}>
                <div className={styles.flex_rowa}>
                    <p>Delete Server   </p>
                </div>
            </button>

            <div className={styles.large_pad} />

            {/* Save Button */}
            <div className={`${styles.setting_save_div} ${(unsavedChanges === true) ? (styles.setting_save_div_active) : ''}`}>
                <p className={styles.setting_save_text}>You have unsaved changes</p>
                <button className={`${settings.saveLoading && styles.setting_save_button_disabled} ${styles.setting_save_button} ${!settings.saveLoading && styles.on_hover}`} disabled={settings.saveLoading} onClick={onClickSaveButton}>Save</button>
            </div>
        </div>
    );
};

export default ServerInformation;