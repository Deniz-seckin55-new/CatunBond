const gfetch = require('../global').gfetch;
const UserListID = require('../global').UserListID;
function textToNumber(text) {
    const asciiStr = encodeURIComponent(text);
    const chars = asciiStr.split("");
  
    const hexChars = chars.map((ch) =>
      ch.codePointAt(0).toString(16).padStart(2, "0")
    );
  
    const hexNumber = hexChars.join("");
    const m = BigInt(`0x${hexNumber}`);
  
    return m;
  }

const app = require('../../../index').app;
const port = require('../../../index').port;
const crypto = require('node:crypto');

app.get('/api/v1/getUserId', async (req, res) => { 
    const userName = req.query.name;
    const userId = textToNumber(req.query.name)+"";

    console.log("User ID Fetching: '"+userName+"'/'"+userId+"'");

    res.send({result: userId});
    
    // return {Name, ImageUrl, ServerId[]}
});

app.get('/api/v1/getUser', async (req, res) => { 
    const userId = req.query.id;

    const action = await gfetch(port, "api/core/findListElementById", {
        id: UserListID,
        eid: userId
    });

    res.send(action);
    
    // return {Name, ImageUrl, ServerId[]}
});

app.get('/api/v1/getUserServer', async (req, res) => { 
    const userId = req.query.id;

    const user = await gfetch(port, "api/core/findListElementById", {
        id: UserListID,
        eid: userId
    });
    
    res.send(user.servers);
    
    // return {Name, ImageUrl, ServerId[]}
});

app.get('/api/v1/openUserToken', async (req, res) => { 
    const userToken = req.query.token;

    const open = atob(userToken);

    console.log("Opening: '"+userToken+"'/'"+open+"'");

    res.send({result: open});
    
    // return {Name, ImageUrl, ServerId[]}
});

app.get('/api/v1/createUser', async (req, res) => {
    const name =  req.query.name;
    const numberName = textToNumber(name)+"";

    const selfToken = crypto.randomBytes(32).toString('hex');
    const customGeneratedUserToken = btoa('Cat.'+name+'.'+selfToken+'.'+Date.now());

    res.send(await gfetch(port, "api/core/addToList", {
        id: UserListID,
        eid: numberName,
        content: JSON.stringify({
            userToken: customGeneratedUserToken,
            userId: numberName,
            name: name,
            imageurl: "http://cat-storage-server.web.app/data/cat1.jpeg",
            servers: [0]
        })
    }));
});

app.get('/api/v1/userServerAdd', async (req, res) => {
    const userId = req.query.user;
    const serverId = req.query.server;

    const user_data = await gfetch(port, 'api/v1/getUser', {
        id: userId
    });

    var user = JSON.parse(user_data);

    user.servers.push(serverId);

    await gfetch(port, 'api/core/setElementInList', {
        id: UserListID,
        eid: userId,
        content: JSON.stringify(user)
    });

    res.send(JSON.stringify({result: true}));
})

app.get('/api/v1/userFriendAdd', async (req, res) => {
    const userId = req.query.user;
    const friendId = req.query.friend;
    
    const user = JSON.parse(await gfetch(port, 'api/v1/getUser', {
        id: userId
    }));

    user.friends.push(friendId);

    await gfetch(port, 'api/core/setElementInList', {
        id: UserListID,
        eid: userId,
        content: JSON.stringify(user)
    });

    res.send(JSON.stringify(user));
});

app.get('/api/v1/userFriendRemove', async (req, res) => {
    const userId = req.query.user;
    const friendId = req.query.friend;
    
    const user = JSON.parse(await gfetch(port, 'api/v1/getUser', {
        id: userId
    }));

    user.friends = user.friends.filter(x => x != friendId);
    

    await gfetch(port, 'api/core/setElementInList', {
        id: UserListID,
        eid: userId,
        content: JSON.stringify(user)
    });

    res.send(JSON.stringify(user));
});