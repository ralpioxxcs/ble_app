var bleno = require('@abandonware/bleno');
//var CustomService = require('./custom-service');
var DeviceInformationService = require('./device-information-service');

var name = 'peripheral-device';
var primaryService = new DeviceInformationService();

/*  Wait until BLE powers on before attemping to advertise
 */
bleno.on('stateChange', function(state) {
  console.log('bleno on -> stateChange : ' + state);

  if (state === 'poweredOn') {
    console.log('start advertising .. (%s, %s)', name, primaryService.uuid);
    bleno.startAdvertising(name, [primaryService.uuid], function(error) {
      if (error) {
        console.log(error);
      }
    });
  } else {
    console.log('stop advertising ..');
    bleno.stopAdvertising();
  }
});


bleno.on('advertisingStart', function(error) {
  console.log(
      'on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

  if (!error) {
    bleno.setServices([primaryService], function(error) {
      console.log('setServices: ' + (error ? 'error ' + error : 'success'));
    });
  }
});
