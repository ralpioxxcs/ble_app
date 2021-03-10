var util = require('util');

var bleno = require('@abandonware/bleno');

var BlenoCharacteristic = bleno.Characteristic;
var BlenoDescriptor = bleno.Descriptor;

var SerialNumberCharacteristic = function() {
  SerialNumberCharacteristic.super_.call(this, {
    uuid: '2A19',
    properties: ['read'],
    descriptor: [
      new BlenoDescriptor({
        uuid: '2901',
        value: 'device serial number'
      })
    ]
  });
}

util.inherits(SerialNumberCharacteristic, BlenoCharacteristic);

module.exports = SerialNumberCharacteristic;

