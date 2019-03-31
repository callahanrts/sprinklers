// Western Turf Reference: https://westernturf.com/education-sod-2/

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
 */
water("0 10,16 * * 0,3", pins["2"], "15m");
water("17 10,16 * * 0,3", pins["3"], "10m");
water("19 10,16 * * 0,3", pins["4"], "10m");


/* Summer Watering
 *   - June 21 - Aug
 *
 * A well established lawn during the heat of the summer should be watered twice a
 * week at 6:00 a.m., 8:00 a.m., 10:00 a.m., and at noon for no more than 15
 * minutes at a time. If you aren't watering correctly the grass, will start
 * to struggle and become stressed by heat. Typically, people believe the
 * appearance of heat stress is a fungus, and will treat it without knowing for
 * sure what it is. More often than not, simply adjusting watering times and using
 * the correct fertilizer is all the action they need to take.
 * 
 * Here's how to identify heat stress. The blades of grass are 90% water and
 * if there is not enough (or too much) moisture in the soil, the root system will
 * take all of the moisture out of the blade of grass and draw it down into the
 * roots. The grass will turn a brown, steel-blue silver color and then turn
 * completely brown as the areas go dormant. Not to worry: once watered correctly,
 * it will come out of dormancy.
 *
 * < 15 Minutes at 6:00 AM, 8:00 AM, 10:00 AM, and 12:00 PM
 *
 */

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


/* Additional Watering Notes
 *
 * One and Off Watering or Flood Irrigation:
 *
 * Most people assume that watering for long periods of time is beneficial,
 * however the opposite is true. When you water longer then 15 minutes at a
 * time with typical, popup rotary sprinklers, your lawn will indeed be soaking
 * wet, but the root system is not benefiting.  When the lawn is watered for
 * long periods of time and kept moist, the root system does not have to forage
 * for water, promoting a shallow root system. When you water short periods,
 * the root system will be forced to forage for the ground water, creating a
 * mature healthy root system. Again, water in short periods often on your
 * watering days; once at 6:00 a.m., 8:00 a.m., 10:00 a.m., and noon twice a
 * week will keep your lawn lush, vibrant and healthy.
 * 
 * Two things to keep in mind: yellow grass is too much water, grey grass is not
 * enough! In some cases, a fungus may be present. Identifying a fungus is
 * important, so you'll want to take some pictures or bring us down a sample
 * of the lawn.
 */



/* Fertilizing
 *
 * We all desire a lush, green, healthy lawn. Not only is a vibrant lawn nice to
 * look at, it will also resist weeds, insects and other enviromental stresses.
 * Healthy lawns cool the environment, provide a safe place for children and pets
 * to play, reduces noise pollution, and increases your home's value! Lawns should
 * be fertilized starting no later than the 1st of April. It's important to
 * use season appropriate fertilizers that are time released in pellet form so you
 * don't over-fertilize or burn your lawn. Before you fertilize here's a
 * short checklist to ensure the best results. 
 *
 * 1. Check your sprinklers. Start with the "catch can" test. Take 4 to 6
 *    cans or cups anything the same size will work, turn on your sprinkler system
 *    for 15 minutes grab your ruler and measure the amount of water in each can. If
 *    they don't measure equally you need to adjust your sprinklers or replace a
 *    few sprinkler heads.  
 * 2. Check the blades on your mower you want them a sharp as
 *    possible. Dull mower blades "rip" the blades of grass and will result
 *    in a ragged-looking and stressed lawn. It also makes the lawn prone to disease
 *    and fungus. Never mow when the grass is wet.  
 * 3. Water your lawn 2 days before your first mowing. You want the soil moist
 *    but the foliage dry. Before fertilizing, you want to mow the lawn as short as
 *    possible, taking 1/3 of the blade off each time you mow to get it to the
 *    desired height: 2 inches in the spring and 3 to 3 ½ inches during the heat of
 *    the summer. 
 * 4. Fertilize with seasonal-appropriate fertilizer. Use a broadcast-type spreader 
 *    and set according to label instructions. Once the fertilizer is applied, sweep
 *    walkways and patios before you water it in.  
 * 5. Fertilize every 4 to 6 weeks during the growing season, April through November.
 *
 *
 * Spring Fertilizer 
 *   Turf Supreme 16-6-8, broadcast 7.5 pounds per 1,000 square feet.
 *
 * Summer Fertilizer 
 *   During the heat of the summer, your cool season grass will naturally slow
 *   its growth. You want to fertilize with fertilizer very low in nitrogen high in
 *   phosphorus and potassium. Ideal summer fertilizer is 6-24-24.
 *
 * Late Summer Fertilizer 
 *   Should be applied as the temperatures start to cool off. The 16-6-8 or 21-7-14
 *   will reinvigorate your lawn.
 *
 * Winter Fertilizer 
 *   Should be applied November 1st. Winter fertilizer is crucial for a healthy
 *   lawn. Starting in November, the grass will start to go dormant. Now's the time
 *   to mow short, fertilize one more time, and turn everything off. Remember the
 *   top of the grass will go dormant but the root system is always alive and will
 *   grow and repair itself the most during the cooler, colder months. Fertilize
 *   with the 6-24-24, as the low nitrogen will not stimulate top growth and the
 *   high phosphorus and potassium will feed the root system throughout the winter,
 *   resulting in a happy, healthy lawn in the spring.
 *
 */


