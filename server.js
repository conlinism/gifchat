var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require("request");

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
      console.log(msg);
    request.get("http://api.giphy.com/v1/gifs/search?q="+encodeURIComponent(msg[1])+"&api_key=dc6zaTOxFJmzC", function(err, res, data) {
      var parsedData = JSON.parse(data).data;
      io.emit('chat message', [msg[0], parsedData[0].images.fixed_width.url]);
    });
  });
});

http.listen(5000, function(){
  console.log('listening on *:3000');
});
