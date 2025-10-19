import { useCurrents } from "@/store/currents";
import { useKBState } from "@/store/kbState";
import { useMessageInfoStore } from "@/store/messageInfos";
import { useMessagesStore } from "@/store/messages";
import { useUserInfoStore } from "@/store/userInfos";
import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";
import styles from "../../page.module.css";
import { Attachment, JsonAttachments, Message } from "../../utils/socket_utils";
import { SyntaxHighlight } from "../../utils/syntax";
import { allEmojiDataList, AllMessageSyntaxHighlights, getEmojiOfName, GetMessageDateString, getNameOfEmoji, MessageInfo, onMouseLeaveTooltipElement, onMouseOverTooltipElement } from "../../utils/utils";
import useReactionMenuStore from "@/store/reactionMenu";
import { useDownload } from "./DownloadFile";
import { DefaultUserVariables } from "@/store/variablesStore";
import { FILE_PREVIEW_SUPPORTED_IMAGE_FORMAT_LIST } from "../../utils/constants";
import { FilePreview } from "./FilePreview";
import { useCopyToClipboard } from "usehooks-ts";

interface Props {
    message: Message;
    hoveredMessageId: string | null;
    _onMessageReply: (message: Message) => void;
    _onMessageReact: (ev: React.MouseEvent, message: Message) => void;
    _onMessageDelete: (message: Message) => void;
    setHoveredMessageId: (id: string | null) => void;
    onClickReplyMessage: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>, message: MessageInfo) => void;
    onMessageEdit: (message: MessageInfo) => void;
    onMessageDelete: (message: Message) => void;
    onEditInput: (message: Message, event: React.KeyboardEvent) => void;
    onClickUserAvatar: (messageId: string | null, event: React.MouseEvent) => void;
    onRightClickUserAvatar: (messageId: string | null, event: React.MouseEvent) => void;
    addReactionToMessage: (messageId: string, channelId: string, emojiName: string) => void;
}

