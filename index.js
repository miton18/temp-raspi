

var ds18b20 = require('ds18b20');
var request = require('request');

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

        //Send to warp
        request.post(
            'http://rcdinfo.fr:8100/api/v0/update',
            (ts + "// temp{uid=" + sonde + "} " + value),
            
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log("body:", body)
                } else {
                    console.log("err:");
                    console.log(error);
                }
            }
        );
      });
  }, 10000);
});
