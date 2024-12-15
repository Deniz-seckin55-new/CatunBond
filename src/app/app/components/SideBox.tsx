import styles from '../page.module.css';
import { Channel, Currents, SyntaxHighlight, SyntaxPattern } from '../utils/utils';

interface Props {
    onClickSearch: () => void;
    onClickFriendsButton: () => void;
    onClickChannel: (Channel: Channel) => void;
    SideBoxChannelsV: boolean;
    Channels: Channel[];
    Currents: Currents;
}

const SideBox: React.FC<Props> = ({ onClickSearch, onClickFriendsButton, onClickChannel, SideBoxChannelsV, Channels, Currents }) => {
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

                    </div>
                </div>)}
                {SideBoxChannelsV && (<div id="side-box-channels" className={styles.side_box_channels}>
                    {Channels.map((channel) => {
                        return (
                            <div className={styles.channel_element_wraper} key={`wraper-${channel.id}`}>
                                <div className={`${styles.channel_element} ${Currents.channel ? (Currents.channel.id == channel.id ? styles.channel_element_active: "") : ""}`} onClick={() => onClickChannel(channel)} key={channel.id}>
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