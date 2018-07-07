/**
 * This is a pure unit test, and does not use real AWS services
 * AWS Lambda supports nodejs version 8.10
 * This test uses lambda-tester and will only run on 8.10
 */

var AWSMock = require('aws-sdk-mock');

const LambdaTester = require( 'lambda-tester' );

const registerHandler = require( '../handler.js' ).register;

describe('register test', function() {
    before(function(){
      AWSMock.mock('DynamoDB.DocumentClient', 'put', function (params, callback){ 
        callback(null, "1234");
      });
    });

    //var handler = require('../handler.js');
    var testEvent = require('../integration-test/event-samples/register.json');
    var context = {};
    it( 'test success', function() {
        return LambdaTester( registerHandler )
                .event( testEvent )
                .expectResult();
    });
  
    after(function () {
      AWSMock.restore();
    });
  });