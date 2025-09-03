import React, { useEffect, useState } from "react";
import styles from "../../page.module.css";
import { onMouseLeaveTooltipElement, onMouseOverTooltipElement, SettingsProps } from "../../utils/utils";
import { useCurrents } from "@/store/currents";
import { useServerInvitesStore } from "@/store/serverInvites";
import axios from "axios";
import { toast } from "react-toastify";
import { useCopyToClipboard } from "usehooks-ts";

// const currentSetting = "Server Invites";
const ServerInvites: React.FC<SettingsProps> = ({ }) => {
    const currents = useCurrents();
    // const settings = useSettings();

    const [serverInvites, setServerInvites] = useState<string[]>([]);
    const [oldServerInvites, setOldServerInvites] = useState<string[] | null>(null);
    const [createServerInviteLoading, setcreateServerInviteLoading] = useState<boolean>(false);
    const [loadingDeleteList, setloadingDeleteList] = useState<string[]>([]);

    const [_, copyToClipboard] = useCopyToClipboard();

    const serverInvitesStore = useServerInvitesStore();

    useEffect(() => {
        const fetchServerInvites = async () => {
            if (!currents.server) return;

            const serverInv = serverInvitesStore.getExistingServerInvite(currents.server.id);

            if (!serverInv) {
                const response = await axios.get(`/api/v1/servers/${currents.server.id}/invites`); // Adjust API endpoint
                setOldServerInvites(response.data.data);
                setServerInvites(response.data.data);

                serverInvitesStore.addServerInvites({serverId: currents.server.id, invites: response.data.data});
            } else {
                setOldServerInvites(serverInv.invites);
                setServerInvites(serverInv.invites);
            }
        }

        fetchServerInvites();
    }, [currents.server]);

    const handleDeleteInvite = (invite: string) => {
        setloadingDeleteList((state) => [...state, invite]);
        const deleteInvite = async () => {
            if (!currents.server) return;
            const response = await axios.delete(`/api/v1/servers/${currents.server.id}/invites/${invite}`); // Adjust API endpoint
            if (response.data.message === "Invite deleted") {
                const sv = serverInvites;
                setServerInvites((state) => state.filter(x => x !== invite));

                serverInvitesStore.replaceServerInvites(currents.server.id, {
                    serverId: currents.server.id,
                    invites: sv.filter(x => x !== invite),
                });
            } else {
                toast("Something went wrong while deleting the server invite");
            }
            setloadingDeleteList((state) => state.filter(x => x !== invite));
        }

        deleteInvite();
    }

    const onClickCreateInvite = () => {
        setcreateServerInviteLoading(true);
        const createInvite = async () => {
            if (!currents.server) return;
            const response = await axios.post(`/api/v1/servers/${currents.server.id}/invites`); // Adjust API endpoint
            const sv = serverInvites;
            setServerInvites((state) => [...state, response.data.data]);

            serverInvitesStore.replaceServerInvites(currents.server.id, {
                serverId: currents.server.id,
                invites: [...sv, response.data.data],
            })

            setcreateServerInviteLoading(false);
        };

        createInvite();
    }

    if (!oldServerInvites) return <p>Loading...</p>;

    return (
        <div className={styles.settings_page}>
            <p className={styles.setting_page_header}>{currents.setting}</p>
            <div className={styles.small_pad} />
            <p className={styles.appearance_etitle}>Server Invites</p>
            {serverInvites.map((invite, index) => (
                <div className={styles.server_invite_element} key={index}>
                    <div className={styles.flex_rowa}>
                        <p style={{ userSelect: "text" }}>{invite}</p>
                        <div className={styles.lpad5} />
                        <button className={`${styles.normal_icon_black}`} onMouseOver={(ev) => onMouseOverTooltipElement(ev, "Copy To Clipboard", currents)} onMouseLeave={() => onMouseLeaveTooltipElement(currents)} disabled={loadingDeleteList.includes(invite)} style={{ width: "2em", height: "2em" }} onClick={() => {copyToClipboard(invite); toast("Copied invite to clipboard!")}}>
                            <img className={`${styles.image_render_one}`} src="pastewhite.svg" />
                        </button>
                        <button className={`${styles.normal_icon_black} ${loadingDeleteList.includes(invite) && styles.normal_disabled_button}`} onMouseOver={(ev) => onMouseOverTooltipElement(ev, "Delete Invite", currents)} onMouseLeave={() => onMouseLeaveTooltipElement(currents)} disabled={loadingDeleteList.includes(invite)} style={{ width: "2em", height: "2em" }} onClick={() => handleDeleteInvite(invite)}>
                            <img className={`${styles.image_render_one} ${loadingDeleteList.includes(invite) && styles.normal_disabled_button}`} src="deletewhite.svg" />
                        </button>
                    </div>
                </div>
            ))}
            <button className={`${createServerInviteLoading && styles.normal_disabled_button} ${styles.normalw_icon_black}`} disabled={createServerInviteLoading} onClick={onClickCreateInvite}>
                <div className={`${styles.flex_rowa} ${createServerInviteLoading && styles.normal_disabled_button}`}>
                    <img className={styles.image_render_two} src="addwhite.svg" />
                    <p>Create New Invite</p>
                    <div className={styles.lpad3} />
                </div>
            </button>
            <div className={styles.small_pad} />
        </div>
    );
};

export default ServerInvites;