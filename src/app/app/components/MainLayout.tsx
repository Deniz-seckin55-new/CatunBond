'use client';

import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from '../page.module.css';

import BackgroundBlur from './BackgroundBlur'
import ExploreBox from "./ExploreBox";
import MainBox from "./MainBox";
import UserBox from "./UserBox";
import SideBox from "./SideBox";
import FriendsDiv from "./FriendsDiv";
import ChannelBox from "./ChannelBox";
import { ViewingFriendsDiv, Currents, UpdateMessageInfo, GetUser, ToUserSmall, MessageInfo, ToVCInfo, DBVoiceChatWithMembers, DBuserToUser, SettingsMode } from "../utils/utils";
import { useUser } from "@clerk/nextjs";
import { io, Socket } from 'socket.io-client';
import ContextMenu from "./ContextMenu";
import SettingsBox from "./SettingsBox";
import ChannelBoxInfo from "./ChannelBoxInfo";
import ServerUsersTab from "./ServerUsersTab";
import { toast } from "react-toastify";
import { AllowedTypes, Channel, ClientResponsePacket, DetailedDBUser, DirectMessage, EditContext, FriendRequestAnswer, Message, PendingFriendRequest, Server, SocketData, SocketInformationType, User, VoiceChatInformation, WritingEvent } from "../utils/socket_utils";
import Tooltip from "./common/Tooltip";
import Peer, { MediaConnection } from "peerjs";

let socket: Socket | undefined;
let voicesocket: Socket | undefined;

const defaultCurrents: Currents = {
    channel: null,
    server: null,
    exploreboxmode: null,
    user: null,
    contextmenu: { shown: false, x: 0, y: 0 },
    contextmenumode: null,
    friendsdiv: { status: "online", visible: true },
    directmessage: null,
    setting: null,
    vc: null,
    voicechatopen: false,
    tooltip: { position: { left: 0, top: 0 }, ref: null, text: "", visible: false },
    settingsMode: 'UserApp',
};

