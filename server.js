var http = require('http');
var port = process.env.PORT || 8000;
var fs = require('fs');
var index = fs.readFileSync('./index.html');



var server = http.createServer(handler).listen(port);
console.log("Server is listening at localhost:8000");

var io = require('socket.io')(server);


function handler(req, res) {
  var url = req.url;
  if(url.length === 1){
    fs.readFile(__dirname + '/index.html', function (err, index) {
      if (err) {
        console.log(err);
        res.end();
      }
      else {
        res.writeHead(200,  {"Content-Type": "text/html"});
        res.end(index);
      }
    });

  }
}

io.on('connection', function(socket){
  socket.on('chat message', function(msg) {
    console.log('message: ', msg);
  });
  console.log('user is connected');
  socket.on('disconnect', function(){
    console.log('user is disconnected');
  });
});

// server.listen(port);

module.exports = {
  handler: handler,
}
