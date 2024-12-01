const gfetch = require('../../global').gfetch;
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

const app = require('../../../../index').app;
const port = require('../../../../index').port;

const ServerListID = 0;

const local = 'http://localhost:'+port;

app.get('/api/v1/channelExists', async (req, res) => {
    const serverId = req.query.server;
    const channelId = req.query.channel;

    if(((await fetch(local+'/api/v1/serverExists?server='+serverId)).text()) == false) {
        res.send('Server does not exist!');
        return;
    } else {
        res.send(
            JSON.parse(await((await fetch(local+'/api/v1/getServer?id='+serverId)).text())).channels.some(x => x.id == channelId)
        );
    }
});
app.get('/api/v1/createChannel', async (req, res) => {
    const serverId = req.query.server;
    const name = req.query.name;

    const exists = await gfetch(port, 'api/core/elementExists', {
        id: ServerListID,
        eid: serverId
    })

    if(!exists) {
        res.send('Server does not exist! ');
        console.log("Server with id: "+serverId+" no exist");
        return;
    }

    fetch('http:localhost:'+port+'/api/v1/getServer?id='+serverId).then(value => {
        value.json().then(sdata => {
            console.log(sdata);

            var server_data = sdata;
            var channels = server_data.channels;

            console.log(server_data);
            console.log(channels);

            if(channels.some(x => x.name == name)) {
                res.send("Channel with the same name exists.");
                return;
            }

            const channelId = textToNumber(name)+"";
        
            channels.push({
                id: channelId,
                name: name,
                messages: [
                    {
                        id: 0,
                        content: "CatHello", sid: 0
                    }
                ]
            });

            console.log(channels);

            server_data.channels = channels;
            
            console.log(server_data);

            gfetch(port, 'api/core/setElementInList', {
                id: ServerListID,
                eid: serverId,
                content: JSON.stringify(server_data)
            }).then((e) => {
                res.send({result: channelId});
            });

        });
    });
})
