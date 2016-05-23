 var nodeimu = require('nodeimu');
 var IMU = new nodeimu.IMU();

 var express = require('express');
 var app = express();
 var latestdata = {};
 var counter = 0;
 port = 3000;

 function getData() {
     IMU.getValue(function(err, data) {
         if (err) throw err;
         latestdata = data;
     });
 }
 getData();
 setInterval(getData, 100);



 app.use(express.static("./public"))

 app.all('/heading', function(req, res) {
     counter++;
     res.setHeader("Access-Control-Allow-Origin", "*");
     heading = (latestdata.tiltHeading + Math.PI / 2) * 180 / Math.PI;
     res.send(heading.toFixed(0));
     //res.send(JSON.stringify(latestdata));
 });

 app.all('/all', function(req, res) {
     counter++;
     res.setHeader("Access-Control-Allow-Origin", "*");
     res.send(JSON.stringify(latestdata));
 });
 app.all('/counter', function(req, res) {
     counter++;
     res.setHeader("Access-Control-Allow-Origin", "*");
     res.send(counter.toString());
 });
 app.listen(port, function() {
     console.log('listening on port', port);
 });

 module.exports = app;
