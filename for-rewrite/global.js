async function wfetch(port, url) {
    console.log("wfetch: "+'http://localhost:'+port+url);

    const response = await fetch('http://localhost:'+port+url);
    const text = await response.text();

    try {
        console.log("wfetch returning JSON: "+JSON.parse(t));
        return JSON.parse(t);
    } catch (error) {
        console.log("wfetch returning TEXT: "+text);
        return text;
    }
}
const authRegex = new RegExp("Cat\.[^\.]+\..{32}.\d+");

function checkAuth(auth) {
    return true;
}

module.exports = {
    wfetch,
    checkAuth
}