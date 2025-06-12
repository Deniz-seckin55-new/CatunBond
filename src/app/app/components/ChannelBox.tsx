import styles from '../page.module.css';

import emojiList from '@/data/emojiList.json';
import useChannelBoxStore from '@/store/channelBoxStore';
import { useChannelInfoStore } from '@/store/channelInfos';
import { useCurrents } from '@/store/currents';
import { useKBState } from '@/store/kbState';
import { useMemory } from '@/store/memory';
import { useMessageInfoStore } from '@/store/messageInfos';
import { useMessagesStore } from '@/store/messages';
import useReactionMenuStore from '@/store/reactionMenu';
import { useUserInfoStore } from '@/store/userInfos';
import { useWritingUsers } from '@/store/writingusers';
import axios from 'axios';
import interact from 'interactjs';
import Image from 'next/image';
import { MediaConnection, Peer } from 'peerjs';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, useTransition } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { io, Socket } from 'socket.io-client';
import { MESSAGE_LOAD_DEFAULT_AMOUNT } from '../utils/constants';
import { Channel, ChannelInfo, DetailedDBUser, Message, User } from '../utils/socket_utils';
import { SyntaxHighlight } from '../utils/syntax';
import { AllMessageSyntaxHighlights, GetMessageDateString, MessageInfo, onMouseLeaveTooltipElement, onMouseOverTooltipElement, parseEmojis, showAutoCompleteMentionRegex, ToUserSmall, UpdateMessageInfo } from '../utils/utils';
import { useGetUserByUsernameSync, useGetUserInfo } from './common/GetUser';
import { MessageElement } from './common/MessageElement';
import ScrollToBottomButton from './common/ScrollToBottomButton';
import { DefaultUserVariables, useVariablesStore } from '@/store/variablesStore';

const VoiceSocketURL = "http://localhost:3002";

interface Props {
    onInputTextarea: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onLoadTextarea: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onKeyDownInput: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    onMessageReply: (message: Message) => void;
    onMessageReact: (message: Message) => void;
    onMessageEdit: (message: MessageInfo) => void;
    onMessageDelete: (message: Message) => void;
    onEditInput: (message: Message, event: React.KeyboardEvent) => void;
    onClickUserAvatar: (messageId: string | null, event: React.MouseEvent) => void;
    onClickUserAvatarWithUserId: (userId: string | null, event: React.MouseEvent) => void;
    addReactionToMessage: (messageId: string, channelId: string, emojiName: string) => void;
    sendMessageWithTextarea: (message: string, ch: Channel, usr: DetailedDBUser, textarea: HTMLTextAreaElement) => void;
    onClickMicrophone: () => void;
    onClickLeaveCall: () => void;
    getMediaStream: () => Promise<MediaStream | undefined>;
    voicesocket: Socket | undefined;
    localStream: MediaStream | null;
    userStreams: { [userId: string]: MediaStream };
    setUserStreams: React.Dispatch<React.SetStateAction<{ [userId: string]: MediaStream }>>;
    calls: Record<string, MediaConnection>;
    setcalls: React.Dispatch<React.SetStateAction<Record<string, MediaConnection>>>;
    peer: Peer | null;
    microphoneState: boolean;
}

function splitName(fullName: string) {
    const idx = fullName.lastIndexOf('.');
    // no dot or leading dot only
    if (idx <= 0) {
        return { fileName: fullName, fileExtension: '' };
    }
    return {
        fileName: fullName.substring(0, idx),
        fileExtension: fullName.slice(idx + 1),
    };
}

let voicesocket: Socket | undefined;

function getVolume(stream: MediaStream) {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;

    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    analyser.getByteTimeDomainData(dataArray);

    // Normalize and calculate volume (simple RMS method)
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
        const value = dataArray[i] - 128; // center around zero
        sum += value * value;
    }
    const rms = Math.sqrt(sum / dataArray.length); // root mean square
    return rms; // this is the volume level (0 - ~128)
}


const ReplyMessageAnimationKeyframes = [{ backgroundColor: 'var(--cb-color-red)' }, { backgroundColor: 'transparent' }];
const ReplyMessageAnimationOptions: KeyframeAnimationOptions = { duration: 500, easing: 'ease-in-out', iterations: 1, fill: 'none' };

