/**
 * This test uses real AWS resources.
 * It needs the lambda function to be deployed
 * 
 * Match the AWS key, secret and region with the deployed values
 */
var test = require('tape');  
var lambdaLocal = require('lambda-local');  
var winston = require('winston');

var lambdasPath = '../';

var dotenv = require('dotenv');
const result = dotenv.config({ path: __dirname + '/.env.test' });

if (result.error) {
    throw result.error
}

function testLocalLambdaRegister(func, event, cb) {  
    var lambdaFunc = require(func);
    var lambdaEvent = event;//require(event);
    winston.level = 'none';
    lambdaLocal.setLogger(winston);
    lambdaLocal.execute({
        event: lambdaEvent,
        lambdaFunc: lambdaFunc,
        lambdaHandler: 'register',
        callbackWaitsForEmptyEventLoop: false,
        timeoutMs: 10000,
        mute: true,
        callback: cb
    });
}

function testLocalLambdaUnregister(func, event, cb) {  
    var lambdaFunc = require(func);
    var lambdaEvent = event;//require(event);
    winston.level = 'none';
    lambdaLocal.setLogger(winston);
    lambdaLocal.execute({
        event: lambdaEvent,
        lambdaFunc: lambdaFunc,
        lambdaHandler: 'unregister',
        callbackWaitsForEmptyEventLoop: false,
        timeoutMs: 10000,
        mute: true,
        callback: cb
    });
}

test('register-test', function (t) {

    var testEvent = require('./event-samples/register.json');
    testLocalLambdaRegister(lambdasPath + 'handler.js', testEvent, 
        function (_err, _data) {
            err = _err;
            json = _data;
            console.log("JSON" + JSON.stringify(json))
            t.equal(json.statusCode, 201, "Status code is 201");
            t.equal(json.body, null, "Response body is null");
            t.end();
        });
});

test('unregister-test', function (t) {

    var testEvent = require('./event-samples/unregister.json');
    testLocalLambdaUnregister(lambdasPath + 'handler.js', testEvent, 
        function (_err, _data) {
            err = _err;
            json = _data;
            console.log("JSON" + JSON.stringify(json))
            t.equal(json.statusCode, 200, "Status code is 200");
            t.equal(json.body, null, "Response body is null");
            t.end();
        });
});