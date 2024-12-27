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
import { Channel, Server, SyntaxHighlight, ViewingFriendsDiv, Currents, getLineHeight, Message, ClientResponsePacket, AllowedTypes } from "../utils/utils";
import { PrismaClient } from "@prisma/client";
import { clerkClient } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";
import uuid4 from "uuid4";
import { io, Socket } from 'socket.io-client';

let socket: Socket | undefined;

const MainLayout: React.FC = () => {
    const [FriendsDivV, setFriendsDivV] = useState(false);
    const [BgBlurV, setBgBlurV] = useState(false);
    const [ExploreBoxV, setExploreBoxV] = useState(false);
    const [friendStatus, setFriendStatus] = useState<ViewingFriendsDiv>('online');
    const [SideBoxChannelsV, setSideBoxChannelsV] = useState(false);
    const [currents, setCurrents] = useState<Currents>({ channel: null, server: null, exploreboxmode: null });
    const [Channels, setChannels] = useState<Channel[]>([{
        id: "abc",
        name: "general"
    }, {
        id: "def",
        name: "general2"
    }]);
    const [inputTextRows, setinputTextRows] = useState(1);
    const [LoadingText, setLoadingText] = useState("Loading...");
    const [messages, setMessages] = useState<Message[]>([]);
    const user = useUser();

    const SocketURL = "http://localhost:3001";

    const [TextareaInitalConstNumber, setTextareaInitalConstNumber] = useState(0);

    const toggleFriendsDivVisibility = () => {
        setFriendsDivV(!FriendsDivV);
    }

    const toggleBgBlurVisible = () => {
        setBgBlurV(!BgBlurV);
    }

    const toggleExploreBox = () => {
        setExploreBoxV(!ExploreBoxV);
    }

    const onClickSearch = () => {

    }

    const onClickBgBlur = () => {
        setExploreBoxV(false);
        setBgBlurV(false);
    }

    const onClickFBOnline = () => {
        setFriendStatus('online');
    }

    const onClickFBOffline = () => {
        setFriendStatus('offline');
    }

    const onClickFBBlocked = () => {
        setFriendStatus('blocked');
    }

    const onClickFriendsButton = () => {
        setFriendsDivV(true);
    }

    const onClickServer = (server: Server) => {
        try {
            fetch('/api/v1/server/channels', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    server: server.id,
                })
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.data);
                    setChannels(data.data);

                    setFriendsDivV(false);
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
    }

    const onClickExploreButton = () => {
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
                serverId: server,
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

        const textarea = event.target as HTMLTextAreaElement;
        const message = textarea.value;

        if (message == "" || !message) {
            return;
        }

        const messageObject: Message = {
            authorId: user.user.id,
            channelId: currents.channel.id,
            content: message,
            timestamp: new Date(Date.now()),
            repliedTo: null,
            id: null // Will be auto set
        }

        if (event.key == "Enter" && !event.shiftKey) {
            event.preventDefault();
            console.log("Message: ", message);

            try {
                fetch('/api/v1/channel/messages/send', {
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

                textarea.value = "";
            } catch (err) {
                console.error(err);
            }
        }
    }

    const sendMessage = (message: Message, setMessages: (msg: any) => void) => {
        socket?.emit("message", message);
        /*setMessages((prevMessages: Message[]) => [...prevMessages, message]);*/
    }

    const SideBoxProps = {
        onClickSearch: onClickSearch,
        onClickFriendsButton: onClickFriendsButton,
        onClickChannel: onClickChannel,
        SideBoxChannelsV: SideBoxChannelsV,
        Channels: Channels,
        Currents: currents,
    }

    const ExploreBoxProps = {
        ExploreBoxV: ExploreBoxV,
        setExploreBoxV: setExploreBoxV,
        closeExploreBox: closeExploreBox,
        onClickJoinButton: onClickJoinButton,
        onClickBackButton: onClickBackButton,
        onClickServerJoinButton: onClickServerJoinButton,
        LoadingText: LoadingText,
        setCurrents: setCurrents,
        Currents: currents,
    }

    const FriendsDivProps = {
        onClickFBOnline: onClickFBOnline,
        onClickFBOffline: onClickFBOffline,
        onClickFBBlocked: onClickFBBlocked,
        FDOnlineV: friendStatus === 'online',
        FDOfflineV: friendStatus === 'offline',
        FDBlockedV: friendStatus === 'blocked',
        Currents: currents,
    }

    const ChannelBoxProps = {
        rows: inputTextRows,
        onInputTextarea: onInputTextarea,
        onLoadTextarea: onLoadTextarea,
        onKeyDownInput: onKeyDownInput,
        messages: messages,
    }

    const MainBoxProps = {
        onClickServer: (server: Server) => onClickServer(server),
        onClickAppIcon: onClickAppIcon,
        onClickExploreButton: onClickExploreButton,
        Currents: currents,
    }

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.ctrlKey && event.key == 'f') {
            event.preventDefault();
            if (!ExploreBoxV)
                onClickSearch();
            else
                closeExploreBox();
        }
    }

    useEffect(() => {
        if (currents.channel) {
            socket = io(SocketURL);
            socket.on("message", (data: ClientResponsePacket) => {
                console.log(data);
                if (data.dataType == AllowedTypes.Message) {
                    const recievedMessage = data.data as Message;
                    setMessages([...messages, recievedMessage]);
                }
            });
            socket.emit("joinChannel", currents.channel.id);
        }
        return () => {
            if (currents.channel)
                socket?.emit("leaveChannel", currents.channel?.id);
            socket?.disconnect();
        }
    }, [currents.channel]);

    useEffect(() => {
        //fetch("/api/v1/socket"); // Initialize the WebSocket server
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [ExploreBoxV]);

    // For debug remove later
    const Debugging = () => {
        /*console.log("Highlight: ", await SyntaxHighlight([{
            className: "highlight_01",
            pattern: new RegExp("^#", "gmi")
        }], "# channel_name"));*/
    }
    Debugging();

    return (
        <>
            <div className={styles.body}>
                <div className={styles.main_container}>
                    <BackgroundBlur BgBlurV={BgBlurV} onClickBgBlur={onClickBgBlur} />
                    <div className={styles.app_box}>
                        <ExploreBox {...ExploreBoxProps} />
                        <div id="main-box-wraper" className={styles.main_box_wraper}>
                            <MainBox {...MainBoxProps} />
                        </div>
                        <div id="user-box-wraper" className={styles.user_box_wraper}>
                            <UserBox />
                        </div>
                        <SideBox {...SideBoxProps} />
                        <div id="chat-box" className={styles.chat_box}>
                            <div id="channel-info-box" className={styles.channel_info_box}>

                            </div>
                            {!FriendsDivV && (<ChannelBox {...ChannelBoxProps} />)}
                            {FriendsDivV && (<div id="friends-box" className={styles.friends_box}>
                                <FriendsDiv {...FriendsDivProps} />
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
            {/* Functional Components */}
        </>
    )
};

export default MainLayout;