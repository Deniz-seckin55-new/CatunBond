const gfetch = require('../global').gfetch;
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
  async function hash(string) {
    const utf8 = new TextEncoder().encode(string);
    const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  }

const app = require('../../../index').app;
const port = require('../../../index').port;
const { name } = require('ejs');
const crypto = require('node:crypto');

const UserListID = 1;
const AuthListID = 2;

app.get('/api/v1/getUserAuth', async (req, res) => { 
    const userId = req.query.id;

    res.send(await gfetch(port, "api/core/findListElementById", {
        id: AuthListID,
        eid: userId
    }));
    
    // return {Name, ImageUrl, ServerId[]}
});


app.get('/api/v1/verifyUser', async (req, res) => { 
    const email = req.query.email;
    const password = req.query.password;

    const content = await gfetch(port, "api/core/findListElementById", {
        id: AuthListID,
        eid: email
    });

    const salt = content.salt;
    const passwordSHA = content.password;
    const passwordSHA2 = await hash(password+salt);

    if(passwordSHA === passwordSHA2) {
        const user = await gfetch(port, "api/v1/getUser", {id: content.userId});
        const userToken = JSON.parse(user).userToken;

        res.send({result: userToken});
    } else {
        res.send({result: false});
    }
    
    // return {Name, ImageUrl, ServerId[]}
});

app.get('/api/v1/registerUser', async (req, res) => {
    const email = req.query.email;
    const password = req.query.password;
    const userName = req.query.name;

    const salt = crypto.randomBytes(8).toString('hex');
    const passwordSHA = await hash(password+salt);

    res.send(gfetch(port, "api/core/addToList", {
        id: AuthListID,
        eid: email,
        content: JSON.stringify({
            email: email,
            password: passwordSHA,
            salt: salt,
            userId: textToNumber(userName)+""
        })
    }))
});

app.get('/api/v1/makeUser', async (req, res) => {
    const email = req.query.email;
    const password = req.query.password;
    const userName = req.query.name;

    await gfetch(port, "api/v1/registerUser", {
        email: email,
        password: password,
        name: userName
    });

    await gfetch(port, "api/v1/createUser", {name: userName});

    res.sendStatus(200);
});