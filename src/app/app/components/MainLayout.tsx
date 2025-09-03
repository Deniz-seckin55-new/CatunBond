'use client';

import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from '../page.module.css';

import {
    useLocalParticipant,
} from '@livekit/components-react';

import { useChannelInfoStore } from "@/store/channelInfos";
import { useCurrents } from "@/store/currents";
import { useDirectMessageStore } from "@/store/directmessages";
import { useKBState } from "@/store/kbState";
import { useMessageInfoStore } from "@/store/messageInfos";
import { useMessagesStore } from "@/store/messages";
import { useSocket, useSocketStore } from "@/store/socket";
import useUserProfileStore from "@/store/userProfile";
import { useUser } from "@clerk/nextjs";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Peer, { MediaConnection } from "peerjs";
import { toast } from "react-toastify";
import { io, Socket } from 'socket.io-client';
import { MESSAGES_FIRST_LOAD_MAX_AMOUNT } from "../utils/constants";
import { AllowedTypes, Category, Channel, ChannelInfo, DetailedDBUser, DirectMessage, EditContext, JsonAttachments, Message, MessageCreate, MessageUpdate, PendingFriendRequest, SendMessageI, Server, SocketData, SocketInformationType, User, VoiceChatInformation, WritingEvent } from "../utils/socket_utils";
import { DBVoiceChatWithMembers, ExploreBoxMode, fetchChannelInfo, MessageInfo, SettingsMode, ToUserSmall, ToVCInfo, UpdateMessageInfo, ViewingFriendsDiv } from "../utils/utils";
import BackgroundBlur from './BackgroundBlur';
import ChannelBox from "./ChannelBox";
import ChannelBoxInfo from "./ChannelBoxInfo";
import Tooltip from "./common/Tooltip";
import UsersHandler from "./common/UsersHandler";
import { ConfirmationMenu } from "./ConfirmationMenu";
import ContextMenu from "./ContextMenu";
import ExploreBox from "./ExploreBox";
import FriendsDiv from "./FriendsDiv";
import LoadingPage from "./LoadingPage";
import MainBox from "./MainBox";
import ServerUsersTab from "./ServerUsersTab";
import SettingsBox from "./SettingsBox";
import SideBox from "./SideBox";
import UserBox from "./UserBox";
import { UserProfile } from "./UserProfile";
import useChannelBoxStore from "@/store/channelBoxStore";
import ReactionMenu from "./ReactionMenu";
import useReactionMenuStore from "@/store/reactionMenu";
import { Reaction } from "@prisma/client";
import { useVariablesStore } from "@/store/variablesStore";
import { ImagePreview } from "./common/ImagePreviewFull";
import { useImagePreviewStore } from "@/store/imagepreviewstore";
import LiveKit from "./LiveKit";
import FullScreenVideo from "./common/FullScreenVideo";
import { usePersistantUserStorage } from "@/store/persistantUserStorage";
import InvisibleHolder from "./InvisibleHolder";
import { HoveringElement } from "./HoveringElement";
import { NextResponse } from "next/server";
import { HelpMenu } from "./common/HelpMenu";

// const fetchLocalUser = async () => {
//     const data = await axios.get("/api/v1/user");

//     console.log("Got data as ", data);
//     return data.data.data as DetailedDBUser; // Funny
// }

let voicesocket: Socket | undefined;

