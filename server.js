var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require("request");

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    request.get("http://api.giphy.com/v1/gifs/search?q="+encodeURIComponent(msg[1])+"&api_key=dc6zaTOxFJmzC", function(err, res, data) {
      var parsedData = JSON.parse(data).data;
      io.emit('chat message', [msg[0], parsedData[Math.floor(Math.random() * parsedData.length)].images.fixed_width.url]);
    });
  });
});

http.listen(80, function(){
});
