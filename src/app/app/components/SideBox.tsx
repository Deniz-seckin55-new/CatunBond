import styles from '../page.module.css';
import { Channel, DirectMessage, User } from '../utils/socket_utils';
import { Currents, SettingsMode, SyntaxHighlight, SyntaxPattern } from '../utils/utils';

interface Props {
    onClickSearch: () => void;
    onClickFriendsButton: () => void;
    onClickChannel: (Channel: Channel) => void;
    onClickDirectMessage: (user: User) => void;
    onClickSettings: (mode: SettingsMode) => void;
    SideBoxChannelsV: boolean;
    Channels: Channel[];
    directmessages: DirectMessage[];
    Currents: Currents;
}

const SideBox: React.FC<Props> = ({ onClickSearch, onClickFriendsButton, onClickChannel, onClickDirectMessage, onClickSettings, SideBoxChannelsV, Channels, directmessages, Currents }) => {
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
                            console.log("Current Direct Message: ", Currents.directmessage);
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
                {SideBoxChannelsV && (<div id="side-box-channels" className={styles.side_box_channels_wrapper}>
                    <div className={styles.side_box_channels_server_info}>
                        <p>{Currents.server?.name}</p>
                        {Currents.server?.ownerId === Currents.user?.id && (<svg className={styles.user_box_settings_icon} xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" onClick={() => onClickSettings("Server")} id="settings">
                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                            <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" fill="var(--cb-color-black)"></path>
                        </svg>)}
                    </div>
                    <div className={styles.side_box_channels}>
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
                    </div>
                </div>)}
            </div>
        </>
    );
}

export default SideBox;