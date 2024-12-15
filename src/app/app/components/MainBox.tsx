import styles from '../page.module.css';
import { Currents, Server } from '../utils/utils';

interface Props {
    onClickServer: (server: Server) => void;
    onClickAppIcon: () => void;
    Currents: Currents;
}

const MainBox: React.FC<Props> = ({ onClickServer, onClickAppIcon, Currents}) => {

    const ServerList = [
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
    ];

    return (
        <>
            <div id="main-box" className={styles.main_box}>
                <div id="app-icon" className={styles.app_icon} onClick={onClickAppIcon}>

                </div>
                <div id="servers-container" className={styles.servers_container} key='servers-container-id'>
                    {
                        ServerList.map((server) => {
                            return (
                                <div id={server.id} className={`${styles.server_list_element}`} onClick={() => onClickServer(server)} key={server.id}>
                                    <img src={server.image} className={`${styles.server_list_element_image} ${Currents.server ? (Currents.server.id == server.id ? styles.server_list_element_image_active: "") : ""}`}/>
                                </div>
                            )
                        })

                    }
                </div>
            </div>
        </>
    );
}

export default MainBox;