var util = require('util');

var bleno = require('@abandonware/bleno');

'521fb7d0-bd71-4021-8874-5d02edfcf681'
var CustomCharacteristic = function() {
  bleno.Characteristic.call(this, {
    uuid: '521fb7d0-bd71-4021-8874-5d02edfcf680',
    properties: ['read', 'write'],
    descriptors: [
      new bleno.Descriptor({
        uuid: '2909',
        value: 'characteristic value'
      })
    ]
  });
}

util.inherits(CustomCharacteristic, bleno.Characteristic);

CustomCharacteristic.prototype.onReadRequest = function() {
  console.log('read req');
}

CustomCharacteristic.prototype.onWriteRequest = function() {
  console.log('write req');
}

module.exports = CustomCharacteristic;
