import React, { useEffect, useState } from 'react';
import styles from '../page.module.css';
import { Currents, onMouseLeaveTooltipElement, onMouseOverTooltipElement } from '../utils/utils';
import { Server } from '../utils/socket_utils';

async function getServerList() {
    let serverList: Server[] = [];
    try {
        const res = await fetch('/api/v1/user/servers/get');
        const data = await res.json();
        const sdata = data.data;

        for (let serverId of sdata) {
            try {
                const res = await fetch(`/api/v1/server/${serverId}`);

                if (res.status !== 200) {
                    console.log("Couldn't load server " + serverId);
                    continue;
                }

                const ndata = await res.json();
                const gotserver: Server = ndata.data;
                serverList.push(gotserver);
            } catch (error) {
                console.error("Error fetching server details for serverId:", serverId, error);
            }
        }
    } catch (error) {
        console.error("Error fetching server list:", error);
    }
    return serverList;
}

interface Props {
    onClickServer: (server: Server) => void;
    onRightClickServer: (server: Server, ct: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onClickAppIcon: () => void;
    onClickExploreButton: () => void;
    setCurrents: React.Dispatch<React.SetStateAction<Currents>>;
    Currents: Currents;
    ExploreBoxV: boolean;
}

const MainBox: React.FC<Props> = ({ onClickServer, onRightClickServer, onClickAppIcon, onClickExploreButton, setCurrents, Currents, ExploreBoxV }) => {

    const [ServerList, setServerList] = useState<Server[]>([]);
    const [beep, setBeep] = useState(false);

    useEffect(() => {
        getServerList().then((data) => {
            setServerList(data);
        });
    }, []);

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
                <div id="app-icon" className={styles.app_icon} onClick={onClickAppIcon}>

                </div>
                <div id="servers-container" className={styles.servers_container} key='servers-container-id'>
                    {
                        (ServerList ? (ServerList.map((server: Server) => {
                            return (
                                <div onMouseLeave={() => onMouseLeaveTooltipElement(setCurrents)} onMouseOver={(ev) => onMouseOverTooltipElement(ev, server.name, Currents, setCurrents)} id={server.id} className={`${styles.server_list_element}`} onClick={() => onClickServer(server)} onContextMenu={(ct) => { onRightClickServer(server, ct); ct.preventDefault(); }} key={server.id}>
                                    <img src={server.iconUrl} className={`${styles.server_list_element_image} ${Currents.server ? (Currents.server.id == server.id ? styles.server_list_element_image_active : "") : ""}`} key={`image-${server.id}`} />
                                </div>
                            )
                        })) : <> </>)
                    }
                </div>
                <svg onClick={onClickExploreButton} xmlns="http://www.w3.org/2000/svg" className={`${styles.explore_button} ${ExploreBoxV ? (styles.explore_button_active) : ''}`} viewBox="0 0 48 48" id="explore">
                    <path d="M24 21.8c-1.21 0-2.2.99-2.2 2.2s.99 2.2 2.2 2.2a2.2 2.2 0 0 0 0-4.4zM24 4C12.95 4 4 12.95 4 24c0 11.04 8.95 20 20 20s20-8.96 20-20c0-11.05-8.95-20-20-20zm4.38 24.38L12 36l7.62-16.38L36 12l-7.62 16.38z"></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
            </div>
        </>
    );
}

export default MainBox;