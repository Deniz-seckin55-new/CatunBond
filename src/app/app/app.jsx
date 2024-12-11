// Set const document elements
const MainBoxDiv = document.getElementById("main-box");
const SideBoxMain = document.getElementById("side-box-main");
const SideBoxChannels = document.getElementById("side-box-channels");
const SideBoxBottom = document.getElementById("side-box-bottom");
const SideBoxTop = document.getElementById("side-box-top");
const SideBoxSearch = document.getElementById("side-box-search");
const SideBoxSearchInput = document.getElementById("side-box-search-input");
const FriendsButton = document.getElementById("friends-button");
const BackgroundBlur = document.getElementById("bg-blur");
const ExploreBox = document.getElementById("explore-box");
const ExploreServers = document.getElementById("explore-servers");
const ChannelBox = document.getElementById("channel-box");
const FriendsBox = document.getElementById("friends-box");
const FriendsBoxList = document.getElementById("friends-box-list");
const FriendsBoxOnlineList = document.getElementById("friends-box-list-online");
const FriendsBoxOfflineList = document.getElementById("friends-box-list-offline");
const FriendsBoxBlockedList = document.getElementById("friends-box-list-blocked");
const OnlineFriendsButton = document.getElementById("online-friends-button");
const OfflineFriendsButton = document.getElementById("offline-friends-button");
const BlockedFriendsButton = document.getElementById("blocked-friends-button");
const HideAnimationKeyframes = [{opacity: 1, visibility: "visible"}, {opacity: 0, visibility: "hidden"}];
const ShowAnimationKeyframes = [{opacity: 0, visibility: "hidden"}, {opacity: 1, visibility: "visible"}];
const HideShowKeyframeOptions = {duration: 250, iterations: 1, fill: "forwards"};

var CurrentSelectedServer = undefined;
var CurrentSelectedChannel = undefined;

var FriendsOnlineLoaded = false;
var FriendsOfflineLoaded = false;
var FriendsBlockedLoaded = false;
var PublicServersLoaded = false;

