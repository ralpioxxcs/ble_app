var util = require('util');

var bleno = require('@abandonware/bleno');

var CustomCharacteristic = require('./custom-characteristic');

function CustomService() {
  bleno.PrimaryService.call(this, {
    uuid: '521fb7d0-bd71-4021-8874-5d02edfcf681',
    characteristic: [
      new CustomCharacteristic()
    ]
  });
}

util.inherits(CustomService, bleno.PrimaryService);

module.exports = CustomService;





