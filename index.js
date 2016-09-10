

var ds18b20 = require('ds18b20');

ds18b20.sensors(function(err, ids) {
  
  if (err) {
      console.error(err);
      return;
  }

  console.log(ids);

  ids.forEach(function(id) {
      ds18b20.temperature(id , function(err, value) {

        if (err) {
          console.error(err);
          return;
        }
        console.log(value);
      });
  })
});
