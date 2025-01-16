import { useEffect, useState } from 'react';
import styles from '../page.module.css';
import { Currents, User } from '../utils/utils';

interface Props {
    Currents: Currents,
    ServerUsersDivV: boolean,
}

const ServerUsersTab: React.FC<Props> = ({ Currents, ServerUsersDivV }) => {
    const [users, setusers] = useState<User[]>([]);

    useEffect(() => {
        if (Currents.server) {
            fetch("/api/v1/server/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    serverId: Currents.server.id,
                })
            }).then(res => res.json().then(data => {
                if (data.data) {
                    const usersData: User[] = data.data;
                    setusers(usersData);
                }
            }));
        }
    }, [Currents.server]);

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