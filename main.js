var bleno = require('@abandonware/bleno');

console.log('test');

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {
    bleno.startAdvertising('test-ble', ['ec00']);
  } else {
    bleno.stopAdvertising();
  }
});

var Characteristic = bleno.Characteristic;

bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

  if (!error) {
    bleno.setServices([
      new bleno.PrimaryService({
        uuid: 'ec00',
        characteristics: [
          new Characteristic({
            uuid: 'ffff',
            properties : ['notify', 'write'],
            descriptors: [
              new bleno.Descriptor({
                uuid: '2901',
                value: 'test'
              })
            ]
          })
        ]
      })
    ]);
  }
});
