import styles from '../page.module.css';

import React, { useEffect, useState } from 'react';
import { Message } from '../utils/utils';

interface Props {
    onInputTextarea: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onLoadTextarea: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onKeyDownInput: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    messages: Message[];
}

const ChannelBox: React.FC<Props> = ({ onInputTextarea, onLoadTextarea, onKeyDownInput, messages }) => {
    /*let date = new Date();
    date.setDate(Date.now());
    const testMessages: Message[] = [{
        id: "i00",
        authorId: "a10",
        channelId: "c10",
        content: "meow",
        repliadToId: null,
        timestamp: date,
    }, {
        id: "i01",
        authorId: "a11",
        channelId: "c11",
        content: "I love cats!",
        repliadToId: null,
        timestamp: date,
    }, {
        id: "i02",
        authorId: "a12",
        channelId: "c12",
        content: "veeeeeeeeeeeeeeeeeeeeeerrrrrrrrrrryyyyyyyyy lloooonggg messsaaageeeeeee!\\=(+'!",
        repliadToId: null,
        timestamp: date,
    },{
        id: "i03",
        authorId: "a12",
        channelId: "c12",
        content: "veeeeeeeeeeeeeeeeeeeeeerrrrrrrrrrryyyyyyyyy lloooonggg messsaaageeeeeee!\\=(+'!",
        repliadToId: null,
        timestamp: date,
    },{
        id: "i04",
        authorId: "a12",
        channelId: "c12",
        content: "veeeeeeeeeeeeeeeeeeeeeerrrrrrrrrrryyyyyyyyy lloooonggg messsaaageeeeeee!\\=(+'!",
        repliadToId: null,
        timestamp: date,
    },{
        id: "i05",
        authorId: "a12",
        channelId: "c12",
        content: "veeeeeeeeeeeeeeeeeeeeeerrrrrrrrrrryyyyyyyyy lloooonggg messsaaageeeeeee!\\=(+'!",
        repliadToId: null,
        timestamp: date,
    },]*/

    return (
        <>
            <div id="channel-box" className={styles.channel_box} style={{ gridTemplateRows: `5fr 12vh` }}>
                <div className={styles.message_box}>
                    {messages.map((message) => {
                        return (
                            <div className={styles.message} key={message.id}>
                                <div className={styles.message_useravatar_holder}>
                                    <img className={styles.message_useravatar} src="https://cat-storage-server.web.app/data/cat1.jpeg" />
                                </div>
                                <div className={styles.message_user_holder}>
                                    <p className={styles.message_username}>{message.authorId}</p>
                                    <p className={styles.message_content}>{message.content}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className={styles.message_box_wraper}>
                    <textarea className={`${styles.contenteditable} ${styles.msg_typer}`} onKeyDown={onKeyDownInput} />
                </div>
            </div>
        </>
    );
};

export default ChannelBox;