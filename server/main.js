
var bleno = require('@abandonware/bleno');

//var CustomService = require('./custom-service');
//var DeviceInformationService = require('./device-information-service');
var MessageService = require('./message-service');

var name = 'peripheral-device';
var primaryService = new MessageService();

const getMessage = () => {
  return Buffer.from(JSON.stringify({
    message: 'Hello'
  }, 'utf8'));
};

const CUSTOM_SERVICE_UUID = '0e00bced-2e2a-4ebd-9c2b-3c2a826ca1e8';
const CUSTOM_SERVICE_CHARACTERISTIC_UUID = 'b26f280f-e534-4705-85d2-b85c0fafc911'


const messageCharacteristic = new bleno.Characteristic({
  uuid: CUSTOM_SERVICE_CHARACTERISTIC_UUID,
  properties: ['read', 'notify'],
  descriptors: [
    new bleno.Descriptor({
      uuid: '2901',
      value: 'Message from the device'
    })
  ],
  onReadRequest: (offset, callback) => {
    if (offset) {
      callback(bleno.Characteristic.RESULT_ATTR_NOT_LONG);
    }
    console.log('Read request')
    callback(bleno.Characteristic.RESULT_SUCCESS, getMessage());
  }
});

const msgservice = new bleno.PrimaryService({
  uuid: CUSTOM_SERVICE_UUID,
  characteristics: [messageCharacteristic]
});

/*  Wait until BLE powers on before attemping to advertise
 */
bleno.on('stateChange', function (state) {
  console.log('bleno on -> stateChange : ' + state);

  if (state === 'poweredOn') {
    //console.log('start advertising .. (%s, %s)', name, primaryService.uuid);
    //bleno.startAdvertising(name, [primaryService.uuid], function (error) {
    bleno.startAdvertising(name, [CUSTOM_SERVICE_UUID], function (error) {
      if (error) {
        console.log(error);
      } else {
        bleno.setServices([msgservice], function (error) {
          console.log('setServices: ' + (error ? 'error ' + error : 'success'));
        });
        console.log('Broadcasting');
      }
    });
  } else {
    console.log('stop advertising ..');
    bleno.stopAdvertising();
  }
});

//bleno.on('advertisingStart', function (error) {
//  console.log(
//    'on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

//  if (!error) {
//    bleno.setServices([primaryService], function (error) {
//      console.log('setServices: ' + (error ? 'error ' + error : 'success'));
//    });
//  }
//});
