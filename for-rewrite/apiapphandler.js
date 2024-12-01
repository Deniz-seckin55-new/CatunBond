/*
Users
    UserId
    UserToken
    Name
    ImageUrl
    ServerId[]
Servers
    ServerId
    Name
    ImageUrl
    Channel[]
        ChannelId
        Name
        Message[]
            MessageId
            Content
            SenderId
    UserId[]
*/

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
  function numberToText(m) {
    let hexNumber = m.toString(16);
  
    if (hexNumber.length % 2 === 1) {
      hexNumber = "0" + hexNumber;
    }
  
    const hexChars = hexNumber.match(/\w{2}/g);
  
    const chars = hexChars.map((hex) =>
      String.fromCodePoint(parseInt(hex, 16))
    );
  
    const asciiStr = chars.join("");
    const text = decodeURIComponent(asciiStr);
  
    return text;
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
function isJSON() {
    try {
        JSON.parse(data);
        return true;
    } catch (error) {
        return false;
    }
}
function gfetch(port, surl, params) {
    var url = new URL('http://localhost:'+port+'/'+surl);

    url.search = new URLSearchParams(params).toString();

    console.log("Fetching: '"+url+"'");
    
    var v = null;

    fetch(url).then(val => {
        val.text().then(value => {
            v = value;
            return JSON.parse(JSON.parse(v).content);
        }).catch(err => {
            return v;
        })
    })
}
module.exports = () => {
const app = require('../../index').app;
const port = require('../../index').port;
const uuid = require("uuid").v4;
const crypto = require('node:crypto');

const ServerListID = 0;
const UserListID = 1;
const AuthListID = 2;

const local = 'http://localhost:'+port;

require('./auth/auth');
require('./main/startup');
require('./server/server');
require('./server/channel/channel');
require('./server/channel/message/message');
require('./user/user');

console.log("Api App Handler V1 Started.");}