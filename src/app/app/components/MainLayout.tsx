'use client';

import React, { useEffect, useState } from "react";
import styles from '../page.module.css';

import BackgroundBlur from './BackgroundBlur'
import ExploreBox from "./ExploreBox";
import MainBox from "./MainBox";
import UserBox from "./UserBox";
import SideBox from "./SideBox";
import FriendsDiv from "./FriendsDiv";
import ChannelBox from "./ChannelBox";
import { SyntaxHighlight, ViewingFriendsDiv, Currents, getLineHeight, UpdateMessageInfo, ExploreBoxMode, GetUser, ToUser, MessageInfo } from "../utils/utils";
import { useUser } from "@clerk/nextjs";
import { io, Socket } from 'socket.io-client';
import UserCheck from "./UserCheck";
import ContextMenu from "./ContextMenu";
import SettingsBox from "./SettingsBox";
import ChannelBoxInfo from "./ChannelBoxInfo";
import ServerUsersTab from "./ServerUsersTab";
import { toast } from "react-toastify";
import { AllowedTypes, Channel, ClientResponsePacket, DirectMessage, EditContext, FriendRequestAnswer, Message, PendingFriendRequest, Server, SocketData, SocketInformationType, User } from "../utils/socket_utils";

let socket: Socket | undefined;

