// Set const document elements
const MainBoxDiv = document.getElementById("main-box");
const SideBoxBottom = document.getElementById("side-box-bottom");
const SideBoxTop = document.getElementById("side-box-top");
const SideBoxSearch = document.getElementById("side-box-search");
const SideBoxSearchInput = document.getElementById("side-box-search-input");
const FriendsButton = document.getElementById("friends-button");
const BackgroundBlur = document.getElementById("bg-blur");
const ExploreBox = document.getElementById("explore-box");
const ExploreServers = document.getElementById("explore-servers");
const FriendsBoxList = document.getElementById("friends-box-list");
const HideAnimationKeyframes = [{opacity: 1, visibility: "visible"}, {opacity: 0, visibility: "hidden"}];
const ShowAnimationKeyframes = [{opacity: 0, visibility: "hidden"}, {opacity: 1, visibility: "visible"}];
const HideShowKeyframeOptions = {duration: 250, iterations: 1, fill: "forwards"};

function CreateServerDiv(id, name, image) {
    let ServerDiv = document.createElement("div");
    // Setup here

    return ServerDiv;
}

function CreateDirectMessageDiv(id) {
    let DirectMessageDiv = document.createElement("div");
    // Setup here

    return DirectMessageDiv;
}
function CreatePublicServerDiv(id, name, image) {
    let PublicServerDiv = document.createElement("div");
    // Setup here

    return PublicServerDiv;
}
function CreateFriendDiv(id, name, image) {
    let FriendDiv = document.createElement("div");
    // Setup here

    return FriendDiv;
}
function HideElement(element) {
    element.animate(HideAnimationKeyframes, HideShowKeyframeOptions);
}
function ShowElement(element) {
    element.animate(ShowAnimationKeyframes, HideShowKeyframeOptions);
}

function LoadServers() {
    // Get User Servers
    const UserServers = GetUser().servers;
    
    // Go through the servers
    UserServers.forEach(ServerID => {
        // For each server

        // Add server to main-box

        const ServerInfo = GetServerInfo(ServerID);

        let ServerDiv = CreateServerDiv(ServerInfo.id, ServerInfo.name, ServerInfo.imageurl)

        MainBoxDiv.appendChild(ServerDiv);
    });
}
function LoadDirectMessages() {
    // Get User Direct Messages
    const DirectMessages = GetUser().direct_messages;
    
    // Go through the Direct Messages
    DirectMessages.forEach(DirectMessageID => {
        // For each direct messages

        // Add direct message to side-box-bottom

        const DirectMessageInfo = GetDirectMessageInfo(DirectMessageID);

        let DirectMessageDiv = CreateDirectMessageDiv(DirectMessageInfo.id, DirectMessageInfo.users);

        SideBoxBottom.appendChild(DirectMessageDiv);
    });
}
function LoadPublicServers() {
    // Retrieve Public Servers
    const PublicServerList = GetPublicServers();

    // Add each server to explore-servers

    PublicServerList.forEach(ServerID => {
        // For each public server

        // Add public server to explore-servers

        const ServerInfo = GetServerInfo(ServerID);

        let PublicServerDiv = CreatePublicServerDiv(ServerID.id, ServerInfo.name, ServerInfo.imageurl);

        ExploreServers.appendChild(PublicServerDiv);
    });
}
function LoadFriends() {
    // Retrieve Friends
    const FriendsList = GetFriends();

    // Add each friend to friends-box-list

    FriendsList.forEach(FriendID => {
        // For each friend

        // Add friend to friends-box-list

        const FriendInfo = GetUser(FriendID);

        let FriendDiv = CreateFriendDiv(FriendInfo.id, FriendInfo.name, FriendInfo.imageurl); // Friend Activity

        ExploreServers.appendChild(PublicServerDiv);
    });
}
function LoadSearchBox() {
    
    // On Click Search Box
    SideBoxSearchInput.addEventListener("click", (ev) => {
        // Load Public Servers
        LoadPublicServers();

        // Make Background-Blur Visible
        ShowElement(BackgroundBlur);
        // Make Explore-Box Visible
        ShowElement(ExploreBox);
    });

    // Screen Click
    document.addEventListener("click", (ev) => {
        // If Click is on Background-Blur
        if(ev.target.id == BackgroundBlur.id) {
            
            // Make Background-Blur Hidden
            HideElement(BackgroundBlur);
            // Make Explore-Box Hidden
            HideElement(ExploreBox);
        }
    });
}
function LoadFriendsButton() {
    FriendsButton.addEventListener("click", (ev) => {
        LoadFriends();
    });
}
function LoadCurrentChannel() {

}
function RegisterSlowUpdates() {
    // Check for User Server List Changes
    // Check for Server channel Changes
}
function RegisterFastUpdates() {
    // Check for new messages
    // Check for new Direct Messages
}
function main() {
    
    // Load the User's joined servers.
    LoadServers();

    // Load User's direct messages.
    LoadDirectMessages();

    // Load the search box.
    LoadSearchBox();

    // Load the friends button.
    LoadFriendsButton();

    // Load currently active channel
    LoadCurrentChannel();

    // Register Dense Updates
    RegisterFastUpdates();

    // Register Sparse Updates
    RegisterSlowUpdates();
}

main();