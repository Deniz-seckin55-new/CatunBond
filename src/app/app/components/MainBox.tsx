import { useEffect, useState } from 'react';
import styles from '../page.module.css';
import { Currents, Server } from '../utils/utils';

async function getServerList() {
    let serverList: Server[] = [];
    try {
        const res = await fetch('/api/v1/user/servers/get');
        const data = await res.json();
        const sdata = data.data;

        for (let serverId of sdata) {
            try {
                const res = await fetch(`/api/v1/server/get/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        serverId: serverId
                    })
                });

                if (res.status !== 200) {
                    console.log("Couldn't load server " + serverId);
                    continue;
                }

                const ndata = await res.json();
                serverList.push({
                    id: ndata.data.id,
                    name: ndata.data.name,
                    image: ndata.data.iconUrl,
                });
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
    onClickAppIcon: () => void;
    onClickExploreButton: () => void;
    Currents: Currents;
}

const MainBox: React.FC<Props> = ({ onClickServer, onClickAppIcon, onClickExploreButton, Currents }) => {

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
                                <div id={server.id} className={`${styles.server_list_element}`} onClick={() => onClickServer(server)} key={server.id}>
                                    <img src={server.image} className={`${styles.server_list_element_image} ${Currents.server ? (Currents.server.id == server.id ? styles.server_list_element_image_active : "") : ""}`} key={`image-${server.id}`} />
                                </div>
                            )
                        })) : <> </>)
                    }
                </div>
                <div className={styles.explore_button} onClick={onClickExploreButton}>

                </div>
            </div>
        </>
    );
}

export default MainBox;