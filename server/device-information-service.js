var util = require('util');

var bleno = require('@abandonware/bleno');
var BlenoPrimaryService = bleno.PrimaryService;
var SerialNumberCharacteristic = require('./serial-number-characteristic');

function DeviceInformationService() {
  DeviceInformationService.super_.call(this, {
    uuid: '180a',
    characteristic: [
      new SerialNumberCharacteristic()
    ]
  });
}

util.inherits(DeviceInformationService, BlenoPrimaryService);

module.exports = DeviceInformationService;
