// This file has been autogenerated.

var profile = require('../../../lib/util/profile');

exports.getMockedProfile = function () {
  var newProfile = new profile.Profile();

  newProfile.addSubscription(new profile.Subscription({
    id: 'a0d901ba-9956-4f7d-830c-2d7974c36666',
    name: 'Azure Storage DM Dev',
    user: {
      name: 'user@domain.example',
      type: 'user'
    },
    tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47',
    state: 'Enabled',
    registeredProviders: [],
    _eventsCount: '1',
    isDefault: true
  }, newProfile.environments['AzureCloud']));

  return newProfile;
};

exports.setEnvironment = function() {
  process.env['AZURE_STORAGE_CONNECTION_STRING'] = 'DefaultEndpointsProtocol=https;AccountName=xplat;AccountKey=null';
};

exports.scopes = [[function (nock) { 
var result = 
nock('http://xplat.blob.core.windows.net:443')
  .put('/storage-cli-blob-test/appendblobname1442?comp=snapshot')
  .reply(201, "", { 'transfer-encoding': 'chunked',
  'last-modified': 'Wed, 20 Jul 2016 06:15:00 GMT',
  etag: '"0x8D3B0652E203816"',
  server: 'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id': '780e8973-0001-0026-3b4e-e20db3000000',
  'x-ms-version': '2015-04-05',
  'x-ms-snapshot': '2016-07-20T06:15:13.2418255Z',
  date: 'Wed, 20 Jul 2016 06:15:12 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://xplat.blob.core.windows.net:443')
  .put('/storage-cli-blob-test/appendblobname1442?comp=snapshot')
  .reply(201, "", { 'transfer-encoding': 'chunked',
  'last-modified': 'Wed, 20 Jul 2016 06:15:00 GMT',
  etag: '"0x8D3B0652E203816"',
  server: 'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id': '780e8973-0001-0026-3b4e-e20db3000000',
  'x-ms-version': '2015-04-05',
  'x-ms-snapshot': '2016-07-20T06:15:13.2418255Z',
  date: 'Wed, 20 Jul 2016 06:15:12 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://xplat.blob.core.windows.net:443')
  .put('/storage-cli-blob-test/appendblobname1442?comp=snapshot')
  .reply(201, "", { 'transfer-encoding': 'chunked',
  'last-modified': 'Wed, 20 Jul 2016 06:15:00 GMT',
  etag: '"0x8D3B0652E203816"',
  server: 'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id': '48f187f3-0001-002b-114e-e2e2bf000000',
  'x-ms-version': '2015-04-05',
  'x-ms-snapshot': '2016-07-20T06:15:13.7798558Z',
  date: 'Wed, 20 Jul 2016 06:15:12 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://xplat.blob.core.windows.net:443')
  .put('/storage-cli-blob-test/appendblobname1442?comp=snapshot')
  .reply(201, "", { 'transfer-encoding': 'chunked',
  'last-modified': 'Wed, 20 Jul 2016 06:15:00 GMT',
  etag: '"0x8D3B0652E203816"',
  server: 'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id': '48f187f3-0001-002b-114e-e2e2bf000000',
  'x-ms-version': '2015-04-05',
  'x-ms-snapshot': '2016-07-20T06:15:13.7798558Z',
  date: 'Wed, 20 Jul 2016 06:15:12 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('http://xplat.blob.core.windows.net:443')
  .put('/storage-cli-blob-test/appendblobname1442?comp=snapshot')
  .reply(201, "", { 'transfer-encoding': 'chunked',
  'last-modified': 'Wed, 20 Jul 2016 06:15:00 GMT',
  etag: '"0x8D3B0652E203816"',
  server: 'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id': '976f2849-0001-0015-5d4e-e2549e000000',
  'x-ms-version': '2015-04-05',
  'x-ms-snapshot': '2016-07-20T06:15:14.3738911Z',
  date: 'Wed, 20 Jul 2016 06:15:13 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://xplat.blob.core.windows.net:443')
  .put('/storage-cli-blob-test/appendblobname1442?comp=snapshot')
  .reply(201, "", { 'transfer-encoding': 'chunked',
  'last-modified': 'Wed, 20 Jul 2016 06:15:00 GMT',
  etag: '"0x8D3B0652E203816"',
  server: 'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id': '976f2849-0001-0015-5d4e-e2549e000000',
  'x-ms-version': '2015-04-05',
  'x-ms-snapshot': '2016-07-20T06:15:14.3738911Z',
  date: 'Wed, 20 Jul 2016 06:15:13 GMT',
  connection: 'close' });
 return result; }]];