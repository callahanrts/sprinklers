var express = require('express');
var app = express();
var sys = require('sys');
var exec = require('child_process').exec;
var schedule = require('node-schedule');

var water = function(cron, pin, duration){
  schedule.scheduleJob(cron, function(){
    exec(__dirname + "/pin.sh " +pin+ " "+duration);
  });
}

var pins = {
  "1": 17,
  "2": 4,
  "3": 3,
  "4": 2
}

for(i = 1; i <= 4; i++){
  exec(__dirname+"/pin_init.sh " + pins[i.toString()], function(){console.log(arguments)});
}

// Spring
wanter("45 17 * * 6", pints["2"], "3m");
water("0 10 * * 0,3", pins["2"], "15m");
water("0 16 * * 0,3", pins["2"], "15m");

water("17 10 * * 0,3", pins["3"], "10m");
water("17 16 * * 0,3", pins["3"], "10m");

water("19 10 * * 0,3", pins["4"], "10m");
water("19 16 * * 0,3", pins["4"], "10m");

// Summer
// water("0 6,8,10,12 * * 0,3", pins["2"], "12m");
// water("0 6,8,10,12 * * 0,3", pins["2"], "12m");
// water("0 6,8,10,12 * * 0,3", pins["2"], "12m");

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
