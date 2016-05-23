var nodeimu = require('nodeimu');
var IMU = new nodeimu.IMU();
var util = require('util');
console.log(util.inspect(IMU, true, null));

var PythonShell = require('python-shell');

PythonShell.run('python/helloworld.py', function(err, results) {
    if (err) throw err;
    PythonShell.run('python/helloworld.py', function(err, results) {
        if (err) throw err;
    });
});

IMU.getValue(function(err, data) {
    if (err) throw err;
    console.log(data);
    heading = (data.tiltHeading + Math.PI / 2) * 180 / Math.PI;
    console.log("heading", heading.toFixed(0));
});
