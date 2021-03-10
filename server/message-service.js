var util = require('util');

var bleno = require('@abandonware/bleno');
var BlenoPrimaryService = bleno.PrimaryService;
//var SerialNumberCharacteristic = require('./serial-number-characteristic');

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

function MessageService() {
    MessageService.super_.call(this, {
      uuid: CUSTOM_SERVICE_UUID,
      characteristic: [messageCharacteristic]
    });
  }

util.inherits(MessageService, BlenoPrimaryService);

module.exports = MessageService;
