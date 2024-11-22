function wfetch(port, url) {
    console.log("wfetch: "+'http://localhost:'+port+url);

    var text = undefined;
    fetch('http://localhost:'+port+url).then(response => {
        response.text().then(t => {
            text = t;

            return JSON.parse(t);
        }).catch(err => {
            return text;
        })
    })
}

const authRegex = new RegExp("Cat\.[^\.]+\..{32}.\d+");

function checkAuth(auth) {
    return true;
}

module.exports = () => {
    const app = require('../../index').app;
    const port = require('../../index').port;

    console.log("Api Public Handler Started.");

    require('./message/message')
    require('./server/server')
    require('./user/user')
}    