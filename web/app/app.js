const topel = document.getElementById('top');
const middleel = document.getElementById('middle');
const leftel = document.getElementById('left');
const leftrightel = document.getElementById('leftright');
const msgtyper = document.getElementById("msg-typer");

let currentSelectedServer = undefined;
let currentSelectedChannel = undefined;
let loadedMessagesList = [];
let writingCooldown = 0;

function ChangeServer(ServerID, json) {
    if(currentSelectedServer == ServerID) { return; }

    var firstChannel = true;
    currentSelectedServer = ServerID;
    console.log("Setting current selected server to "+ServerID);
    
    leftrightel.innerHTML = "";

    json.channels.forEach(channel => {
        if(firstChannel) {
            console.log("Setting current selected channel to "+channel.id);
            currentSelectedChannel = channel.id;
            firstChannel = false;
        }

        console.log(channel);
        console.log(channel.name);

        let celement = document.createElement("div");
        let channelElement = document.createElement('button');
        channelElement.textContent = channel.name;
        channelElement.className = "channel";
        channelElement.id = channel.id;

        channelElement.addEventListener("click", (ev) => {
            ChangeChannel(channel);
        });

        celement.appendChild(channelElement);

        leftrightel.appendChild(celement);
    });

    middleel.innerHTML = "";

    loadedMessagesList = [];
}

function ChangeChannel(channel) {
    if(currentSelectedChannel == channel.id) { return; }

    currentSelectedChannel = channel.id;

    middleel.innerHTML = "";

    loadedMessagesList = [];
}

async function LoadServersAndChannels() {
    const serverPromise = await fetch('http://localhost:9000/api/public/getServers', {
        method: 'post',
        headers: new Headers({
            'Authorization': userToken
        })
    });

    const serverList = await serverPromise.json();

    console.log(serverList);

    var first = true;

    serverList.forEach(async function (ServerID) {
        const response = await fetch('/api/public/getServerInfo', {
            method: 'post',
            headers: new Headers({
                'Authorization': userToken,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                server: ServerID
            })
        })
        const json = await response.json();

        console.log(json);

        let element = document.createElement("div");

        let serverElement = document.createElement('button');

        serverElement.textContent = json.name;
        serverElement.className = "server";
        serverElement.id = ServerID;

        serverElement.addEventListener("click", () => {
            ChangeServer(ServerID, json);
        });

        element.appendChild(serverElement);

        leftel.appendChild(element);

        console.log(json.channels);

        if(first) {
            var firstChannel = true;
            currentSelectedServer = ServerID;
            console.log("Setting current selected server to "+ServerID);

            json.channels.forEach(channel => {
                if(firstChannel) {
                    console.log("Setting current selected channel to "+channel.id);
                    currentSelectedChannel = channel.id;
                    firstChannel = false;
                }

                console.log(channel);
                console.log(channel.name);
    
                let celement = document.createElement("div");
                let channelElement = document.createElement('button');
                channelElement.textContent = channel.name;
                channelElement.className = "channel";
                channelElement.id = channel.id;

                channelElement.addEventListener("click", (ev) => {
                    ChangeChannel(channel);
                });

                celement.appendChild(channelElement);

                leftrightel.appendChild(celement);
            });
            first = false;
        }
    });
}
let exploreToggle = false;
async function CreateExploreButton() {
    let exploreDiv = document.createElement('div');
    let exploreButton = document.createElement('button');

    exploreButton.textContent = "Explore";
    exploreButton.id = "explore-button";

    exploreButton.addEventListener("click", async function () {
        document.getElementById("bg-blur").animate([{opacity: 0, visibility: "hidden"}, {opacity: 1, visibility: "visible"}], { duration: 250, iterations: 1, fill: "forwards"});
        document.getElementById("explore-box").animate([{opacity: 0, visibility: "hidden"}, {opacity: 1, visibility: "visible"}], { duration: 250, iterations: 1, fill: "forwards"});
        exploreToggle = false;
    });

    document.addEventListener("click", async (ev) => {
        if(ev.button == 0 && ev.target.id == "bg-blur") {
            console.log("click!");
            if(!exploreToggle) {
                console.log("yup!");
                document.getElementById("bg-blur").animate([{opacity: 1, visibility: "visible"}, {opacity: 0, visibility: "hidden"}], { duration: 250, iterations: 1, fill: "forwards"});
                document.getElementById("explore-box").animate([{opacity: 1, visibility: "visible"}, {opacity: 0, visibility: "hidden"}], { duration: 250, iterations: 1, fill: "forwards"});
                exploreToggle = true;
            }
        }
    });

    exploreDiv.appendChild(exploreButton);
    leftel.appendChild(exploreDiv);
}

