(function (module, require) {
  'use strict';

  var registerService = require('./register-service');
  var unregisterService = require('./unregister-service');

  module.exports.register = (event, context, callback) => {
    registerService.persistPass(event, context).then(registerSuccessCallback).catch();
  
    function registerSuccessCallback(httpStatusCode) {
      var response = {
        'statusCode': httpStatusCode,
        'headers': { 'Content-Type': 'application/json' },
        "body": null,
        "isBase64Encoded": false
      };
      callback(null, response);
    }
  };
  

  module.exports.unregister = (event, context, callback) => {
    unregisterService.deletePassDevice(event, context).then(unregisterSuccessCallback).catch();
  
    function unregisterSuccessCallback(httpStatusCode) {
      var response = {
        'statusCode': httpStatusCode,
        'headers': { 'Content-Type': 'application/json' },
        "body": null,
        "isBase64Encoded": false
      };
      callback(null, response);
    }
  };


}(module, require));
