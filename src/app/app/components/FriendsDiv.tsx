import styles from '../page.module.css';

import React, { use, useEffect, useState } from 'react';
import { Currents, GetUser, ToUser } from '../utils/utils';
import { Socket } from 'socket.io-client';
import { FriendRequest as DBFriendRequest } from '@prisma/client';
import { AllowedTypes, Friend, FriendRequestAnswer, PendingFriendRequest, SocketData, SocketInformationType, User } from '../utils/socket_utils';

interface Props {
    Currents: Currents;
    pendingSentRequests: PendingFriendRequest[];
    setpendingSentRequests: React.Dispatch<React.SetStateAction<PendingFriendRequest[]>>;
    onClickFriendUser: (user: User) => void;
    socket: Socket | undefined;
}

interface LoadingState {
    online: boolean,
    offline: boolean,
    pendingSent: boolean,
    pendingRecieved: boolean,
    blocked: boolean,
}

const FriendsDiv: React.FC<Props> = ({ Currents,pendingSentRequests, setpendingSentRequests, onClickFriendUser, socket }) => {
    const [friendsList, setfriendsList] = useState<User[]>([]);
    const [friends, setfriends] = useState<Friend[]>([]);
    const [blocked, setblocked] = useState<User[]>([]);
    const [pendingRecievedRequests, setpendingRecievedRequests] = useState<PendingFriendRequest[]>([]);
    const [LoadingStates, setLoadingStates] = useState<LoadingState>({
        blocked: false,
        offline: false,
        online: false,
        pendingSent: false,
        pendingRecieved: false,
    });
    useEffect(() => {
        if (Currents.friendsdiv.visible) {
            fetch("/api/v1/user/friends", {
                method: "POST"
            }).then(res => res.json().then(data => {
                setfriendsList(data.data as User[]);
                console.log("FriendsList: ", friendsList);
                if (friendsList.length == 0) {
                    setLoadingStates((prevState) => ({
                        ...prevState,
                        online: true,
                        offline: true,
                    }));
                }
                friendsList.forEach((friend) => {
                    socket?.emit("get_status", friend.id, function (data: any) {
                        const friendStatus: Friend = {
                            user: friend,
                            status: data,
                        }
                        setfriends((prev) => [...prev, friendStatus]);
                        setLoadingStates((prevState) => ({
                            ...prevState,
                            online: true,
                            offline: true,
                        }));
                        console.log("Friends", friends);
                    });
                })
            }))
        }
    }, [Currents.friendsdiv.visible]);

    useEffect(() => {
        if (!Currents.user) { return; }
        if (Currents.friendsdiv.visible) {
            fetch("/api/v1/user/friendrequests", {
                method: "POST",
            }).then(res => res.json().then(rdata => {
                const data: { sent: DBFriendRequest[], recieved: DBFriendRequest[] } = rdata.data;
                if (data.sent && data.recieved) {
                    const _sentRequests = data.sent.map(async (request: DBFriendRequest) => ({
                        friendRequest: request,
                        sender: ToUser(Currents.user!),
                        reciever: await GetUser(request.receiverId)
                    }));
                    const _recievedRequests = data.recieved.map(async (request: DBFriendRequest) => ({
                        friendRequest: request,
                        sender: await GetUser(request.senderId),
                        reciever: ToUser(Currents.user!),
                    }));
                    Promise.all(_sentRequests).then(sentRequests => {
                        setpendingSentRequests(sentRequests.filter(x => x.friendRequest.status == "PENDING")); setLoadingStates((prevState) => ({
                            ...prevState,
                            pendingSent: true,
                        }));
                    });
                    Promise.all(_recievedRequests).then(recievedRequests => {
                        setpendingRecievedRequests(recievedRequests.filter(x => x.friendRequest.status == "PENDING")); setLoadingStates((prevState) => ({
                            ...prevState,
                            pendingRecieved: true,
                        }));
                    });
                }
            }));
            fetch("/api/v1/user/friends/blocked", {
                method: "POST",
            }).then(res => res.json().then(data => {
                if (data.data) {
                    const blockedUsers: User[] = data.data as User[];
                    setblocked(blockedUsers);
                    setLoadingStates((prevState) => ({
                        ...prevState,
                        blocked: true,
                    }));
                }
            }))
        }
    }, [Currents.friendsdiv.visible]);

    const onClickFriendAction = (request: PendingFriendRequest, answer: string) => {
        fetch("/api/v1/user/friend/answer", {
            method: "POST",
            body: JSON.stringify({
                requestId: request.friendRequest.id,
                answer: answer,
            })
        }).then(res => res.json().then(data => {
            if (data.message) {
                const infoType = (() => {
                    switch (answer) {
                        case 'cancel':
                            return SocketInformationType.ClientCancelFriendRequest;
                        case 'accept':
                            return SocketInformationType.ClientAcceptFriendRequest;
                        case 'decline':
                            return SocketInformationType.ClientDeclineFriendRequest;
                        case 'block':
                            return SocketInformationType.ClientBlockFriendRequest;
                        default:
                            return -1;
                    }
                })();
                if (infoType == -1) {
                    console.log("Invalid answer.");
                    return;
                }
                const socketData: SocketData = {
                    infoType: infoType,
                    dataType: AllowedTypes.FriendRequest,
                    data: request.friendRequest,
                }
                socket?.emit(`friend_request_answer`, socketData);
                if(infoType == SocketInformationType.ClientCancelFriendRequest) {
                    setpendingSentRequests(pendingSentRequests.filter(x => x.friendRequest.id !== request.friendRequest.id));
                }
            }
        }))
    }

    useEffect(() => {
        if (!socket)
            return;
        socket.on("friend_request_send", (friendRequest: PendingFriendRequest) => {
            if(!Currents.user)
                return;
            if(friendRequest.sender.id === Currents.user.id) {
                setpendingSentRequests((prev) => [
                    ...prev,
                    friendRequest,
                ]);
            } else {
                setpendingRecievedRequests((prev) => [
                    ...prev,
                    friendRequest,
                ]);
            }
        });
        socket.on("friend_request_answer", (data: FriendRequestAnswer) => {
            const { friendRequest, answer } = data;
            console.log("friend_request_answer", friendRequest, answer);
            GetUser(friendRequest.senderId).then((sender) => {
                switch (answer) {
                    case "accept":
                        setfriendsList((prev) => [
                            ...prev,
                            sender,
                        ])
                        socket?.emit("get_status", sender.id, function (data: any) {
                            const newFriend: Friend = {
                                status: data,
                                user: sender,
                            }
                            setfriends((prev) => [
                                ...prev,
                                newFriend,
                            ])
                        });
                        break;
                    case "decline":
                        break;
                    default:
                        break;
                }
                setpendingRecievedRequests(pendingRecievedRequests.filter(x => x.friendRequest.id !== friendRequest.id));
                setpendingSentRequests(pendingSentRequests.filter(x => x.friendRequest.id !== friendRequest.id));
            })
        });
    }, [])

    return (
        <div className={styles.friends_box_list_holder}>
            {Currents.friendsdiv.status == "online" && (
                <div id="friends-box-list-online" className={styles.friends_box_list_online}>
                    <div className={styles.flex_row}>
                        <p className={styles.friend_bos_list_name}>Online — {friends.filter(x => x.status === 'online').length}</p>
                        <hr className={styles.hr_three} style={{ width: `calc(70% - ${friends.filter(x => x.status === 'online').length.toString().length}ch)` }} />
                    </div>
                    {LoadingStates.online == false && (
                        <>
                            <img src="load.svg" width={"60vh"} height={"60vh"} style={{ marginLeft: "2rem" }} />
                        </>
                    )}
                    {friends.filter(x => x.status === "online").map((friend) => {
                        console.log("Rendering friend: ", friend);
                        return (
                            <div className={styles.friend_user_div_holder} onClick={() => onClickFriendUser(friend.user)} key={`main-${friend.user.id}`}>
                                <hr className={styles.hr_two} />
                                <div className={styles.friend_user_div} key={`div-${friend.user.id}`}>
                                    <div className={`${styles.useravatar_holder} ${styles.friend_user_avatar}`} key={`avatar-${friend.user.id}`}>
                                        <img className={styles.message_useravatar} src={`${friend.user.avatarUrl/*https://cat-storage-server.web.app/data/cat1.jpeg"*/}`} />
                                    </div>
                                    <div className={`${styles.message_user_holder} ${styles.friend_user_holder}`} key={`usernamediv-${friend.user.id}`}>
                                        <div className={styles.message_content_holder} key={`content-${friend.user.id}`}>
                                            <p className={styles.message_username} key={`username-${friend.user.id}`}>{friend.user.username}</p>
                                        </div>
                                        <div>
                                            <p className={styles.friend_activity} key={`activity-${friend.user.id}`}>Writing a message</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
            {Currents.friendsdiv.status == "offline" && (
                <div id="friends-box-list-offline" className={styles.friends_box_list_offline}>
                    <div className={styles.flex_row}>
                        <p className={styles.friend_bos_list_name}>Offline — {friends.filter(x => x.status === 'offline').length}</p>
                        <hr className={styles.hr_three} style={{ width: `calc(70% - ${friends.filter(x => x.status === 'offline').length.toString().length}ch)` }} />
                    </div>
                    {LoadingStates.offline == false && (
                        <>
                            <img src="load.svg" width={"60vh"} height={"60vh"} style={{ marginLeft: "2rem" }} />
                        </>
                    )}
                    {friends.filter(x => x.status === "offline").map((friend) => {
                        console.log("Rendering friend: ", friend);
                        return (
                            <div className={styles.friend_user_div_holder} onClick={() => onClickFriendUser(friend.user)} key={`main-${friend.user.id}`}>
                                <hr className={styles.hr_two} />
                                <div className={styles.friend_user_div} key={`div-${friend.user.id}`}>
                                    <div className={`${styles.useravatar_holder} ${styles.friend_user_avatar}`} key={`avatar-${friend.user.id}`}>
                                        <img className={styles.message_useravatar} src={`${friend.user.avatarUrl/*https://cat-storage-server.web.app/data/cat1.jpeg"*/}`} />
                                    </div>
                                    <div className={`${styles.message_user_holder} ${styles.friend_user_holder}`} key={`usernamediv-${friend.user.id}`}>
                                        <div className={styles.message_content_holder} key={`content-${friend.user.id}`}>
                                            <p className={styles.message_username} key={`username-${friend.user.id}`}>{friend.user.username}</p>
                                        </div>
                                        <div>
                                            <p className={styles.friend_activity} key={`activity-${friend.user.id}`}>Writing a message</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
            {Currents.friendsdiv.status == "pending" && (
                <div id="friends-box-list-pending" className={styles.friends_box_list_pending}>
                    <div className={styles.flex_row}>
                        <p className={styles.friend_bos_list_name}>Recieved — {pendingRecievedRequests.length}</p>
                        <hr className={styles.hr_three} style={{ width: `calc(70% - ${pendingRecievedRequests.length.toString().length}ch)` }} />
                    </div>
                    {LoadingStates.pendingRecieved == false && (
                        <>
                            <img src="load.svg" width={"60vh"} height={"60vh"} style={{ marginLeft: "2rem" }} />
                        </>
                    )}
                    {pendingRecievedRequests.map((request) => {
                        console.log("Rendering friend: ", request);
                        const sender: User = request.sender as User;
                        console.log(sender);
                        return (
                            <div className={styles.friend_user_div_holder} onClick={() => onClickFriendUser(request.sender)} key={`main-${request.friendRequest.senderId}`}>
                                <hr className={styles.hr_two} />
                                <div className={styles.friend_user_div} key={`div-${sender.id}`}>
                                    <div className={`${styles.useravatar_holder} ${styles.friend_user_avatar}`} key={`avatar-${sender.id}`}>
                                        <img className={styles.message_useravatar} src={`${sender.avatarUrl/*https://cat-storage-server.web.app/data/cat1.jpeg"*/}`} />
                                    </div>
                                    <div className={`${styles.message_user_holder} ${styles.friend_user_holder}`} key={`usernamediv-${sender.id}`}>
                                        <div className={styles.message_content_holder} key={`content-${sender.id}`}>
                                            <p className={styles.message_username} key={`username-${sender.id}`}>{sender.username}</p>
                                        </div>
                                        <div>
                                            <p className={styles.friend_activity} key={`activity-${sender.id}`}>Writing a message</p>
                                        </div>
                                    </div>
                                    <div className={styles.friend_user_div_actions}>
                                        <button className={styles.friend_user_div_actions_div} onClick={() => onClickFriendAction(request, "accept")}>
                                            <img className={styles.friend_user_div_actions_image} src="check.svg" width={"30vh"} height={"30vh"} />
                                        </button>
                                        <button className={styles.friend_user_div_actions_div} onClick={() => onClickFriendAction(request, "decline")}>
                                            <img className={styles.friend_user_div_actions_image} src="clear.svg" width={"30vh"} height={"30vh"} />
                                        </button>

                                        <button className={styles.friend_user_div_actions_div} onClick={() => onClickFriendAction(request, "block")}>
                                            <img className={styles.friend_user_div_actions_image} src="block.svg" width={"30vh"} height={"30vh"} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div className={styles.flex_row}>
                        <p className={styles.friend_bos_list_name}>Sent — {pendingSentRequests.length}</p>
                        <hr className={styles.hr_three} style={{ width: `calc(70% - ${pendingSentRequests.length.toString().length}ch)` }} />
                    </div>
                    {LoadingStates.pendingSent == false && (
                        <>
                            <img src="load.svg" width={"60vh"} height={"60vh"} style={{ marginLeft: "2rem" }} />
                        </>
                    )}
                    {pendingSentRequests.map((request) => {
                        console.log("Rendering friend: ", request);
                        const reciever: User = request.reciever as User;
                        return (
                            <div className={styles.friend_user_div_holder} onClick={() => onClickFriendUser(reciever)} key={`main-${request.friendRequest.receiverId}`}>
                                <hr className={styles.hr_two} />
                                <div className={styles.friend_user_div} key={`div-${reciever.id}`}>
                                    <div className={`${styles.useravatar_holder} ${styles.friend_user_avatar}`} key={`avatar-${reciever.id}`}>
                                        <img className={styles.message_useravatar} src={`${reciever.avatarUrl/*https://cat-storage-server.web.app/data/cat1.jpeg"*/}`} />
                                    </div>
                                    <div className={`${styles.message_user_holder} ${styles.friend_user_holder}`} key={`usernamediv-${reciever.id}`}>
                                        <div className={styles.message_content_holder} key={`content-${reciever.id}`}>
                                            <p className={styles.message_username} key={`username-${reciever.id}`}>{reciever.username}</p>
                                        </div>
                                        <div>
                                            <p className={styles.friend_activity} key={`activity-${reciever.id}`}>Writing a message</p>
                                        </div>
                                    </div>
                                    <div className={styles.friend_user_div_actions}>
                                        <button className={styles.friend_user_div_actions_div} onClick={() => onClickFriendAction(request, "cancel")}>
                                            <img className={styles.friend_user_div_actions_image} src="clear.svg" width={"30vh"} height={"30vh"} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
            {Currents.friendsdiv.status == "blocked" && (
                <div id="friends-box-list-blocked" className={styles.friends_box_list_blocked}>
                    <div className={styles.flex_row}>
                        <p className={styles.friend_bos_list_name}>Blocked — {friends.filter(x => x.status === 'blocked').length}</p>
                        <hr className={styles.hr_three} style={{ width: `calc(70% - ${friends.filter(x => x.status === 'blocked').length.toString().length}ch)` }} />
                    </div>
                    {LoadingStates.blocked == false && (
                        <>
                            <img src="load.svg" width={"60vh"} height={"60vh"} style={{ marginLeft: "2rem" }} />
                        </>
                    )}
                    {blocked.map((user) => {
                        console.log("Rendering friend: ", user);
                        return (
                            <div className={styles.friend_user_div_holder} onClick={() => onClickFriendUser(user)} key={`main-${user.id}`}>
                                <hr className={styles.hr_two} />
                                <div className={styles.friend_user_div} key={`div-${user.id}`}>
                                    <div className={`${styles.useravatar_holder} ${styles.friend_user_avatar}`} key={`avatar-${user.id}`}>
                                        <img className={styles.message_useravatar} src={`${user.avatarUrl/*https://cat-storage-server.web.app/data/cat1.jpeg"*/}`} />
                                    </div>
                                    <div className={`${styles.message_user_holder} ${styles.friend_user_holder}`} key={`usernamediv-${user.id}`}>
                                        <div className={styles.message_content_holder} key={`content-${user.id}`}>
                                            <p className={styles.message_username} key={`username-${user.id}`}>{user.username}</p>
                                        </div>
                                        <div>
                                            <p className={styles.friend_activity} key={`activity-${user.id}`}>Writing a message</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    );
}

export default FriendsDiv;