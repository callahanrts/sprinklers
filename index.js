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

// CRON REFERENCE
// https://crontab.guru
//
// *    *    *    *    *    *
// |    |    |    |    |    |
// |    |    |    |    |    - day of week (0 - 7) (0 or 7 is Sun)
// |    |    |    |    - month (1 - 12)
// |    |    |    - day of month (1 - 31)
// |    |    - hour (0 - 23)
// |    - minute (0 - 59)
// - second (0 - 59, OPTIONAL)



/*
 * Spring/Fall Watering 
 *   - April 1 - June 21
 *   - April Sept 1 - November ish
 *
 * Watering times should be adjusted for each season. Our lawns in northern Nevada
 * don't necessarily require a lot of water, but the water times and the
 * minutes we water are important. We over water because we falsely think that our
 * lawns need a ton of moisture to keep them healthy and lush, or we're just not
 * taught otherwise. In fact, the opposite is true: short duration watering twice
 * a week is usually sufficient. In the spring and fall, when the temperatures are
 * cool, maintaining a green lush lawn is very low maintenance. On your watering
 * days, water once late in the morning and once late in the afternoon, 10 minutes
 * at a time. If runoff occurs at 10 minutes, cut it back to 7 minutes. When you
 * water for short periods at a time, the ground is able to absorb the moisture
 * right away and doesn't run off, evaporate or blow away. Anytime you have
 * pools of water, or run off occurs, you're watering too much. Very
 * shady areas will require minimal water during early spring and late fall. In
 * the spring and fall, we advise you water your lawn at 10:00 a.m. and 4:00 p.m.
 *
 * 10 Minutes at 10:00 AM and 4:00 PM
 *
 * */

/*
 * Spring
 * Mon/Wed (0,3)
 *.
water("0 10 * * 0,3", pins["2"], "15m");
water("17 10 * * 0,3", pins["3"], "10m");
water("19 10 * * 0,3", pins["4"], "10m");
// water("0 16 * * 0,3", pins["2"], "15m");
// water("17 16 * * 0,3", pins["3"], "10m");
// water("19 16 * * 0,3", pins["4"], "10m");







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







/* OLD (non-western turf advised) watering schedule */
/* 
 * Summer Time
 * Mon/Wed/Fri (0,3,5) 0.5" each day
 */
// water("0  6 * * 0,3,5", pins["2"], "23m");
// water("25 6 * * 0,3,5", pins["3"], "33m");
// water("0  7 * * 0,3,5", pins["4"], "33m");
// water("35 7 * * 0,3,5", pins["2"], "23m");


/* 
 * Fall/Spring Time
 * Mon/Wed (0, 3) 0.5" each day
 */
// water( "0 6 * * 0,3", pins["2"], "20m");
// water("25 6 * * 0,3", pins["3"], "30m");
// water( "0 7 * * 0,3", pins["4"], "30m");
// water("35 7 * * 0,3", pins["2"], "20m");

