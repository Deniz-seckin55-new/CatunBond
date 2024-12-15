import styles from '../page.module.css';

import React, { useEffect, useState } from 'react';

interface Props {
    onInputTextarea: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onLoadTextarea: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ChannelBox: React.FC<Props> = ({ onInputTextarea, onLoadTextarea }) => {
    return (
        <>
            <div id="channel-box" className={styles.channel_box} style={{ gridTemplateRows: `5fr 12vh` }}>
                <div className={styles.message_box_wraper}>
                    <textarea className={`${styles.contenteditable} ${styles.msg_typer}`}/>
                </div>
            </div>
        </>
    );
};

export default ChannelBox;