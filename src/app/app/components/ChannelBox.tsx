import styles from '../page.module.css';

import React, { useEffect, useRef, useState } from 'react';
import { Message } from '../utils/utils';

interface Props {
    onInputTextarea: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onLoadTextarea: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onKeyDownInput: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    messages: Message[];
}

const ChannelBox: React.FC<Props> = ({ onInputTextarea, onLoadTextarea, onKeyDownInput, messages }) => {
    const [userScroll, setuserScroll] = useState(0);
    const scrollPageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log("userScroll: ", userScroll);
        if (scrollPageRef.current) {
            scrollPageRef.current.addEventListener('scroll', (ev: Event) => {
                if(scrollPageRef.current)
                    if (Math.abs(scrollPageRef.current.scrollTop - scrollPageRef.current.scrollHeight) >= 1000) {
                        setuserScroll(1);   
                    }
            });
            if (userScroll == 0) {
                scrollPageRef.current.scrollBy({
                    behavior: 'smooth',
                    left: 0,
                    top: scrollPageRef.current.scrollHeight,
                });
            } else if (userScroll == 1) {
                if (Math.abs(scrollPageRef.current.scrollTop - scrollPageRef.current.scrollHeight) < 1000) {
                    setuserScroll(0);
                } else {
                    console.log("Was ",Math.abs(scrollPageRef.current.scrollTop - scrollPageRef.current.scrollHeight));
                }
            }

            return () => {
                if (scrollPageRef.current)
                    scrollPageRef.current.removeEventListener('scroll', (ev: Event) => {
                        setuserScroll(1);
                    });
            }
        }
    }, [scrollPageRef, messages]);

    return (
        <>
            <div id="channel-box" className={styles.channel_box} style={{ gridTemplateRows: `5fr 12vh` }}>
                <div className={styles.message_box} ref={scrollPageRef}>
                    {messages.map((message) => {
                        return (
                            <div className={styles.message} key={message.id}>
                                <div className={styles.message_useravatar_holder}>
                                    <img className={styles.message_useravatar} src="https://cat-storage-server.web.app/data/cat1.jpeg" />
                                </div>
                                <div className={styles.message_user_holder}>
                                    <p className={styles.message_username}>{message.authorUsername}</p>
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