async function LoadPublicServers() {
    const publicServersListPromise = await fetch("http://localhost:9000/api/public/getPublicServerList", {
        method: 'post',
        headers: new Headers({
            'Authorization': userToken,
            'Content-Type': 'application/json'
        })
    })

    const publicServerResponse = await publicServersListPromise.json();
    const publicServers = publicServerResponse.servers;

    console.log("Got public servers response as: ");
    console.log(publicServers);

    publicServers.forEach(async (publicServer) => {
        const response = await fetch('/api/public/getServerInfo', {
            method: 'post',
            headers: new Headers({
                'Authorization': userToken,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                server: publicServer.id
            })
        })
        const json = await response.json();

        let el = document.createElement('div');

        let button = document.createElement('button');

        button.className = "publicServerJoinButton";
        button.id = publicServer.id

        button.innerHTML = json.name;

        button.addEventListener('click', async () => {
            const serverId = button.id;
            
            console.log("Joining server: " + serverId);

            await fetch("http://localhost:9000/api/public/joinServer", {
                method: 'post',
                headers: new Headers({
                    'Authorization': userToken,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    server: serverId
                })
            });

            console.log("Joined server. Refresh the page.");
        });

        el.appendChild(button);

        document.getElementById("explore-servers").appendChild(el);
    });
}

function InsertMessage(message, username, content, avatarlink) {    
    console.log("Loading messsage "+message.id);

    loadedMessagesList.push(message);
    let el = document.createElement('div');
    el.className = "message";
    el.id= message.id;

    
    let messageElement = document.createElement('p');
    let usernameElement = document.createElement('p');
    let useravatarElement = document.createElement('img');
    let useravatarDivElement = document.createElement('div');
    let userHolder = document.createElement('div');
    
    usernameElement.className = "message-username";
    messageElement.className = "message-content";
    useravatarElement.classList = "message-useravatar"
    useravatarDivElement.classList = "message-useravatar-holder"
    userHolder.classList = "message-user-holder"

    usernameElement.innerHTML = username;
    messageElement.innerHTML = content;
    useravatarElement.src = avatarlink;

    useravatarDivElement.appendChild(useravatarElement);

    userHolder.appendChild(useravatarDivElement);
    userHolder.appendChild(usernameElement);

    el.appendChild(userHolder);
    el.appendChild(messageElement);
    document.getElementById("middle").appendChild(el);
}

async function LoadMessages() {
    console.log("Begin Load Messages.");
    console.log(currentSelectedServer);
    console.log(currentSelectedChannel);

    var servinf = await fetch('/api/public/getServerInfo', {
        method: 'post',
        headers: new Headers({
            'Authorization': userToken,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            server: (currentSelectedServer || 0)
        })
    })
    var servjson = await servinf.json();

    servjson.channels.find(x => x.id == (currentSelectedChannel || 0)).messages.forEach(async (message) => {

        // Get Sender Name

        const userinfoResponse = await fetch('/api/public/getUserInfo', {
            method: 'post',
            headers: new Headers({
                'Authorization': userToken,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                user: message.sid
            })
        })
        const json = await userinfoResponse.json();

        const username = json.name;

        InsertMessage(message, username, message.content, json.avatarlink);
        
        await ScrollToBottom();

    });
}

async function HandleSendMessage() {
    msgtyper.addEventListener('keydown', async (ev) => {
        if(ev.key == 'Enter') {
            const message = msgtyper.value;
            console.log("Sending message! "+message);

            msgtyper.value = ""; 

            await fetch("http://localhost:9000/api/public/sendMessage", {
                method: 'post',
                headers: new Headers({
                    'Authorization': userToken,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    server: (currentSelectedServer || 0),
                    channel: (currentSelectedChannel || 0),
                    message: message
                })}
            );

            await Refresh();

            await ScrollToBottom();
        }
    });
}

async function Refresh() {
    await ReloadMessages();
}

async function ReloadMessages() {
    var servinf = await fetch('/api/public/getServerInfo', {
        method: 'post',
        headers: new Headers({
            'Authorization': userToken,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            server: (currentSelectedServer || 0)
        })
    })
    var servjson = await servinf.json();

    console.log("Reloading messages.");

    servjson.channels.find(x => x.id == (currentSelectedChannel || 0)).messages.forEach(async (message) => {
        if(loadedMessagesList.find(x => x.id == message.id) == undefined) {
            console.log("Loading new messsage "+message.id);
            loadedMessagesList.push(message);
            let el = document.createElement('div');
            el.className = "message";
            el.id= message.id;
            let messageElement = document.createElement('p');

            // Get Sender Name

            const userinfoResponse = await fetch('/api/public/getUserInfo', {
                method: 'post',
                headers: new Headers({
                    'Authorization': userToken,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    user: message.sid
                })
            })
            const json = await userinfoResponse.json();

            const username = json.name;

            InsertMessage(message, username, message.content, json.avatarlink);

            await ScrollToBottom();
            
        } else {
            console.log("Message with id "+message.id+"is already loaded.");
        }
    });
}

async function ScrollToBottom() {
    middleel.scrollTop = middleel.scrollHeight;
}

async function HandleWritingPost() {
    msgtyper.addEventListener("keypress", async (ev) => {
        if(ev.key != "Enter") {
            writingCooldown = 5000;
        }
    });

    setInterval(() => {
        writingCooldown -= 500;
        if(writingCooldown <= 0) {
            writingCooldown = 0;
        }
    }, 500);
}

async function main() {
    console.log("Fetching servers with userToken "+ userToken);

    await LoadServersAndChannels();

    await CreateExploreButton();

    await LoadPublicServers();

    await LoadMessages();

    await HandleSendMessage();

    await HandleWritingPost();

    setInterval(Refresh, 100);
}

main();