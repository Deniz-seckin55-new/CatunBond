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

const MainLayout: React.FC = () => {

    const [FriendsDivV, setFriendsDivV] = useState(false);
    const [BgBlurV, setBgBlurV] = useState(false);
    const [ExploreBoxV, setExploreBoxV] = useState(false);
    const [FDOnlineV, setFDOnlineV] = useState(false);
    const [FDOfflineV, setFDOfflineV] = useState(false);
    const [FDBlockedV, setFDBlockedV] = useState(false);

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
        setFDOnlineV(true);
        setFDOfflineV(false);
        setFDBlockedV(false);
    }

    const onClickFBOffline = () => {
        setFDOnlineV(false);
        setFDOfflineV(true);
        setFDBlockedV(false);
    }

    const onClickFBBlocked = () => {
        setFDOnlineV(false);
        setFDOfflineV(false);
        setFDBlockedV(true);
    }

    const onClickFriendsButton = () => {
        setFriendsDivV(true);
    }

    const SideBoxProps = {
        onClickSearch: onClickSearch,
        onClickFriendsButton: onClickFriendsButton,
    }

    const ExploreBoxProps = {
        ExploreBoxV: ExploreBoxV,
        setExploreBoxV: setExploreBoxV
    }

    const FriendsDivProps = {
        onClickFBOnline: onClickFBOnline,
        onClickFBOffline: onClickFBOffline,
        onClickFBBlocked: onClickFBBlocked,
        FDOnlineV: FDOnlineV,
        FDOfflineV: FDOfflineV,
        FDBlockedV: FDBlockedV,
    }

    const ChannelBoxProps = {

    }

    return (
        <>
            <div className={styles.body}>
                <div className={styles.main_container}>
                    <BackgroundBlur BgBlurV={BgBlurV} onClickBgBlur={onClickBgBlur} />
                    <div className={styles.app_box}>
                        <ExploreBox {...ExploreBoxProps} />
                        <div id="main-box-wraper" className={styles.main_box_wraper}>
                            <MainBox />
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