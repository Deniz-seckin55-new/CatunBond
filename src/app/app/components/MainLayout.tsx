'use client';

import React, { useEffect, useState } from "react";
import styles from '../page.module.css';

import BackgroundBlur from './BackgroundBlur'
import ExploreBox from "./ExploreBox";
import MainBox from "./MainBox";
import UserBox from "./UserBox";
import SideBox from "./SideBox";
import FriendsDiv from "./FriendsDiv";
import ChannelBox from "./ChatBox";
import { Channel, Server, SyntaxHighlight, ViewingFriendsDiv, Currents, getLineHeight } from "../utils/utils";

const MainLayout: React.FC = () => {

    const [FriendsDivV, setFriendsDivV] = useState(false);
    const [BgBlurV, setBgBlurV] = useState(false);
    const [ExploreBoxV, setExploreBoxV] = useState(false);
    const [friendStatus, setFriendStatus] = useState<ViewingFriendsDiv>('online');
    const [SideBoxChannelsV, setSideBoxChannelsV] = useState(false);
    const [currents, setCurrents] = useState<Currents>({channel: null, server: null});
    const [Channels, setChannels] = useState<Channel[]>([{
            id: "abc",
            name: "general"
        }, {
            id: "def",
            name: "general2"
        }]);
    const [inputTextRows, setinputTextRows] = useState(1);

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
        setExploreBoxV(true);
        setBgBlurV(true);
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
        setFriendsDivV(false);
        setSideBoxChannelsV(true);

        setCurrents({
            server: server,
            channel: currents.channel
        })

        // Add class 'server_list_element_image_active' to server jsx element
    }

    const onClickChannel = (channel : Channel) => {
        setCurrents({
            server: currents.server,
            channel: channel
        })
    }

    const onClickAppIcon = () => {
        setSideBoxChannelsV(false);
        setCurrents({
            channel: null,
            server: null
        });
    }

    const closeExploreBox = () => {
        setExploreBoxV(false);
        setBgBlurV(false);
    }

    const onInputTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = event.target;
        
    }

    const onLoadTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if(TextareaInitalConstNumber)
            return;
        const textarea = event.target;
        const height = textarea.scrollHeight;

        setTextareaInitalConstNumber(height);
        console.log("Inital constant: "+height);
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
    }

    const MainBoxProps = {
        onClickServer: (server: Server) => onClickServer(server),
        onClickAppIcon: onClickAppIcon,
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
        </>
    )
};

export default MainLayout;