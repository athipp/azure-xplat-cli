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
  .put('/storageclitest?restype=container&comp=lease')
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>LeaseIsBrokenAndCannotBeRenewed</Code><Message>The lease ID matched, but the lease has been broken explicitly and cannot be renewed.\nRequestId:b940a262-0001-001a-1c4d-e2b968000000\nTime:2016-07-20T06:13:53.1722624Z</Message></Error>", { 'content-length': '285',
  'content-type': 'application/xml',
  server: 'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id': 'b940a262-0001-001a-1c4d-e2b968000000',
  'x-ms-version': '2015-04-05',
  date: 'Wed, 20 Jul 2016 06:13:53 GMT',
  connection: 'close' });
 return result; },
function (nock) { 
var result = 
nock('https://xplat.blob.core.windows.net:443')
  .put('/storageclitest?restype=container&comp=lease')
  .reply(409, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>LeaseIsBrokenAndCannotBeRenewed</Code><Message>The lease ID matched, but the lease has been broken explicitly and cannot be renewed.\nRequestId:b940a262-0001-001a-1c4d-e2b968000000\nTime:2016-07-20T06:13:53.1722624Z</Message></Error>", { 'content-length': '285',
  'content-type': 'application/xml',
  server: 'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id': 'b940a262-0001-001a-1c4d-e2b968000000',
  'x-ms-version': '2015-04-05',
  date: 'Wed, 20 Jul 2016 06:13:53 GMT',
  connection: 'close' });
 return result; }]];