const MainLayout: React.FC = () => {
    const { socket } = useSocketStore();
    const { directmessages, setDirectMessages } = useDirectMessageStore();
    const messageStore = useMessagesStore();
    const userProfileStore = useUserProfileStore();
    // const ls = useLocalStore();
    const kb = useKBState();
    const channelInfoStore = useChannelInfoStore();
    const [lastMessageSentDate, setlastMessageSentDate] = useState<number>(0);

    const persistantUserStorage = usePersistantUserStorage();

    const currents = useCurrents();
    const [LoadingText, setLoadingText] = useState("Loading..."); // Replace with loading gif
    const { MessageInfos, setMessageInfos } = useMessageInfoStore();
    // const [appGridRows, setappGridRows] = useState<string>(`repeat(32, 1fr)`);
    const [appGridColumns, setappGridColumns] = useState<string>(`repeat(32, 1fr)`);
    const [pendingSentRequests, setpendingSentRequests] = useState<PendingFriendRequest[]>([]);
    const [userStreams, setUserStreams] = useState<{ [userId: string]: MediaStream }>({});
    const [peer, setpeer] = useState<Peer | null>(null);
    const [calls, setcalls] = useState<Record<string, MediaConnection>>({});
    const [microphoneState, setmicrophoneState] = useState<boolean>(true);
    const [appLoaded, setappLoaded] = useState<boolean>(false);
    const [createBoxC, setcreateBoxC] = useState<Category | null>(null);
    const [createBoxV, setcreateBoxV] = useState<boolean>(false);
    const chStore = useChannelBoxStore();
    const reactionMenuStore = useReactionMenuStore();
    const userVariablesStore = useVariablesStore();

    const router = useRouter();

    useSocket();

    const tooltipRef = useRef<HTMLDivElement | null>(null);

    let timeout: NodeJS.Timeout | null = null;

    const resetTimeout = () => {
        if (timeout)
            clearTimeout(timeout);
        timeout = setTimeout(() => {
            sendStopWritingEvent();
            timeout = null;
        }, 5000);
    };

    const user = useUser();

    // const { data: localUser, isFetched: localUserReady } = useQuery({
    //     queryKey: ['userData'],
    //     queryFn: fetchLocalUser,
    // });

    const [TextareaInitalConstNumber, setTextareaInitalConstNumber] = useState(0);

    // const [localStream, setlocalStream] = useState<MediaStream | null>(null);

    // const getMediaStream = useCallback(async () => {
    //     if (localStream) return localStream;

    //     try {
    //         // const devices = await navigator.mediaDevices.enumerateDevices();
    //         // const audioDevices = devices.filter(x => x.kind === "audioinput");

    //         const stream = await navigator.mediaDevices.getUserMedia({
    //             audio: {
    //                 echoCancellation: false,
    //                 noiseSuppression: true,
    //                 channelCount: 2
    //             },
    //             video: false,
    //         });

    //         setlocalStream(stream);
    //         return stream;
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }, []);

    // const toggleFriendsDivVisibility = () => {
    //     currents.setFriendsDivV(!currents.friendsdiv.visible);
    // }

    const openExploreBox = (mode: ExploreBoxMode) => {
        currents.setExploreBoxMode(mode);
        currents.setExploreBoxV(true);
        currents.setBgBlurV(true);
    }

    const onClickSearch = () => {

    }

    const onClickBgBlur = () => {
        currents.setExploreBoxV(false);
        userProfileStore.setisShown(false);
        currents.setBgBlurV(false);
    }

    const onClickFB = (status: ViewingFriendsDiv) => {
        currents.setFriendsDivState(status);
    }

    const onClickFriendsButton = () => {
        currents.setFriendsDivV(true);
    }

    const onClickServer = (server: Server) => {
        try {
            currents.setCategories(server.categories);

            currents.setFriendsDivV(false);
            currents.setSideBoxChannelsV(true);

            currents.setChannel(null);
            messageStore.setMessages([]);

            currents.setServer(server);

            setTimeout(() => {
                let found = persistantUserStorage.serverLastChannelList[server.id];

                console.log("found server", found);

                if (found) {
                    console.log("Auto loading channel");

                    onClickChannel(found);
                }
            }, 10);
        } catch (err) {
            console.error(err);
        }

        // Add class 'server_list_element_image_active' to server jsx element
    }

    const onRightClickServer = (server: Server, ct: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        currents.setContextMenuXY(ct.pageX.clamp(10, window.innerWidth - ct.currentTarget.getBoundingClientRect().width - 150), ct.pageY.clamp(10, window.innerHeight - ct.currentTarget.getBoundingClientRect().height - 150));
        currents.setContextMenuObject(server);
        currents.setContextMenuIncludes([]);
        currents.setContextMenuID(server.id);
        currents.setContextMenuMode("Server");
        currents.setContextMenuShown(true);

        return false;
    }

    const onRightClickChannel = (channel: Channel, ct: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log("CHANNELRIGHTCLICK", channel, ct);
        currents.setContextMenuXY(ct.pageX.clamp(10, window.innerWidth - ct.currentTarget.getBoundingClientRect().width - 150), ct.pageY.clamp(10, window.innerHeight - ct.currentTarget.getBoundingClientRect().height - 150));
        currents.setContextMenuObject(channel);
        currents.setContextMenuIncludes([]);
        currents.setContextMenuID(channel.id);
        currents.setContextMenuMode("Channel");
        currents.setContextMenuShown(true);

        return false;
    }

    const isInterrupted = useRef(false);

    const setChannelInterrupted = (val: boolean) => {
        isInterrupted.current = val;
    };

    const onClickChannel = (channel: (Channel | string)) => {
        try {
            let channelId = "";
            if (typeof channel === "string") {
                channelId = channel;
            } else {
                channelId = channel.id;
            }

            if (currents.channel?.id === channelId) { return; }

            currents.setisChannelLoading(true);

            fetch(`api/v1/channels/${channelId}/messages?limit=${MESSAGES_FIRST_LOAD_MAX_AMOUNT}`).then((res) => {
                if (res.status != 200) {
                    console.log("Error fetching messages for channel " + channelId);
                    return;
                }
                res.json().then((data) => {
                    requestAnimationFrame(() => {
                        console.log("Got all messages", data);
                        const blocked = currents.user?.blocked;

                        const messageList: Message[] = data.data;

                        if (blocked) {
                            const FilteredMessages = messageList.filter(x => !(blocked.includes(x.authorId)));

                            if (FilteredMessages.length > 0)
                                chStore.setendMessageId(FilteredMessages[FilteredMessages.length - 1].id);

                            messageStore.setMessages(FilteredMessages);
                        } else {
                            if (messageList.length > 0)
                                chStore.setendMessageId(messageList[messageList.length - 1].id);
                            messageStore.setMessages(messageList);
                        }

                        // console.log("Channel loaded ", channel);
                        // console.log("Messages: ", messageList);

                        if (typeof channel !== "string")
                            setTimeout(() => {
                                if (currents.server) {
                                    persistantUserStorage.setLastChannelOfServer(currents.server.id, channel);
                                    console.log("DW1 set last channel", currents.server.id, channelId);
                                } else {
                                    console.log("DW1 no server???");
                                }

                                requestAnimationFrame(() => {
                                    console.log("DW1", persistantUserStorage.serverLastChannelList);
                                });
                            }, 20);
                        if (typeof channel !== "string")
                            currents.setChannel(channel);
                        else {
                            let found: Channel | undefined;
                            currents.Categories.forEach(cat => {
                                cat.channels.forEach(cah => {
                                    if (cah.id === channelId) {
                                        found = cah;
                                    }
                                });
                            });

                            if (found)
                                currents.setChannel(found);
                        }

                        currents.setisChannelLoading(false);
                    });
                });
            })
        } catch (err) {
            console.error(err);
        }
    }

    const onClickExploreButton = () => {
        currents.setExploreBoxMode(0);

        currents.setExploreBoxV(true);
        currents.setBgBlurV(true);
    }

    const onClickJoinButton = () => {
        currents.setExploreBoxMode(1);
    }

    const onClickBackButton = () => {
        currents.setExploreBoxMode(0);
    }

    const onClickServerJoinButton = (server: string) => {
        setLoadingText("Loading...");

        currents.setExploreBoxMode(2);

        fetch('/api/v1/user/servers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                inviteLink: server,
            })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message == "Server joined successfully") {
                    setLoadingText("Success!");
                } else {
                    setLoadingText(data.message);
                }
                setTimeout(() => {
                    currents.setExploreBoxMode(0);
                    setLoadingText("Loading...");
                }, 1000);
            })
    }

    const loadingTextResetTimeout = () => {
        setTimeout(() => {
            currents.setExploreBoxV(false);
            currents.setBgBlurV(false);
            currents.setExploreBoxMode(0);
            setLoadingText("Loading...");
        }, 1000);
    }

    const onClickSendFriendRequestButton = (friendName: string) => {
        // Fetch add friend && setExploreBox mode to 2 LoadingText

        setLoadingText("Loading...");

        currents.setExploreBoxMode(2);

        fetch(`/api/v1/users/withName/${friendName}`).then(res => res.json().then(data => {
            if (data.data) {
                const friend: User = data.data as User;
                fetch("/api/v1/user/friendrequests", {
                    method: "POST",
                    body: JSON.stringify({
                        friendId: friend.id,
                    }),
                }).then(res => res.json().then(data => {
                    if (data.data) {
                        const FriendRequest: PendingFriendRequest = data.data;

                        setpendingSentRequests((prev) => [...prev, FriendRequest]);
                        setLoadingText("Success!");

                        toast.success("Friend request sent to " + friendName);

                        loadingTextResetTimeout();
                    } else {
                        setLoadingText(data.message);
                        loadingTextResetTimeout();
                    }
                }))
            } else {
                setLoadingText(data.message);
                loadingTextResetTimeout();
            }
        })).catch(err => {
            console.log(err);
        })
    }

    const sendFriendRequestWithId = (friendId: string) => {
        fetch("/api/v1/user/friendrequests", {
            method: "POST",
            body: JSON.stringify({
                friendId: friendId,
            }),
        }).then(res => res.json().then(data => {
            if (data.data) {
                const FriendRequest: PendingFriendRequest = data.data;

                setpendingSentRequests((prev) => [...prev, FriendRequest]);

                toast("Friend request sent");
            } else {
                toast(data.message ?? "Error while sending friend request");
            }
        }))
    }

    const addReactionToMessage = async (messageId: string, channelId: string, emojiName: string) => {
        const userId = currents.user?.id;
        if (!userId) return;

        const resp = await axios.patch(`api/v1/channels/${channelId}/messages/${messageId}/reactions`, {
            emojiName,
        });

        if (resp.status === 200) {
            const message = messageStore.messages.find(x => x.id === messageId);

            if (!message) {
                toast((<span style={{ color: "var(--cb-color-red)" }}>Warning, message not found while re-writing reactions</span>)); return;
            }

            const reactionState = resp.data.data.state;
            const newReaction = resp.data.data.reaction as Reaction;

            console.log(reactionState, newReaction);
        }
    }

    const onClickMicrophone = useCallback(() => {

        if (!currents.liveKitParticipant) return;

        currents.setLiveKitParticipant({ ...currents.liveKitParticipant, isMicrophoneEnabled: !currents.liveKitParticipant.isMicrophoneEnabled });
    }, []);

    const closeExploreBox = () => {
        currents.setExploreBoxV(false);
        currents.setBgBlurV(false);
    }

    const onInputTextarea = () => {
        // const textarea = event.target;
    }

    const onLoadTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (TextareaInitalConstNumber)
            return;
        const textarea = event.target;
        const height = textarea.scrollHeight;

        setTextareaInitalConstNumber(height);
        console.log("Inital constant: " + height);
    }

    const sendMessageWithoutTextarea = async (messageText: string, channel: Channel, user: DetailedDBUser) => {
        const sentDateTime = new Date();

        if (messageText.trimEnd() === "") return;

        const ReplyingToMessage = messageStore.replyingTo;

        const chInfo = await fetchChannelInfo(channel.id, channelInfoStore);

        const chCheck = okdi_handleSendMessage_chInfoCheck(chInfo, sentDateTime);

        if (!chCheck) return;

        const message: MessageCreate = {
            content: messageText,
            attachments: chStore.acceptedFiles.map(x => x.name),
            repliedToId: ReplyingToMessage?.id ?? null,
        }

        const acceptedFiles = chStore.acceptedFiles;

        // okdi_handleSendMessage_clearData(textarea, sentDateTime);

        const post = await okdi_handleSendMessage_post(channel.id, message);

        if (post.success) {
            await okdi_handleSendMessage_submitFiles(channel.id, post.data.id as string, acceptedFiles);
        }

        return post;
    }

    const sendMessageWithTextarea = async (messageText: string, channel: Channel, user: DetailedDBUser, textarea: HTMLTextAreaElement) => {
        const sentDateTime = new Date();

        if (messageText.trimEnd() === "") return;

        const ReplyingToMessage = messageStore.replyingTo;

        const chInfo = await fetchChannelInfo(channel.id, channelInfoStore);

        const chCheck = okdi_handleSendMessage_chInfoCheck(chInfo, sentDateTime);

        if (!chCheck) return;

        const message: MessageCreate = {
            content: messageText,
            attachments: chStore.acceptedFiles.map(x => x.name),
            repliedToId: ReplyingToMessage?.id ?? null,
        }

        const acceptedFiles = chStore.acceptedFiles;

        okdi_handleSendMessage_clearData(textarea, sentDateTime);

        const post = await okdi_handleSendMessage_post(channel.id, message);

        if (post.success) {
            await okdi_handleSendMessage_submitFiles(channel.id, post.data.id as string, acceptedFiles);
        }

        return post;
    }

    const okdi_handleWriting = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key != "Enter") {
            const handleTimeoutOut = async () => {
                if (timeout) { sendStartWritingEvent(); }
                resetTimeout();
            }
            handleTimeoutOut();
        } else {
            if (timeout) {
                sendStartWritingEvent();
            } resetTimeout();
        }
    }

    const okdi_handleSendMessage_chInfoCheck = (chInfo: ChannelInfo, sentDateTime: Date) => {
        if (chInfo.slowMode !== 0) {
            console.log((sentDateTime.getTime() - (lastMessageSentDate + 200)) / 1000);
            if (sentDateTime.getTime() - lastMessageSentDate <= chInfo.slowMode * 1000) {
                toast(`Slow down! You need to wait ${Math.round(((chInfo.slowMode * 1000 - (sentDateTime.getTime() - lastMessageSentDate)) / 1000))} seconds`)
                return false;
            }
        }

        if (chInfo.readOnly) {
            toast("You are not allowed to send messages to this channel.");
            return false;
        }

        return true;
    }

    const okdi_handleSendMessage_post = async (channelId: string, message: MessageCreate) => {
        // const resp = await axios.post(`api/v1/channels/${channelId}/messages/`, message);

        const resp = await axios.post(`api/v1/channels/${channelId}/messages/`, message);

        if (resp.status === 200) {
            return { success: true, data: resp.data.data, message: resp.data.message };
        } else {
            return { success: false, message: resp.data.message };
        }

        // return new Promise<{ success: boolean; data?: any; message: string }>((resolve) => {
        //     socket?.emit("sendMessage", channelId, message, (response: NextResponse<{ data: Message }> | NextResponse<{ message: string }>) => {
        //         if (!response.json) return;
        //         response.json().then(resp => {
        //             if (resp.status === 200 && resp.data) {
        //                 resolve({
        //                     success: true,
        //                     data: resp.data.data,
        //                     message: resp.data.message
        //                 });
        //             } else {
        //                 resolve({
        //                     success: false,
        //                     message: resp.data.message
        //                 });
        //             }
        //         });
        //     });
        // });
    }

    const okdi_handleSendMessage_clearData = (textarea: HTMLTextAreaElement, sentDateTime: Date) => {
        setlastMessageSentDate(sentDateTime.getTime());
        messageStore.setreplyingTo(null);
        textarea.value = "";
        chStore.setacceptedFiles([]);
    }

    const okdi_handleSendMessage_submitFiles = async (channelId: string, messageId: string, files: File[]) => {
        if (files.length <= 0) return;

        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });

        const resp = await axios.post(`api/v1/channels/${channelId}/messages/${messageId}/attachments`, formData);

        if (resp.status === 200) {
            return { success: true, data: resp.data.data, message: resp.data.message };
        } else {
            return { success: false, message: resp.data.message };
        }
    }

    const okdi_handleSendMessage = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (!currents.channel) return;
        if (!currents.user) return;

        const sentDateTime = new Date();
        const channel = currents.channel;
        const user = currents.user;

        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();

            const textarea = event.target as HTMLTextAreaElement;
            const messageText = textarea.value;

            if (messageText.trimEnd() === "") return;

            const ReplyingToMessage = messageStore.replyingTo;

            const acceptedFiles = chStore.acceptedFiles;

            const chInfo = await fetchChannelInfo(currents.channel.id, channelInfoStore);

            const chCheck = okdi_handleSendMessage_chInfoCheck(chInfo, sentDateTime);

            if (!chCheck) return;

            const attachments: JsonAttachments = acceptedFiles.map(x => {
                return {
                    filename: x.name,
                    publicUrl: "",
                }
            });

            const message: MessageCreate = {
                content: messageText,
                attachments: JSON.stringify(attachments),
                repliedToId: ReplyingToMessage?.id ?? null,
            }

            okdi_handleSendMessage_clearData(textarea, sentDateTime);

            const post = await okdi_handleSendMessage_post(channel.id, message);

            if (post.success) {
                await okdi_handleSendMessage_submitFiles(channel.id, post.data.id as string, acceptedFiles);
            }

            return post;
        }
    }

    const onKeyDownInput = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        okdi_handleWriting(event);

        okdi_handleSendMessage(event);
    }

    const parentHasId = (target: HTMLElement, id: string) => {
        let current = target;

        while (true) {
            if (current.id == id) {
                return true;
            }

            if (!current.parentElement)
                break;

            current = current.parentElement;
        }

        return false;
    }

    const onMouseDown = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        console.log(target.classList, target.id);

        if (target.id != "context-menu") {
            if (event.button === 0)
                currents.setContextMenuShown(false);
        }

        if (target.id != "user-profile-sub-menu" && target.id != "user-profile-other-actions-button") {
            if (event.button === 0) {
                useUserProfileStore.getState().setIsSubMenuShown(false);
            }
        }

        if (target.id != "reaction-menu" && target.id != "reaction-menu-button" && !Array.from(target.classList.values()).some((x: string) => x.startsWith("epr"))) {
            if (event.button === 0) {
                reactionMenuStore.setShown(false);
            }
        }

        if (!parentHasId(target, "helpmenu") && !parentHasId(target, "message_box_main")) {
            if (event.button === 0) {
                currents.sethelpmenuShown(false);
            }
        }
    }

    // const onMessageReply = (message: Message) => {

    // }

    const onMessageEdit = (message: MessageInfo) => {
        /*if (message.editRef) {
            message.editRef.style.height = "auto";
            message.editRef.style.height = message.editRef.scrollHeight + "px";
        }*/

        if (!user.user) {
            return;
        }

        if (message.Message.author.id !== user.user.id) {
            return;
        }

        const currentMessageInfo = MessageInfos.find(x => x.Message.id === message.Message.id);

        const messageExists = MessageInfos.find(x => x.editMode === true);
        if (messageExists) {
            if (messageExists.Message.id !== currentMessageInfo?.Message.id) {
                UpdateMessageInfo(messageExists.Message, "editMode", false, setMessageInfos);
            }
        }

        if (currentMessageInfo?.editMode === true)
            UpdateMessageInfo(message.Message, "editMode", false, setMessageInfos);
        else {
            UpdateMessageInfo(message.Message, "editMode", true, setMessageInfos);

            requestAnimationFrame(() => {
                const messageref = MessageInfos.find(x => x.Message.id === message.Message.id)?.ref;

                if (messageref) {
                    const textarea = messageref.querySelector("textarea");

                    if (textarea) {
                        textarea.focus();

                        textarea.selectionEnd = textarea.value.length;

                        console.log(kb.kbState);

                        textarea.selectionStart = kb.kbState.includes("Control") ? 0 : textarea.selectionEnd;
                    }
                } else {
                    console.log("no messageref");
                }
            });
        }
        console.log(message);
    }

    const onMessageReact = (message: Message) => {

    }

    const onMessageDelete = (message: Message) => {
        deleteMessage(message);
    }

    const onEditInput = (message: Message, event: React.KeyboardEvent) => {
        const textArea = event.target as HTMLTextAreaElement;
        textArea.style.height = "auto";
        textArea.style.height = textArea.scrollHeight + "px";

        if ((!event.shiftKey) && event.key === "Enter") {
            event.preventDefault();
            const newmessage: Message = { ...message, content: textArea.value };

            editMessage(newmessage, message);

            UpdateMessageInfo(message, "editMode", false, setMessageInfos);
        }
        if (event.key == "Escape") {
            UpdateMessageInfo(message, "editMode", false, setMessageInfos);
        }
    }

    const onClickUserAvatarWithMesssageId = (messageId: string | null, ev: React.MouseEvent) => {
        const messageInfo = MessageInfos.find(x => x.Message.id === messageId);
        if (messageInfo) {
            console.log("Open user context menu: ");
            console.log(messageInfo);
            currents.setBgBlurV(true);
            userProfileStore.setisFull(true);
            userProfileStore.setUserProfile(messageInfo.Message.authorId);
            userProfileStore.setisShown(true);
        } else { console.warn("No message info for ", messageId) }
    }


    const _onClickUserAvatar = (userId: string | null, ev: React.MouseEvent) => {
        if (!userId) { console.warn("_onClickUserAvatar: userId == null"); return; }

        console.log("Open user context menu: ");
        console.log(userId);
        OpenUserContextMenu(userId, ev);
    }

    const onClickUserAvatarWithUserId = (userId: string | null, ev: React.MouseEvent) => {
        if (userId) {
            console.log("Open user context menu: ", userId);
            currents.setBgBlurV(true);
            userProfileStore.setisFull(true);
            userProfileStore.setUserProfile(userId);
            userProfileStore.setisShown(true);
        } else { console.warn("No user id found", ev); }
    };

    const onRightClickUserAvatar = (userId: string | null, ev: React.MouseEvent) => {
        if (!userId) { console.warn("_onClickUserAvatar: userId == null"); return; }

        ev.preventDefault();

        console.log("Open user context menu: ");
        console.log(userId);

        OpenUserContextMenu(userId, ev);
    }

    // const onClickUserAvatarWithUserIdVoiceChatInclude = ...

    const onClickSettings = (mode: SettingsMode) => {
        currents.setSetting(null);
        currents.setSettingsMode(mode);
        currents.setSettingsDivV(true);
        console.log("Opened sestting ", mode,);
    }

    const openSettings = (mode: SettingsMode, object: any) => {
        currents.setSetting(null);
        currents.setSettingsMode(mode);
        currents.setSettingsObject(object);
        currents.setSettingsDivV(true);
    }

    const onClickAddFriend = () => {
        currents.setExploreBoxMode(3);
        currents.setExploreBoxV(true);
        currents.setBgBlurV(true);
    }

    const onClickDirectMessage = (user: User) => {
        openDirectMessage(user);
    }

    const onClickDirectMessageWithCallback = (user: User, fn: Function) => {
        openDirectMessage(user);
        fn();
    }

    useEffect(() => {
        if (!currents.user) return;
        if (voicesocket) return;

        let thisUser = currents.user;

        // Initialize voice socket connection
        voicesocket = io("http://localhost:3002", {
            query: {
                info: [
                    thisUser.id,
                    thisUser.username,
                    thisUser.avatarUrl,
                ]
            }
        });


    }, [currents.user]);

    // const { onClickCallButton } = useCallHandler();

    const onClickCall = useCallback(() => {
        // onClickCallButton();
        if (!currents.channel) return;
        if (!currents.user) return;

        currents.setLiveikitRoom(currents.channel.id);

        currents.setLivekitShown(true);
    }, [currents.channel, currents.user]);

    const onClickLeaveCall = () => {
        currents.setLivekitShown(false);

        currents.setLiveikitRoom("");
    }

    const OpenUserContextMenu = (userId: string, ev: React.MouseEvent) => {
        currents.setContextMenuXY(ev.pageX.clamp(10, window.innerWidth - ev.currentTarget.getBoundingClientRect().width - 150), ev.pageY.clamp(10, window.innerHeight - ev.currentTarget.getBoundingClientRect().height - 150));
        currents.setContextMenuID(userId);
        currents.setContextMenuIncludes([]);
        currents.setContextMenuShown(true);
        currents.setContextMenuMode("User");

        console.log(currents.contextmenu);
    }

    const deleteMessage = async (message: Message) => {
        const resp = await axios.delete(`api/v1/channels/${message.channelId}/messages/${message.id}`);
        if (resp.status === 200) {
            return { success: true, message: resp.data.message };
        } else {
            return { success: false, message: resp.data.message };
        }
    }

    const editMessage = async (newMessage: Message, message: Message) => {
        const data: MessageUpdate = newMessage;
        const resp = await axios.patch(`/api/v1/channels/${message.channelId}/messages/${message.id}`, data);
        if (resp.status === 200) {
            return { success: true, message: resp.data.message };
        } else {
            return { success: false, message: resp.data.message };
        }
    }

    const sendStartWritingEvent = () => {
        if (!currents.user) return;

        const data: WritingEvent = {
            user: ToUserSmall(currents.user),
            channelId: currents.channel?.id ?? '',
        }

        const socketData: SocketData = {
            infoType: SocketInformationType.ClientStopWritingMessage,
            dataType: AllowedTypes.WritingEvent,
            data: data,
        }

        socket?.emit("writing_event", socketData);
    }

    const sendStopWritingEvent = () => {
        if (!currents.user) return;

        const data: WritingEvent = {
            user: ToUserSmall(currents.user),
            channelId: currents.channel?.id ?? '',
        }

        const socketData: SocketData = {
            infoType: SocketInformationType.ClientStopWritingMessage,
            dataType: AllowedTypes.WritingEvent,
            data: data,
        }

        socket?.emit("writing_event", socketData);
    }

    const openDirectMessage = (withUser: User) => {
        if (withUser.id === currents.user?.id) return;

        // Open or create direct message
        fetch(`/api/v1/directmessages/withUser/${withUser.id}`).then(res => res.json().then(data => {
            console.log("DM ", data);
            if (data.data) {
                const directMessage: DirectMessage = data.data as DirectMessage;
                currents.setSideBoxChannelsV(false);

                currents.setFriendsDivV(false);
                try {
                    fetch(`api/v1/channels/${directMessage.id}/messages?limit=${MESSAGES_FIRST_LOAD_MAX_AMOUNT}`).then((res) => {
                        if (res.status != 200) {
                            console.log("Error fetching messages for channel " + directMessage.id);
                            return;
                        }
                        res.json().then((data) => {
                            console.log("Got all messages", data);
                            const blocked = currents.user?.blocked;

                            const messageList: Message[] = data.data;

                            if (blocked) {
                                const FilteredMessages = messageList.filter(x => !(blocked.includes(x.authorId)));

                                if (FilteredMessages.length > 0)
                                    chStore.setendMessageId(FilteredMessages[FilteredMessages.length - 1].id);

                                messageStore.setMessages(FilteredMessages);
                            } else {
                                if (messageList.length > 0)
                                    chStore.setendMessageId(messageList[messageList.length - 1].id);
                                messageStore.setMessages(messageList);
                            }

                            // console.log("Channel loaded ", channel);
                            // console.log("Messages: ", messageList);

                            currents.setChannel({ categoryId: null, channelType: "DIRECTMESSAGE", id: directMessage.id, name: directMessage.directMsgFor.filter(x => x.id !== currents.user?.id)[0].username });
                        });
                    })
                } catch (err) {
                    console.error(err);
                }
            }
        }))
    }

    const onClickFriendUser = (user: User) => {
        try { openDirectMessage(user) } catch (err) { if (err instanceof Error) console.log(err.stack); };
    }

    const SideBoxProps = {
        onClickSearch: onClickSearch,
        onClickFriendsButton: onClickFriendsButton,
        onClickChannel: onClickChannel,
        onRightClickChannel: onRightClickChannel,
        onClickDirectMessage: onClickDirectMessage,
        onClickSettings: onClickSettings,
        openExploreBox: openExploreBox,
        setcreateBoxC: setcreateBoxC,
        setcreateBoxV: setcreateBoxV,
        createBoxV: createBoxV,
        createBoxC: createBoxC,
        directmessages: directmessages,
        Currents: currents,
    }

    const ExploreBoxProps = {
        createBoxC: createBoxC,
        setcreateBoxV: setcreateBoxV,
        closeExploreBox: closeExploreBox,
        onClickJoinButton: onClickJoinButton,
        onClickBackButton: onClickBackButton,
        onClickServerJoinButton: onClickServerJoinButton,
        onClickSendFriendRequestButton: onClickSendFriendRequestButton,
        onClickUserAvatarWithUserId,
        setLoadingText: setLoadingText,
        LoadingText: LoadingText,
    }

    const FriendsDivProps = {
        Currents: currents,
        pendingSentRequests: pendingSentRequests,
        setpendingSentRequests: setpendingSentRequests,
        onClickFriendUser: onClickFriendUser,
        socket: socket,
    }

    const ChannelBoxProps = {
        onInputTextarea: onInputTextarea,
        onLoadTextarea: onLoadTextarea,
        onKeyDownInput: onKeyDownInput,
        onMessageReply: () => { },
        onMessageReact: onMessageReact,
        onMessageEdit: onMessageEdit,
        onMessageDelete: onMessageDelete,
        onEditInput: onEditInput,
        onClickUserAvatar: onClickUserAvatarWithMesssageId,
        onClickUserAvatarWithUserId: onClickUserAvatarWithUserId,
        onRightClickUserAvatar,
        addReactionToMessage: addReactionToMessage,
        sendMessageWithTextarea: sendMessageWithTextarea,
        onClickMicrophone: onClickMicrophone,
        onClickLeaveCall: onClickLeaveCall,
        setMessageInfos: setMessageInfos,
        voicesocket: voicesocket,
        userStreams: userStreams,
        setUserStreams: setUserStreams,
        calls: calls,
        setcalls: setcalls,
        peer: peer,
        microphoneState: microphoneState,
    }

    const MainBoxProps = {
        onClickServer: (server: Server) => onClickServer(server),
        onRightClickServer: onRightClickServer,
        onClickExploreButton: onClickExploreButton,
    }

    const ContextMenuProps = {
        onClickDirectMessageWithCallback: onClickDirectMessageWithCallback,
        sendFriendRequestWithId: sendFriendRequestWithId,
        onClickCall: onClickCall,
        openExploreBox: openExploreBox,
        openSettings: openSettings,
    }

    const SettingsBoxProps = {

    }

    const UserBoxProps = {
        onClickSettings: onClickSettings,
    }

    const ChannelBoxInfoProps = {
        onClickFB: onClickFB,
        onClickAddFriend: onClickAddFriend,
        onClickCall: onClickCall,
    }

    const ServerUsersTabProps = {

    }

    const TooltipProps = {
        tooltipText: currents.tooltip.text,
        tooltipVisible: currents.tooltip.visible,
        tooltipPosition: currents.tooltip.position,
        tooltipTextColor: currents.tooltip.textColor,
        tooltipRef: tooltipRef,
    }

    const UserProfileProps = {
        onClickDirectMessage,
        sendFriendRequestWithId,
        UserProfileOtherActionsMenuProps: {
            onClickDirectMessageWithCallback,
            onClickCall,
            openExploreBox,
        }
    }

    const onKeyUp = (event: KeyboardEvent) => {
        kb.setkbStateLambda((prev) => prev.filter((key) => key !== event.key));
    }

    const ips = useImagePreviewStore();

    const onKeyDown = useCallback((event: KeyboardEvent) => {
        console.log("keydown ", event.key, event.code);

        kb.setkbStateLambda((prev) => [...prev, event.key]);
        if (event.ctrlKey && event.key == 'f') {
            event.preventDefault();
            if (!currents.ExploreBoxV)
                onClickSearch();
            else
                closeExploreBox();
        }
        if (event.key == 'Escape') {
            closeExploreBox();
            currents.setContextMenuShown(false);
            setcreateBoxV(false);
            currents.sethelpmenuShown(false);

            ips.setShown(false);
        }

        if (event.code == "Space") {
            console.log(ips.shown);
            if (ips.shown) {
                ips.setZoomFactor(1);
                ips.setPos({ x: 0, y: 0 });

                event.preventDefault();
            }
        }
    }, [ips.shown]);

    useEffect(() => {
        const fn = async () => {
            if (!currents.user) return;
            if (currents.userVariables) return;

            const uw = await userVariablesStore.getVariables();

            currents.setUserVariables(uw);
        }

        fn();
    }, [currents.user]);

    useEffect(() => {
        if (currents.channel)
            socket?.emit("joinChannel", currents.channel.id);
        return () => {
            if (currents.channel)
                socket?.emit("leaveChannel", currents.channel?.id);
        }
    }, [currents.channel]);

    useEffect(() => {
        //fetch("/api/v1/socket"); // Initialize the WebSocket server
    }, []);

    useEffect(() => {
        if (currents.user) {
            setDirectMessages(currents.user.directMsgs);
        }
    }, [currents.user]);

    useEffect(() => {
        window.addEventListener('mousedown', onMouseDown);
        return () => window.removeEventListener('mousedown', onMouseDown);
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [currents.ExploreBoxV]);


    useEffect(() => {
        window.addEventListener('keyup', onKeyUp);
        return () => window.removeEventListener('keyup', onKeyUp);
    }, [currents.ExploreBoxV]);

    useEffect(() => {
        if (currents.userFetching) return; // Make sure we aren't fetching two times at once

        if (user.user && !currents.user) {
            currents.setUserFetching(true);
            axios.get("/api/v1/user").then(data => {
                if (data.status !== 200 || data.data.message === "User not found") {
                    console.log("Redirecting to after sign up.");

                    router.push("/aftersignup");

                    return;
                }

                const gotUser: DetailedDBUser = data.data.data;

                currents.setUser(gotUser);

                console.log("GotUser", gotUser);

                currents.setUserFetching(false);
            }).catch((err) => {
                currents.setUserFetching(false);
                if (err instanceof AxiosError) {
                    console.log("err: ", err);
                    if (err.code === "ERR_BAD_REQUEST") {
                        console.log("Redirecting to after sign up.");
                        router.push("/aftersignup");
                    }
                }
            });
            currents.setUserFetching(false); // Just incase
        }
    }, [user.user, user.isLoaded]);

    useEffect(() => {
        let newappGridColumns = `repeat(32, 1fr)`;
        if (currents.ServerUsersDivV) {
            newappGridColumns += " 6fr"
        }
        setappGridColumns(newappGridColumns);
        console.log(appGridColumns);
    }, [currents.ServerUsersDivV]);

    useEffect(() => {
        if (tooltipRef.current) {
            currents.setTooltipRef(tooltipRef.current);
        }
    }, [tooltipRef.current]);

    // useEffect(() => {
    //     getMediaStream().then(stream => { });
    // }, []);

    // useEffect(() => {
    //     if (!currents.user) return;

    //     const newPeer = new Peer(`${currents.user!.id}_peeruser`);
    //     setpeer(newPeer);

    //     getMediaStream().then(stream => {
    //         newPeer.on('call', (call_peer) => {
    //             console.log("Incoming call from:", call_peer.peer);
    //             call_peer.answer(stream); // Answer with local stream

    //             const vcUser: User = call_peer.metadata.user;

    //             currents.setVCUsers([...currents.vc!.members, { ...vcUser, avatarUrl: vcUser.avatarUrl }]);

    //             call_peer.on("stream", (remoteStream) => {
    //                 setUserStreams(prev => ({ ...prev, [call_peer.peer]: remoteStream }));
    //             });

    //             call_peer.on("close", () => {
    //                 setUserStreams(prev => {
    //                     const updatedStreams = { ...prev };
    //                     delete updatedStreams[call_peer.peer];
    //                     return updatedStreams;
    //                 });
    //                 currents.setVCUsers(currents.vc!.members.filter(x => x.id !== vcUser.id));
    //             });
    //         })
    //     })
    // }, [currents.user]);

    useEffect(() => {
        fetch("/api/v1/app/checkUser");
    }, []);

    // For debug remove later
    const Debugging = async () => {
        /*console.log("Highlight: ", await SyntaxHighlight([{
            className: "highlight_01",
            pattern: new RegExp("^#", "gmi")
        }], "# channel_name"));*/
        /*fetch('/api/v1/server/invites/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                serverId: "ee481f36-7871-4fab-8f56-9881eeb7743b",
            })
        }).then((res) => res.json()).then((data) => {
            console.log(data);
        });*/
        // toast(`${"meow"} sent you a friend request`);
        // const getUser = useGetUser();
        // console.log(await getUser("user_2rItXJAFbbcvi08CJhMboWDa4Zh"));
    }
    Debugging();

    if (!currents.user) {
        return <><LoadingPage isDone={false} /></>
    } else if (!appLoaded) {
        setTimeout(() => {
            setappLoaded(true);
        }, 2000);

        return <><LoadingPage isDone={true} /></>
    }

    return (
        <div>
            {/*<VoiceChat {...VoiceChatProps} />*/}
            {/*(<TransComp />)*/}
            <FullScreenVideo />
            <ReactionMenu />
            <ConfirmationMenu />
            <UsersHandler />
            <ImagePreview />
            <UserProfile {...UserProfileProps} />
            <ContextMenu {...ContextMenuProps} />
            <Tooltip {...TooltipProps} />
            <HoveringElement />
            <HelpMenu />
            {/* <LiveKit /> */}
            <div className={styles.body}>
                <div className={styles.main_container}>
                    <BackgroundBlur onClickBgBlur={onClickBgBlur} />
                    <div className={styles.app_box} style={{ gridTemplateRows: `${'repeat(32, 1fr)'}`, gridTemplateColumns: `${appGridColumns}` }}>
                        <ExploreBox {...ExploreBoxProps} />
                        <SettingsBox {...SettingsBoxProps} />
                        <div id="main-box-wraper" className={styles.main_box_wraper}>
                            <MainBox {...MainBoxProps} />
                        </div>
                        <div id="user-box-wraper" className={styles.user_box_wraper}>
                            <UserBox {...UserBoxProps} />
                        </div>
                        <SideBox {...SideBoxProps} />
                        <div id="chat-box" className={styles.chat_box}>
                            <div id="channel-info-box" className={styles.channel_info_box}>
                                <ChannelBoxInfo {...ChannelBoxInfoProps} />
                            </div>
                            {!currents.friendsdiv.visible && (<ChannelBox {...ChannelBoxProps} />)}
                            {currents.friendsdiv.visible && (<div id="friends-box" className={styles.friends_box}>
                                <FriendsDiv {...FriendsDivProps} />
                            </div>)}
                        </div>
                        <ServerUsersTab {...ServerUsersTabProps} />
                    </div>
                </div>
            </div>
            {/* Functional Components */}
            <InvisibleHolder />
        </div>
    )
};

export default MainLayout;