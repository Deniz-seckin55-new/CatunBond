function GetServerInfo(id) {
    // Return Server Info from database {id[string], name[string], imageurl[string], channels[ID List], users[ID List]}
}
function GetDirectMessageInfo(id) {
    // Return Direct Message Info from database {id[string], users[ID List]}
}
function GetUserAuthInfo(user_id) {
    // Return user auth info from database {password_hash[string] salt[string]}
}
function GetChannelInfo(server_id, channel_id) {
    // Return channel info from database {id[string] name[string]}
}
function GetServerMessages(id) {
    // Return Server Messages from database {messages[ID List]}
}
function GetPublicServers() {

}
function GetChannelMessages(server_id, channel_id) {
    // Return channel messages from database {Messages[Message List]}
}
function GetDirectMessageMessages(id) {
    // Return direct message messages from database {Messages[Message List]}
}
function GetMessage(id) {
    // Return message from database {message[Message]}
}
function GetUser(id) {
    // Return user from database {id[string] name[string] imageurl[string] joined_servers[ID List] friends[ID List] direct_messages[ID List]}
}
function GetFriends() {
    // Return user's friends from database friends[ID List]
}

function SendMessage(sender_id, content, timestamp, attachment, reply) {
    
}