(function (module, require) {
    'use strict';

    const AWS = require('aws-sdk');
    var dynamoDb = new AWS.DynamoDB.DocumentClient();
    var service = {
        deletePassDevice: deletePassDevice
    };

    function deletePassDevice(event, context) {
        console.log("Entered: unregister");
        var deviceId = event['pathParameters']['deviceLibraryIdentifier'];
        var passId = event['pathParameters']['passTypeIdentifier']+"::"+event['pathParameters']['serialNumber'];
    
        console.log("deviceId="+deviceId);
        console.log("passId="+passId);

        var params = {  
            TableName: 'passes',  
            Key: {
                passId: passId,
                deviceId: deviceId
            } 
          }
        return dynamoDb.delete(params).promise().then(response => 200);
    }
    module.exports = service;
}(module, require));