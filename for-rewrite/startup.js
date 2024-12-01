const gfetch = require('../global').gfetch;
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
const crypto = require('node:crypto');

app.get('/api/v1/startup', async (req, res) => {
    const selfToken = crypto.randomBytes(32).toString('hex');
    const customGeneratedUserToken = btoa('Cat.'+'Cat.'+selfToken+'.'+Date.now());
    const password = "catpass lol";
    const salt = crypto.randomBytes(8).toString('hex');
    const passwordSHA = await hash(password+salt);
    
    fetch("http://localhost:"+port+"/api/core/makeListWithId?id=0"); // Create Server List
    fetch("http://localhost:"+port+"/api/core/makeListWithId?id=1"); // Create User List
    fetch("http://localhost:"+port+"/api/core/makeListWithId?id=2"); // Create Auth List
    fetch("http://localhost:"+port+"/api/core/makeListWithId?id=3"); // Create Public Server List
    fetch('http://localhost:'+port+'/api/core/addToList?id=0&eid=0&content={"name":"CatServer","imageurl":"http://cat-storage-server.web.app/data/cat2.jpg","owner":"0","channels":[{"id":"0","name":"CatChannel","messages":[{"id":"0","content":"CatHello","sid":"0"}]}]}'); // Create Example Server (CatServer)
    fetch('http://localhost:'+port+'/api/core/addToList?id=1&eid=0&content={"userToken":"'+customGeneratedUserToken+'","name":"Cat","imageurl":"http://cat-storage-server.web.app/data/cat1.jpeg","servers":[0],"friends":["1"]}'); // Create Example User (Cat)
    fetch('http://localhost:'+port+'/api/core/addToList?id=2&eid=denixseckin@gmail.com&content={"email":"denixseckin@gmail.com","password":"'+passwordSHA+'","salt":"'+salt+'","userId":"0"}'); // Create Example User (Cat)
    fetch('http://localhost:'+port+'/api/core/addToList?id=3&eid=0&content={"id":"0"}'); // Create Example User (Cat)

    res.send(true);
});