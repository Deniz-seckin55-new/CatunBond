import styles from '../page.module.css';

import React, { useEffect, useRef, useState } from 'react';
import { GetMessageDateString, Currents, MessageInfo, UpdateMessageInfo, onMouseLeaveTooltipElement, onMouseOverTooltipElement, _arrayBufferToBase64, _base64ToarrayBuffer, ToUserSmall } from '../utils/utils';
import { Message, User } from '../utils/socket_utils';
import interact from 'interactjs';
import { io, Socket } from 'socket.io-client';
import { MediaConnection, Peer } from 'peerjs';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Emoji, { toArray as toArrayEmoji } from "react-emoji-render";
import { useCurrents } from '@/store/currents';
import { useWritingUsers } from '@/store/writingusers';

interface Props {
    onInputTextarea: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onLoadTextarea: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onKeyDownInput: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    onMessageReply: (message: Message) => void;
    onMessageEdit: (message: MessageInfo) => void;
    onMessageDelete: (message: Message) => void;
    onEditInput: (message: Message, event: React.KeyboardEvent) => void;
    onClickUserAvatar: (messageId: string | null, event: React.MouseEvent) => void;
    onClickMicrophone: () => void;
    onClickLeaveCall: () => void;
    setreplyingTo: (message: Message | null) => void;
    getMediaStream: () => Promise<MediaStream | undefined>;
    MessageInfos: MessageInfo[];
    setMessageInfos: React.Dispatch<React.SetStateAction<MessageInfo[]>>;
    replyingTo: Message | null;
    kbState: String[];
    messages: Message[];
    voicesocket: Socket | undefined;
    localStream: MediaStream | null;
    userStreams: { [userId: string]: MediaStream };
    setUserStreams: React.Dispatch<React.SetStateAction<{ [userId: string]: MediaStream }>>;
    calls: Record<string, MediaConnection>;
    setcalls: React.Dispatch<React.SetStateAction<Record<string, MediaConnection>>>;
    peer: Peer | null;
    microphoneState: Boolean
}

const parseEmojis = (value: string) => {
    const emojisArray = toArrayEmoji(value);

    // toArray outputs React elements for emojis and strings for other
    const newValue = emojisArray.reduce((previous: any, current: any) => {
        if (typeof current === "string") {
            return previous + current;
        }
        return previous + current.props.children;
    }, "");

    return newValue;
};

var voicesocket: Socket | undefined;

const ReplyMessageAnimationKeyframes = [{ backgroundColor: 'var(--cb-color-red)' }, { backgroundColor: 'transparent' }];
const ReplyMessageAnimationOptions: KeyframeAnimationOptions = { duration: 500, easing: 'ease-in-out', iterations: 1, fill: 'none' };

