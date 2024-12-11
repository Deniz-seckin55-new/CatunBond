import styles from '../page.module.css';

import React, { useEffect, useState } from 'react';

interface Props {
    onClickFBOnline: () => void;
    onClickFBOffline: () => void;
    onClickFBBlocked: () => void;
    FDOnlineV: boolean;
    FDOfflineV: boolean;
    FDBlockedV: boolean;
}

const FriendsDiv: React.FC<Props> = ({onClickFBOnline, onClickFBOffline, onClickFBBlocked, FDOnlineV, FDOfflineV, FDBlockedV}) => {
    return (
        <>
            <div id="friends-box-top-left-wraper" className={styles.friends_box_top_left_wraper}>
                <div id="friends-box-top-left" className={styles.friends_box_top_left}>
                    <button id="online-friends-button" className={styles.friends_box_button} onClick={onClickFBOnline}>Online</button>
                    <hr className={styles.hr_one} />
                </div>
            </div>
            <div id="friends-box-top-middle-wraper" className={styles.friends_box_top_middle_wraper}>
                <div id="friends-box-top-middle" className={styles.friends_box_top_middle}>
                    <button id="offline-friends-button" className={styles.friends_box_button} onClick={onClickFBOffline}>Offline</button>
                    <hr className={styles.hr_one} />
                </div>
            </div>
            <div id="friends-box-top-right-wraper" className={styles.friends_box_top_right_wraper}>
                <div id="friends-box-top-right" className={styles.friends_box_top_right}>
                    <button id="blocked-friends-button" className={styles.friends_box_button} onClick={onClickFBBlocked}>Blocked</button>
                    <hr className={styles.hr_one} />
                </div>
            </div>
            <div id="friends-box-list" className={styles.friends_box_bottom}>
                {FDOnlineV && (<div id="friends-box-list-online" className={styles.friends_box_list_online}>

                </div>)}
                {FDOfflineV && (<div id="friends-box-list-offline" className={styles.friends_box_list_offline}>

                </div>)}
                {FDBlockedV && (<div id="friends-box-list-blocked" className={styles.friends_box_list_blocked}>

                </div>)}
            </div>
        </>
    );
}

export default FriendsDiv;