const ChannelBox: React.FC<Props> = ({ onMessageReply, onMessageReact, onMessageEdit, onMessageDelete, onEditInput, onKeyDownInput, onClickUserAvatar, onClickUserAvatarWithUserId, addReactionToMessage, sendMessageWithTextarea, onClickMicrophone, onClickLeaveCall, getMediaStream, localStream, userStreams, setUserStreams, calls, setcalls, peer, microphoneState }) => {
    const { writingUsers } = useWritingUsers();
    const { messages, ...messagesState } = useMessagesStore();
    const { MessageInfos, setMessageInfos } = useMessageInfoStore();
    const MEM = useMemory();
    const { kbState } = useKBState();

    const reactionMenuStore = useReactionMenuStore();
    const chStore = useChannelBoxStore();
    const getUserByUsername = useGetUserByUsernameSync();
    const channelInfoStore = useChannelInfoStore();

    const [userScroll, setuserScroll] = useState(0);
    const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
    const [writingUsersText, setwritingUsersText] = useState<string>("");
    const scrollPageRef = useRef<VirtuosoHandle>(null);
    const scrollPageDivRef = useRef<HTMLDivElement>(null);
    const vcboxRef = useRef<HTMLDivElement>(null);
    const AudioRef = useRef<HTMLAudioElement>(null);

    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 10,
        maxSize: 50000000, // 50 MB
        multiple: true,
        onDropAccepted: async (acceptFiles: File[]) => {
            const files = acceptFiles;
            chStore.setacceptedFiles(files);
            // const _fileUrls = files.map(async (file) => {
            //     return (await getFileDataUrl(file) as string);
            // });
            // const fileUrls = await Promise.all(_fileUrls);
            // setFileUrls(fileUrls);

            toast("Uploaded files " + files.map(x => x.name).join(", "));
        },
        onDropRejected(fileRejections) {
            chStore.setacceptedFiles([]);
            toast("Rejected files " + fileRejections.map(x => x.file.name + ": " + x.errors[0].message).join(", "));
        },
    });

    const currents = useCurrents();

    const getUserI = useGetUserInfo();

    const currentChannelInfo = currents.channel ? channelInfoStore.getExistingInfo(currents.channel.id) : undefined;
    const messagesLength = messages.length;

    useEffect(() => {
        if (currents.channel) {
            const channelId = currents.channel.id;
            const info = channelInfoStore.getExistingInfo(channelId);

            if (!info) {
                const fetchChannelInfo = async () => {
                    channelInfoStore.addfetchingInfo(channelId);

                    const response = await axios.get(`/api/v1/channels/${channelId}/info`);
                    const ChannelInfo: ChannelInfo = response.data.data;

                    channelInfoStore.addInfo(ChannelInfo);
                    channelInfoStore.removefetchingInfo(channelId);
                }

                fetchChannelInfo();
            }
        }
    }, [currents.channel]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const messageAuthors = new Set(messages.map(m => m.author.id));
            console.log(messageAuthors);
            for (const auser of messageAuthors) {
                if (!useUserInfoStore.getState().getExistingUserInfo(auser)) {
                    await getUserI(auser);
                }
            }
        };
        fetchUserInfo();
    }, [messages]);

    const onScrollMessages = (ev: React.UIEvent<HTMLDivElement>) => {
        const el = ev.currentTarget;            // ← THIS is the real DOM node
        const box = messageBoxRef.current;
        if (!box) return;

        const threshold = box.getBoundingClientRect().height + 100;
        const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < threshold;

        setuserScroll(atBottom ? 0 : 1);
    };

    useLayoutEffect(() => {
        const api = scrollPageRef.current;
        const div = scrollPageDivRef.current;
        if (!api || !div) return;

        console.log(userScroll);

        if (userScroll === 0) {
            requestAnimationFrame(() => {
                api.scrollToIndex(messages.length - 1);
            });
        }
    }, [messages, userScroll]);

    // useEffect(() => {
    //     console.log("userScroll: ", userScroll);
    //     if (scrollPageRef.current) {
    //         scrollPageRef.current.addEventListener('scroll', (ev: Event) => {
    //             if (scrollPageRef.current)
    //                 if (Math.abs(scrollPageRef.current.scrollTop - scrollPageRef.current.scrollHeight) >= 1000) {
    //                     setuserScroll(1);
    //                 }
    //         });
    //         if (userScroll == 0) {
    //             scrollPageRef.current.scrollBy({
    //                 behavior: 'smooth',
    //                 left: 0,
    //                 top: scrollPageRef.current.scrollHeight,
    //             });
    //         } else if (userScroll == 1) {
    //             if (Math.abs(scrollPageRef.current.scrollTop - scrollPageRef.current.scrollHeight) < 1000) {
    //                 setuserScroll(0);
    //             }
    //         }

    //         return () => {
    //             if (scrollPageRef.current)
    //                 scrollPageRef.current.removeEventListener('scroll', (ev: Event) => {
    //                     setuserScroll(1);
    //                 });
    //         }
    //     }
    // }, [scrollPageRef, messages]);

    useEffect(() => {
        if (writingUsers.length > 4) {
            setwritingUsersText(writingUsers.slice(0, 4).join(", ") + " and others are writing...");
        } else if (writingUsers.length > 1) {
            setwritingUsersText(writingUsers.join(", ") + " is writing...");
        } else {
            setwritingUsersText("");
        }
    }, [writingUsers]);

    const [textWritten, settextWritten] = useState<string>("");
    const messageBoxRef = useRef<HTMLTextAreaElement>(null);
    const [autocompleteSuggestions, setautocompleteSuggestions] = useState<string[]>([]);
    const [autocompleteselectedIndex, setautocompleteselectedIndex] = useState<number>(0);
    const suggestionRefs = useRef<Array<HTMLDivElement | null>>([]);

    const showAutoCompleteEmojiRegex = /:([^:]+):?$/i;

    const autocompleteDivShown = useMemo(() => {
        return autocompleteSuggestions.length > 0;
    }, [autocompleteSuggestions]);

    const [isPending, startTransition] = useTransition();
    const [matchType, setmatchType] = useState<"Emoji" | "Mention">("Mention");

    useEffect(() => {
        const emoji_matches = messageBoxRef.current ? textWritten.slice(0, messageBoxRef.current.selectionStart).match(showAutoCompleteEmojiRegex) : textWritten.match(showAutoCompleteEmojiRegex);
        const mention_matches = messageBoxRef.current ? textWritten.slice(0, messageBoxRef.current.selectionStart).match(showAutoCompleteMentionRegex) : textWritten.match(showAutoCompleteEmojiRegex);
        if (!emoji_matches && !mention_matches) {
            startTransition(() => setautocompleteSuggestions([]));
            return;
        }
        if (emoji_matches) {
            setmatchType("Emoji");
            const query = emoji_matches[1].toLowerCase().trim();
            startTransition(() => {
                suggestionRefs.current = [];
                setautocompleteSuggestions(
                    emojiList.data.filter(e => e.includes(query)).toSorted((a, b) => a.length - b.length)
                );
                if (autocompleteselectedIndex >= autocompleteSuggestions.length) {
                    setautocompleteselectedIndex(0);
                }
            });
        } else if (mention_matches) {
            setmatchType("Mention");
            const query = mention_matches[0].toLowerCase().substring(1); // Dunno why @ keeps appearing
            startTransition(() => {
                suggestionRefs.current = [];

                if (currents.server) {
                    setautocompleteSuggestions(
                        currents.server.members.filter(member => member.username.includes(query)).map(x => x.username).toSorted((a, b) => a.length - b.length)
                    );
                }

                if (autocompleteselectedIndex >= autocompleteSuggestions.length) {
                    setautocompleteselectedIndex(0);
                }
            });
        }
    }, [textWritten, messageBoxRef.current?.selectionStart]);

    const autocompleteElementsRender = useMemo(() => {
        return (
            <>
                {autocompleteSuggestions.map(suggestion => {
                    return (
                        <div key={`${suggestion}-${Math.random().toFixed(5)}`} className={`${styles.autocomplete_div_element} ${autocompleteselectedIndex === autocompleteSuggestions.indexOf(suggestion) ? styles.autocomplete_div_element_active : ''}`} onClick={() => {
                            if (messageBoxRef.current) {
                                if (matchType === "Emoji") {
                                    const newText = parseEmojis(textWritten.replace(showAutoCompleteEmojiRegex, ":" + autocompleteSuggestions[autocompleteselectedIndex] + ":"));
                                    messageBoxRef.current.value = newText;
                                    settextWritten(newText);
                                } else if (matchType === "Mention") {
                                    const newText2 = textWritten.replace(showAutoCompleteMentionRegex, "@" + autocompleteSuggestions[autocompleteselectedIndex]);
                                    messageBoxRef.current.value = newText2;
                                    settextWritten(newText2);
                                }
                            }
                        }} onMouseOver={() => { setautocompleteselectedIndex(autocompleteSuggestions.indexOf(suggestion)); }} ref={(r) => { suggestionRefs.current[autocompleteSuggestions.indexOf(suggestion)] = r }}>
                            <div className={styles.suggestions_element}>
                                {matchType === "Mention" && (
                                    <Image className={styles.border100p} alt={suggestion} width={32} height={32} src={getUserByUsername(suggestion)?.avatarUrl || "/people_white.svg"} />
                                )}
                                <p className={styles.autocomplete_div_text}>{suggestion}</p>
                                {matchType === "Emoji" && (<p className={styles.autocomplete_div_emoji}>{parseEmojis(`:${suggestion}:`)}</p>)}
                            </div>
                        </div>
                    )
                })}
            </>
        );
    }, [autocompleteSuggestions, autocompleteselectedIndex]);

    const onMessageScroll = () => {
        requestAnimationFrame(() => {
            const el = messageBoxRef.current;
            const box = renderTextRef.current;
            if (!box || !el) return;

            box.scrollTop = el.scrollTop;
        });
    }

    const renderTextRef = useRef<HTMLSpanElement>(null);

    const renderText = useMemo(() => {
        return SyntaxHighlight(AllMessageSyntaxHighlights, textWritten, styles, true);
    }, [textWritten]);

    useLayoutEffect(() => {
        setTimeout(onMessageScroll, 25);
    }, [textWritten]);

    const onMessageWriteBoxScroll = (ev: React.UIEvent<HTMLTextAreaElement>) => {
        const el = ev.currentTarget;
        const box = renderTextRef.current;
        if (!box) return;

        box.scrollTop = el.scrollTop;
    }

    const messageBoxOnChange = useCallback((ev: React.ChangeEvent<HTMLTextAreaElement>) => {
        ev.currentTarget.value = parseEmojis(ev.currentTarget.value);
        settextWritten(ev.currentTarget.value);
    }, []);

    const messageBoxOnKeyDown = (ev: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (!autocompleteDivShown) {
            onKeyDownInput(ev);

            if (ev.key === "ArrowUp" && ev.currentTarget.selectionEnd === 0) {
                if (!currents.user) return;

                const nearestUserMessageIndex = messages.findLastIndex(x => x.authorId === currents.user!.id);
                const nearestUserMessage = messages[nearestUserMessageIndex];
                const nearestUserMessageInfo = MessageInfos.find(x => x.Message.id === nearestUserMessage.id);

                if (scrollPageRef.current) {
                    scrollPageRef.current.scrollToIndex(nearestUserMessageIndex);
                    const editModeMessage = MessageInfos.find(x => x.editMode === true);
                    if (editModeMessage)
                        UpdateMessageInfo(editModeMessage.Message, "editMode", false, setMessageInfos);
                    UpdateMessageInfo(nearestUserMessage, "editMode", true, setMessageInfos);

                    requestAnimationFrame(() => {
                        if (nearestUserMessageInfo && nearestUserMessageInfo.ref) {
                            const textarea = nearestUserMessageInfo.ref.querySelector("textarea");

                            if (textarea) {
                                textarea.focus();

                                textarea.selectionEnd = textarea.value.length;

                                console.log(kbState);

                                textarea.selectionStart = kbState.includes("Control") ? 0 : textarea.selectionEnd;
                            }
                        }
                    });
                }
            }
        }
        else {
            console.log(autocompleteDivShown, ev.target, ev.key, textWritten);

            if (!ev.target) return;

            if (ev.key === "ArrowUp" && autocompleteDivShown) {
                const s = autocompleteselectedIndex;
                const newS = s > 0 ? s - 1 : s;
                setautocompleteselectedIndex(newS);
                if (suggestionRefs && suggestionRefs.current[newS])
                    suggestionRefs.current[newS].scrollIntoView({
                        behavior: 'smooth',
                    });
            } else if (ev.key === "ArrowDown" && autocompleteDivShown) {
                const s = autocompleteselectedIndex;
                const newS = s < autocompleteSuggestions.length - 1 ? s + 1 : s;
                setautocompleteselectedIndex(newS);
                if (suggestionRefs && suggestionRefs.current[newS])
                    suggestionRefs.current[newS].scrollIntoView({
                        behavior: 'smooth',
                    });
            } else if (ev.key === "Enter" && autocompleteDivShown) {
                console.log("Selected suggestion: ", autocompleteSuggestions[autocompleteselectedIndex]);
                ev.preventDefault();
                if (messageBoxRef.current) {
                    if (matchType === "Emoji") {
                        const newText = parseEmojis(textWritten.replace(showAutoCompleteEmojiRegex, ":" + autocompleteSuggestions[autocompleteselectedIndex] + ":"));
                        messageBoxRef.current.value = newText;
                        settextWritten(newText);
                    } else if (matchType === "Mention") {
                        const newText2 = textWritten.replace(showAutoCompleteMentionRegex, "@" + autocompleteSuggestions[autocompleteselectedIndex] + " ");
                        messageBoxRef.current.value = newText2;
                        settextWritten(newText2);
                    }
                }
            }
        }
        onMessageScroll();
    }

    const _onMessageReply = (message: Message) => {
        messagesState.setreplyingTo(message);
        onMessageReply(message);
    }

    const _onMessageReact = (ct: React.MouseEvent, message: Message) => {
        console.log("Showing reaction menu");

        if (!ct.currentTarget) return;

        const x = ct.currentTarget?.getBoundingClientRect().right;
        const y = ct.currentTarget?.getBoundingClientRect().y - ct.currentTarget.getBoundingClientRect().height / 4;

        reactionMenuStore.setmessageId(message.id);

        reactionMenuStore.setPosition(x, y.clamp(10, window.innerHeight - ct.currentTarget.getBoundingClientRect().height - 150));
        reactionMenuStore.setOnSelect((emoji) => {
            if (!kbState.some(x => x.toLowerCase() === "shift")) {
                reactionMenuStore.setShown(false);

                console.log("Emoji names", emoji.names);

                addReactionToMessage(message.id, message.channelId, emoji.names[0]);
            }
            console.log("Emoji Selected: ", emoji);
        });
        reactionMenuStore.setShown(true);
        onMessageReact(message);
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



    const onClickRemoveAttachment = (removedFileName: string) => {
        chStore.setacceptedFilesLambda((state) => state.filter(x => x.name !== removedFileName));
    }

    const onClickBackNSFWChannel = () => {
        useMessagesStore.getState().setMessages([]);
        currents.setChannel(null);
    }

    const onClickContinueNSFWChannel = () => {
        MEM.addnsfwProceededChannel(currents.channel!.id);
    }

    const onClickCloseReplyBox = () => {
        messagesState.setreplyingTo(null);
    }

    const onClickReplyMessage = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>, message: MessageInfo) => {
        const replyMessageId = message.Message.repliedToId;
        const replyMessageInfo = MessageInfos.find(x => x.Message.id === replyMessageId);
        const newmessageInfo = MessageInfos.find(x => x.Message.id == message.Message.id);
        console.log(replyMessageId);
        console.log(replyMessageInfo);
        if (replyMessageInfo) { // Fix later
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
        } else {
            const fetchMessages = async () => {
                if (!currents.channel) return;

                const getMessagesAround = await axios.get(`api/v1/channels/${currents.channel.id}/messages/${message.Message.repliedToId}/range?up=${MESSAGE_LOAD_DEFAULT_AMOUNT}&down=${MESSAGE_LOAD_DEFAULT_AMOUNT}`);

                const MessageBCA: { before: Message[], center: Message, after: Message[] } = getMessagesAround.data.data;

                console.log("Message BCA", MessageBCA);

                messagesState.setMessages([...MessageBCA.before, MessageBCA.center, ...MessageBCA.after]);

                const targetIndex = MessageBCA.before.length;

                setTimeout(() => {
                    scrollPageRef.current?.scrollIntoView({
                        behavior: 'auto',
                        align: 'start',
                        index: targetIndex,
                    });
                }, 100);
            }

            fetchMessages();
        }
    }

    const [loadingEnd, setloadingEnd] = useState<boolean>(false);
    const [loadingStart, setloadingStart] = useState<boolean>(false);

    const onReachStart = () => {
        console.log("Reached start");

        if (loadingStart) return;
        if (chStore.startMessageId === messages[0].id) return;

        const fetchMessages = async () => {
            const channelId = currents.channel?.id;

            if (!channelId) return;

            setloadingStart(true);

            const response = await axios.get(`api/v1/channels/${channelId}/messages/${messages[0].id}/range?up=${MESSAGE_LOAD_DEFAULT_AMOUNT}&down=0`);

            const MessageBCA: { before: Message[], center: Message, after: Message[] } = response.data.data;

            if (!MessageBCA) { toast("Failed to get messages at start"); return; }

            console.log(MessageBCA);

            if (MessageBCA.before.length === 0) {
                chStore.setstartMessageId(MessageBCA.center.id);
                setTimeout(() => {
                    setloadingStart(false);
                }, 100);
                return;
            }

            const newMessages = [...MessageBCA.before, ...messages];

            messagesState.setMessages(newMessages);

            const targetIndex = newMessages.findIndex(x => x.id === MessageBCA.center.id) + 1;

            if (MessageBCA.before.length < MESSAGE_LOAD_DEFAULT_AMOUNT) {
                chStore.setstartMessageId(MessageBCA.before[MessageBCA.before.length - 1].id);
            }

            setTimeout(() => {
                setloadingStart(false);

                scrollPageRef.current?.scrollIntoView({
                    behavior: 'auto',
                    align: 'end',
                    index: targetIndex,
                });
            }, 100);
        }

        fetchMessages();
    }

    const onReachEnd = () => {
        console.log("Reached end");

        if (loadingEnd) return;
        if (chStore.endMessageId === messages[messages.length - 1].id) return;

        const fetchMessages = async () => {
            const channelId = currents.channel?.id;

            if (!channelId) return;

            setloadingEnd(true);

            const response = await axios.get(`api/v1/channels/${channelId}/messages/${messages[messages.length - 1].id}/range?up=0&down=${MESSAGE_LOAD_DEFAULT_AMOUNT}`);

            const MessageBCA: { before: Message[], center: Message, after: Message[] } = response.data.data;

            if (!MessageBCA) { toast("Failed to get messages at end"); return; }

            console.log(MessageBCA);

            if (MessageBCA.after.length === 0) {
                chStore.setendMessageId(MessageBCA.center.id);
                setTimeout(() => {
                    setloadingEnd(false);
                }, 100);
                return;
            }

            const newMessages = [...messages, ...MessageBCA.after];

            messagesState.setMessages(newMessages);

            const targetIndex = newMessages.findIndex(x => x.id === MessageBCA.center.id) - 1;

            if (MessageBCA.after.length < MESSAGE_LOAD_DEFAULT_AMOUNT) {
                chStore.setendMessageId(MessageBCA.after[MessageBCA.after.length - 1].id);
            }

            setTimeout(() => {
                setloadingEnd(false);

                scrollPageRef.current?.scrollIntoView({
                    behavior: 'auto',
                    align: 'center',
                    index: targetIndex,
                });
            }, 100);
        }

        fetchMessages();
    }

    const onMouseMove = () => {
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
                        const target = event.target;
                        let y = (parseFloat(target.getAttribute('data-y')) || 0)

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

        voicesocket = io(VoiceSocketURL, {
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

    const [Volumes, setVolumes] = useState<{ userId: string, soundHeight: number }[]>([]);
    useEffect(() => {
        const interval = setInterval(() => {
            currents.vc?.members.forEach((vcUser) => {
                const stream = userStreams[vcUser.id];
                if (!stream) return;

                const volume = getVolume(stream);
                setVolumes((state: { userId: string, soundHeight: number }[]) => state.map(x => x.userId === vcUser.id ? { ...x, soundHeight: volume } : x));
            });
        }, 50);

        return () => { clearInterval(interval); }
    }, [userStreams, currents.vc]);
    /// Voice Chat End

    useEffect(() => {
        console.log(userStreams);
    }, [userStreams]);

    useEffect(() => {
        if (messageBoxRef.current) {
            if (renderTextRef.current)
                settextWritten(messageBoxRef.current.value);
        }
    }, [messageBoxRef.current, messageBoxRef.current?.value])

    const messageBoxHeight = useMemo(() => {
        let inital = 70;  //vh
        if (messagesState.replyingTo)
            inital -= 26; //vh
        if (chStore.acceptedFiles.length > 0)
            inital -= 30; //vh

        return inital;
    }, [messagesState.replyingTo, chStore.acceptedFiles.length]);

    const messageBoxDisabled = (currents.channel === null || (currentChannelInfo && ((currentChannelInfo as ChannelInfo).readOnly)));
    const messageActionsDisabled = useMemo(() => {
        if (!messageBoxDisabled && textWritten === "")
            return true;
        return messageBoxDisabled;
    }, [messageBoxRef.current, textWritten, messageBoxDisabled]);

    const replyingToRender = useMemo(() => {
        return SyntaxHighlight(AllMessageSyntaxHighlights, messagesState.replyingTo?.content ?? "", styles)
    }, [messagesState.replyingTo]);

    let showNSFWwarning = false;
    if (currentChannelInfo !== undefined) {
        const info = currentChannelInfo as ChannelInfo;
        showNSFWwarning = (info.nsfw && !(MEM.nsfwProceededChannels.find(() => info.channelId))) /* && currents.server?.ownerId !== currents.user?.id */;
    }

    if (showNSFWwarning) {
        return (<div id="channel-box" className={styles.channel_box}>
            <div className={styles.flex_column}>
                <svg className={styles.icons_warning} xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 24 24" id="warning">
                    <path d="M4.47 21h15.06c1.54 0 2.5-1.67 1.73-3L13.73 4.99c-.77-1.33-2.69-1.33-3.46 0L2.74 18c-.77 1.33.19 3 1.73 3zM12 14c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z" fill="var(--cb-color-red)"></path>
                </svg>
                <p>This is an NSFW channel</p>
                <p>Are you sure you want to continue?</p>
                <div className={styles.pad2} />
                <div className={styles.flex_rowa}>
                    <button className={styles.confirm_button1} onClick={onClickBackNSFWChannel}>Back</button>
                    <div className={styles.lpad1} />
                    <div className={styles.lpad1} />
                    <button className={styles.confirm_button2} onClick={onClickContinueNSFWChannel}>Continue</button>
                </div>
            </div>
        </div>);
    } else {
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
                                        <div key={`vcUser-${user.id}`}>
                                            <div className={styles.auto_useravatar_holder} style={{ borderWidth: (Volumes.find(x => x.userId === user.id)?.soundHeight || 0) * 4 }}>
                                                <img className={styles.message_useravatar} src={`${user.avatarUrl/*https://cat-storage-server.web.app/data/cat1.jpeg"*/}`} onClick={() => { }} onContextMenu={(ev) => { ev.preventDefault(); onClickUserAvatarWithUserId(user.id, ev) }} />
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
                    <div className={`${styles.message_box}`} style={{ height: `${messageBoxHeight}vw` }} ref={scrollPageDivRef}>
                        {/* {messages.map((message) => {
                            const MessageElementProps = {
                                message,
                                hoveredMessageId: hoveredMessageId,
                                _onMessageReply: _onMessageReply,
                                _onMessageDelete: _onMessageDelete,
                                setHoveredMessageId: setHoveredMessageId,
                                onClickReplyMessage: onClickReplyMessage,
                                onMessageEdit: onMessageEdit,
                                onMessageDelete: onMessageDelete,
                                onEditInput: onEditInput,
                                onClickUserAvatar: onClickUserAvatar,
                            }

                            return <MessageElement {...MessageElementProps} key={message.id} />
                        })} */}
                        <Virtuoso totalCount={messagesLength} data={messages} initialTopMostItemIndex={messages.length - 1} startReached={onReachStart} endReached={onReachEnd} onScroll={onScrollMessages} ref={scrollPageRef} style={{ width: "100%", height: "100%" }} onLoadedData={() => scrollPageRef.current?.scrollToIndex(messages.length - 1)} itemContent={(i, message) => {
                            const MessageElementProps = {
                                message,
                                hoveredMessageId: hoveredMessageId,
                                _onMessageReply: _onMessageReply,
                                _onMessageReact: _onMessageReact,
                                _onMessageDelete: _onMessageDelete,
                                setHoveredMessageId: setHoveredMessageId,
                                onClickReplyMessage: onClickReplyMessage,
                                onMessageEdit: onMessageEdit,
                                onMessageDelete: onMessageDelete,
                                onEditInput: onEditInput,
                                onClickUserAvatar: onClickUserAvatar,
                                addReactionToMessage: addReactionToMessage,
                            }
                            return <MessageElement {...MessageElementProps} key={message.id} />
                        }} />
                    </div>
                    {messagesState.replyingTo && (<div className={`${styles.message_reply_box}`}>
                        <div className={styles.message_box_reply_top}>
                            <p className={styles.message_box_reply_text}>Replying to:</p>
                            <img src={'/clear.svg'} width={"40vh"} height={"40vh"} alt={'Clear'} onClick={onClickCloseReplyBox} className={styles.icons_clear}></img>
                        </div>
                        <div className={styles.message_box_reply_bottom}>
                            <div className={styles.reply_message}>
                                <div className={styles.message_useravatar_holder}>
                                    <img className={styles.message_useravatar} src={`${messagesState.replyingTo.author.avatarUrl/*https://cat-storage-server.web.app/data/cat1.jpeg"*/}`} />
                                </div>
                                <div className={styles.message_user_holder}>
                                    <div className={styles.message_content_holder}>
                                        <p className={styles.message_username}>{messagesState.replyingTo.author.username}</p>
                                        <p className={styles.message_timestamp}>{GetMessageDateString(new Date(messagesState.replyingTo.timestamp))}</p>
                                    </div>
                                    <p className={styles.message_content}>{
                                        replyingToRender
                                    }</p>
                                </div>
                            </div>
                        </div>
                    </div>)}
                    {chStore.acceptedFiles.length > 0 && (
                        <div className={`${styles.message_attachments_box}`}>
                            {chStore.acceptedFiles.map((file) => {
                                const { fileName, fileExtension } = splitName(file.name);
                                return (
                                    <div className={`${styles.message_attachments_box_element}`} key={file.name}>
                                        <svg xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} width="32" height="32" viewBox="0 0 24 24" id="insert-drive-file">
                                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                                            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" fill="var(--cb-color-white)"></path>
                                        </svg>
                                        <span className={styles.message_attachments_box_element_text}>{fileName}<span className={styles.file_extension_dot}>.</span><span className={styles.file_extension}>{fileExtension}</span></span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.normal_icon_s} width="24" height="24" viewBox="0 0 24 24" id="clear" onClick={() => onClickRemoveAttachment(file.name)}>
                                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                                            <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" fill="#F0F7EE"></path>
                                        </svg>

                                    </div>
                                )
                            })}
                        </div>
                    )}
                    <div className={`${styles.message_box_wraper} ${messagesState.replyingTo && (styles.message_box_wraper_reply)}`}>
                        <div className={styles.posr_h}>
                            <textarea className={`${styles.posr_e} ${styles.contenteditable} ${styles.msg_typer} ${(!currents.channel || (currentChannelInfo && ((currentChannelInfo as ChannelInfo).readOnly))) && styles.msg_disabled}`} disabled={messageBoxDisabled} style={{ opacity: 0.25 }} onWheel={onMessageScroll} onChange={messageBoxOnChange} onKeyDown={messageBoxOnKeyDown} onScroll={onMessageWriteBoxScroll} ref={messageBoxRef} />
                            <span className={`${styles.posr_e} ${styles.msg_overlay} ${styles.no_touch} ${styles.msg_typer}`} style={{ overflow: "hidden", whiteSpace: "pre-wrap" }} ref={renderTextRef}>{renderText}</span>
                        </div>
                        <div className={styles.message_box_actions}>
                            <button className={`${`${styles.message_box_action} ${styles.normal_icon_s}`} ${messageActionsDisabled ? styles.msg_action_disabled : ''}`} disabled={messageActionsDisabled} onClick={() => { if (messageBoxRef.current) { sendMessageWithTextarea(messageBoxRef.current.value, currents.channel!, currents.user!, messageBoxRef.current); } }}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`${messageActionsDisabled ? styles.msg_action_disabled : ''}`} width="24" height="24" viewBox="0 0 24 24" id="send">
                                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                                    <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" fill={messageActionsDisabled ? 'var(--cb-color-white-soft' : 'var(--cb-color-white)'} style={{ transition: "fill 0.25s ease-in-out" }}></path>
                                </svg>
                            </button>
                            <button className={`${`${styles.message_box_action} ${styles.normal_icon_s}`} ${messageActionsDisabled ? styles.msg_action_disabled : ''}`} disabled={messageActionsDisabled}>
                                <div {...getRootProps({})} className={`${messageActionsDisabled ? styles.msg_action_disabled : ''}`}>
                                    <input {...getInputProps()} />
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`${messageActionsDisabled ? styles.msg_action_disabled : ''}`} width="24" height="24" viewBox="0 0 24 24" id="attach-file">
                                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                                        <path d="M16.5 6.75v10.58c0 2.09-1.53 3.95-3.61 4.15-2.39.23-4.39-1.64-4.39-3.98V5.14c0-1.31.94-2.5 2.24-2.63 1.5-.15 2.76 1.02 2.76 2.49v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6.75c0-.41-.34-.75-.75-.75s-.75.34-.75.75v8.61c0 1.31.94 2.5 2.24 2.63 1.5.15 2.76-1.02 2.76-2.49V5.17c0-2.09-1.53-3.95-3.61-4.15C9.01.79 7 2.66 7 5v12.27c0 2.87 2.1 5.44 4.96 5.71 3.29.3 6.04-2.26 6.04-5.48V6.75c0-.41-.34-.75-.75-.75s-.75.34-.75.75z" fill={messageActionsDisabled ? 'var(--cb-color-white-soft' : 'var(--cb-color-white)'} style={{ transition: "fill 0.25s ease-in-out" }}></path>
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className={styles.writing_users_div}>
                        <p className={styles.writing_users_text}>{writingUsersText}</p>
                    </div>
                    <ScrollToBottomButton visible={userScroll === 0 ? false : true} onClick={() => { scrollPageRef.current?.scrollToIndex({ behavior: "auto", index: messagesLength - 1 }); }} />
                    <div className={`${styles.autocomplete_div} ${autocompleteDivShown ? styles.autocomplete_div_active : ''}`} style={{ width: messageBoxRef.current?.getBoundingClientRect().width }}>
                        {autocompleteElementsRender}
                    </div>
                </div>
            </>
        );
    }
};

export default ChannelBox;