var socket = io();

document.getElementById('form').addEventListener('submit', function(){
  socket.emit('chat message', document.getElementById('m').value);
  document.getElementById('m').innerHTML = '';
  return false;
});
