

var ds18b20 = require('ds18b20');

var sonde = "";

ds18b20.sensors(function(err, ids) {
  
  if (err) {
      console.error(err);
      return;
  }
  sonde = ids[0];

  console.log("Sondes: ");
  console.log(sonde);

  setInterval(function(){
      ds18b20.temperature(sonde , function(err, value) {

        if (err) {
          console.error(err);
          return;
        }
        ts  = new Date().getTime();
        console.log(ts, value); 
      });
  }, 10000);
});