const MainLayout: React.FC = () => {
    const [BgBlurV, setBgBlurV] = useState(false);
    const [ExploreBoxV, setExploreBoxV] = useState(false);
    const [SideBoxChannelsV, setSideBoxChannelsV] = useState(false);
    const [currents, setCurrents] = useState<Currents>({ ...defaultCurrents });
    const [Channels, setChannels] = useState<Channel[]>([]);
    const [inputTextRows, setinputTextRows] = useState(1);
    const [LoadingText, setLoadingText] = useState("Loading..."); // Replace with loading gif
    const [messages, setMessages] = useState<Message[]>([]);
    const [kbState, setkbState] = useState<String[]>([]);
    const [replyingTo, setreplyingTo] = useState<Message | null>(null);
    const [MessageInfos, setMessageInfos] = useState<MessageInfo[]>([]);
    const [settingsDivV, setsettingsDivV] = useState<boolean>(false);
    const [ServerUsersDivV, setServerUsersDivV] = useState<boolean>(false);
    const [appGridRows, setappGridRows] = useState<string>(`repeat(32, 1fr)`);
    const [appGridColumns, setappGridColumns] = useState<string>(`repeat(32, 1fr)`);
    const [pendingSentRequests, setpendingSentRequests] = useState<PendingFriendRequest[]>([]);
    const [directmessages, setdirectmessages] = useState<DirectMessage[]>([]);
    const [writingUsers, setWritingUsers] = useState<string[]>([]);
    const [userStreams, setUserStreams] = useState<{ [userId: string]: MediaStream }>({});
    const [peer, setpeer] = useState<Peer | null>(null);
    const [calls, setcalls] = useState<Record<string, MediaConnection>>({});
    const [microphoneState, setmicrophoneState] = useState<Boolean>(true);

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

    const SocketURL = "http://localhost:3001";
    const VoiceSocketURL = "http://localhost:3002";

    const [TextareaInitalConstNumber, setTextareaInitalConstNumber] = useState(0);

    const [localStream, setlocalStream] = useState<MediaStream | null>(null);

    const getMediaStream = useCallback(async () => {
        if (localStream) return localStream;

        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const audioDevices = devices.filter(x => x.kind === "audioinput");

            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: false,
                    noiseSuppression: true,
                    channelCount: 2
                },
                video: false,
            });

            setlocalStream(stream);
            return stream;
        } catch (err) {
            console.error(err);
        }
    }, []);

    const toggleFriendsDivVisibility = () => {
        setCurrents((prevCurrents) => ({
            ...prevCurrents,
            friendsdiv: {
                ...prevCurrents.friendsdiv,
                visible: !prevCurrents.friendsdiv.visible,
            }
        }));
    }

    const onClickSearch = () => {

    }

    const onClickBgBlur = () => {
        setExploreBoxV(false);
        setBgBlurV(false);
    }

    const onClickFB = (status: ViewingFriendsDiv) => {
        setCurrents((prevCurrents) => ({
            ...prevCurrents,
            friendsdiv: {
                ...prevCurrents.friendsdiv,
                status: status,
            }
        }));
    }

    const onClickFriendsButton = () => {
        setCurrents((prevCurrents) => ({
            ...prevCurrents,
            friendsdiv: {
                ...prevCurrents.friendsdiv,
                visible: true,
            }
        }));
    }

    const onClickServer = (server: Server) => {
        try {
            fetch(`/api/v1/servers/${server.id}`)
                .then((res) => res.json())
                .then((data) => {
                    const server: Server = data.data;
                    console.log(server.channels);
                    setChannels(server.channels);

                    setCurrents((prevCurrents) => ({
                        ...prevCurrents,
                        friendsdiv: {
                            ...prevCurrents.friendsdiv,
                            visible: false,
                        }
                    }));
                    setSideBoxChannelsV(true);

                    setCurrents((prevCurrents) => ({
                        ...prevCurrents,
                        server: server,
                    }));
                });
        } catch (err) {
            console.error(err);
        }

        // Add class 'server_list_element_image_active' to server jsx element
    }

    const onRightClickServer = (server: Server, ct: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setCurrents((prevCurrents) => ({
            ...prevCurrents,
            contextmenu: {
                shown: true,
                x: ct.screenX,
                y: ct.screenY,
            }
        }));
        return false;
    }

    const onClickChannel = (channel: Channel) => {
        try {
            fetch(`api/v1/channels/${channel.id}/messages/`).then((res) => {
                if (res.status != 200) {
                    console.log("Error fetching messages for channel " + channel.id);
                    return;
                }
                res.json().then((data) => {
                    const messageList: Message[] = data.data;
                    setMessages(messageList);

                    console.log("Channel loaded ", channel);
                    console.log("Messages: ", messageList);

                    setCurrents((prevCurrents) => ({
                        ...prevCurrents,
                        channel: channel,
                    }));
                });
            })
        } catch (err) {
            console.error(err);
        }
    }

    const onClickAppIcon = () => {
        setSideBoxChannelsV(false);
        setCurrents((prevCurrents) => ({
            ...prevCurrents,
            channel: null,
            server: null,
            directmessage: null,
            friendsdiv: {
                ...prevCurrents.friendsdiv,
                visible: true,
            }
        }));
        setMessages([]);
        setServerUsersDivV(false);
    }

    const onClickExploreButton = () => {
        setCurrents((prevCurrents) => ({
            ...prevCurrents,
            exploreboxmode: 0,
        }));
        setExploreBoxV(true);
        setBgBlurV(true);
    }

    const onClickJoinButton = () => {
        setCurrents((prevCurrents) => ({
            ...prevCurrents,
            exploreboxmode: 1,
        }));
    }

    const onClickBackButton = () => {
        setCurrents((prevCurrents) => ({
            ...prevCurrents,
            exploreboxmode: 0,
        }));
    }

    const onClickServerJoinButton = (server: string) => {
        setLoadingText("Loading...");

        setCurrents((prevCurrents) => ({
            ...prevCurrents,
            exploreboxmode: 2,
        }));

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
                    setLoadingText("Error!: " + data.message);
                }
                setTimeout(() => {
                    setCurrents((prevCurrents) => ({
                        ...prevCurrents,
                        exploreboxmode: 0,
                    }));
                    setLoadingText("Loading...");
                }, 1000);
            })
    }

    const loadingTextResetTimeout = () => {
        setTimeout(() => {
            setExploreBoxV(false);
            setBgBlurV(false);
            setCurrents((prevCurrents) => ({
                ...prevCurrents,
                exploreboxmode: 0,
            }));
            setLoadingText("Loading...");
        }, 1000);
    }

    const onClickSendFriendRequestButton = (friendName: string) => {
        // Fetch add friend && setExploreBox mode to 2 LoadingText

        setLoadingText("Loading...");

        setCurrents((prevCurrents) => ({
            ...prevCurrents,
            exploreboxmode: 2,
        }))

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
                        const socketData: SocketData = {
                            infoType: SocketInformationType.ClientSendFriendRequest,
                            dataType: AllowedTypes.FriendRequest,
                            data: FriendRequest
                        }
                        socket?.emit("friend_request_send", socketData);
                        setpendingSentRequests((prev) => [...prev, FriendRequest]);
                        setLoadingText("Success!");
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

    const onClickMicrophone = () => {
        if (!localStream) return;

        let currentMic = !microphoneState;

        setmicrophoneState(currentMic);

        localStream.getAudioTracks()[0].enabled = currentMic;

        console.log("Microphone clicked", currentMic, localStream.getAudioTracks()[0]);
        // !! IMPORTANT: For some reason, when localStream.getAudioTracks()[0] doesn't get console.log()'ed the code doesn't work.
    }

    const closeExploreBox = () => {
        setExploreBoxV(false);
        setBgBlurV(false);
    }

    const onInputTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = event.target;

    }

    const onLoadTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (TextareaInitalConstNumber)
            return;
        const textarea = event.target;
        const height = textarea.scrollHeight;

        setTextareaInitalConstNumber(height);
        console.log("Inital constant: " + height);
    }

    const onKeyDownInput = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (!currents.channel) {
            return;
        }

        if (!user.isLoaded || !user.isSignedIn) {
            return;
        }

        if (!user.user.username) {
            return;
        }

        const textarea = event.target as HTMLTextAreaElement;
        const message = textarea.value;

        if (message == "" || !message) {
            return;
        }

        if (event.key == "Enter" && !event.shiftKey) {
            event.preventDefault();

            // Change to API Call later on.
            const messageObject: Message = {
                author: { id: user.user.id, username: user.user.username, avatarUrl: user.user.imageUrl },
                channel: { id: currents.channel.id, name: currents.channel.name },
                content: message,
                timestamp: new Date(Date.now()),
                repliedTo: replyingTo?.repliedTo ?? null,
                authorId: user.user.id,
                channelId: currents.channel.id,
                id: "0",
                repliedToId: (replyingTo?.id) ? replyingTo.id : null,
            }

            console.log("Message: ", message);

            try {
                sendMessage(messageObject, setMessages);
                setreplyingTo(null);
                /*fetch('/api/v1/channel/messages/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        channel: currents.channel.id,
                        message: JSON.stringify(messageObject),
                    })
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                    });
                */
                textarea.value = "";
            } catch (err) {
                console.error(err);
            }
        } else {
            if (timeout) {
                sendStartWritingEvent();
            }

            resetTimeout();
        }
    }

    const onMouseDown = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target) {
            return;
        }
        if (target.id != "context-menu") {
            setCurrents((prevCurrents) => ({
                ...prevCurrents,
                contextmenu: {
                    ...prevCurrents.contextmenu,
                    shown: false,
                }
            }));
        }
    }

    const onMessageReply = (message: Message) => {

    }

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

        if (message?.editMode === true)
            UpdateMessageInfo(message.Message, "editMode", false, setMessageInfos);
        else
            UpdateMessageInfo(message.Message, "editMode", true, setMessageInfos);
        console.log(message);
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

    const onClickUserAvatar = (messageId: string | null, ev: React.MouseEvent) => {
        const messageInfo = MessageInfos.find(x => x.Message.id === messageId);
        if (messageInfo) {
            console.log("Open user context menu: ");
            console.log(messageInfo);
            OpenUserContextMenu(messageInfo.Message.author.id, ev);
        }
    }

    const onClickSettings = (mode: SettingsMode) => {
        setCurrents((prev) => ({
            ...prev,
            settingsMode: mode,
            setting: null,
        }))
        setsettingsDivV(!settingsDivV);
    }

    const onClickAddFriend = () => {
        setCurrents((prevCurrents) => ({
            ...prevCurrents,
            exploreboxmode: 3,
        }))
        setExploreBoxV(true);
        setBgBlurV(true);
    }

    const onClickDirectMessage = (user: User) => {
        openDirectMessage(user);
    }

    const onClickCall = () => {
        if (!currents.channel) return;
        if (!currents.user) return;

        fetch(`/api/v1/voicechats/${currents.channel!.id}`).then(res => res.json().then(data => {
            console.log("VC ", data);
            if (data.data) {
                const DBvc: DBVoiceChatWithMembers = data.data;
                JoinCall(ToVCInfo(DBvc));
                // There is a vc, return
                // const vc: VoiceChatInformation = data.data as VoiceChatInformation;
                return;
            } else {
                // Start the call
                fetch("api/v1/voicechats", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        channelId: currents.channel!.id,
                        serverId: currents.server?.id,
                    })
                }).then(res => res.json().then(data => {
                    if (data.data) {
                        // Call successfully started
                        const vc: DBVoiceChatWithMembers = data.data as DBVoiceChatWithMembers;
                        setCurrents(prev => ({
                            ...prev,
                            vc: vc
                        }));

                        // Join the call
                        JoinCall(ToVCInfo(vc));
                    } else {
                        // Call couldn't start
                        toast("Couldn't start the call");
                        return;
                    }
                }))
            }
        }))
        // Check if there is already call if there is then return;  ✓
        // If there is no call, start a call;   ✓
        // when leaving, if last person Emit "end_call" if "/api/v1/call/end" is successfully;
        // Leave call if app closes;
        // When call is started/joined load Users;
        // Get user's volume and if higher than certain value (>0) then add an effect for talking;
        // Add voice and video sharing;
        // Add screen sharing and voice call Options;
        // Add share system voice switch;
        // Lots of debugging
        // If a call has one user for more than 5 minutes then auto-leave call (and also api call and socketio emit)
        // set voicechatopen to true/false on join/leave of a call;
        // Add mute/unmute buttons and also shortcuts for them;
        // Use DB to store who is in the vc currently;
    }

    const onClickLeaveCall = () => {
        if (!currents.vc) return;
        LeaveCall(ToVCInfo(currents.vc));
    }

    const OpenUserContextMenu = (userId: string, ev: React.MouseEvent) => {
        setCurrents((prev) => ({
            ...prev,
            contextmenu: {
                x: ev.pageX,
                y: ev.pageY,
                shown: true
            },
            contextmenumode: 0,
        }));
    }

    const JoinCall = (vc: VoiceChatInformation) => {
        if (!currents.user) return;
        console.log("Joining call ", vc);

        fetch(`/api/v1/voicechats/${vc.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: "JOIN",
            })
        }).then(res => res.json().then(data => {
            console.log("vc join request", data);
            if (data.message === "Successfully joined voice chat") {
                console.log("Join call: ", data);

                const newVC = data.data as DBVoiceChatWithMembers;

                getMediaStream().then(stream => {
                    newVC.members.filter(x => x.id !== currents.user?.id).forEach(vcUser => {
                        if (!peer) {
                            toast("Slow down! You aren't ready for some voice chat action yet.");
                            return;
                        }

                        const call = peer.call(`${vcUser.id}_peeruser`, stream!, {
                            metadata: {
                                user: ToUserSmall(currents.user!),
                            }
                        });

                        setcalls((prev) => ({ ...prev, [vcUser.id]: call }));

                        call.on('stream', (remoteStream) => {
                            setUserStreams(prev => ({
                                ...prev,
                                [vcUser.id]: remoteStream,
                            }))
                        });

                        call.on("close", () => {
                            setUserStreams(prev => {
                                const updatedStreams = { ...prev };
                                delete updatedStreams[vcUser.id];
                                return updatedStreams;
                            });
                            setCurrents((prev) => ({
                                ...prev,
                                vc: {
                                    ...prev.vc!,
                                    users: prev.vc!.members.filter(x => x.id !== vcUser.id)
                                }
                            }));
                        });
                    })

                    setCurrents(prev => ({
                        ...prev,
                        vc: newVC,
                        voicechatopen: true,
                    }));

                    voicesocket?.emit("vc_join", vc, ToUserSmall(currents.user!));
                }).catch(err => { console.error("Failed to get media stream", err) });
            } else {
                toast("Couldn't join vc " + data.message);
            }
        }));
    }

    const LeaveCall = (vc: VoiceChatInformation) => {
        console.log("Leaving call", vc);
        fetch(`api/v1/voicechats/${vc.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: "LEAVE",
            }),
        }).then(res => res.json().then(data => {
            if (data.message === "Successfully left voice chat") {
                console.log("Leave call: ", data);
                voicesocket?.emit("vc_leave", vc, ToUserSmall(currents.user!));
                setCurrents(prev => ({
                    ...prev,
                    vc: null,
                    voicechatopen: false,
                }));
            } else {
                toast("Couldn't leave vc " + data.message);
            }
        }));
    }

    const sendMessage = (message: Message, setMessages: (msg: any) => void) => {
        console.log("Sending message: ", message);
        const socketData: SocketData = {
            infoType: SocketInformationType.ClientSendMessage,
            dataType: AllowedTypes.Message,
            data: message
        }
        socket?.emit("message", socketData);
        /*setMessages((prevMessages: Message[]) => [...prevMessages, message]);*/
    }

    const deleteMessage = (message: Message) => {
        const socketData: SocketData = {
            infoType: SocketInformationType.ClientDeleteMessage,
            dataType: AllowedTypes.Message,
            data: message
        }
        fetch(`/api/v1/messages/${message.id}`, {
            method: 'DELETE'
        }).then((res) => res.json()).then((data) => {
            console.log(data);
            if (data.message === "Message deleted") {
                socket?.emit("delete_message", socketData);
            }
        });
    }

    const editMessage = (newcontent: Message, message: Message) => {
        const context: EditContext = {
            oldMessageid: message.id,
            newMessage: newcontent
        }
        const socketData: SocketData = {
            infoType: SocketInformationType.ClientEditMessage,
            dataType: AllowedTypes.EditContext,
            data: context
        }
        fetch(`/api/v1/messages/${message.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: newcontent.content,
            })
        }).then((res) => res.json()).then((data) => {
            console.log(data);
            if (data.message === "Message updated") {
                socket?.emit("edit_message", socketData);
            }
        });
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
        // Open or create direct message
        fetch(`/api/v1/directmessages/withUser/${withUser.id}`).then(res => res.json().then(data => {
            console.log("DM ", data);
            if (data.data) {
                const directMessage: DirectMessage = data.data as DirectMessage;
                setSideBoxChannelsV(false);
                setCurrents(prev => ({
                    ...prev,
                    friendsdiv: {
                        ...(prev.friendsdiv),
                        visible: false,
                    }
                }))
                try {
                    fetch(`api/v1/channels/${directMessage.id}/messages`).then((res) => {
                        if (res.status != 200) {
                            console.log("Error fetching messages for channel " + directMessage.id);
                            return;
                        }
                        res.json().then((data) => {
                            const messageList: Message[] = data.data;
                            setMessages(messageList);

                            console.log("Messages: ", messageList);

                            setCurrents(prev => ({
                                ...prev,
                                directmessage: directMessage,
                            }));

                            console.log("Set DM to ", directMessage);

                            console.log("Loading DM ",directMessage);

                            setCurrents((prevCurrents) => ({
                                ...prevCurrents,
                                channel: {
                                    id: directMessage.id,
                                    name: directMessage.directMsgFor.filter(x => x.id !== currents.user?.id)[0].username,
                                    channelType: "DIRECTMESSAGE",
                                },
                            }));
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
        onClickDirectMessage: onClickDirectMessage,
        onClickSettings: onClickSettings,
        SideBoxChannelsV: SideBoxChannelsV,
        Channels: Channels,
        directmessages: directmessages,
        Currents: currents,
    }

    const ExploreBoxProps = {
        ExploreBoxV: ExploreBoxV,
        setExploreBoxV: setExploreBoxV,
        closeExploreBox: closeExploreBox,
        onClickJoinButton: onClickJoinButton,
        onClickBackButton: onClickBackButton,
        onClickServerJoinButton: onClickServerJoinButton,
        onClickSendFriendRequestButton: onClickSendFriendRequestButton,
        LoadingText: LoadingText,
        setCurrents: setCurrents,
        Currents: currents,
    }

    const FriendsDivProps = {
        Currents: currents,
        pendingSentRequests: pendingSentRequests,
        setpendingSentRequests: setpendingSentRequests,
        onClickFriendUser: onClickFriendUser,
        socket: socket,
    }

    const ChannelBoxProps = {
        rows: inputTextRows,
        onInputTextarea: onInputTextarea,
        onLoadTextarea: onLoadTextarea,
        onKeyDownInput: onKeyDownInput,
        onMessageReply: onMessageReply,
        onMessageEdit: onMessageEdit,
        onMessageDelete: onMessageDelete,
        onEditInput: onEditInput,
        onClickUserAvatar: onClickUserAvatar,
        replyingTo: replyingTo,
        setreplyingTo: setreplyingTo,
        MessageInfos: MessageInfos,
        onClickMicrophone: onClickMicrophone,
        onClickLeaveCall: onClickLeaveCall,
        setMessageInfos: setMessageInfos,
        setCurrents: setCurrents,
        Currents: currents,
        kbState: kbState,
        messages: messages,
        voicesocket: voicesocket,
        localStream: localStream,
        getMediaStream: getMediaStream,
        userStreams: userStreams,
        setUserStreams: setUserStreams,
        calls: calls,
        setcalls: setcalls,
        peer: peer,
        writingUsers: writingUsers,
        microphoneState: microphoneState,
    }

    const MainBoxProps = {
        onClickServer: (server: Server) => onClickServer(server),
        onRightClickServer: (server: Server, ct: React.MouseEvent<HTMLDivElement, MouseEvent>) => onRightClickServer(server, ct),
        onClickAppIcon: onClickAppIcon,
        onClickExploreButton: onClickExploreButton,
        Currents: currents,
        setCurrents: setCurrents,
        ExploreBoxV: ExploreBoxV,
    }

    const ContextMenuProps = {
        Currents: currents,
    }

    const SettingsBoxProps = {
        Currents: currents,
        setCurrents: setCurrents,
        setsettingsDivV: setsettingsDivV,
        settingsDivV: settingsDivV,
    }

    const UserBoxProps = {
        onClickSettings: onClickSettings,
    }

    const ChannelBoxInfoProps = {
        Currents: currents,
        setServerUsersDivV: setServerUsersDivV,
        setCurrents: setCurrents,
        ServerUsersDivV: ServerUsersDivV,
        onClickFB: onClickFB,
        onClickAddFriend: onClickAddFriend,
        onClickCall: onClickCall,
    }

    const ServerUsersTabProps = {
        Currents: currents,
        ServerUsersDivV: ServerUsersDivV,
    }

    const VoiceChatProps = {
        Currents: currents,
        voicesocket: voicesocket,
    }

    const TooltipProps = {
        tooltipText: currents.tooltip.text,
        tooltipVisible: currents.tooltip.visible,
        tooltipPosition: currents.tooltip.position,
        tooltipRef: tooltipRef,
    }

    const onKeyUp = (event: KeyboardEvent) => {
        setkbState((prev) => prev.filter((key) => key !== event.key));
    }

    const onKeyDown = (event: KeyboardEvent) => {
        setkbState((prev) => [...prev, event.key]);
        if (event.ctrlKey && event.key == 'f') {
            event.preventDefault();
            if (!ExploreBoxV)
                onClickSearch();
            else
                closeExploreBox();
        }
    }

    useEffect(() => {
        if (!user.user) {
            console.log("No user.");
            return;
        }
        socket = io("http://localhost:3001", {
            query: {
                id: user.user.id
            }
        });
        socket.on("message", (data: ClientResponsePacket) => {
            console.log(data);
            if (data.dataType == AllowedTypes.Message) {
                const recievedMessage = data.data as Message;
                console.log("Got message: ", recievedMessage);
                setMessages((prevMessages: Message[]) => [...prevMessages, recievedMessage]);
            }
        });
        socket.on("delete_message", (message: Message) => {
            setMessages(messages.filter((m) => m.id !== message.id));
        });
        socket.on("edit_message", (edit: EditContext) => {
            setMessages((prevMessages: Message[]) =>
                prevMessages.map((msg) =>
                    (msg.id == edit.oldMessageid?.toString()) ? edit.newMessage : msg
                )
            );
        });
        socket.on("friend_request_send", (friendRequest: PendingFriendRequest) => {
            if (friendRequest.receiverId == user.user.id) {
                // Notification
                toast(`${friendRequest.sender.username} sent you a friend request`);
            }
        });
        socket.on("friend_request_answer", (data: FriendRequestAnswer) => {
            const { friendRequest, answer } = data;
            console.log("friend_request_answer", friendRequest, answer);
            GetUser(friendRequest.senderId).then((sender) => {
                switch (answer) {
                    case "accept":
                        toast(`${sender.username} accepted your friend request`);
                        break;
                    case "decline":
                        toast(`${sender.username} declined your friend request`);
                        break;
                    default:
                        break;
                }
            })
        });
        socket.on("writing_event", (eventUser: User, eventType: string) => {
            if (eventUser.id !== currents.user?.id) {
                if (eventType === "start") {
                    setWritingUsers((prev) => [...prev, eventUser.id]);
                } else {
                    setWritingUsers((prev) => prev.filter((id) => id !== eventUser.id));
                }
            }
        });
        return () => {
            if (socket) { socket.disconnect(); socket = undefined; }
        };
    }, [currents.user]);

    useEffect(() => {
        if (currents.user && !socket) {
            socket = io(SocketURL, {
                query: {
                    id: currents.user.id
                }
            });
            console.log("Yes");
        } else {
            console.log("No");
        }
        if (currents.channel) {
            socket?.emit("joinChannel", currents.channel.id);
        }
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
            setdirectmessages(currents.user.directMsgs);
        }
    }, [currents.user]);

    useEffect(() => {
        window.addEventListener('mousedown', onMouseDown);
        return () => window.removeEventListener('mousedown', onMouseDown);
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [ExploreBoxV]);


    useEffect(() => {
        window.addEventListener('keyup', onKeyUp);
        return () => window.removeEventListener('keyup', onKeyUp);
    }, [ExploreBoxV]);

    useEffect(() => {
        if (user.user) {
            fetch("/api/v1/user").then(res => res.json().then(data => {
                const gotUser: DetailedDBUser = data.data;
                setCurrents((prevCurrents) => ({
                    ...prevCurrents,
                    user: gotUser,
                }));
            }));
        }
    }, [user.user])

    useEffect(() => {
        let newappGridColumns = `repeat(32, 1fr)`;
        if (ServerUsersDivV) {
            newappGridColumns += " 6fr"
        }
        setappGridColumns(newappGridColumns);
        console.log(appGridColumns);
    }, [ServerUsersDivV]);

    useEffect(() => {
        if (tooltipRef.current) {
            setCurrents((prev) => ({
                ...prev,
                tooltip: { ...prev.tooltip, ref: tooltipRef.current },
            }));
        }
    }, [tooltipRef.current]);

    useEffect(() => {
        getMediaStream().then(stream => { });
    }, []);

    useEffect(() => {
        if (!currents.user) return;

        const newPeer = new Peer(`${currents.user!.id}_peeruser`);
        setpeer(newPeer);

        getMediaStream().then(stream => {
            newPeer.on('call', (call_peer) => {
                console.log("Incoming call from:", call_peer.peer);
                call_peer.answer(stream); // Answer with local stream

                const vcUser: User = call_peer.metadata.user;

                setCurrents((prev) => ({
                    ...prev,
                    vc: {
                        ...prev.vc!,
                        users: [...prev.vc!.members, { ...vcUser, avatarUrl: vcUser.avatarUrl || '' }]
                    }
                }));

                call_peer.on("stream", (remoteStream) => {
                    setUserStreams(prev => ({ ...prev, [call_peer.peer]: remoteStream }));
                });

                call_peer.on("close", () => {
                    setUserStreams(prev => {
                        const updatedStreams = { ...prev };
                        delete updatedStreams[call_peer.peer];
                        return updatedStreams;
                    });
                    setCurrents((prev) => ({
                        ...prev,
                        vc: {
                            ...prev.vc!,
                            users: prev.vc!.members.filter(x => x.id !== vcUser.id),
                        }
                    }));
                });
            })
        })
    }, [currents.user]);

    useEffect(() => {
        fetch("/api/v1/app/checkUser");
    }, []);

    // For debug remove later
    const Debugging = () => {
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
    }
    Debugging();

    return (
        <>
            {/*<VoiceChat {...VoiceChatProps} />*/}
            {/*(<TransComp />)*/}
            <ContextMenu {...ContextMenuProps} />
            <Tooltip {...TooltipProps} />
            <div className={styles.body}>
                <div className={styles.main_container}>
                    <BackgroundBlur BgBlurV={BgBlurV} onClickBgBlur={onClickBgBlur} />
                    <div className={styles.app_box} style={{ gridTemplateRows: `${appGridRows}`, gridTemplateColumns: `${appGridColumns}` }}>
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
        </>
    )
};

export default MainLayout;