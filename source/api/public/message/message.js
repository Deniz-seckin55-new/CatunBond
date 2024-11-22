const wfetch = require('../global').wfetch;
const checkAuth = require('../global').checkAuth;

const app = require('../../../index').app;
const port = require('../../../index').port;

app.post('/api/public/sendMessage', async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
    } else if(!checkAuth(req.headers.authorization)) {
        return res.status(403).json({ error: 'Invalid credentials!', echo: req.headers.authorization});
    }

    const open = atob(req.headers.authorization);

    const userName = open.split('.')[1];
    const userIdR = await (await fetch('http://localhost:'+port+'/api/v1/getUserId?name='+userName)).json();
    const userId = userIdR.result;

    const server = req.body.server;
    const channel = req.body.channel;
    const message = req.body.message;

    const resp = wfetch(port, '/api/v1/createMessage?server='+server+'&user='+userId+'&channel='+channel+'&content='+message);

    console.log("Message->Sending message with sid: "+userId);

    console.log(resp)

    res.send(
        resp
    );
});

app.post('/api/public/removeMessage', async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
    } else if(!checkAuth(req.headers.authorization)) {
        return res.status(403).json({ error: 'Invalid credentials!', echo: req.headers.authorization});
    }

    const open = atob(req.headers.authorization);

    const userName = open.split('.')[1];
    const userId = await (await fetch('http://localhost:'+port+'/api/v1/getUserId?name='+userName)).text();

    console.log("Open: "+open);
    console.log("UserName: "+ userName);
    console.log("UserId: "+ userId);

    const server = req.body.server;
    const channel = req.body.channel;
    const message = req.body.message;

    const resp = wfetch(port, '/api/v1/deleteMessage?server='+server+'&channel='+channel+'&message='+message);

    console.log(resp)

    res.send(
        resp
    );
});