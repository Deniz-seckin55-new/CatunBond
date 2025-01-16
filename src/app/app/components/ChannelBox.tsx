import styles from '../page.module.css';

import React, { useEffect, useRef, useState } from 'react';
import { Message, GetMessageDateString, Currents, MessageInfo, UpdateMessageInfo } from '../utils/utils';
import Image from 'next/image';

interface Props {
    onInputTextarea: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onLoadTextarea: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onKeyDownInput: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    onMessageReply: (message: Message) => void;
    onMessageEdit: (message: MessageInfo) => void;
    onMessageDelete: (message: Message) => void;
    onEditInput: (message: Message, event: React.KeyboardEvent) => void;
    onClickUserAvatar: (messageId : bigint | null, event: React.MouseEvent) => void;
    setreplyingTo: (message: Message | null) => void;
    Currents: Currents;
    MessageInfos: MessageInfo[];
    setMessageInfos: React.Dispatch<React.SetStateAction<MessageInfo[]>>;
    replyingTo: Message | null;
    kbState: String[];
    messages: Message[];
}

const ReplyMessageAnimationKeyframes = [{backgroundColor: 'var(--cb-color-red)'}, {backgroundColor: 'transparent'}];
const ReplyMessageAnimationOptions: KeyframeAnimationOptions = {duration: 500, easing: 'ease-in-out', iterations: 1, fill: 'none'};

