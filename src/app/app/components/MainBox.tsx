import React, { useEffect, useState } from 'react';
import styles from '../page.module.css';
import { Currents, onMouseLeaveTooltipElement, onMouseOverTooltipElement, onMouseOverTooltipElementWithColor } from '../utils/utils';
import { Server } from '../utils/socket_utils';
import { useCurrents } from '@/store/currents';
import { useServerInfoStore } from '@/store/serverInfos';
import axios from 'axios';

interface Props {
    onClickServer: (server: Server) => void;
    onRightClickServer: (server: Server, ct: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onClickExploreButton: () => void;
}

const MainBox: React.FC<Props> = ({ onClickServer, onRightClickServer, onClickExploreButton }) => {
    const currents = useCurrents();

    const [ServerList, setServerList] = useState<Server[]>([]);

    useEffect(() => {
        if (!currents.user) return;

        setServerList(currents.user.servers ?? []);
    }, [currents.user]);

    useEffect(() => {
        ServerList.forEach(async (server) => {
            if(useServerInfoStore.getState().serverInfos.find(x => x.serverId === server.id) !== undefined) return;

            useServerInfoStore.getState().addfetchingServer(server.id);

            const response = await axios.get(`/api/v1/servers/${server.id}/info`);

            useServerInfoStore.getState().addServerInfo(response.data.data);

            useServerInfoStore.getState().removefetchingServer(server.id);
        });
    }, [ServerList]);

    /*const ServerList = [
        {
            id: "abc",
            name: "Cat Server",
            image: "https://cat-storage-server.web.app/data/cat1.jpeg"
        },
        {
            id: "def",
            name: "Kitten Server",
            image: "https://cat-storage-server.web.app/data/cat2.jpg"
        }
    ];*/

    return (
        <>
            <div id="main-box" className={styles.main_box}>
                <div id="app-icon" className={styles.app_icon} onClick={currents.onClickAppIcon}>

                </div>
                <div id="servers-container" className={styles.servers_container} key='servers-container-id'>
                    {
                        (ServerList ? (ServerList.map((server: Server) => {
                            const serverinfo = useServerInfoStore.getState().getExistingServerInfo(server.id);
                            return (
                                <div onMouseLeave={() => onMouseLeaveTooltipElement(currents)} onMouseOver={(ev) => serverinfo ? onMouseOverTooltipElementWithColor(ev, server.name, serverinfo.color, currents) : onMouseOverTooltipElement(ev, server.name, currents)} id={server.id} className={`${styles.server_list_element}`} onClick={() => onClickServer(server)} onContextMenuCapture={(ev) => { ev.preventDefault(); onRightClickServer(server, ev) }} key={server.id}>
                                    <img src={server.iconUrl} className={`${styles.server_list_element_image} ${currents.server ? (currents.server.id == server.id ? styles.server_list_element_image_active : "") : ""}`} key={`image-${server.id}`} onContextMenuCapture={(ev) => { ev.preventDefault(); onRightClickServer(server, ev) }} />
                                </div>
                            )
                        })) : <> </>)
                    }
                </div>
                <svg onClick={onClickExploreButton} xmlns="http://www.w3.org/2000/svg" className={`${styles.explore_button} ${currents.ExploreBoxV ? (styles.explore_button_active) : ''}`} viewBox="0 0 48 48" id="explore">
                    <path d="M24 21.8c-1.21 0-2.2.99-2.2 2.2s.99 2.2 2.2 2.2a2.2 2.2 0 0 0 0-4.4zM24 4C12.95 4 4 12.95 4 24c0 11.04 8.95 20 20 20s20-8.96 20-20c0-11.05-8.95-20-20-20zm4.38 24.38L12 36l7.62-16.38L36 12l-7.62 16.38z"></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
            </div>
        </>
    );
}

export default MainBox;