const defaultCurrents: Currents = {
    channel: null,
    server: null,
    exploreboxmode: null,
    user: null,
    contextmenu: { shown: false, x: 0, y: 0 },
    contextmenumode: null,
    friendsdiv: { status: "online", visible: false },
    directmessage: null,
    setting: null,
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
    const user = useUser();

    const SocketURL = "http://localhost:3001";

    const [TextareaInitalConstNumber, setTextareaInitalConstNumber] = useState(0);

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
            fetch('/api/v1/server/channels', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    serverId: server.id,
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.data);
                    setChannels(data.data);

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
            fetch('api/v1/channel/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    channel: channel.id,
                })
            }).then((res) => {
                if (res.status != 200) {
                    console.log("Error fetching messages for channel " + channel.id);
                    return;
                }
                res.json().then((data) => {
                    const messageList: Message[] = data.messages;
                    setMessages(messageList);

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

        fetch('/api/v1/user/servers/join', {
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
                if (data.message == "You have successfully joined the server.") {
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

        fetch("/api/v1/user/get", {
            method: "POST",
            body: JSON.stringify({
                name: friendName
            })
        }).then(res => res.json().then(data => {
            if (data.data) {
                const friend: User = data.data as User;
                fetch("/api/v1/user/friend/send", {
                    method: "POST",
                    body: JSON.stringify({
                        friendId: friend.id,
                    }),
                }).then(res => res.json().then(data => {
                    if (data.message === "Successfully sent friend request.") {
                        const FriendRequest: PendingFriendRequest = {
                            reciever: friend,
                            sender: ToUser(currents.user!),
                            friendRequest: data.data,
                        }
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

        const messageObject: Message = {
            author: { id: user.user.id, username: user.user.username, avatarUrl: user.user.imageUrl },
            channel: { id: currents.channel.id, name: currents.channel.name, isDirectMessage: currents.channel.isDirectMessage },
            content: message,
            timestamp: new Date(Date.now()),
            repliedTo: replyingTo,
            id: null, // Will be auto set
        }

        if (event.key == "Enter" && !event.shiftKey) {
            event.preventDefault();
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

    const onClickUserAvatar = (messageId: bigint | null, ev: React.MouseEvent) => {
        const messageInfo = MessageInfos.find(x => x.Message.id === messageId);
        if (messageInfo) {
            console.log("Open user context menu: ");
            console.log(messageInfo);
            OpenUserContextMenu(messageInfo.Message.author.id, ev);
        }
    }

    const onClickSettings = () => {
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
        fetch('/api/v1/message/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messageId: message.id,
            })
        }).then((res) => res.json()).then((data) => {
            console.log(data);
            if (data.success === "true") {
                socket?.emit("delete_message", socketData);
            }
        });
    }

    const editMessage = (newmessage: Message, message: Message) => {
        const context: EditContext = {
            oldMessageid: message.id,
            newMessage: newmessage
        }
        const socketData: SocketData = {
            infoType: SocketInformationType.ClientEditMessage,
            dataType: AllowedTypes.EditContext,
            data: context
        }
        fetch('/api/v1/message/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messageId: message.id,
                newMessage: { ...newmessage, id: newmessage.id?.toString() },
            })
        }).then((res) => res.json()).then((data) => {
            console.log(data);
            if (data.success === "true") {
                socket?.emit("edit_message", socketData);
            }
        });
    }

    const openDirectMessage = (withUser: User) => {
        // Open or create direct message
        fetch("/api/v1/user/directmessages/getorcreate", {
            method: "POST",
            body: JSON.stringify({
                withUserId: withUser.id,
                name: withUser.username,
            })
        }).then(res => res.json().then(data => {
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
                    fetch('api/v1/channel/messages', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            channel: directMessage.id,
                        })
                    }).then((res) => {
                        if (res.status != 200) {
                            console.log("Error fetching messages for channel " + directMessage.id);
                            return;
                        }
                        res.json().then((data) => {
                            const messageList: Message[] = data.messages;
                            setMessages(messageList);
        
                            console.log("Messages: ", messageList);
        
                            setCurrents(prev => ({
                                ...prev,
                                directmessage: directMessage,
                            }));

                            setCurrents((prevCurrents) => ({
                                ...prevCurrents,
                                channel: {
                                    id: directMessage.id,
                                    name: directMessage.name,
                                    isDirectMessage: true,
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
        try {openDirectMessage(user)} catch (err) {if(err instanceof Error) console.log(err.stack);};
    }

    const SideBoxProps = {
        onClickSearch: onClickSearch,
        onClickFriendsButton: onClickFriendsButton,
        onClickChannel: onClickChannel,
        onClickDirectMessage: onClickDirectMessage,
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
        setMessageInfos: setMessageInfos,
        Currents: currents,
        kbState: kbState,
        messages: messages,
    }

    const MainBoxProps = {
        onClickServer: (server: Server) => onClickServer(server),
        onRightClickServer: (server: Server, ct: React.MouseEvent<HTMLDivElement, MouseEvent>) => onRightClickServer(server, ct),
        onClickAppIcon: onClickAppIcon,
        onClickExploreButton: onClickExploreButton,
        Currents: currents,
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
        ServerUsersDivV: ServerUsersDivV,
        onClickFB: onClickFB,
        onClickAddFriend: onClickAddFriend,
    }

    const ServerUsersTabProps = {
        Currents: currents,
        ServerUsersDivV: ServerUsersDivV,
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
                    (msg.id == edit.oldMessageid) ? edit.newMessage : msg
                )
            );
        });
        socket.on("friend_request_send", (friendRequest: PendingFriendRequest) => {
            if (friendRequest.reciever.id == user.user.id) {
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
        if (user.user) {
            setCurrents((prevCurrents) => ({
                ...prevCurrents,
                user: {
                    avatar: user.user.imageUrl,
                    id: user.user.id,
                    username: user.user.username,
                }
            }));
        }
    }, []);

    useEffect(() => {
        if(user.user) {
            fetch("/api/v1/user/directmessages/get", {
                method: "POST",
                body: JSON.stringify({}),
            }).then(res => res.json().then(data => {
                if(data.data) {
                    const dms: DirectMessage[] = data.data as DirectMessage[];
                    console.log("dms ",dms);
                    setdirectmessages(dms);
                }
            }));
        }
    }, [user.user]);

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
        if (user.user)
            setCurrents((prevCurrents) => ({
                ...prevCurrents,
                user: {
                    id: user.user.id,
                    username: user.user.username,
                    avatar: user.user.imageUrl
                }
            }));
    }, [user.user])

    useEffect(() => {
        let newappGridColumns = `repeat(32, 1fr)`;
        if (ServerUsersDivV) {
            newappGridColumns += " 6fr"
        }
        setappGridColumns(newappGridColumns);
        console.log(appGridColumns);
    }, [ServerUsersDivV]);

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
            <ContextMenu {...ContextMenuProps} />
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