function OnClickServer(ev) {
    CurrentSelectedServer = ev.target.parentElement.id;

    FriendsBox.style.visibility = "hidden";
    FriendsBoxBlockedList.style.visibility = "hidden";
    FriendsBoxOfflineList.style.visibility = "hidden";
    FriendsBoxOnlineList.style.visibility = "hidden";
    SideBoxMain.style.visibility = "hidden";
    SideBoxChannels.style.visibility = "visible";
    ChannelBox.style.visibility = "visible";
}
function OnClickSearchBox(ev) {
    // Load Public Servers
    if(!PublicServersLoaded) {
        LoadPublicServers();
        PublicServersLoaded = true;
    }

    // Make Background-Blur Visible
    ShowElement(BackgroundBlur);
    // Make Explore-Box Visible
    ShowElement(ExploreBox);
}
function OnClickScreen(ev) {
    // If Click is on Background-Blur
    if(ev.target.id == BackgroundBlur.id) {
            
        // Make Background-Blur Hidden
        HideElement(BackgroundBlur);
        // Make Explore-Box Hidden
        HideElement(ExploreBox);
    }
}
function OnClickFriendsButton(ev) {
    if(!FriendsOnlineLoaded) {
        LoadFriendsOnline();
        FriendsOnlineLoaded = true;
    }
    ChannelBox.style.visibility = "hidden";
    FriendsBox.style.visibility = "visible";
    FriendsBoxOnlineList.style.visibility = "visible";
}
function OnClickOnlineFriendsButton() {
    FriendsBoxOfflineList.style.visibility = "hidden";
    FriendsBoxBlockedList.style.visibility = "hidden";
    FriendsBoxOnlineList.style.visibility = "visible";

    if(!FriendsOnlineLoaded) {
        LoadFriendsOnline();
        FriendsOnlineLoaded = true;
    }
}
function OnClickOfflineFriendsButton() {
    FriendsBoxOfflineList.style.visibility = "visible";
    FriendsBoxBlockedList.style.visibility = "hidden";
    FriendsBoxOnlineList.style.visibility = "hidden";

    if(!FriendsOfflineLoaded) {
        LoadFriendsOffline();
        FriendsOfflineLoaded = true;
    }
}
function OnClickBlockedFriendsButton() {
    FriendsBoxOfflineList.style.visibility = "hidden";
    FriendsBoxBlockedList.style.visibility = "visible";
    FriendsBoxOnlineList.style.visibility = "hidden";

    if(!FriendsBlockedLoaded) {
        LoadFriendsBlocked();
        FriendsBlockedLoaded = true;
    }
}
function CreateServerDiv(id, name, image) {
    let ServerDiv = document.createElement("div");
    // Setup here

    let ServerImage = document.createElement('img');

    ServerDiv.className = "server-list-element";
    ServerDiv.id = id;

    ServerImage.className = "server-list-element-image";

    ServerImage.src = image;

    ServerDiv.addEventListener("click", OnClickServer);

    ServerDiv.appendChild(ServerImage);

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

    PublicServerDiv.className = "public-server-list-element";

    return PublicServerDiv;
}
function CreateFriendDiv(id, name, image) {
    let FriendDiv = document.createElement("div");
    // Setup here

    FriendDiv.className = "friends-box-list-element";

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
function LoadExploreButton() {
    let ExploreButton = document.createElement('div');
    
    ExploreButton.className = "explore-button";
    ExploreButton.id = "explore-button";

    MainBoxDiv.appendChild(ExploreButton);
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
function LoadFriendsOnline() {
    // Retrieve Friends
    const FriendsListID = GetFriends();
    const FriendsList = FriendsListID.map((x) => GetUserInfo(x))

    // Add each friend to friends-box-list

    FriendsList.filter(x => (x.status == 1)).forEach(FriendID => {
        // For each friend

        // Add friend to friends-box-list

        const FriendInfo = GetUser(FriendID);

        let FriendDiv = CreateFriendDiv(FriendInfo.id, FriendInfo.name, FriendInfo.imageurl); // Friend Activity

        FriendsBoxOnlineList.appendChild(FriendDiv);
    });
}
function LoadFriendsOffline() {
    // Retrieve Friends
    const FriendsListID = GetFriends();
    const FriendsList = FriendsListID.map((x) => GetUserInfo(x))

    // Add each friend to friends-box-list

    FriendsList.filter(x => (x.status == 0)).forEach(FriendID => {
        // For each friend

        // Add friend to friends-box-list

        const FriendInfo = GetUser(FriendID);

        let FriendDiv = CreateFriendDiv(FriendInfo.id, FriendInfo.name, FriendInfo.imageurl); // Friend Activity

        FriendsBoxOfflineList.appendChild(FriendDiv);
    });
}
function LoadFriendsBlocked() {
    // Retrieve Friends
    const BlockedListID = GetBlockedPeople();
    const BlockedList = BlockedListID.map((x) => GetUserInfo(x))

    // Add each friend to friends-box-list

    BlockedList.forEach(FriendID => {
        // For each blocked person

        // Add friend to friends-box-list

        const FriendInfo = GetUser(FriendID);

        let FriendDiv = CreateFriendDiv(FriendInfo.id, FriendInfo.name, FriendInfo.imageurl); // Friend Activity

        FriendsBoxBlockedList.appendChild(FriendDiv);
    });
}
function LoadSearchBox() {
    
    // On Click Search Box
    SideBoxSearchInput.addEventListener("click", OnClickSearchBox);

    // Screen Click
    document.addEventListener("click", OnClickScreen);
}
function LoadFriendsButton() {
    FriendsButton.addEventListener("click", OnClickFriendsButton);
}
function LoadFriendsListButtons() {
    OnlineFriendsButton.addEventListener("click", OnClickOnlineFriendsButton);
    
    OfflineFriendsButton.addEventListener("click", OnClickOfflineFriendsButton);
    
    BlockedFriendsButton.addEventListener("click", OnClickBlockedFriendsButton);
}
function LoadCurrentChannel() {

}
function SlowUpdateTick() {
    // Check for User Server List Changes
    // Check for Server channel Changes
}
function FastUpdateTick() {
    // Check for new messages
    // Check for new Direct Messages
}
function RegisterSlowUpdates() {
    setInterval(SlowUpdateTick, 5000);
}
function RegisterFastUpdates() {
    setInterval(FastUpdateTick, 100);
}
function main() {
    
    // Load the User's joined servers.
    LoadServers();

    // Load explore button
    LoadExploreButton();

    // Load User's direct messages.
    LoadDirectMessages();

    // Load the search box.
    LoadSearchBox();

    // Load the friends button.
    LoadFriendsButton();

    // Load friends list buttons
    LoadFriendsListButtons();

    // Register Dense Updates
    RegisterFastUpdates();

    // Register Sparse Updates
    RegisterSlowUpdates();
}

main();