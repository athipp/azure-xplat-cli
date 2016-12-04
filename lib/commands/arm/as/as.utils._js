/**
* Copyright (c) Microsoft.  All rights reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

var __ = require('underscore');
var util = require('util');
var url = require('url');
var utils = require('../../../util/utils');
var SKU_TYPE = ['S1', 'S2', 'S4', 'D1'];
var LIST_SEPARATOR = ',';

var $ = utils.getLocaleString;

exports.getServerDetails = function (sample) {
  return 'extract out some sample details';
}

exports.parseEnumArgument = function(argName, argValue, validValues, _default) {
  if (__.isUndefined(argValue)) {
    return _default;
  }
  var index = validValues.indexOf(argValue);
  if (index < 0) {
    throw new Error(util.format($('Argument %s has an invalid value: %s. Expected one of [%s].'), argName, argValue, validValues.join(', ')));
  }
  return validValues[index];
};

exports.parseServerAdministrators = function (cli, log, asadministrators){
    var administrators = {
        members : asadministrators.split(LIST_SEPARATOR)
    };
    cli.interaction.formatOutput(asadministrators, function (data) {
        log.data($('administrators         :'), administrators);
    })
    
    return administrators;
}

exports.getResourceSkuFromName = function(cli, log, skuName){

    var skuTier;
    // change this.
    if (skuName == 'D1') {
        skuTier = "Development"
    } else if (skuName == 'S1' || skuName == 'S2' || skuName == 'S4') {
        skuTier = "Standard"
    } else {
        throw new Error(util.format($('Invalid Sku name: [%s]'), skuName));
    }
    
    log.info('Server sku tier: %s', skuTier);
    var resourceSku = {
        name: skuName,
        tier: skuTier
    };

    return resourceSku
}

exports.showObject = function(log, object, indentationTabs) {
  var tabs = __.isNumber(indentationTabs) ? indentationTabs : 0;
  var spaces = _padSpaces(tabs);
  var recursiveCaller = function (element) { 
    // puts dividers between each element in an array to make visualization much easier.
    exports.showObject(log, element, tabs + 1); 
    log.data(spaces + '  ------------------------------------------------------------------------------------');
  };
  
  // Test if the object to log is just a string. If so, simply log it at the current level
  // This works around the situation where a string object ends up being indexed one letter at a time
  if(__.isString(object)) {
    log.data(spaces + object);
  }
  else {
    for (var propertyName in object) {
      if (__.isNull(object[propertyName]) || __.isUndefined(object[propertyName])) {
        log.data(spaces + propertyName + ':');
      } else if (__.isArray(object[propertyName])) {
        log.data(spaces + propertyName + ':');
        __.each(object[propertyName], recursiveCaller);
      } else if (!__.isFunction(object[propertyName])) { // Do not recurse if the object[propertyName] is a function
        if (object[propertyName].toISOString !== undefined) { // Special case for TimeGrain objects returned by server
          log.data(spaces + propertyName + ': ' + object[propertyName].toISOString());
        } else if (__.isObject(object[propertyName])) {
          log.data(spaces + propertyName + ':');
          exports.showObject(log, object[propertyName], tabs + 1);
        } else {
          log.data(spaces + propertyName + ': ' + object[propertyName]);
        }
      }
    }
  }
};

exports.formatOutputList = function (cli, log, options, values) {
  log.silly(values !== undefined ? 'values is NOT undefined' : 'values is undefined');
  if (options.json) {
    cli.output.json(values);
  } else {
    var elementDisplayer = function(element) {
      exports.showObject(log, element);
      log.data('------------------------------------------------------------------------------------');
    };
    __.each(values, elementDisplayer);
  }
};

exports.formatOutput = function (cli, log, options, value) {
  log.silly(value !== undefined ? 'value is NOT undefined' : 'value is undefined');
    if (options.json) {
        cli.output.json(value);
    } else {
        //exports.showObject(log, value);
        cli.interaction.formatOutput(value, function (data) {
            if (!data) {
                log.info($('No Analysis Services server information available'));
            } else {
                log.data($('Server Name         :'), value.name);
                log.data($('Location           :'), value.location);
                log.data($('Provisioning State :'), value.provisioningState);
                log.data($('Sku                :'), value.sku.name);
                log.data($('Tier               :'), value.sku.tier);
                log.data($('ServerFullName     :'), value.serverFullName);
                if (value.asAdministrators) {
                    log.data($('Administrators     :'), value.asAdministrators.members);
                }
                if (value.tags) {
                    log.data($('Tags               :'), value.tags);
                }
                log.data($('Resource Type     :'), value.type);
                log.data('');
            }
        });
        log.info('Redis Cache Details');
    }
};

function _padSpaces(tabs) {
  if (tabs > 0) {
    return '  ' + _padSpaces(tabs - 1);
  }

  return '';
}
