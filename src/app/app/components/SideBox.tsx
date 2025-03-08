import { useEffect, useRef, useState } from 'react';
import styles from '../page.module.css';
import { Channel, DirectMessage, User, Category } from '../utils/socket_utils';
import { Currents, ExploreBoxMode, SettingsMode, SyntaxHighlight, SyntaxPattern } from '../utils/utils';
import { useCurrents } from '@/store/currents';
import { useDirectMessageStore } from '@/store/directmessages';

interface Props {
    onClickSearch: () => void;
    onClickFriendsButton: () => void;
    onClickChannel: (Channel: Channel) => void;
    onClickDirectMessage: (user: User) => void;
    onClickSettings: (mode: SettingsMode) => void;
    openExploreBox: (mode: ExploreBoxMode) => void;
    setcreateBoxC: React.Dispatch<React.SetStateAction<Category | null>>;
    setcreateBoxV: React.Dispatch<React.SetStateAction<boolean>>;
    createBoxV: boolean;
    createBoxC: Category | null;
    SideBoxChannelsV: boolean;
    Categories: Category[];
}

const SideBox: React.FC<Props> = ({ createBoxV, createBoxC, setcreateBoxV, onClickSearch, onClickFriendsButton, onClickChannel, onClickDirectMessage, onClickSettings, openExploreBox, setcreateBoxC, SideBoxChannelsV, Categories }) => {
    const currents = useCurrents();
    const { directmessages } = useDirectMessageStore();

    const ChannelNamePatterns: SyntaxPattern[] = [{
        pattern: new RegExp("^#", "gmi"),
        className: "hl_hashtag"
    }];

    const [createBoxTop, setcreateBoxTop] = useState<number>(0);
    const SideBoxChannelsRef = useRef<HTMLDivElement | null>(null);
    const CreateBoxRef = useRef<HTMLDivElement | null>(null);

    const onClickCategoryAdd = (category: Category, top: number) => {
        if (createBoxV) {
            if (createBoxC?.id === category.id)
                setcreateBoxV(!createBoxV);
            else
                setcreateBoxC(category);
        } else {
            setcreateBoxC(category);

            setcreateBoxTop(top + 50);
            if (CreateBoxRef.current) {
                CreateBoxRef.current.style.top = String(top + 50);
            }

            setcreateBoxV(!createBoxV);
            return;
        }

        if (createBoxV) {
            setcreateBoxTop(top + 50);
            if (CreateBoxRef.current) {
                CreateBoxRef.current.style.top = String(top + 50);
            }
        }
    }

    const onClickCreateNewChannel = () => {
        openExploreBox(5);
    }

    const onClickCreateNewCategory = () => {
        openExploreBox(6);
    }

    const onClickWindow = (ev: MouseEvent) => {
        const target = ev.target as HTMLElement;
        if (!target) {
            return;
        }

        if (target.id.startsWith("dccb")) return;
        if (target.id === "bg-blur") return;

        setcreateBoxV(false);
    }

    useEffect(() => {
        window.addEventListener("mousedown", onClickWindow);
        return () => {
            window.removeEventListener("mousedown", onClickWindow);
        }
    }, [])

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
                        {directmessages && directmessages.map(dm => {
                            const withUser = dm.directMsgFor.filter(x => x.id !== currents.user?.id)[0];
                            console.log("Current Direct Message: ", currents.directmessage);
                            return (
                                <div className={`${styles.direct_message} ${(currents.directmessage?.directMsgFor.some(x => x.id === withUser.id)) ? (styles.direct_message_active) : ''}`} onClick={() => onClickDirectMessage(withUser)} key={withUser.id}>
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
                        <p>{currents.server?.name}</p>
                        {currents.server?.ownerId === currents.user?.id && (<svg className={styles.user_box_settings_icon} xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" onClick={() => onClickSettings("Server")} id="settings">
                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                            <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" fill="var(--cb-color-black)"></path>
                        </svg>)}
                    </div>
                    <div className={styles.side_box_channels} ref={SideBoxChannelsRef}>
                        <div className={`${styles.createbox} ${createBoxV && styles.createbox_active}`} style={{ top: createBoxTop }} ref={CreateBoxRef} id='dccb0'>
                            <button onClick={onClickCreateNewChannel} className={styles.createbox_button} id='dccb1'>Create a new <i id='dccb3'>Channel</i></button>
                            <button onClick={onClickCreateNewCategory} className={styles.createbox_button} id='dccb2'>Create a new <i id='dccb4'>Category</i></button>
                        </div>
                        {Categories.map((category) => {
                            return (
                                <div key={category.id}>
                                    <div className={styles.category}>
                                        <p>{category.name}</p>
                                        {currents.server?.ownerId === currents.user?.id && (<svg className={`${styles.category_add_icon} ${(createBoxV && createBoxC?.id === category.id) && styles.category_add_icon_active}`} onClick={(ev) => onClickCategoryAdd(category, ev.currentTarget.getBoundingClientRect().top)} xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" id="dccb5">
                                            <path fill="none" d="M0 0h24v24H0V0z" id="dccb6"></path>
                                            <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" fill="var(--cb-color-black)" id="dccb7"></path>
                                        </svg>)}
                                    </div>
                                    {category.channels.map((channel) => {
                                        return (
                                            <div className={styles.channel_element_wraper} key={`wraper-${channel.id}`}>
                                                <div className={`${styles.channel_element} ${currents.channel ? (currents.channel.id == channel.id ? styles.channel_element_active : "") : ""}`} onClick={() => onClickChannel(channel)} key={channel.id}>
                                                    <span className={styles.channel_name} id={channel.id} key={`channel-${channel.id}`}>{
                                                        SyntaxHighlight(ChannelNamePatterns, `#${channel.name}`, styles)
                                                    }</span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>)}
            </div>
        </>
    );
}

export default SideBox;