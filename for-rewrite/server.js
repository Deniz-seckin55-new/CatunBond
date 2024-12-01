const wfetch = require('../global').wfetch;
const checkAuth = require('../global').checkAuth;

const app = require('../../../index').app;
const port = require('../../../index').port;

app.post('/api/public/getServerInfo', async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
    } else if(!checkAuth(req.headers.authorization)) {
        return res.status(403).json({ error: 'Invalid credentials!', echo: req.headers.authorization});
    }

    const open = atob(req.headers.authorization);

    const userName = open.split('.')[1];
    const result = await wfetch(port, '/api/v1/getUserId?name='+userName);
    const userId = JSON.parse(result).result;

    const serverId = req.body.server;

    console.log(req.body);

    const serverInfoPromise = await fetch("http://localhost:9000/api/v1/getServer?id="+serverId);
    const serverInfo = await serverInfoPromise.json();

    console.log("serverInfo->"+JSON.stringify(serverInfo));

    const send = JSON.stringify({
        name: serverInfo.name,
        channels: serverInfo.channels
    });

    console.log("send->"+send);

    res.send(send);
});

app.post('/api/public/getPublicServerList', async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
    } else if(!checkAuth(req.headers.authorization)) {
        return res.status(403).json({ error: 'Invalid credentials!', echo: req.headers.authorization});
    }

    const open = atob(req.headers.authorization);

    const userName = open.split('.')[1];
    const result = await wfetch(port, '/api/v1/getUserId?name='+userName);
    const userId = JSON.parse(result).result;

    const serverListPromise = await wfetch(port, "/api/v1/getPublicServers");

    const publicServers = JSON.parse(serverListPromise).result;
    res.send(JSON.stringify({
        servers: publicServers
    }));
})