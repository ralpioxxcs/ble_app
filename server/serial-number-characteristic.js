var util = require('util');

var bleno = require('@abandonware/bleno');

var BlenoCharacteristic = bleno.Characteristic;
var BlenoDescriptor = bleno.Descriptor;

function SerialNumberCharacteristic() {
  SerialNumberCharacteristic.super_.call(this, {
    uuid: '2a25',
    properties: ['read'],
    value: new Buffer(),
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

