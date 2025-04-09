import { Currents, onMouseLeaveTooltipElement, onMouseOverTooltipElement, ViewingFriendsDiv } from "../utils/utils";
import styles from "../page.module.css";
import { useCurrents } from "@/store/currents";


interface Props {
    onClickFB: (status: ViewingFriendsDiv) => void;
    onClickAddFriend: () => void;
    onClickCall: () => void;
}

const ChannelBoxInfo: React.FC<Props> = ({ onClickAddFriend, onClickFB, onClickCall }) => {
    const currents = useCurrents();

    const onClickUsers = () => {
        currents.setServerUsersDivV(!currents.ServerUsersDivV);
    }

    return (
        <>
            <div className={styles.channel_info_box_channel}>
                {(currents.channel && !currents.friendsdiv.visible) && (<>
                    <p>{currents.channel.name}</p>
                    <div className={styles.channel_box_actions}>
                        {!currents.vc && (<button onMouseLeave={() => onMouseLeaveTooltipElement(currents)} onMouseOver={(ev) => onMouseOverTooltipElement(ev, "Call", currents)} onClick={onClickCall} className={`${styles.channel_info_box_users}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="call">
                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                <path d="m19.23 15.26-2.54-.29a1.99 1.99 0 0 0-1.64.57l-1.84 1.84a15.045 15.045 0 0 1-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52a2.001 2.001 0 0 0-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z" fill="var(--cb-color-white)"></path>
                            </svg>
                        </button>)}
                        {currents.vc && (
                            <button onMouseLeave={() => onMouseLeaveTooltipElement(currents)} onMouseOver={(ev) => onMouseOverTooltipElement(ev, "Call", currents)} className={`${styles.channel_info_box_users_inactive}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="call">
                                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                                    <path d="m19.23 15.26-2.54-.29a1.99 1.99 0 0 0-1.64.57l-1.84 1.84a15.045 15.045 0 0 1-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52a2.001 2.001 0 0 0-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z" fill="var(--cb-color-white-soft)"></path>
                                </svg>
                            </button>
                        )}
                        <button onMouseLeave={() => onMouseLeaveTooltipElement(currents)} onMouseOver={(ev) => onMouseOverTooltipElement(ev, "Users", currents)} onClick={onClickUsers} className={styles.channel_info_box_users}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="people">
                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                <path d="M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z" fill="var(--cb-color-white)"></path>
                            </svg>
                        </button>
                    </div>
                </>)}
                {currents.friendsdiv.visible && (
                    <div className={styles.friends_menu_holder}>
                        <div className={styles.friends_menu_button_holder}>
                            <button className={styles.friends_menu_button} onClick={() => onClickFB("online")}>Online</button>
                            <button className={styles.friends_menu_button} onClick={() => onClickFB("offline")}>Offline</button>
                            <button className={styles.friends_menu_button} onClick={() => onClickFB("pending")}>Pending</button>
                            <button className={styles.friends_menu_button} onClick={() => onClickFB("blocked")}>Blocked</button>
                            <button className={`${styles.friends_menu_button} ${styles.add_friend}`} onClick={onClickAddFriend}>Add Friend</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default ChannelBoxInfo;