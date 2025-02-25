import { useEffect, useState } from 'react';
import styles from '../page.module.css';
import { Currents } from '../utils/utils';
import { User } from '../utils/socket_utils';

interface Props {
    Currents: Currents,
    ServerUsersDivV: boolean,
}

const ServerUsersTab: React.FC<Props> = ({ Currents, ServerUsersDivV }) => {
    const [users, setusers] = useState<User[]>([]);

    useEffect(() => {
        if (Currents.server) {
            const usersData: User[] = Currents.server.members;
            setusers(usersData);
        }
        if (Currents.channel?.channelType === "DIRECTMESSAGE") {
            if (Currents.directmessage) {
                setusers(Currents.directmessage.directMsgFor);
            }
        }
    }, [Currents.server, Currents.directmessage]);

    return (
        <>
            {ServerUsersDivV && (
                <div className={styles.server_users}>
                    <div className={styles.server_users_content}>
                        <div className={styles.server_users_top}>
                            <p className={styles.server_users_text}>
                                Users
                            </p>
                        </div>
                        <div className={styles.server_users_bottom}>
                            {
                                users.map((user) => {
                                    return (
                                        <div className={styles.server_users_user} key={user.id}>
                                            <div className={styles.server_useravatar_holder}>
                                                <img className={styles.message_useravatar} src={`${user.avatarUrl/*https://cat-storage-server.web.app/data/cat1.jpeg"*/}`} />
                                            </div>
                                            <p className={styles.server_user_username}>{user.username}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ServerUsersTab;