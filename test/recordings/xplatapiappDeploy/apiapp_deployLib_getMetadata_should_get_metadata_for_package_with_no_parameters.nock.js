// This file has been autogenerated.

var profile = require('../../../lib/util/profile');

exports.getMockedProfile = function () {
  var newProfile = new profile.Profile();

  newProfile.addSubscription(new profile.Subscription({
    id: '2804ae14-b835-4630-ac14-44f01a5a8c28',
    name: 'Windows Azure MSDN - Visual Studio Ultimate',
    user: {
      name: 'user@domain.example',
      type: 'user'
    },
    tenantId: '4b1066c2-4cbb-4eda-800a-78581bcb602b',
    registeredProviders: ['website'],
    isDefault: true
  }, newProfile.environments['AzureCloud']));

  return newProfile;
};

exports.setEnvironment = function() {
  process.env['AZURE_APIAPP_TEST_LOCATION'] = 'westus';
};

exports.scopes = [[function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .filteringRequestBody(function (path) { return '*';})
.put('/subscriptions/2804ae14-b835-4630-ac14-44f01a5a8c28/resourcegroups/xplatapiappDeploy8005?api-version=2014-04-01-preview', '*')
  .reply(201, "{\"id\":\"/subscriptions/2804ae14-b835-4630-ac14-44f01a5a8c28/resourceGroups/xplatapiappDeploy8005\",\"name\":\"xplatapiappDeploy8005\",\"location\":\"westus\",\"properties\":{\"provisioningState\":\"Succeeded\"}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '195',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-ratelimit-remaining-subscription-writes': '1184',
  'x-ms-request-id': 'c22439a6-f947-4556-8220-80abc58736c6',
  'x-ms-correlation-request-id': 'c22439a6-f947-4556-8220-80abc58736c6',
  'x-ms-routing-request-id': 'WESTUS:20150620T013611Z:c22439a6-f947-4556-8220-80abc58736c6',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Sat, 20 Jun 2015 01:36:10 GMT' });
 return result; },
function (nock) { 
var result = 
nock('https://management.azure.com:443')
  .post('/subscriptions/2804ae14-b835-4630-ac14-44f01a5a8c28/providers/Microsoft.AppService/deploymenttemplates/Microsoft.Azure.AppService.ApiApps.TestBench/listmetadata?api-version=2015-03-01-preview')
  .reply(200, "{\"value\":{\"microserviceId\":\"Microsoft.Azure.AppService.ApiApps.TestBench\",\"displayName\":\"Test Bench\",\"appSettings\":[],\"dependsOn\":[]}}", { 'cache-control': 'no-cache',
  pragma: 'no-cache',
  'content-length': '134',
  'content-type': 'application/json; charset=utf-8',
  expires: '-1',
  'x-ms-request-id': '0c637855-3129-4b02-90a9-27b5b79c7e2b',
  'x-rp-requesturi': 'https://apiapp-rp-prod-all.msp.windows.net/routingtypes/proxyonly/subscriptions/2804ae14-b835-4630-ac14-44f01a5a8c28/providers/Microsoft.AppService/deploymenttemplates/Microsoft.Azure.AppService.ApiApps.TestBench/listmetadata?api-version=2015-03-01-preview',
  server: 'Microsoft-IIS/8.0',
  'x-aspnet-version': '4.0.30319',
  'x-powered-by': 'ASP.NET',
  'x-ms-ratelimit-remaining-subscription-reads': '14860',
  'x-ms-correlation-request-id': '9ded3d0f-5647-4e76-a4db-9befba44d56a',
  'x-ms-routing-request-id': 'WESTUS:20150620T013611Z:9ded3d0f-5647-4e76-a4db-9befba44d56a',
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  date: 'Sat, 20 Jun 2015 01:36:11 GMT' });
 return result; }]];
 exports.randomTestIdsGenerated = function() { return ['xplatapiappDeploy8005'];};