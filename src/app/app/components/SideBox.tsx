import styles from '../page.module.css';
import { Channel, DirectMessage, User } from '../utils/socket_utils';
import {Currents, SyntaxHighlight, SyntaxPattern } from '../utils/utils';

interface Props {
    onClickSearch: () => void;
    onClickFriendsButton: () => void;
    onClickChannel: (Channel: Channel) => void;
    onClickDirectMessage: (user: User) => void;
    SideBoxChannelsV: boolean;
    Channels: Channel[];
    directmessages: DirectMessage[];
    Currents: Currents;
}

const SideBox: React.FC<Props> = ({ onClickSearch, onClickFriendsButton, onClickChannel, onClickDirectMessage, SideBoxChannelsV, Channels, directmessages, Currents }) => {
    const ChannelNamePatterns: SyntaxPattern[] = [{
        pattern: new RegExp("^#", "gmi"),
        className: "hl_hashtag"
    }];

    return (
        <>
            <div id="side-box" className={styles.side_box}>
                <div id="side-box-search" className={styles.side_box_search}>
                    <div id="side-box-search-input-wraper" className={styles.side_box_search_input_wraper}>
                        <input id="side-box-search-input" className={styles.side_box_search_input} type="text" placeholder="Search anything" readOnly onClick={onClickSearch} />
                    </div>
                </div>
                {!SideBoxChannelsV && (<div id="side-box-main" className={styles.side_box_main}>
                    <div id="side-box-top" className={styles.side_box_top}>
                        <div id="friends-button-wraper" className={styles.friends_button_wraper}>
                            <img id="friends-button-image" className={styles.friends_button_image} />
                            <button id="friends-button" className={styles.friends_button} onClick={onClickFriendsButton}>Friends</button>
                        </div>
                    </div>
                    <div id="side-box-bottom" className={styles.side_box_bottom}>
                        <p className={styles.direct_messages_text}>Direct messages</p>
                        {directmessages.map(dm => {
                            const withUser = dm.directMsgFor.filter(x => x.id !== Currents.user?.id)[0];
                            console.log("Current Direct Message: ",Currents.directmessage);
                            return (
                                <div className={`${styles.direct_message} ${(Currents.directmessage?.directMsgFor.some(x => x.id === withUser.id)) ? (styles.direct_message_active) : ''}`} onClick={() => onClickDirectMessage(withUser)} key={withUser.id}>
                                    <div className={styles.direct_message_content}>
                                        <div className={styles.direct_message_useravatar_holder}>
                                            <img className={styles.message_useravatar} src={`${withUser.avatarUrl/*https://cat-storage-server.web.app/data/cat1.jpeg"*/}`} />
                                        </div>
                                        <p className={styles.direct_message_user_username}>{withUser.username}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>)}
                {SideBoxChannelsV && (<div id="side-box-channels" className={styles.side_box_channels}>
                    {Channels.map((channel) => {
                        return (
                            <div className={styles.channel_element_wraper} key={`wraper-${channel.id}`}>
                                <div className={`${styles.channel_element} ${Currents.channel ? (Currents.channel.id == channel.id ? styles.channel_element_active : "") : ""}`} onClick={() => onClickChannel(channel)} key={channel.id}>
                                    <span className={styles.channel_name} id={channel.id} key={`channel-${channel.id}`}>{
                                        SyntaxHighlight(ChannelNamePatterns, `#${channel.name}`, styles)
                                    }</span>
                                </div>
                            </div>
                        );
                    })}
                </div>)}
            </div>
        </>
    );
}

export default SideBox;