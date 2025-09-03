import styles from "@/app/app/page.module.css";
import { useCurrents } from "@/store/currents";
import { User } from "../../utils/socket_utils";

interface Props {
    user: User;
    onSelect: (user: User) => void;
    onClickUserAvatarWithUserId: (userId: string | null, event: React.MouseEvent) => void;
    IsSelected: boolean;
}

export const FriendListElement: React.FC<Props>= ({ user, onSelect, IsSelected, onClickUserAvatarWithUserId }) => {
    return (
        <>
            <div className={`${styles.friend_list_element} ${IsSelected ? styles.friend_list_element_selected : ''}`} onContextMenu={(ev) => {ev.preventDefault(); onClickUserAvatarWithUserId(user.id, ev);}} onClick={() => onSelect(user)}>
                {user.avatarUrl && <img className={styles.user_profile_avatar} onClick={() => onSelect(user)} src={user.avatarUrl} width={64} height={64} /> }
                <p onClick={() => onSelect(user)}>{user.username}</p>
            </div>
        </>
    );
}