const ChannelBox: React.FC<Props> = ({ onInputTextarea, onLoadTextarea, onMessageReply, onMessageEdit, onMessageDelete, onEditInput, onKeyDownInput, MessageInfos, setMessageInfos, replyingTo, setreplyingTo, onClickUserAvatar, Currents, kbState, messages }) => {
    const [userScroll, setuserScroll] = useState(0);
    const [hoveredMessageId, setHoveredMessageId] = useState<String | null>(null);
    const scrollPageRef = useRef<HTMLDivElement>(null);
    const editRefs = useRef<Record<string, HTMLTextAreaElement | null>>({});

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

    const _onMessageReply = (message: Message) => {
        setreplyingTo(message);
        onMessageReply(message);
    }

    const _onMessageDelete = (message: Message) => {
        if (MessageInfos.find(msg => msg.Message.id == message.id)?.deleteConfirm)
            onMessageDelete(message);
        else {
            UpdateMessageInfo(message, "deleteConfirm", true, setMessageInfos);
            setTimeout(() => {
                UpdateMessageInfo(message, "deleteConfirm", false, setMessageInfos);
            }, 5000);
        }
    }

    const onClickCloseReplyBox = () => {
        setreplyingTo(null);
    }

    const onClickReplyMessage = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>, message: MessageInfo) => {
        const replyMessageId = message.Message.repliedTo!.id;
        const replyMessageInfo = MessageInfos.find(x => x.Message.id == replyMessageId);
        const newmessageInfo = MessageInfos.find(x => x.Message.id == message.Message.id);
        console.log(replyMessageId);
        console.log(replyMessageInfo);
        if (replyMessageInfo) {
            if (replyMessageInfo.ref) {
                if ((newmessageInfo!.ref) ? Math.abs(replyMessageInfo.ref.getBoundingClientRect().y - newmessageInfo!.ref.getBoundingClientRect().y) < 1200 : false) {
                    replyMessageInfo.ref.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                        inline: 'center',
                    });
                } else {
                    replyMessageInfo.ref.scrollIntoView({
                        behavior: 'instant',
                        block: 'center',
                        inline: 'center',
                    });
                }
                replyMessageInfo.ref.animate(ReplyMessageAnimationKeyframes, ReplyMessageAnimationOptions);
            }
        }
    }

    return (
        <>
            <div id="channel-box" className={styles.channel_box} style={{ gridTemplateRows: (`${(replyingTo == null) ? ("5fr") : ''} ${(replyingTo !== null) ? "50vh 26vh" : ''} 12vh`) }}>
                <div className={`${styles.message_box} ${replyingTo && (styles.message_box_reply)}`} ref={scrollPageRef}>
                    {messages.map((message) => {
                        const messageinfo: MessageInfo = {
                            deleteConfirm: false,
                            editMode: false,
                            Message: message,
                            ref: null
                        };
                        MessageInfos.push(messageinfo);
                        return (
                            <div className={styles.message} onMouseOver={() => onMouseHoverOver(message.id?.toString())} onMouseLeave={onMouseHoverOut} ref={(ref) => { let msgInfo = MessageInfos.find(x => x.Message.id == message.id); if (msgInfo) { msgInfo.ref = ref } }} key={message.id}>
                                {message.repliedTo && (<div className={styles.message_reply_inner}>
                                    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="x100y54 meet" viewBox="0 0 100 54" width="10vh" height="10vh">
                                        <path d="M 4 54 q 0 -50 50 -50" fill="none" stroke='black' strokeWidth={4} />
                                        <path d="M 54 4 l 50 0" fill="none" stroke='black' strokeWidth={4} />
                                    </svg>
                                    <div className={styles.message_reply_inner_holder} onClick={(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => { onClickReplyMessage(ev, messageinfo) }}>
                                        <div className={styles.message_reply_useravatar_holder}>
                                            <img className={styles.message_useravatar} src={`${message.repliedTo.author.avatarUrl/*https://cat-storage-server.web.app/data/cat1.jpeg"*/}`} />
                                        </div>
                                        <p className={styles.message_reply_content} style={{width: (MessageInfos.find(x => x.Message.id === message.id)!.ref) ? (MessageInfos.find(x => x.Message.id === message.id)!.ref!.clientWidth * 2/5)+"px" : "40vw"}}>{message.repliedTo.content}</p>
                                    </div>
                                    {(message.repliedTo) && (<div id="message-actions-holder" className={`${styles.message_actions_holder} ${(hoveredMessageId == message.id?.toString()) ? styles.message_actions_holder_active : ''}`}>
                                        <div className={`${styles.message_actions} ${styles.message_actions_holder_reply} `}>
                                            <div className={styles.message_action} onClick={() => _onMessageReply(message)}>
                                                <img src={'/reply.svg'} width={"15vh"} height={"15vh"} alt={'Reply'}></img>
                                            </div>
                                            {message.author.id === Currents.user?.id && (
                                                <>
                                                    <div className={styles.vl}> </div>
                                                    <div className={styles.message_action} onClick={(ev: React.MouseEvent) => { onMessageEdit(messageinfo) }}>
                                                        <img src={'/edit.svg'} width={"15vh"} height={"15vh"} alt={'Edit'}></img>
                                                    </div></>
                                            )}
                                            <div className={`${styles.message_action_delete} ${((kbState && (kbState.find(key => key == "Shift"))) && (message.author.id == Currents.user?.id)) ? styles.message_action_delete_active : ''}`}>
                                                <div className={styles.vl}> </div>
                                                <div className={styles.message_action} onClick={() => _onMessageDelete(message)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" id="delete">
                                                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                                                        <path className={styles.icons_delete} d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z" fill={MessageInfos.find(msg => msg.Message.id === message.id)?.deleteConfirm ? 'var(--cb-color-red)' : 'var(--cb-color-white)'}></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)}
                                </div>)}
                                <div className={styles.message_inner}>
                                    <div className={styles.message_useravatar_holder}>
                                        <img className={styles.message_useravatar} src={`${message.author.avatarUrl/*https://cat-storage-server.web.app/data/cat1.jpeg"*/}`} onClick={(ev: React.MouseEvent) => onClickUserAvatar(message.id, ev)} />
                                    </div>
                                    <div className={styles.message_user_holder}>
                                        <div className={styles.message_content_holder}>
                                            <p className={styles.message_username}>{message.author.username}</p>
                                            <p className={styles.message_timestamp}>{GetMessageDateString(new Date(message.timestamp))}</p>
                                        </div>
                                        <div>
                                            {!(MessageInfos.find(msg => msg.Message.id === message.id)?.editMode) && (
                                                <p className={styles.message_content} style={{width: (MessageInfos.find(x => x.Message.id === message.id)!.ref) ? (MessageInfos.find(x => x.Message.id === message.id)!.ref!.clientWidth * 7/10)+"px" : "40vw"}}>{message.content}</p>)}
                                            {(MessageInfos.find(msg => msg.Message.id === message.id)?.editMode) && (
                                                <>
                                                    <textarea className={styles.edit_message_textarea} style={{width: (MessageInfos.find(x => x.Message.id === message.id)!.ref) ? (MessageInfos.find(x => x.Message.id === message.id)!.ref!.clientWidth * 7/10)+"px" : "40vw"}} onKeyDown={(ev) => { onEditInput(message, ev) }} defaultValue={message.content}></textarea>
                                                </>)}
                                        </div>
                                    </div>
                                    {(!message.repliedTo) && (<div id="message-actions-holder" className={`${styles.message_actions_holder} ${(hoveredMessageId == message.id?.toString()) ? styles.message_actions_holder_active : ''}`}>
                                        <div className={styles.message_actions}>
                                            <div className={styles.message_action} onClick={() => _onMessageReply(message)}>
                                                <img src={'/reply.svg'} width={"15vh"} height={"15vh"} alt={'Reply'}></img>
                                            </div>
                                            {message.author.id === Currents.user?.id && (
                                                <>
                                                    <div className={styles.vl}> </div>
                                                    <div className={styles.message_action} onClick={(ev: React.MouseEvent) => { onMessageEdit(messageinfo) }}>
                                                        <img src={'/edit.svg'} width={"15vh"} height={"15vh"} alt={'Edit'}></img>
                                                    </div></>
                                            )}
                                            <div className={`${styles.message_action_delete} ${((kbState && (kbState.find(key => key == "Shift"))) && (message.author.id == Currents.user?.id)) ? styles.message_action_delete_active : ''}`}>
                                                <div className={styles.vl}> </div>
                                                <div className={styles.message_action} onClick={() => _onMessageDelete(message)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" id="delete">
                                                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                                                        <path className={styles.icons_delete} d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z" fill={MessageInfos.find(msg => msg.Message.id === message.id)?.deleteConfirm ? 'var(--cb-color-red)' : 'var(--cb-color-white)'}></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)}
                                </div>
                            </div>
                        );
                    })}
                </div>
                {replyingTo && (<div className={`${styles.message_reply_box}`}>
                    <div className={styles.message_box_reply_top}>
                        <p className={styles.message_box_reply_text}>Replying to:</p>
                        <img src={'/clear.svg'} width={"40vh"} height={"40vh"} alt={'Clear'} onClick={onClickCloseReplyBox} className={styles.icons_clear}></img>
                    </div>
                    <div className={styles.message_box_reply_bottom}>
                        <div className={styles.reply_message}>
                            <div className={styles.message_useravatar_holder}>
                                <img className={styles.message_useravatar} src={`${replyingTo.author.avatarUrl/*https://cat-storage-server.web.app/data/cat1.jpeg"*/}`} />
                            </div>
                            <div className={styles.message_user_holder}>
                                <div className={styles.message_content_holder}>
                                    <p className={styles.message_username}>{replyingTo.author.username}</p>
                                    <p className={styles.message_timestamp}>{GetMessageDateString(new Date(replyingTo.timestamp))}</p>
                                </div>
                                <p className={styles.message_content}>{replyingTo.content}</p>
                            </div>
                        </div>
                    </div>
                </div>)}
                <div className={`${styles.message_box_wraper} ${replyingTo && (styles.message_box_wraper_reply)}`}>
                    <textarea className={`${styles.contenteditable} ${styles.msg_typer}`} onKeyDown={onKeyDownInput} />
                </div>
            </div>
        </>
    );
};

export default ChannelBox;