export const MessageElement: React.FC<Props> = memo(({ message, hoveredMessageId, _onMessageReply, _onMessageReact, setHoveredMessageId, onClickReplyMessage, onClickUserAvatar, onRightClickUserAvatar, onEditInput, onMessageDelete, onMessageEdit, _onMessageDelete, addReactionToMessage }) => {
    const { messages } = useMessagesStore();
    const { MessageInfos, setMessageInfos } = useMessageInfoStore();
    const { kbState } = useKBState();
    const reactionMenu = useReactionMenuStore();
    const currents = useCurrents();
    const variables = currents.userVariables ?? DefaultUserVariables;
    const [_, copyToClipboard] = useCopyToClipboard();

    const downloadFile = useDownload();

    // console.log(`🔄 message ${message.id} re-rendered`);

    const ref = useRef<HTMLDivElement | null>(null);
    // useEffect(() => {
    //     console.log('MessageElement rendered:', message.id)
    //   })
    if (!message.author) return "No author";


    const onMouseHoverOver = (id: (string | undefined)) => {
        if (id !== undefined)
            setHoveredMessageId(id);
    }

    const onMouseHoverOut = () => {
        setHoveredMessageId(null);
    }

    const onContextMenuFile = (ct: React.MouseEvent) => { // Add later
        console.log("CT Menu Message", ct.currentTarget.id);
        ct.preventDefault();

        currents.setContextMenuID(message.id);
        currents.setContextMenuMode("Message");
        currents.setContextMenuObject(message);
        currents.setContextMenuIncludes([]);
    }

    const onContextMenuMessage = (ct: React.MouseEvent) => {
        const target = ct.target as HTMLElement;
        if (target.id === "user_avatar" || target.closest('#user_avatar')) return;
        if (target.id === "message-attachment-file" || target.closest('#message-attachment-file')) return;
        if (target.id === "message-attachment-image-preview" || target.closest('#message-attachment-image-preview')) return;

        console.log("CT Menu Message", ct.currentTarget.id);
        ct.preventDefault();

        currents.setContextMenuID(message.id);
        currents.setContextMenuMode("Message");
        currents.setContextMenuObject(message);
        currents.setContextMenuIncludes([]);

        if (target.getAttribute("href"))
            currents.setContextMenuIncludes([{
                label: "Copy URL", action: () => { if (target.getAttribute("href")) copyToClipboard(target.getAttribute("href")!); }
            }]);

        currents.setContextMenuXY(ct.pageX, ct.pageY);
        currents.setContextMenuShown(true);
    }

    const messageinfo_ref = useRef<MessageInfo>({
        deleteConfirm: false,
        editMode: false,
        Message: message,
        ref: null
    });
    // useEffect(() => {
    //     console.log("Setting message info for message", messageinfo.Message.id);
    //     setMessageInfos((prev: MessageInfo[]) => [...prev, messageinfo]);
    // }, []);

    useEffect(() => {
        if (ref.current) {
            messageinfo_ref.current.ref = ref.current;

            setMessageInfos((prev) => (prev.findIndex(x => x.Message.id === message.id) !== -1) ? prev.map(x => x.Message.id === messageinfo_ref.current.Message.id ? messageinfo_ref.current : x) : [...prev, messageinfo_ref.current]);

            console.log("Added message ", message.id, " to MessageInfos", { MessageInfos });
        }
    }, [ref]);


    const onClickFile = useCallback((attachment: Attachment) => {
        console.log(`Clicked on ${attachment}`);

        downloadFile(attachment.publicUrl, attachment.filename);
    }, []);

    const attachmentsRender = useMemo(() => {
        const attachments: JsonAttachments = typeof message.attachments === 'string' ? JSON.parse(message.attachments) : [];

        if (!attachments || attachments.length <= 0) return (<></>);

        const attachmentExtensions = attachments.map((attachment) => {
            const splitByPoint = attachment.filename.split('.');
            const ext = splitByPoint[splitByPoint.length - 1];
            return ext;
        });

        return (
            <div id="message-attachments" className={styles.message_reactions}>
                {attachments.map((attachment, idx) => {
                    const isDisabled = attachment.publicUrl.trim() === "";
                    const ext = attachment.filename.split('.').pop();
                    if (!isDisabled && FILE_PREVIEW_SUPPORTED_IMAGE_FORMAT_LIST.includes(ext?.toLowerCase() ?? '')) {
                        return <FilePreview key={`IMG-PREV-${attachment.filename}-${idx}`} viewType="Image" fileMetadata={{fileName: attachment.filename, fileExtension: ext ?? ''}} fileUrl={attachment.publicUrl} />
                    }
                    return (
                        <div id="message-attachment-file" className={`${isDisabled ? styles.message_attachment_disabled : ''} ${styles.message_attachment}`} style={{ cursor: isDisabled ? "wait" : "pointer" }} onClick={() => { if (!isDisabled) onClickFile(attachment); }} key={`${message.id}-${attachment.filename}`} onContextMenu={onContextMenuFile}>
                            {!isDisabled && (
                                <svg xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }} width="32" height="32" viewBox="0 0 24 24" id="insert-drive-file">
                                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" fill="var(--cb-color-white)"></path>
                                </svg>
                            )}
                            {isDisabled && (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="64" height="64" xmlnsXlink="http://www.w3.org/1999/xlink"><g><circle strokeDasharray="164.93361431346415 56.97787143782138" r="35" strokeWidth="8" stroke="#1e2ede" fill="none" cy="50" cx="50">
                                    <animateTransform keyTimes="0;1" values="0 50 50;360 50 50" dur="1s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
                                </circle><g></g></g></svg>
                            )}
                            <p className={styles.message_attachment_text}>{attachment.filename}</p>
                        </div>
                    )
                })}
            </div>
        )

    }, [message.attachments]);

    const reactionsRender = useMemo(() => {
        const { reactions } = message;
        const userId = currents.user?.id;
        if (!reactions) { return (<></>); }
        if (!userId) { return (<></>); }

        console.log(message.id, reactions);

        if (reactions.length <= 0) return (<></>);

        const groupedReactions = new Map<string, { emoji: string, emojiName: string, id: string, userReacted: boolean, count: number }>();

        reactions.forEach((r) => {
            const currentCount = groupedReactions.values.length > 0 ? (groupedReactions.get(r.emojiName)?.count ?? 0) : 0;

            groupedReactions.set(r.emojiName, {
                emoji: getEmojiOfName(r.emojiName.replaceAll(' ', '_')),
                emojiName: r.emojiName,
                userReacted: r.userId === userId,
                id: r.id,
                count: (currentCount + 1),
            });
        });

        return (
            <div id="message-reactions" className={styles.message_reactions}>
                {[...groupedReactions.values()].map((reaction) => {
                    return (
                        <div className={`${styles.message_reaction} ${reaction.userReacted ? styles.message_reaction_active : ''}`} key={reaction.id}>
                            <div className={styles.flex_rowa} onMouseOver={(ev) => { onMouseOverTooltipElement(ev, `${getNameOfEmoji(reaction.emojiName)}`, currents) }} onMouseLeave={(ev) => { onMouseLeaveTooltipElement(currents) }} onClick={() => addReactionToMessage(message.id, message.channelId, reaction.emojiName)}>
                                <span>{allEmojiDataList.find(x => x.name === reaction.emojiName)?.emoji} {reaction.count}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }, [message.reactions]);

    const messageIsMentioned = useMemo(() => { return currents.user ? message.mentions.includes(currents.user.username) : false }, [currents.user, message]);

    const fmessageInfo = useMemo(() => MessageInfos.find(x => x.Message.id === message.id), [MessageInfos, message.id])
    
    const render = useMemo(() => {
        return <div style={{fontSize: (variables.channelFontSize ?? DefaultUserVariables.channelFontSize) + 4}}>{SyntaxHighlight(AllMessageSyntaxHighlights, message.content, styles, message.id)}</div>
    }, [message.content]);

    return (
        <>
            <div className={`${messageIsMentioned ? styles.message_mentioned : styles.message} ${reactionMenu.messageId === message.id ? (messageIsMentioned ? styles.message_mentioned_active : styles.message_active) : ''}`} style={{fontSize: (variables.channelFontSize ?? DefaultUserVariables.channelFontSize)}} onMouseOver={() => onMouseHoverOver(message.id?.toString())} onMouseLeave={onMouseHoverOut} onContextMenu={onContextMenuMessage} ref={ref} key={message.id}>
                {
                    (() => {
                        if (message.repliedToId && message.repliedTo) {
                            let replyMsg: Message | undefined = messages.find(x => x.id === message.repliedToId);
                            if (!replyMsg) replyMsg = {
                                ...message.repliedTo,
                                repliedTo: null,
                            }
                            return (<div className={styles.message_reply_inner}>
                                <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 54" width={50} height={27} style={{marginTop: "auto", marginBottom: "8px"}}>
                                    <path d="M 4 54 q 0 -50 50 -50" fill="none" stroke="black" strokeWidth="4" />
                                    <path d="M 54 4 l 50 0" fill="none" stroke="black" strokeWidth="4" />
                                </svg>
                                <div className={styles.message_reply_inner_holder} onClick={(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => { onClickReplyMessage(ev, messageinfo_ref.current) }}>
                                    <div className={styles.message_reply_useravatar_holder}>
                                        <img className={styles.message_useravatar} src={`${replyMsg.author.avatarUrl/*https://cat-storage-server.web.app/data/cat1.jpeg"*/}`} />
                                    </div>
                                    <p className={styles.message_reply_content} style={{
                                        width:
                                            (() => {
                                                const info = MessageInfos.length > 0 ? (fmessageInfo) : undefined;
                                                if (info) {
                                                    return (info.ref) ? (info.ref.clientWidth * 1 / 2) + "px" : "40vw"
                                                }
                                            })()
                                    }}>{replyMsg.content}</p>
                                </div>
                                <div id="message-actions-holder" className={`${styles.message_actions_holder} ${(hoveredMessageId == message.id || reactionMenu.messageId == message.id) ? styles.message_actions_holder_active : ''}`}>
                                    <div className={`${styles.message_actions} ${styles.message_actions_holder_reply} `}>
                                        <div className={styles.message_action} onClick={() => _onMessageReply(message)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" id="reply">
                                                <path fill="#F0F7EE" d="M3.707,7.99946609 L6.3890873,10.6819805 C6.58434944,10.8772427 6.58434944,11.1938252 6.3890873,11.3890873 C6.21552094,11.5626536 5.94609654,11.5819388 5.7512284,11.4469427 L5.68198052,11.3890873 L2.11603371,7.82029139 L2.11603371,7.82029139 L2.06639375,7.74915207 L2.06639375,7.74915207 L2.03875135,7.69334249 L2.03875135,7.69334249 L2.0159743,7.62570887 L2.0159743,7.62570887 L2.01108568,7.60498705 C2.00382515,7.57130067 2,7.53609704 2,7.5 L2.00546187,7.57391777 L2.00179699,7.5424826 L2.00179699,7.5424826 L2.00179763,7.45747863 L2.00179763,7.45747863 L2.01678848,7.37116919 L2.01678848,7.37116919 L2.03779224,7.30896344 L2.03779224,7.30896344 L2.07718801,7.23298968 L2.07718801,7.23298968 L2.13168953,7.16184291 L2.13168953,7.16184291 L5.68198052,3.6109127 C5.87724266,3.41565056 6.19382515,3.41565056 6.3890873,3.6109127 C6.56265365,3.78447906 6.5819388,4.05390346 6.44694275,4.2487716 L6.3890873,4.31801948 L3.707,6.99946609 L8,7 C11.5217665,7 13.8853902,8.97580254 13.9959473,11.7924218 L14,12 C14,12.2761424 13.7761424,12.5 13.5,12.5 C13.2238576,12.5 13,12.2761424 13,12 C13,9.72683267 11.1925298,8.09541085 8.26151713,8.00404239 L8,8 L3.707,7.99946609 L6.3890873,10.6819805 L3.707,7.99946609 Z"></path>
                                            </svg>
                                        </div>
                                        <div className={styles.message_action} onClick={(ev) => _onMessageReact(ev, message)}>
                                            <svg id="reaction-menu-button" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.03 0 3.8-1.11 4.75-2.75.19-.33-.05-.75-.44-.75H7.69c-.38 0-.63.42-.44.75.95 1.64 2.72 2.75 4.75 2.75z" fill="var(--cb-color-white)"></path>
                                            </svg>
                                        </div>
                                        {message.author.id === currents.user?.id && (
                                            <>
                                                <div className={styles.vl}> </div>
                                                <div className={styles.message_action} onClick={(ev: React.MouseEvent) => { onMessageEdit(messageinfo_ref.current) }}>
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
                    <div className={styles.message_useravatar_holder} onContextMenuCapture={(ev) => { ev.preventDefault(); onRightClickUserAvatar(message.authorId, ev) }} id="user_avatar">
                        <img className={styles.message_useravatar} src={`${message.author.avatarUrl/*https://cat-storage-server.web.app/data/cat1.jpeg"*/}`} onContextMenuCapture={(ev) => { ev.preventDefault(); onRightClickUserAvatar(message.authorId, ev) }} onClick={(ev) => onClickUserAvatar(message.id, ev)} />
                    </div>
                    <div className={styles.message_user_holder}>
                        <div className={styles.message_content_holder}>
                            <p className={styles.message_username} style={{ color: useUserInfoStore.getState().getExistingUserInfo(message.author.id)?.usernameColor, fontSize: (variables.channelFontSize ?? DefaultUserVariables.channelFontSize) }}>{message.author.username}</p>
                            <p className={styles.message_timestamp} style={{fontSize: (variables.channelFontSize ?? DefaultUserVariables.channelFontSize) - 2}}>{GetMessageDateString(new Date(message.timestamp))}</p>
                        </div>
                        <div>
                            {!(MessageInfos.find(msg => msg.Message.id === message.id)?.editMode) && (
                                <div className={styles.message_content} style={{
                                    width: (() => {
                                        if (!MessageInfos) return "40vw";
                                        const info = MessageInfos.length > 0 ? (MessageInfos.find(x => x.Message.id === message.id)) : undefined;
                                        if (info) {
                                            const msgInfRef = info.ref;
                                            if (msgInfRef) {
                                                return (msgInfRef.clientWidth * 7 / 10) + "px"
                                            } else return "40vw";
                                        }
                                    })()
                                }}>
                                    {/* <ReactMarkdown components={{
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
                                                {String(children).replace(/\n$/, '')}
                                            </SyntaxHighlighter>
                                        ) : (
                                            <code {...rest} className={className}>
                                                {children}
                                            </code>
                                        )
                                    },
                                }}>{(parseEmojis(message.content))}</ReactMarkdown> */}
                                    {
                                        render
                                    }
                                </div>
                            )}
                            {(MessageInfos.find(msg => msg.Message.id === message.id)?.editMode) && (
                                <>
                                    <textarea className={styles.edit_message_textarea} style={{ fontSize: variables.channelFontSize, width: (MessageInfos.find(x => x.Message.id === message.id)!.ref) ? (MessageInfos.find(x => x.Message.id === message.id)!.ref!.clientWidth * 7 / 10) + "px" : "40vw" }} onKeyDown={(ev) => { onEditInput(message, ev) }} defaultValue={message.content}></textarea>
                                </>)}
                        </div>
                    </div>
                    {(!message.repliedToId) && (<div id="message-actions-holder" className={`${styles.message_actions_holder} ${(hoveredMessageId == message.id || reactionMenu.messageId == message.id) ? styles.message_actions_holder_active : ''}`}>
                        <div className={styles.message_actions}>
                            <div className={styles.message_action} onClick={() => _onMessageReply(message)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" id="reply">
                                    <path fill="#F0F7EE" d="M3.707,7.99946609 L6.3890873,10.6819805 C6.58434944,10.8772427 6.58434944,11.1938252 6.3890873,11.3890873 C6.21552094,11.5626536 5.94609654,11.5819388 5.7512284,11.4469427 L5.68198052,11.3890873 L2.11603371,7.82029139 L2.11603371,7.82029139 L2.06639375,7.74915207 L2.06639375,7.74915207 L2.03875135,7.69334249 L2.03875135,7.69334249 L2.0159743,7.62570887 L2.0159743,7.62570887 L2.01108568,7.60498705 C2.00382515,7.57130067 2,7.53609704 2,7.5 L2.00546187,7.57391777 L2.00179699,7.5424826 L2.00179699,7.5424826 L2.00179763,7.45747863 L2.00179763,7.45747863 L2.01678848,7.37116919 L2.01678848,7.37116919 L2.03779224,7.30896344 L2.03779224,7.30896344 L2.07718801,7.23298968 L2.07718801,7.23298968 L2.13168953,7.16184291 L2.13168953,7.16184291 L5.68198052,3.6109127 C5.87724266,3.41565056 6.19382515,3.41565056 6.3890873,3.6109127 C6.56265365,3.78447906 6.5819388,4.05390346 6.44694275,4.2487716 L6.3890873,4.31801948 L3.707,6.99946609 L8,7 C11.5217665,7 13.8853902,8.97580254 13.9959473,11.7924218 L14,12 C14,12.2761424 13.7761424,12.5 13.5,12.5 C13.2238576,12.5 13,12.2761424 13,12 C13,9.72683267 11.1925298,8.09541085 8.26151713,8.00404239 L8,8 L3.707,7.99946609 L6.3890873,10.6819805 L3.707,7.99946609 Z"></path>
                                </svg>
                            </div>
                            <div className={styles.vl}> </div>
                            <div className={styles.message_action} onClick={(ev) => _onMessageReact(ev, message)}>
                                <svg id="reaction-menu-button" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.03 0 3.8-1.11 4.75-2.75.19-.33-.05-.75-.44-.75H7.69c-.38 0-.63.42-.44.75.95 1.64 2.72 2.75 4.75 2.75z" fill="var(--cb-color-white)"></path>
                                </svg>
                            </div>
                            {message.author.id === currents.user?.id && (
                                <>
                                    <div className={styles.vl}> </div>
                                    <div className={styles.message_action} onClick={(ev: React.MouseEvent) => { onMessageEdit(messageinfo_ref.current) }}>
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
                {attachmentsRender}
                {reactionsRender}
            </div >
        </>
    );
})

MessageElement.displayName = "MessageElement";