const ChannelBox: React.FC<Props> = ({ onInputTextarea, onLoadTextarea, onMessageReply, onMessageEdit, onMessageDelete, onEditInput, onKeyDownInput, MessageInfos, setMessageInfos, replyingTo, setreplyingTo, onClickUserAvatar, onClickMicrophone, onClickLeaveCall, getMediaStream, kbState, messages, localStream, userStreams, setUserStreams, calls, setcalls, peer, microphoneState }) => {
    const { writingUsers } = useWritingUsers();

    const [userScroll, setuserScroll] = useState(0);
    const [hoveredMessageId, setHoveredMessageId] = useState<String | null>(null);
    const [writingUsersText, setwritingUsersText] = useState<string>("");
    const scrollPageRef = useRef<HTMLDivElement>(null);
    const vcboxRef = useRef<HTMLDivElement>(null);
    const editRefs = useRef<Record<string, HTMLTextAreaElement | null>>({});
    const AudioRef = useRef<HTMLAudioElement>(null);

    const currents = useCurrents();

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

    useEffect(() => {
        if (writingUsers.length > 4) {
            setwritingUsersText(writingUsers.slice(0, 4).join(", ") + " and others are writing...");
        } else if (writingUsers.length > 1) {
            setwritingUsersText(writingUsers.join(", ") + " is writing...");
        } else {
            setwritingUsersText("");
        }
    }, [writingUsers]);

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
        const replyMessageId = message.Message.repliedToId;
        const replyMessageInfo = MessageInfos.find(x => x.Message.id === replyMessageId);
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

    const onMouseMove = (ev: React.MouseEvent) => {
        // if (!vcboxRef.current) return;

        // if (ev.button === 0 && ev.buttons !== 0) {
        //     vcboxRef.current.style.top = vcboxRef.current.clientHeight + ev.clientY + "px";
        // }
    }
    useEffect(() => {
        if (vcboxRef.current) {
            interact(vcboxRef.current).resizable({
                edges: { bottom: true },
                modifiers: [
                    interact.modifiers.restrictEdges({
                        outer: 'parent'
                    }),

                    interact.modifiers.restrictSize({
                        min: { width: vcboxRef.current.clientWidth, height: 100 }
                    })
                ],
                listeners: {
                    move(event: any) {
                        var target = event.target;
                        var y = (parseFloat(target.getAttribute('data-y')) || 0)

                        // update the element's style
                        target.style.height = event.rect.height + 'px'

                        // translate when resizing from top or left edges
                        y += event.deltaRect.top

                        target.style.transform = 'translateY(' + y + 'px)'

                        target.setAttribute('data-y', y)
                    }
                }
            })
        }
    }, [vcboxRef.current])

    const settooltipText = (text: string) => {
        currents.setTooltipText(text);
    }

    /// Voice Chat
    useEffect(() => {
        if (AudioRef.current) {
            getMediaStream().then(stream => {
                if (stream)
                    AudioRef.current!.srcObject = stream;
            })
        }
    }, [AudioRef.current, microphoneState])


    useEffect(() => {
        if (!currents.user) return;
        if (!currents.user.id) return;
        if (!currents.vc) return;

        voicesocket = io("http://localhost:3002", {
            query: {
                info: [currents.user.id, currents.user.username, currents.user.avatarUrl].join(","), // CHANGE LATER !! IMPORTANT !!
                vc: currents.vc,
            }
        });

        console.log("Set VCS!");
        voicesocket.on("vc_update", (eventType: string, eventUser: User) => {
            console.log("vc_update", { eventType, eventUser: eventUser });
            if (eventType === "join") {
                if (currents.vc?.members.find(x => x.id === eventUser.id) === undefined) {
                    currents.setVCUsers([...currents.vc!.members, eventUser]);
                }
                if (!Object.keys(calls).includes(`${eventUser.id}`)) {
                    if (!peer) return;

                    const call = peer.call(`${eventUser.id}_peeruser`, localStream!, {
                        metadata: {
                            user: ToUserSmall(currents.user!),
                        }
                    });

                    setcalls((prev) => ({ ...prev, [eventUser.id]: call }));

                    call.on('stream', (remoteStream) => {
                        setUserStreams(prev => ({
                            ...prev,
                            [eventUser.id]: remoteStream,
                        }))
                    });

                    call.on("close", () => {
                        setUserStreams(prev => {
                            const updatedStreams = { ...prev };
                            delete updatedStreams[eventUser.id];
                            return updatedStreams;
                        });
                        currents.setVCUsers(currents.vc!.members.filter(x => x.id !== eventUser.id));
                    });
                }
            } else if (eventType === "leave") {
                if (currents.vc?.members.find(x => x.id === eventUser.id) !== undefined)
                    currents.setVCUsers(currents.vc?.members.filter(x => x.id !== eventUser.id))
                try {
                    setUserStreams((prev) => {
                        const newStreams = { ...prev };
                        delete newStreams[eventUser.id];
                        return newStreams;
                    });
                } catch (err) { }
            }
        });

        return () => { voicesocket?.disconnect(); }
    }, [currents.user, currents.vc]);
    /// Voice Chat End

    useEffect(() => {
        console.log(userStreams);
    }, [userStreams])

    return (
        <>
            <div id="channel-box" className={styles.channel_box} onMouseMove={onMouseMove}>
                <audio ref={AudioRef} style={{ display: 'none' }} autoPlay={false} />
                {Object.entries(userStreams).map(([userId, url]) => {
                    return <audio key={userId} style={{ display: 'none' }} ref={(audio) => { if (audio) audio.srcObject = url; }} autoPlay={true} />
                })}
                {(currents.voicechatopen && currents.vc) && (
                    <div className={styles.channel_box_vc} ref={vcboxRef}>
                        <div className={styles.channel_box_vc_top}>
                            <div className={styles.vc_actions_left}>

                            </div>
                            <div className={styles.vc_actions_right}>

                            </div>
                        </div>
                        <div className={styles.channel_box_vc_middle}>
                            {currents.vc.members.map((user) => {
                                return (
                                    <div key={user.id}>
                                        <div className={styles.auto_useravatar_holder}>
                                            <img className={styles.message_useravatar} src={`${user.avatarUrl/*https://cat-storage-server.web.app/data/cat1.jpeg"*/}`} onClick={(ev: React.MouseEvent) => { }} />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className={styles.channel_box_vc_bottom}>
                            <div className={styles.vc_actions_left}>

                            </div>
                            <div className={styles.vc_actions_middle}>
                                <div className={styles.vc_icon_holder}>
                                    <svg className={styles.vc_icon} onClick={() => { onClickMicrophone(); settooltipText(microphoneState ? "Turn Microphone Off" : "Turn Microphone On"); }} onMouseLeave={() => onMouseLeaveTooltipElement(currents)} onMouseOver={(ev) => onMouseOverTooltipElement(ev, microphoneState ? "Turn Microphone Off" : "Turn Microphone On", currents)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="micrphone">
                                        <path d="M12 15c1.66 0 2.99-1.34 2.99-3L15 6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm6.08-3c-.42 0-.77.3-.83.71-.37 2.61-2.72 4.39-5.25 4.39s-4.88-1.77-5.25-4.39c-.06-.41-.42-.71-.83-.71-.52 0-.92.46-.85.97.46 2.97 2.96 5.3 5.93 5.75V21c0 .55.45 1 1 1s1-.45 1-1v-2.28c2.96-.43 5.47-2.78 5.93-5.75.07-.51-.33-.97-.85-.97z" fill="var(--cb-color-white)"></path>
                                    </svg>
                                    <div className={styles.vc_icon_overlap_holder}>
                                        <div className={styles.vc_icon_overlap} style={{ width: (microphoneState ? '0em' : '1em') }}></div>
                                    </div>
                                </div>
                                <svg className={styles.vc_icon_inactive} onMouseLeave={() => onMouseLeaveTooltipElement(currents)} onMouseOver={(ev) => onMouseOverTooltipElement(ev, "Screen Share", currents)} xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" id="share-screen">
                                    <g id="share_screen">
                                        <path fill="var(--cb-color-white-soft)" d="M9,11c0-1.1-0.9-2-2-2H4c-1.1,0-2,0.9-2,2v6c0,1.1,0.9,2,2,2h3c1.1,0,2-0.9,2-2V11z M4,17v-6h3l0,6H4z"></path>
                                        <path fill="var(--cb-color-white-soft)" d="M19,4H7C5.3,4,4,5.3,4,7c0,0.6,0.4,1,1,1s1-0.4,1-1c0-0.6,0.4-1,1-1h12c0.6,0,1,0.4,1,1v7c0,0.6-0.4,1-1,1h-7
			c-0.6,0-1,0.4-1,1v2h-1c-0.6,0-1,0.4-1,1s0.4,1,1,1h4c0.6,0,1-0.4,1-1s-0.4-1-1-1h-1v-1h6c1.7,0,3-1.3,3-3V7C22,5.3,20.7,4,19,4z"></path>
                                    </g>
                                </svg>
                                <svg className={styles.vc_icon_inactive} onMouseLeave={() => onMouseLeaveTooltipElement(currents)} onMouseOver={(ev) => onMouseOverTooltipElement(ev, "Video Share", currents)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="videocam">
                                    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l2.29 2.29c.63.63 1.71.18 1.71-.71V8.91c0-.89-1.08-1.34-1.71-.71L17 10.5z" fill="var(--cb-color-white-soft)"></path>
                                </svg>
                                <svg className={`${styles.vc_icon_leave}`} onClick={onClickLeaveCall} onMouseLeave={() => onMouseLeaveTooltipElement(currents)} onMouseOver={(ev) => onMouseOverTooltipElement(ev, "Leave Call", currents)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="call">
                                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                                    <path d="m19.23 15.26-2.54-.29a1.99 1.99 0 0 0-1.64.57l-1.84 1.84a15.045 15.045 0 0 1-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52a2.001 2.001 0 0 0-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z" fill="var(--cb-color-white)"></path>
                                </svg>
                            </div>
                            <div className={styles.vc_actions_right}>

                            </div>
                        </div>

                        <hr className={styles.hr_resize} />
                    </div>
                )}
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
                                {
                                    (() => {
                                        if (message.repliedToId && message.repliedTo) {
                                            let replyMsg: Message | undefined = messages.find(x => x.id === message.repliedToId);
                                            if (!replyMsg) replyMsg = {
                                                ...message.repliedTo,
                                                repliedTo: null,
                                            }
                                            return (<div className={styles.message_reply_inner}>
                                                <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="x100y54 meet" viewBox="0 0 100 54" width="3em" height="3em">
                                                    <path d="M 4 54 q 0 -50 50 -50" fill="none" stroke='black' strokeWidth={4} />
                                                    <path d="M 54 4 l 50 0" fill="none" stroke='black' strokeWidth={4} />
                                                </svg>
                                                <div className={styles.message_reply_inner_holder} onClick={(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => { onClickReplyMessage(ev, messageinfo) }}>
                                                    <div className={styles.message_reply_useravatar_holder}>
                                                        <img className={styles.message_useravatar} src={`${replyMsg.author.avatarUrl/*https://cat-storage-server.web.app/data/cat1.jpeg"*/}`} />
                                                    </div>
                                                    <p className={styles.message_reply_content} style={{ width: (MessageInfos.find(x => x.Message.id === message.id)!.ref) ? (MessageInfos.find(x => x.Message.id === message.id)!.ref!.clientWidth * 2 / 5) + "px" : "40vw" }}>{replyMsg.content}</p>
                                                </div>
                                                <div id="message-actions-holder" className={`${styles.message_actions_holder} ${(hoveredMessageId == message.id?.toString()) ? styles.message_actions_holder_active : ''}`}>
                                                    <div className={`${styles.message_actions} ${styles.message_actions_holder_reply} `}>
                                                        <div className={styles.message_action} onClick={() => _onMessageReply(message)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" id="reply">
                                                                <path fill="#F0F7EE" d="M3.707,7.99946609 L6.3890873,10.6819805 C6.58434944,10.8772427 6.58434944,11.1938252 6.3890873,11.3890873 C6.21552094,11.5626536 5.94609654,11.5819388 5.7512284,11.4469427 L5.68198052,11.3890873 L2.11603371,7.82029139 L2.11603371,7.82029139 L2.06639375,7.74915207 L2.06639375,7.74915207 L2.03875135,7.69334249 L2.03875135,7.69334249 L2.0159743,7.62570887 L2.0159743,7.62570887 L2.01108568,7.60498705 C2.00382515,7.57130067 2,7.53609704 2,7.5 L2.00546187,7.57391777 L2.00179699,7.5424826 L2.00179699,7.5424826 L2.00179763,7.45747863 L2.00179763,7.45747863 L2.01678848,7.37116919 L2.01678848,7.37116919 L2.03779224,7.30896344 L2.03779224,7.30896344 L2.07718801,7.23298968 L2.07718801,7.23298968 L2.13168953,7.16184291 L2.13168953,7.16184291 L5.68198052,3.6109127 C5.87724266,3.41565056 6.19382515,3.41565056 6.3890873,3.6109127 C6.56265365,3.78447906 6.5819388,4.05390346 6.44694275,4.2487716 L6.3890873,4.31801948 L3.707,6.99946609 L8,7 C11.5217665,7 13.8853902,8.97580254 13.9959473,11.7924218 L14,12 C14,12.2761424 13.7761424,12.5 13.5,12.5 C13.2238576,12.5 13,12.2761424 13,12 C13,9.72683267 11.1925298,8.09541085 8.26151713,8.00404239 L8,8 L3.707,7.99946609 L6.3890873,10.6819805 L3.707,7.99946609 Z"></path>
                                                            </svg>
                                                        </div>
                                                        {message.author.id === currents.user?.id && (
                                                            <>
                                                                <div className={styles.vl}> </div>
                                                                <div className={styles.message_action} onClick={(ev: React.MouseEvent) => { onMessageEdit(messageinfo) }}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" id="edit">
                                                                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                                                                        <path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="#F0F7EE"></path>
                                                                    </svg>
                                                                </div></>
                                                        )}
                                                        <div className={`${styles.message_action_delete} ${((kbState && (kbState.find(key => key == "Shift"))) && (message.author.id == currents.user?.id)) ? styles.message_action_delete_active : ''}`}>
                                                            <div className={styles.vl}> </div>
                                                            <div className={styles.message_action} onClick={() => _onMessageDelete(message)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" id="delete">
                                                                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                                                                    <path className={styles.icons_delete} d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z" fill={MessageInfos.find(msg => msg.Message.id === message.id)?.deleteConfirm ? 'var(--cb-color-red)' : 'var(--cb-color-white)'}></path>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>)
                                        }
                                    })()
                                }
                                <div className={styles.message_inner}>
                                    <div className={styles.message_useravatar_holder} onContextMenuCapture={(ev) => { ev.preventDefault(); onClickUserAvatar(message.id, ev) }}>
                                        <img className={styles.message_useravatar} src={`${message.author.avatarUrl/*https://cat-storage-server.web.app/data/cat1.jpeg"*/}`} onContextMenuCapture={(ev) => { ev.preventDefault(); onClickUserAvatar(message.id, ev) }} />
                                    </div>
                                    <div className={styles.message_user_holder}>
                                        <div className={styles.message_content_holder}>
                                            <p className={styles.message_username}>{message.author.username}</p>
                                            <p className={styles.message_timestamp}>{GetMessageDateString(new Date(message.timestamp))}</p>
                                        </div>
                                        <div>
                                            {!(MessageInfos.find(msg => msg.Message.id === message.id)?.editMode) && (
                                                <div className={styles.message_content} style={{ width: (MessageInfos.find(x => x.Message.id === message.id)!.ref) ? (MessageInfos.find(x => x.Message.id === message.id)!.ref!.clientWidth * 7 / 10) + "px" : "40vw" }}>
                                                    <ReactMarkdown components={{
                                                        code(props) {
                                                            const { children, className, ref, ...rest } = props
                                                            const match = /language-(\w+)/.exec(className || "");
                                                            return match ? (
                                                                <SyntaxHighlighter
                                                                    PreTag="div"
                                                                    language={match[1]}
                                                                    style={atomDark as any}
                                                                    {...rest}
                                                                >
                                                                    {String(children)}
                                                                </SyntaxHighlighter>
                                                            ) : (
                                                                <code {...rest} className={className}>
                                                                    {children}
                                                                </code>
                                                            )
                                                        }
                                                    }}>{parseEmojis(message.content)}</ReactMarkdown>
                                                </div>
                                            )}
                                            {(MessageInfos.find(msg => msg.Message.id === message.id)?.editMode) && (
                                                <>
                                                    <textarea className={styles.edit_message_textarea} style={{ width: (MessageInfos.find(x => x.Message.id === message.id)!.ref) ? (MessageInfos.find(x => x.Message.id === message.id)!.ref!.clientWidth * 7 / 10) + "px" : "40vw" }} onKeyDown={(ev) => { onEditInput(message, ev) }} defaultValue={message.content}></textarea>
                                                </>)}
                                        </div>
                                    </div>
                                    {(!message.repliedToId) && (<div id="message-actions-holder" className={`${styles.message_actions_holder} ${(hoveredMessageId == message.id?.toString()) ? styles.message_actions_holder_active : ''}`}>
                                        <div className={styles.message_actions}>
                                            <div className={styles.message_action} onClick={() => _onMessageReply(message)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" id="reply">
                                                    <path fill="#F0F7EE" d="M3.707,7.99946609 L6.3890873,10.6819805 C6.58434944,10.8772427 6.58434944,11.1938252 6.3890873,11.3890873 C6.21552094,11.5626536 5.94609654,11.5819388 5.7512284,11.4469427 L5.68198052,11.3890873 L2.11603371,7.82029139 L2.11603371,7.82029139 L2.06639375,7.74915207 L2.06639375,7.74915207 L2.03875135,7.69334249 L2.03875135,7.69334249 L2.0159743,7.62570887 L2.0159743,7.62570887 L2.01108568,7.60498705 C2.00382515,7.57130067 2,7.53609704 2,7.5 L2.00546187,7.57391777 L2.00179699,7.5424826 L2.00179699,7.5424826 L2.00179763,7.45747863 L2.00179763,7.45747863 L2.01678848,7.37116919 L2.01678848,7.37116919 L2.03779224,7.30896344 L2.03779224,7.30896344 L2.07718801,7.23298968 L2.07718801,7.23298968 L2.13168953,7.16184291 L2.13168953,7.16184291 L5.68198052,3.6109127 C5.87724266,3.41565056 6.19382515,3.41565056 6.3890873,3.6109127 C6.56265365,3.78447906 6.5819388,4.05390346 6.44694275,4.2487716 L6.3890873,4.31801948 L3.707,6.99946609 L8,7 C11.5217665,7 13.8853902,8.97580254 13.9959473,11.7924218 L14,12 C14,12.2761424 13.7761424,12.5 13.5,12.5 C13.2238576,12.5 13,12.2761424 13,12 C13,9.72683267 11.1925298,8.09541085 8.26151713,8.00404239 L8,8 L3.707,7.99946609 L6.3890873,10.6819805 L3.707,7.99946609 Z"></path>
                                                </svg>
                                            </div>
                                            {message.author.id === currents.user?.id && (
                                                <>
                                                    <div className={styles.vl}> </div>
                                                    <div className={styles.message_action} onClick={(ev: React.MouseEvent) => { onMessageEdit(messageinfo) }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" id="edit">
                                                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                                                            <path d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="#F0F7EE"></path>
                                                        </svg>
                                                    </div></>
                                            )}
                                            <div className={`${styles.message_action_delete} ${((kbState && (kbState.find(key => key == "Shift"))) && (message.author.id == currents.user?.id)) ? styles.message_action_delete_active : ''}`}>
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
                <div className={styles.writing_users_div}>
                    <p className={styles.writing_users_text}>{writingUsersText}</p>
                </div>
            </div>
        </>
    );
};

export default ChannelBox;