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
// water("0 10,16 * * 0,3", pins["2"], "20m");
// water("22 10,16 * * 0,3", pins["3"], "14m");
// water("36 10,16 * * 0,3", pins["4"], "14m");

// Summer
water("0 5,7,9,11 * * 0,3", pins["2"], "24m");
water("25 5,7,9,11 * * 0,3", pins["3"], "17m");
water("43 5,7,9,11 * * 0,3", pins["4"], "17m");

water("30 9 * * 1,2,4,5", pins["3"], "5m");
water("30 9 * * 1,2,4,5", pins["4"], "5m");

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
