import styles from '../page.module.css';

import React, { useEffect, useRef, useState } from 'react';
import { Message, GetMessageDateString } from '../utils/utils';

interface Props {
    onInputTextarea: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onLoadTextarea: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onKeyDownInput: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    messages: Message[];
}

const ChannelBox: React.FC<Props> = ({ onInputTextarea, onLoadTextarea, onKeyDownInput, messages }) => {
    const [userScroll, setuserScroll] = useState(0);
    const [hoveredMessageId, setHoveredMessageId] = useState<String | null>(null);
    const scrollPageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log("userScroll: ", userScroll);
        if (scrollPageRef.current) {
            scrollPageRef.current.addEventListener('scroll', (ev: Event) => {
                if (scrollPageRef.current)
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

    const onMouseHoverOver = (id: (String | undefined)) => {
        if (id !== undefined)
            setHoveredMessageId(id);
    }

    const onMouseHoverOut = () => {
        setHoveredMessageId(null);
    }

    return (
        <>
            <div id="channel-box" className={styles.channel_box} style={{ gridTemplateRows: `5fr 12vh` }}>
                <div className={styles.message_box} ref={scrollPageRef}>
                    {messages.map((message) => {
                        return (
                            <div className={styles.message} onMouseOver={() => onMouseHoverOver(message.id?.toString())} onMouseLeave={onMouseHoverOut} key={message.id}>
                                <div className={styles.message_useravatar_holder}>
                                    <img className={styles.message_useravatar} src={`"${message.author.avatarUrl/*https://cat-storage-server.web.app/data/cat1.jpeg"*/}`} />
                                </div>
                                <div className={styles.message_user_holder}>
                                    <div className={styles.message_content_holder}>
                                        <p className={styles.message_username}>{message.author.username}</p>
                                        <p className={styles.message_timestamp}>{GetMessageDateString(new Date(message.timestamp))}</p>
                                    </div>
                                    <p className={styles.message_content}>{message.content}</p>
                                </div>
                                <div id="message-actions-holder" className={`${styles.message_actions_holder} ${(hoveredMessageId == message.id?.toString()) ? styles.message_actions_holder_active : ''}`}>
                                    <div className={styles.message_actions}>
                                        <div className={styles.message_action}>
                                            <p>R</p>
                                        </div>
                                        <div className={styles.vl}> </div>
                                        <div className={styles.message_action}>
                                            <p>E</p>
                                        </div>
                                        <div className={styles.vl}> </div>
                                        <div className={styles.message_action}>
                                            <p>D</p>
                                        </div>
                                    </div>
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