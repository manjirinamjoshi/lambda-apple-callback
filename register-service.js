(function (module, require) {
    'use strict';

    const AWS = require('aws-sdk');
    var dynamoDb = new AWS.DynamoDB.DocumentClient();
    var service = {
        persistPass: persistPass
    };

    function persistPass(event, context) {
        console.log("Entered: register");
        var deviceId = event['pathParameters']['deviceLibraryIdentifier'];
        var passId = event['pathParameters']['passTypeIdentifier']+"::"+event['pathParameters']['serialNumber'];
        var pushTokenBody = event['body'];
        var pushTokenObj = JSON.parse(pushTokenBody);
    
        console.log("deviceId="+deviceId);
        console.log("passId="+passId);
        console.log("pushTokenBody="+pushTokenBody);
        console.log("pushToken="+pushTokenObj.pushToken);

        var params = {  
            TableName: 'passes',  
            Item: {
                passId: passId,
                deviceId: deviceId,
                pushToken: pushTokenObj.pushToken
            } 
          }
        return dynamoDb.put(params).promise().then(response => 201);
    }
    module.exports = service;
}(module, require));