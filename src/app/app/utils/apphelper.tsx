export function GetServerInfo(id: any) {
    // Return Server Info from database {id[string], name[string], imageurl[string], channels[ID List], users[ID List]}

    // Test code
    switch (id) {
        case 0:
            return {
                id: 0,
                name: "Test Server 0",
                imageurl: "https://cat-storage-server.web.app/data/cat1.jpeg",
                channels: [
                    0,
                    1,
                    2
                ],
                users: [
                    0
                ]
            }
            break;
            case 10:
                return {
                    id: 10,
                    name: "Test Server 10",
                    imageurl: "https://cat-storage-server.web.app/data/cat2.jpg",
                    channels: [
                        0,
                        1,
                        2
                    ],
                    users: [
                        0
                    ]
                }
                break;
                case 20:
                    return {
                        id: 20,
                        name: "Test Server 20",
                        imageurl: "https://cat-storage-server.web.app/data/cat3.jpg",
                        channels: [
                            0,
                            1,
                            2
                        ],
                        users: [
                            0
                        ]
                    }
                    break;
        
        default:
            break;
    }
}
export function GetDirectMessageInfo(id: any) {
    // Return Direct Message Info from database {id[string], users[ID List]}

    // Test Code
    return {
        id: id,
        users: [
            0, 100
        ]
    }
}
export function GetUserAuthInfo(user_id: any) {
    // Return user auth info from database {password_hash[string] salt[string]}
}
export function GetChannelInfo(server_id: any, channel_id: any) {
    // Return channel info from database {id[string] name[string]}
}
export function GetServerMessages(id: any) {
    // Return Server Messages from database {messages[ID List]}
}
export function GetPublicServers() {
    // Return Public Servers from database {ID List}
    return [
        0,
        10,
        20
    ]
}
export function GetChannelMessages(server_id: any, channel_id: any) {
    // Return channel messages from database {Messages[Message List]}
}
export function GetDirectMessageMessages(id: any) {
    // Return direct message messages from database {Messages[Message List]}
}
export function GetMessage(id: any) {
    // Return message from database {message[Message]}
}

//Replace this with actual DB code later!
export function GetUser() {
    // Return user from database {id[string] name[string] imageurl[string] joined_servers[ID List] friends[ID List] direct_messages[ID List]}

    // Test code
    return {
        id: 0,
        imageurl: "https://example.com/example.png",
        name: "Test",
        servers: [
            0,
            10,
            20
        ],
        friends: [
            0,
            100,
            200
        ],
        direct_messages: [
            100,
            200
        ]
    }
}
export function GetUserInfo(id: any) {
    // Return user from database {id[string] name[string] imageurl[string] joined_servers[ID List] friends[ID List] direct_messages[ID List]}

    // Test code
    return {
        id: 0,
        imageurl: "https://example.com/example.png",
        name: "Test",
        servers: [
            0,
            10,
            20
        ],
        friends: [
            0,
            100,
            200
        ],
        direct_messages: [
            100,
            200
        ],
        status: 1 /* 0: Offline 1: Online 2: Away */
    }
}
export function GetFriends() {
    // Return user's friends from database friends[ID List]

    // Test Code
    return [
        0,
        100,
        200
    ]
}
export function GetBlockedPeople() {
    // Return user's blocked people from database [ID List]
    

    // Test Code
    return [];
}

export function SendMessage(sender_id: any, content: any, timestamp: any, attachment: any, reply: any) {
    
}