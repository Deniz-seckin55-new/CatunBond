var redirect_text = document.getElementById('redirect');

var i = 0;

setInterval(() => {
  redirect_text.textContent = 'Redirecting to app' + '.'.repeat(i);
  i++;
  if(i == 4)
    i = 0;
}, 1000);

setTimeout(() => {
  window.location.href = 'http://localhost:9000/app/';
}, 1000);