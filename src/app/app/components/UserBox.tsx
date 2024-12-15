import styles from '../page.module.css';

import { UserButton, useUser } from '@clerk/nextjs';

const UserBox: React.FC = () => {
    return (
        <>
            <div id="user-box" className={styles.user_box}>
                <div className={styles.user_button}>
                    <UserButton appearance={{ elements: { userButtonAvatarBox: { width: "8vh", height: "8vh" } } }} />
                </div>
                <p className={`${styles.user_box_username} ${styles.selectable}`}>{
                    useUser().user?.username
                }</p>
            </div>
        </>
    )
}

export default UserBox;