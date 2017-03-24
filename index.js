var express = require('express');
var app = express();
var sys = require('sys');
var exec = require('child_process').exec;
var schedule = require('node-schedule');

var water = function(cron, pin, duration){
  schedule.scheduleJob(cron, function(){
    exec(__dirname + "pin.sh " +pin+ " "+duration);
  });
}

var pins = {
  // "1": 2,
  // "2": 3,
  // "3": 4,
  // "4": 17
  "1": 17,
  "2": 4,
  "3": 3,
  "4": 2
}

for(i = 1; i <= 4; i++){
  exec(__dirname+"/pin_init.sh " + pins[i.toString()], function(){console.log(arguments)});
}

// water("0,20,40 * * * * *", pins["1"], "2s");
// water("5,25,45 * * * * *", pins["2"], "2s");
// water("10,30,50 * * * * *", pins["3"], "2s");
// water("15,35,50 * * * * *", pins["4"], "2s");


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/on', function(req, res){
  var pin = pins[req.query.zone] + " ";
  var duration = req.query.duration +"m"
  console.log(__dirname+"/pin.sh " + pin + duration);
  exec(__dirname+"/pin.sh " + pin + duration, function(){console.log(arguments)});

  res.json({ status: 'ok' });
});

app.listen(3000, function(){
  console.log('listening on port 3000');
  console.log("Pin Script: "+ __dirname+"/pin.sh");
});

