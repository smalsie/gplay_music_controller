var app = require('express')();
var fs = require('fs');
var https = require('https');
var cors = require('cors');
//var http = require('http').Server(app);

app.use(cors({ origin: true, credentials: false }));

var server = https.createServer({
      key: fs.readFileSync('key/key.pem'),
      cert: fs.readFileSync('key/cert.pem'),
      withCredentials: false
  }, app).listen(8001);

var io = require('socket.io')(server);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/socket.io.js', function(req, res){
  res.sendfile('socket.io.js');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('control', function(msg){
      console.log("CONTROL");
      io.emit('command', msg);
  });

});
