import { useEffect, useState } from 'react';
import styles from '../page.module.css';
import { Currents } from '../utils/utils';
import { User } from '../utils/socket_utils';
import { useCurrents } from '@/store/currents';

interface Props {
    
}

const ServerUsersTab: React.FC<Props> = ({ }) => {
    const [users, setusers] = useState<User[]>([]);
    const currents = useCurrents();

    useEffect(() => {
        if (currents.server) {
            const usersData: User[] = currents.server.members;
            setusers(usersData);
        }
        if (currents.channel?.channelType === "DIRECTMESSAGE") {
            if (currents.directmessage) {
                setusers(currents.directmessage.directMsgFor);
            }
        }
    }, [currents.server, currents.directmessage]);

    return (
        <>
            {currents.ServerUsersDivV && (
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