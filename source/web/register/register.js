const textbox = document.getElementById('email');
const textbox2 = document.getElementById('password');
const textbox3 = document.getElementById('username');

setInterval(() => {
    if(textbox.value.length > 0)
        textbox.style.width = textbox.value.length*2+"vw";
    else
        textbox.style.width = "100%";

        
    if(textbox2.value.length > 0)
        textbox2.style.width = textbox2.value.length*2+"vw";
    else
        textbox2.style.width = "100%";

        
    if(textbox3.value.length > 0)
        textbox3.style.width = textbox3.value.length*2+"vw";
    else
        textbox3.style.width = "100%";
}, 50);

function toggleVisiblity1() {
    var x = document.getElementById("email");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  } 
  function toggleVisiblity2() {
    var x = document.getElementById("password");
    var y = document.getElementById("toggle");
      if (x.type === "password") {
        x.type = "text";
        y.src= "../assets/off.png";
      } else {
        x.type = "password";
        y.src ="../assets/on.png";
      }
    } 
    
function toggleVisiblity3() {
    var x = document.getElementById("username");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  } 