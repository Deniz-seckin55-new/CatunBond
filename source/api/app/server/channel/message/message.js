const gfetch = require('../../../global').gfetch;
const app = require('../../../../../index').app;
const port = require('../../../../../index').port;
const uuid = require("uuid").v4;

const ServerListID = 0;

const local = 'http://localhost:'+port;

app.get('/api/v1/messageExists', async (req, res) => {
    const serverId = req.query.server;
    const channelId = req.query.channel;
    const messageId = req.query.message;

    const exists = await gfetch(port, 'api/core/elementExists', {
        id: ServerListID,
        eid: serverId
    })

    if(!exists) {
        res.send('Server does not exist!');
        return;
    }

    fetch('http:localhost:'+port+'/api/v1/getServer?id='+serverId).then(value => {
        value.json().then(sdata => {
            var server_data = sdata;
            if(server_data.channels.some(x => x.id == channelId)) {
                    res.send(server_data.channels.find(x => x.id == channelId).messages.some(x => x.id == messageId));
            } else {
                res.send("Channel doesn't exist!");
            }
        });
    });
});

app.get('/api/v1/createMessage', async (req, res) => {
    const serverId = req.query.server;
    const user = req.query.user;
    const channelId = req.query.channel;
    const content = req.query.content;

    const exists = await gfetch(port, 'api/core/elementExists', {
        id: ServerListID,
        eid: serverId
    })

    if(!exists) {
        res.send('Server does not exist!');
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

            if(channels.some(x => x.id == channelId)) {
                var channel0 = channels.find(x => x.id == channelId);
                var messages = channel0.messages;

                const messageId = uuid();

                messages.push({
                    id: messageId,
                    content: content,
                    sid: user
                });

                console.log(server_data);

                gfetch(port, 'api/core/setElementInList', {
                    id: ServerListID,
                    eid: serverId,
                    content: JSON.stringify(server_data)
                }).then((e) => {
                    res.send({result: messageId});
                });

            } else {
                res.send("Channel not found.");
                return;
            }
        });
    });
});

app.get('/api/v1/deleteMessage', async (req, res) => {
    const serverId = req.query.server;
    const channelId = req.query.channel;
    const messageId = req.query.message;

    const msgExist = (await (await fetch(local+'/api/v1/messageExists?server='+serverId+'&channel='+channelId+'&message='+messageId)).text())

    console.log("MSG->"+msgExist);

    if(msgExist) {
        var server_data = JSON.parse(( await (await fetch(local+'/api/v1/getServer?id='+serverId)).text()));
        var messages = server_data.channels.find(x => x.id == channelId).messages;
        messages = messages.filter(x => x.id != messageId);
        server_data.channels.find(x => x.id == channelId).messages = messages;

        await fetch(local+'/api/core/setElementInList?id='+ServerListID+'&eid='+serverId+'&content='+JSON.stringify(server_data));
    } else {
        return false;
    }
});