

var ds18b20 = require('ds18b20');
var request = require('request');
var sensorLib = require('node-dht-sensor');

var sonde = "";
var wToken = process.env.WTOKEN;

ds18b20.sensors(function(err, ids) {
  
  if (err) {
      console.error(err);
      return;
  }
  sonde = ids[0];

  console.log("Sondes: ");
  console.log(sonde);
  console.log(wToken);

  setInterval(function(){
      ds18b20.temperature(sonde , function(err, value) {

        if (err) {
          console.error(err);
          return;
        }
        ts  = Date.now();
        console.log('Temp:', ts, value); 

        request({

            url: 'https://e-warp.rcdinfo.fr/api/v0/update',
            headers: {
                'X-Warp10-Token': wToken
            },
            body: ts + "000// temp{uid=" + sonde + "} " + value

        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("sent")
            } else {
                console.log("temp err:");
                console.log(response);
            }
        });

      });
  }, 10000);
});

testHumiditySensor = sensorLib.initialize(11, 17);
console.log("DHT11 detected:", testHumiditySensor);

if( testHumiditySensor ) {
    setInterval(function(){

      ts  = Date.now();
      value = sensorLib.read().humidity.toFixed(2)
      console.log('Humi:', ts, value);

      request({

          url: 'https://e-warp.rcdinfo.fr/api/v0/update',
          headers: {
              'X-Warp10-Token': wToken
          },
          body: ts + "000// hum{uid=" + sonde + "} " + value

      }, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              console.log("sent")
          } else {
              console.log("humi err:");
              console.log(response);
          }
      });
    }, 10000);
}