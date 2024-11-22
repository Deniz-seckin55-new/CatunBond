// Set const document elements
const MainBoxDiv = document.getElementById("main-box");
const SideBoxBottom = document.getElementById("side-box-bottom");
const SideBoxTop = document.getElementById("side-box-top");
const SideBoxSearch = document.getElementById("side-box-search");
const SideBoxSearchInput = document.getElementById("side-box-search-input");
const FriendsButton = document.getElementById("friends-button");
const BackgroundBlur = document.getElementById("bg-blur");
const ExploreBox = document.getElementById("explore-box");

function LoadServers() {
    // Get User Servers
    const UserServers = GetUser().servers;
    
    // Go through the servers
    UserServers.forEach(Server => {
        // For each server

        // Add server to main-box

        // Create Server Div

        let ServerDiv = document.createElement("div");

        // Setup here

        MainBoxDiv.appendChild(ServerDiv);
    });
}
function LoadDirectMessages() {
    // Get User Direct Messages
    const DirectMessages = GetUser().direct_messages;
    
    // Go through the servers
    DirectMessages.forEach(Server => {
        // For each direct messages

        // Add direct message to side-box-bottom

        // Create Direct Message Div

        let DirectMessageDiv = document.createElement("div");

        // Setup here

        SideBoxBottom.appendChild(DirectMessageDiv);
    });
}
function LoadSearchBox() {
    
    // On Click Search Box
    SideBoxSearchInput.addEventListener("click", (ev) => {
        // Load Public Servers

        // Make Background-Blur Visible
        // Make Explore-Box Visible
    });

    // Screen Click
    document.addEventListener("click", (ev) => {
        // If Click is on Background-Blur

        // Make Background-Blur Hidden
        // Make Explore-Box Hidden
    });
}
function LoadFriendsButton() {

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