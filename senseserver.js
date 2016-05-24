
var WebSocketServer = require('ws').Server
  , http = require('http')
  , express = require('express')
  , app = express();
var sensors = {};
sensors.counter = 0;
app.use(express.static(__dirname + '/public'));

var server = http.createServer(app);
server.listen(5000);

var wss = new WebSocketServer({server: server});
wss.on('connection', function(ws) {
  var id = setInterval(function() {
    sensors.counter ++
    ws.send(JSON.stringify(sensors), function() { /* ignore errors */ });
  }, 100);
  console.log('started client interval');
  ws.on('close', function() {
    console.log('stopping client interval');
    clearInterval(id);
  });
});