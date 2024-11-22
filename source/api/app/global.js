const ServerListID = 0;
const UserListID = 1;
const AuthListID = 2;
const PublicServerListID = 3;
async function gfetch(port, surl, params) {
    var url = new URL('http://localhost:'+port+'/'+surl);

    url.search = new URLSearchParams(params).toString();

    console.log("Fetching: '"+url+"'");
    
    const value = await fetch(url);
    const text = await value.text();

    try {

        console.log("Returning JSON: "+JSON.stringify(JSON.parse(text).content));
        return JSON.parse(JSON.parse(text).content);
    } catch (error) {
        console.log("Returning TEXT: "+text);
        return text;
    }
}

module.exports = {
    gfetch,
    ServerListID,
    UserListID,
    AuthListID,
    PublicServerListID
}