const gfetch = require('../global').gfetch;
const PublicServerListID = require('../global').PublicServerListID;
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
const uuid = require("uuid").v4;

const ServerListID = 0;

app.get('/api/v1/getServer', async (req, res) => { 
    const serverId = req.query.id;

    res.send(await gfetch(port, "api/core/findListElementById", {
        id: ServerListID,
        eid: serverId
    }))
    
    // return {Name, ImageUrl, Channel[]}
});

app.get('/api/v1/createServer', async (req, res) => {
    const name = req.query.name;
    const ownerId = req.query.owner;
    const serverId = uuid();
    
    const exists = await gfetch(port, 'api/core/elementExists', {
        id: ServerListID,
        eid: serverId
    })

    if(exists == "true") {
        console.log("wAHH! uuid "+serverId+" just equaled!! "+exists)
        res.status(425).send("Please retry again");
        return;
    }

    await gfetch(port, 'api/core/addToList', {
        id: ServerListID,
        eid: serverId,
        content: JSON.stringify({
            name: name,
            imageurl: "http://cat-storage-server.web.app/data/cat2.jpg",
            owner: ownerId,
            channels:[
                {
                    id: textToNumber("General")+"",
                    name: "General",
                    messages: [
                        {
                            id: 0,
                            content: "CatHello", sid: 0
                        }
                    ]
                }
            ]
        })
    })
    res.send({result: serverId});
});

app.get('/api/v1/serverExists', async (req, res) => {
    const serverId = req.query.server;

    res.send(
        {result: await gfetch(port, "api/core/elementExist", {
            id: ServerListID,
            eid: serverId
        })}
    );
});

app.get('/api/v1/getPublicServers', async (req, res) => {
    const response = await gfetch(port, "api/core/getListById", {
        id: PublicServerListID
    });

    const json = JSON.parse(response);

    const resp = json.content;

    console.log("test->"+resp);
    res.send(
        {result: resp}
    );
});