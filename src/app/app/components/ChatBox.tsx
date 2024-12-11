import styles from '../page.module.css';

import React, { useEffect, useState } from 'react';

interface Props {

}

const ChannelBox: React.FC<Props> = ({ }) => {
    return (
        <>
            <div id="channel-box" className={styles.channel_box}>
                <div className={styles.message_box}>

                </div>
                <div className={styles.message_box_wraper}>
                    <div className={styles.msg_box}>
                        <div className={styles.content_holder2}>
                            <input className={`${styles.monaco_editor} ${styles.msg_typer}`} id="msg-typer" type="text" autoComplete="off" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChannelBox;