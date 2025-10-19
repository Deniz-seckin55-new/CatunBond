import { useCurrents } from '@/store/currents';
import { useDirectMessageStore } from '@/store/directmessages';
import { useServerInfoStore } from '@/store/serverInfos';
import { socketEmit, useSocketStore } from '@/store/socket';
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import styles from '../page.module.css';
import { Category, Channel, User } from '../utils/socket_utils';
import { SyntaxHighlight } from '../utils/syntax';
import { ExploreBoxMode, onMouseLeaveTooltipElement, onMouseOverTooltipElement, SettingsMode, SyntaxPattern } from '../utils/utils';
import { DefaultUserVariables } from '@/store/variablesStore';

interface Props {
    onClickSearch: () => void;
    onClickFriendsButton: () => void;
    onClickChannel: (Channel: Channel) => void;
    onRightClickChannel: (Channel: Channel, ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onClickDirectMessage: (user: User) => void;
    onClickSettings: (mode: SettingsMode) => void;
    openExploreBox: (mode: ExploreBoxMode) => void;
    setcreateBoxC: React.Dispatch<React.SetStateAction<Category | null>>;
    setcreateBoxV: React.Dispatch<React.SetStateAction<boolean>>;
    createBoxV: boolean;
    createBoxC: Category | null;
}

const SideBox: React.FC<Props> = ({ createBoxV, createBoxC, setcreateBoxV, onClickSearch, onClickFriendsButton, onClickChannel, onRightClickChannel, onClickDirectMessage, onClickSettings, openExploreBox, setcreateBoxC }) => {
    const currents = useCurrents();
    const { directmessages, setDirectMessages } = useDirectMessageStore();

    useEffect(() => {
        if (currents.user) {
            setDirectMessages(currents.user.directMsgs);
        }
    }, [currents.user]);

    const ChannelNamePatterns: SyntaxPattern[] = [{
        pattern: new RegExp("^#", "gmi"),
        className: "hl_hashtag"
    }];

    const { socket } = useSocketStore();

    const [createBoxTop, setcreateBoxTop] = useState<number>(0);
    const [hoveringChannel, sethoveringChannel] = useState<Channel | null>(null);
    const [hoveringOrder, sethoveringOrder] = useState<boolean>(false);
    const [orderEdit, setorderEdit] = useState<boolean>(false);
    const SideBoxChannelsRef = useRef<HTMLDivElement | null>(null);
    const CreateBoxRef = useRef<HTMLDivElement | null>(null);

    const submitNewCategoryAndChanelOrder = async () => {
        if (!currents.server) return;


        const currentServer = currents.server;

        if (currents.Categories === currentServer.categories) return;

        currents.setServer({ ...currentServer, categories: currents.Categories });

        const idList = currents.Categories.map((c) => { return { id: c.id, channels: c.channels.map((x) => x.id) } as { id: string, channels: string[] } });

        await axios.put(`api/v1/servers/${currents.server.id}/categories/orderAll`,
            idList,
        );

        if (socket && socket.connected) {
            socketEmit("category_channel_order_change", currentServer.id, idList);
            console.log("emited category_channel_order_change ", [currentServer.id, idList]);
        }
    }

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

    const onDragEndCategory = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(currents.Categories);
        const [moved] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, moved);

        currents.setCategories(items); // or your state update logic

        // Optional: Persist to backend
        // updateCategoryOrder(items.map((cat, i) => ({ id: cat.id, order: i })));
    };

    const onDragEndChannel = (result: DropResult) => {
        if (!result.destination) return;

        const sourceCategoryId = result.source.droppableId.replace("channel-list-", "");
        const destinationCategoryId = result.destination.droppableId.replace("channel-list-", "");

        if (!sourceCategoryId || !destinationCategoryId) return;

        const updatedCategories = [...currents.Categories];

        const sourceCategory = updatedCategories.find(cat => cat.id === sourceCategoryId);
        const destinationCategory = updatedCategories.find(cat => cat.id === destinationCategoryId);

        if (!sourceCategory || !destinationCategory) return;

        const [movedChannel] = sourceCategory.channels.splice(result.source.index, 1);

        // Same category: reorder
        if (sourceCategoryId === destinationCategoryId) {
            destinationCategory.channels.splice(result.destination.index, 0, movedChannel);
        } else {
            // Moved between categories
            destinationCategory.channels.splice(result.destination.index, 0, movedChannel);
            movedChannel.categoryId = destinationCategoryId; // Update if needed
        }

        currents.setCategories(updatedCategories); // or your state update logic

        // Optional: Persist channel order per category
        // updateChannelOrder(destinationCategory.channels.map((c, i) => ({ id: c.id, order: i })));
    };


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
    }, []);

    const SideBoxMainRef = useRef<HTMLDivElement | null>(null)

    return (
        <>
            <div id="side-box" style={{ fontSize: currents.userVariables?.appFontSize ?? DefaultUserVariables.appFontSize }} className={styles.side_box}>
                <div id="side-box-search" className={styles.side_box_search}>
                    <div id="side-box-search-input-wraper" className={styles.side_box_search_input_wraper}>
                        <input id="side-box-search-input" className={styles.side_box_search_input} type="text" placeholder="Search anything" readOnly onClick={onClickSearch} />
                    </div>
                </div>
                {!currents.SideBoxChannelsV && (<div id="side-box-main" className={styles.side_box_main} ref={SideBoxMainRef}>
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
                            // console.log("Current Direct Message: ", currents.directmessage);
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
                {currents.SideBoxChannelsV && (<div id="side-box-channels" className={styles.side_box_channels_wrapper}>
                    <div className={styles.side_box_channels_server_info}>
                        <p style={{ color: (currents.server && useServerInfoStore.getState().getExistingServerInfo(currents.server.id)?.color) ?? "var(--cb-color-black)" }}>{(currents.server && useServerInfoStore.getState().getExistingServerInfo(currents.server.id)?.name) ?? currents.server?.name}</p>
                        {currents.server?.ownerId === currents.user?.id && (<svg className={styles.user_box_settings_icon} xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" onClick={() => { currents.setSettingsObject(currents.server); onClickSettings("Server"); }} id="settings">
                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                            <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" fill="var(--cb-color-black)"></path>
                        </svg>)}
                    </div>
                    <div className={styles.side_box_channels} ref={SideBoxChannelsRef}>
                        {(currents.server?.ownerId === currents.user?.id) && (
                            <div className={`${styles.side_box_channels_edit_button_holder}`}>
                                <div>
                                    <svg className={styles.side_box_channels_edit_button} onMouseEnter={() => { sethoveringOrder(true); }} onMouseOver={(ev) => { onMouseOverTooltipElement(ev, "Order", currents) }} onMouseLeave={() => { sethoveringOrder(false); onMouseLeaveTooltipElement(currents); }} onClick={() => { const currentOrderEdit = !orderEdit; setorderEdit((state) => !state); if (!currentOrderEdit) submitNewCategoryAndChanelOrder(); }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="reorder">
                                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                                        <path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z" style={{ transition: "fill 0.25s ease-in-out" }}
                                            fill={`var(${(() => {
                                                if (hoveringOrder) {
                                                    if (orderEdit) {
                                                        return "--cb-color-blue-dark";
                                                    } else {
                                                        return "--cb-color-blue";
                                                    }
                                                } else {
                                                    if (orderEdit) {
                                                        return "--cb-color-blue";
                                                    } else {
                                                        return "--cb-color-black";
                                                    }
                                                }
                                            })()
                                                })`}>
                                        </path>
                                    </svg>
                                </div>
                            </div>
                        )}
                        {(currents.server?.ownerId !== currents.user?.id || !orderEdit) && currents.Categories.map((category) => {
                            return (
                                <div key={category.id} className={styles.posr_e}>
                                    <div className={styles.category}>
                                        <p>{category.name}</p>
                                        {currents.server?.ownerId === currents.user?.id && (<svg className={`${styles.category_add_icon} ${(createBoxV && createBoxC?.id === category.id) && styles.category_add_icon_active}`} onClick={(ev) => onClickCategoryAdd(category, ev.currentTarget.getBoundingClientRect().top)} xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" id="dccb5">
                                            <path fill="none" d="M0 0h24v24H0V0z" id="dccb6"></path>
                                            <path d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" fill="var(--cb-color-black)" id="dccb7"></path>
                                        </svg>)}
                                    </div>
                                    {category.channels.map((channel) => {
                                        return (
                                            <div className={styles.channel_element_wraper} onMouseEnter={(ev) => sethoveringChannel(channel)} onMouseLeave={(ev) => hoveringChannel === channel && sethoveringChannel(null)} key={`wraper-${channel.id}`}>
                                                <div className={`${styles.channel_element} ${currents.channel ? (currents.channel.id == channel.id ? styles.channel_element_active : "") : ""}`} onContextMenu={(ev) => { ev.preventDefault(); onRightClickChannel(channel, ev); }} onClick={() => onClickChannel(channel)} key={channel.id}>
                                                    <span className={styles.channel_name} id={channel.id} key={`channel-${channel.id}`}>{
                                                        SyntaxHighlight(ChannelNamePatterns, `#${channel.name}`, styles, "local-sidebar")
                                                    }</span>
                                                </div>
                                                {(currents.server?.ownerId === currents.user?.id && hoveringChannel?.id === channel.id) && (
                                                    <div className={`${styles.channel_settings_icon_wraper} ${styles.channel_settings_icon_wraper_active}`} id={`channel-settings-${channel.id}`} key={`settings-${channel.id}`} onClick={(ev) => { ev.stopPropagation(); currents.setSettingsObject(channel); onClickSettings("Channel") }}>
                                                        <svg className={`${styles.channel_settings_icon}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="settings">
                                                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                                                            <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" fill="var(--cb-color-black)"></path>
                                                        </svg>

                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                        {(currents.server?.ownerId === currents.user?.id && orderEdit) && (
                            <div className={styles.posr_e}>
                                <DragDropContext onDragEnd={onDragEndCategory} >
                                    <Droppable droppableId="category-list">
                                        {(providedCategory) => (
                                            <div
                                                {...providedCategory.droppableProps}
                                                ref={providedCategory.innerRef}
                                            >
                                                {currents.Categories.map((category, index) => (
                                                    <Draggable key={category.id} draggableId={category.id} index={index}>
                                                        {(providedCategoryElement, snapshot) => (
                                                            <div
                                                                ref={providedCategoryElement.innerRef}
                                                                {...providedCategoryElement.draggableProps}
                                                                className={styles.category2}
                                                            >
                                                                <div className={styles.flex_rowa} style={{ width: "100%" }}>
                                                                    {/* 🐱 Drag Handle Circle Only */}
                                                                    <div
                                                                        {...providedCategoryElement.dragHandleProps}
                                                                        className="w-6 h-6 mr-2 rounded-full bg-zinc-600 flex items-center justify-center cursor-grab hover:bg-zinc-500 active:cursor-grabbing"
                                                                    >
                                                                        <div className={`${snapshot.isDragging ? styles.hold_circle_active : styles.hold_circle}`} style={{ height: "16px", width: "16px" }} />
                                                                    </div>

                                                                    <p>{category.name}</p>

                                                                    {/* Add Button (only for owner) */}
                                                                    {currents.server?.ownerId === currents.user?.id && (
                                                                        <svg
                                                                            className={`${styles.category_add_icon} ${(createBoxV && createBoxC?.id === category.id) ? styles.category_add_icon_active : ''}`}
                                                                            onClick={(ev) =>
                                                                                onClickCategoryAdd(category, ev.currentTarget.getBoundingClientRect().top)
                                                                            }
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="36"
                                                                            height="36"
                                                                            viewBox="0 0 24 24"
                                                                        >
                                                                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                                                                            <path
                                                                                d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"
                                                                                fill="var(--cb-color-black)"
                                                                            ></path>
                                                                        </svg>
                                                                    )}
                                                                </div>
                                                                {/* Nested Channels DragDropContext (keep it inside one parent!) */}
                                                                <DragDropContext onDragEnd={onDragEndChannel}>
                                                                    <Droppable droppableId={`channel-list-${category.id}`} key={category.id}>
                                                                        {(providedChannel) => (
                                                                            <div
                                                                                {...providedChannel.droppableProps}
                                                                                ref={providedChannel.innerRef}
                                                                            >
                                                                                {category.channels.map((channel, index) => (
                                                                                    <Draggable key={channel.id} draggableId={channel.id} index={index}>
                                                                                        {(providedChannelElement, snapshot) => (
                                                                                            <div
                                                                                                ref={providedChannelElement.innerRef}
                                                                                                {...providedChannelElement.draggableProps}
                                                                                                className={styles.channel_element_wraper}
                                                                                                onMouseEnter={() => sethoveringChannel(channel)}
                                                                                                onMouseLeave={() => hoveringChannel === channel && sethoveringChannel(null)}
                                                                                            >
                                                                                                <div className={styles.lpad1} />
                                                                                                {/* Drag Handle (optional for channel) */}
                                                                                                <div
                                                                                                    {...providedChannelElement.dragHandleProps}
                                                                                                    className="w-5 h-5 mr-2 rounded-full bg-zinc-600 flex items-center justify-center cursor-grab hover:bg-zinc-500 active:cursor-grabbing"
                                                                                                >
                                                                                                    <div className={`${snapshot.isDragging ? styles.hold_circle_active : styles.hold_circle}`} style={{ height: "12px", width: "12px" }} />
                                                                                                </div>

                                                                                                <div
                                                                                                    className={`${styles.channel_element_draggable} ${currents.channel?.id === channel.id ? styles.channel_element_active : ""
                                                                                                        }`}
                                                                                                    onClick={() => onClickChannel(channel)}
                                                                                                    onContextMenu={(ev) => {
                                                                                                        ev.preventDefault();
                                                                                                        onRightClickChannel(channel, ev);
                                                                                                    }}
                                                                                                >
                                                                                                    <span className={styles.channel_name}>
                                                                                                        {SyntaxHighlight(ChannelNamePatterns, `#${channel.name}`, styles, "local-sidebar")}
                                                                                                    </span>
                                                                                                </div>

                                                                                                {/* Channel Settings Icon */}
                                                                                                {currents.server?.ownerId === currents.user?.id && hoveringChannel?.id === channel.id && (
                                                                                                    <div
                                                                                                        className={`${styles.channel_settings_icon_wraper} ${styles.channel_settings_icon_wraper_active}`}
                                                                                                        onClick={(ev) => {
                                                                                                            ev.stopPropagation();
                                                                                                            currents.setSettingsObject(channel);
                                                                                                            onClickSettings("Channel");
                                                                                                        }}
                                                                                                    >
                                                                                                        <svg
                                                                                                            className={styles.channel_settings_icon}
                                                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                                                            width="24"
                                                                                                            height="24"
                                                                                                            viewBox="0 0 24 24"
                                                                                                        >
                                                                                                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                                                                                                            <path
                                                                                                                d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
                                                                                                                fill="var(--cb-color-black)"
                                                                                                            ></path>
                                                                                                        </svg>
                                                                                                    </div>
                                                                                                )}
                                                                                            </div>
                                                                                        )}
                                                                                    </Draggable>
                                                                                ))}
                                                                                {providedChannel.placeholder}
                                                                            </div>
                                                                        )}
                                                                    </Droppable>
                                                                </DragDropContext>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            </div>
                        )}
                        <div className={`${styles.createbox} ${createBoxV && styles.createbox_active}`} style={{ top: createBoxTop }} ref={CreateBoxRef} id='dccb0'>
                            <button onClick={onClickCreateNewChannel} className={styles.createbox_button} id='dccb1'>Create a new <i id='dccb3'>Channel</i></button>
                            <button onClick={onClickCreateNewCategory} className={styles.createbox_button} id='dccb2'>Create a new <i id='dccb4'>Category</i></button>
                        </div>
                    </div>
                </div>)}
            </div>
        </>
    );
}

export default SideBox;