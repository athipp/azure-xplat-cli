// This file has been autogenerated.

var profile = require('../../../lib/util/profile');

exports.getMockedProfile = function () {
  var newProfile = new profile.Profile();

  newProfile.addSubscription(new profile.Subscription({
    id: '2c224e7e-3ef5-431d-a57b-e71f4662e3a6',
    name: 'Node CLI Test',
    user: {
      name: 'user@domain.example',
      type: 'user'
    },
    tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47',
    state: 'Enabled',
    registeredProviders: ['mobileservice'],
    isDefault: true
  }, newProfile.environments['AzureCloud']));

  return newProfile;
};

exports.setEnvironment = function() {
  process.env['AZURE_VM_TEST_LOCATION'] = 'eastus';
};

exports.scopes = [[function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .post('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplatTestGroupCreateAppGw3/providers/Microsoft.Network/applicationGateways/xplatTestAppGw/backendhealth?api-version=2016-09-01')
  .reply(202, "null", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '4',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/eastus/operationResults/ff4e53eb-b2fa-46b9-9a61-18fbc7eeb603?api-version=2016-09-01',
  'retry-after': '10',
  'x-ms-request-id': 'ff4e53eb-b2fa-46b9-9a61-18fbc7eeb603',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-writes': '1197',
  'x-ms-correlation-request-id': '8d84cb74-f83d-499a-b3eb-0f399b7a2ca0',
  'x-ms-routing-request-id': 'WESTEUROPE:20161005T090806Z:8d84cb74-f83d-499a-b3eb-0f399b7a2ca0',
  date: 'Wed, 05 Oct 2016 09:08:05 GMT' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/eastus/operationResults/ff4e53eb-b2fa-46b9-9a61-18fbc7eeb603?api-version=2016-09-01')
  .reply(202, "null", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '4',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/eastus/operationResults/ff4e53eb-b2fa-46b9-9a61-18fbc7eeb603?api-version=2016-09-01',
  'retry-after': '10',
  'x-ms-request-id': 'ff4e53eb-b2fa-46b9-9a61-18fbc7eeb603',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14986',
  'x-ms-correlation-request-id': 'f0cd605f-dddd-4b6d-a02a-c8e5878ed576',
  'x-ms-routing-request-id': 'WESTEUROPE:20161005T090837Z:f0cd605f-dddd-4b6d-a02a-c8e5878ed576',
  date: 'Wed, 05 Oct 2016 09:08:36 GMT' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .get('/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/eastus/operationResults/ff4e53eb-b2fa-46b9-9a61-18fbc7eeb603?api-version=2016-09-01')
  .reply(200, "{\r\n  \"backendAddressPools\": [\r\n    {\r\n      \"backendAddressPool\": {\r\n        \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplatTestGroupCreateAppGw3/providers/Microsoft.Network/applicationGateways/xplatTestAppGw/backendAddressPools/pool01\"\r\n      },\r\n      \"backendHttpSettingsCollection\": [\r\n        {\r\n          \"backendHttpSettings\": {\r\n            \"id\": \"/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/resourceGroups/xplatTestGroupCreateAppGw3/providers/Microsoft.Network/applicationGateways/xplatTestAppGw/backendHttpSettingsCollection/httpSettings01\"\r\n          },\r\n          \"servers\": [\r\n            {\r\n              \"address\": \"1.1.1.1\",\r\n              \"health\": \"Unknown\"\r\n            }\r\n          ]\r\n        }\r\n      ]\r\n    }\r\n  ]\r\n}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '778',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  location: 'https://management.azure.com/subscriptions/2c224e7e-3ef5-431d-a57b-e71f4662e3a6/providers/Microsoft.Network/locations/eastus/operationResults/ff4e53eb-b2fa-46b9-9a61-18fbc7eeb603?api-version=2016-09-01',
  'x-ms-request-id': 'ff4e53eb-b2fa-46b9-9a61-18fbc7eeb603',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  server: 'Microsoft-HTTPAPI/2.0',
  'x-ms-ratelimit-remaining-subscription-reads': '14985',
  'x-ms-correlation-request-id': '137be9e0-3cc6-4b92-9e2b-015a7f02ef0e',
  'x-ms-routing-request-id': 'WESTEUROPE:20161005T090907Z:137be9e0-3cc6-4b92-9e2b-015a7f02ef0e',
  date: 'Wed, 05 Oct 2016 09:09:07 GMT' });
 return result; }]];