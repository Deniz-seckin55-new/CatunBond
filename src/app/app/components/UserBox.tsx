import styles from '../page.module.css';

import { UserButton, useUser } from '@clerk/nextjs';

interface Props {
    onClickSettings: () => void
}

const UserBox: React.FC<Props> = ({ onClickSettings }) => {

    return (
        <>
            <div id="user-box" className={styles.user_box}>
                <div className={styles.user_button}>
                    <UserButton appearance={{ elements: { userButtonAvatarBox: { width: "8vh", height: "8vh" } } }} />
                </div>
                <p className={`${styles.user_box_username} ${styles.selectable}`}>{
                    useUser().user?.username
                }</p>
                <div className={styles.user_box_settings}>
                    <img src={'/settings.svg'} width={"30vh"} height={"30vh"} alt={'Settings'} onClick={onClickSettings} className={styles.user_box_settings_icon}></img>
                </div>
            </div>
        </>
    )
}

export default UserBox;