const wfetch = require('../global').wfetch;
const checkAuth = require('../global').checkAuth;

const app = require('../../../index').app;
const port = require('../../../index').port;

app.post('/api/public/getServers', async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
    } else if(!checkAuth(req.headers.authorization)) {
        return res.status(403).json({ error: 'Invalid credentials!', echo: req.headers.authorization});
    }

    const open = atob(req.headers.authorization);

    const userName = open.split('.')[1];
    const result = await wfetch(port, '/api/v1/getUserId?name='+userName);
    const userId = JSON.parse(result).result;

    const servers = await wfetch(port, "/api/v1/getUserServer?id="+userId);

    res.send(servers);
});

app.post('/api/public/joinServer', async (req, res) => {
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

    const userServers = JSON.parse(await wfetch(port, "/api/v1/getUser?id="+userId)).servers;

    if(userServers.includes(serverId)) {
        res.status(400).send("Server already joined!");
        return;
    }

    await wfetch(port, "/api/v1/userServerAdd?user="+userId+"&server="+serverId);

    res.status(200).send("Server '"+serverId+"' joined");
});

app.post('/api/public/getUserInfo', async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
    } else if(!checkAuth(req.headers.authorization)) {
        return res.status(403).json({ error: 'Invalid credentials!', echo: req.headers.authorization});
    }

    const open = atob(req.headers.authorization);

    const userName = open.split('.')[1];
    const result = await wfetch(port, '/api/v1/getUserId?name='+userName);
    const userId = JSON.parse(result).result;

    const userId2 = req.body.user;

    const userinfoResponse = await wfetch(port, "/api/v1/getUser?id="+userId2);

    const userinfo = JSON.parse(userinfoResponse);

    res.send(JSON.stringify({
        name: userinfo.name,
        avatarlink: userinfo.imageurl
    }));
});