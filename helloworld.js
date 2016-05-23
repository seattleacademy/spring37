var PythonShell = require('python-shell');

PythonShell.run('python/helloworld.py', function (err, results) {
  if (err) throw err;
  // results is an array consisting of messages collected during execution
  //console.log('results: %j', results);
});

