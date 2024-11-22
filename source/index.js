console.log("Running main app...");

const fs = require('fs');
const path = require('path');

const uuid = require("uuid");

const session = require('express-session');
var bodyParser = require('body-parser');

const qdb = require('quick.db');
const db = new qdb.QuickDB();

const cors = require('cors');

const express = require('express');
const app = express();
const port = 9000;

app.use(session({
    secret: 'cat-key',
    resave: false,
    saveUninitialized: true
}));

//app.use(express.static(path.join(__dirname, '')));
app.engine('html', require('ejs').renderFile);
app.use(express.static('web'))
app.use(express.urlencoded({
    extended: true
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:9000',  
    methods: ['GET', 'POST'],        
    allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/app/', (req, res) => {
    console.log('Current session token: '+req.session.userToken);
    res.render(__dirname+"/web/app/app.html",{
        userToken:req.session.userToken
    });
});

app.get('/app/app.js', (req, res) => {
    res.render(__dirname+"/web/app/app.js", {
        userToken: req.session.userToken
    });
})

app.get('/home/', (req, res) => {
    console.log('Rendering: '+__dirname+"\\web\\home\\home.html");
    res.render(__dirname+"\\web\\home\\home.html",{
        userToken:req.session.userToken
    });
});

app.get('/login/', (req, res) => {
    console.log('Rendering: '+__dirname+"\\web\\login\\login.html");
    res.render(__dirname+"\\web\\login\\login.html",{
        userToken:req.session.userToken
    });
});

app.post('/login/login-redirect', async (req, res) => {
    console.log("Verifying user with email: "+req.body.email+" password: "+req.body.password);

    const promise = await fetch('http://localhost:'+port+'/api/v1/verifyUser?email='+req.body.email+'&password='+req.body.password)
    const json = await promise.json();

    console.log("JSON response: "+JSON.stringify(json));

    req.session.userToken = json.result;
    req.session.save();
    console.log('Current session token: '+req.session.userToken);

    res.redirect('/app')
});


app.get('/register/', (req, res) => {
    console.log('Rendering: '+__dirname+"\\web\\register\\register.html");
    res.render(__dirname+"\\web\\register\\register.html",{
        userToken:req.session.userToken
    });
});

app.post('/register/reg-dir', async (req, res) => {
    await fetch('http://localhost:'+port+'/api/v1/makeUser?email='+req.body.email+'&password='+req.body.password+'&name='+req.body.username);
    fetch('http://localhost:'+port+'/api/v1/verifyUser?email='+req.body.email+'&password='+req.body.password).then(val => {
        val.json().then(json => {
            req.session.userToken = json.result;
            req.session.save();
            console.log('Current session token: '+req.session.userToken);
        })
    })
    res.render(__dirname+'/web/register/register-redirect.html',{
        userToken:req.session.userToken
    });
})

app.get('/home/*', (req, res) => {
    res.render("./web/"+req.url,{
        userToken:req.session.userToken
    });
});

app.get('/app/*', (req, res) => {
    res.render("./web/"+req.url,{
        userToken:req.session.userToken
    });
});

app.get('/assets/*', (req, res) => {
    res.render("./web/"+req.url);
});

app.get('/login/*', (req, res) => {
    res.render(`./web/login/${req.url}`);
})

app.get('/register/*', (req, res) => {
    res.render(`./web/register/${req.url}`);
})

app.get('/api/Api.js', (req, res) => {
    res.sendFile(__dirname+"/api/Api.js");
})

app.listen(port, () => {
    console.log("Server running in main app "+__filename +" on port "+ port);
});

module.exports = {app, port, db};

require('./api/core/apicorehandler.js')();
require('./api/app/apiapphandler.js')();
require('./api/public/publicapihandler.js')();