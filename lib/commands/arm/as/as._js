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

/*
* You can test sample commands get loaded by xplat by following steps:
* a. Copy the folder to '<repository root>\lib\commands\arm'
* b. Under <repository root>, run 'node bin/azure config mode arm'
* c. Run 'node bin/azure', you should see 'sample' listed as a command set
* d. Run 'node bin/azure', you should see 'create', "delete", etc 
      showing up in the help text 
*/

'use strict';

var util = require('util');
var progress = require('progress');
var profile = require('../../../util/profile');
var utils = require('../../../util/utils');
var tagUtils = require('../tag/tagUtils');
var analysisServiceUtils = require('./as.utils');

var $ = utils.getLocaleString;

exports.init = function (cli) {
    var log = cli.output;
    
    var analysisServicesCommands = cli.category('as')
    .description($('Commands to manage your Azure Analysis Services objects'));
    var servers = analysisServicesCommands.category('server')
    .description($('Commands to manage your Azure Analysis Services server instances'));
    
    servers.command('create [name] [resource-group] [location] [sku]')
    .description($('Create a new Azure Analysis Services server'))
    .usage('[--name <name> --resource-group <resource-group> --location <location> --sku <sku> [options]]')
    .option('-n, --name <name>', $('the name of the new Azure Analysis Services server'))
    .option('-g, --resource-group <resource-group>', $('the resource group to create the account in'))
    .option('-l, --location <location>', $('the location the Azure Analysis Services server will be created in. Valid values are: North Central US, South Central US, Central US, West Europe, North Europe, West US, East US, East US 2, Japan East, Japan West, Brazil South, Southeast Asia, East Asia, Australia East, Australia Southeast'))
    .option('--sku <sku>', $('the sku of the new Azure Analysis Services server. Valid values are S1, S2, S4, D1'))
    .option('-t, --tags [tags]', $('Tags to set to the the Azure Analysis Services server. Can be mutliple. ' +
            'In the format of \'name=value\'. Name is required and value is optional. For example, -t tag1=value1;tag2'))
    .option('-a, --administrators [administrators]', $('a comma separated string of user/group accounts that have to be made administrators on the new server. E.x. user1@contoso.com,group1@constso.com'))
    .option('-s, --subscription <id>', $('the subscription identifier'))
    .execute(function (name, resourceGroup, location, sku, options, _) {
        
        ///////////////////////
        // Parse arguments.  //
        ///////////////////////
        
        log.verbose('arguments: ' + JSON.stringify({
            name: name,
            options: options
        }));
        
        options.name = options.name || name;
        options.resourceGroup = options.resourceGroup || resourceGroup;
        options.location = location;
        options.sku = sku;
        
        log.info(util.format($('Sku %s.'), sku));
        log.info(util.format($('OptionsSku %s.'), options.sku));
        log.info(util.format($('OptionsSku %s.'), options.administrators));
        
        if (!options.name) {
            return cli.missingArgument('name');
        } else if (!options.resourceGroup) {
            return cli.missingArgument('resource-group');
        } else if (!options.location) {
            return cli.missingArgument('location');
        } else if (!options.sku) {
            return cli.missingArgument('sku');
        }
                
        /////////////////////////
        // Create the server.  //
        /////////////////////////
        var subscription = profile.current.getSubscription(options.subscription);
        var analysisServer = createOrUpdateAnalysisServicesServer(resourceGroup, subscription, name, location, options, true, _);
        analysisServiceUtils.formatOutput(cli, log, options, analysisServer);
    });
    
    servers.command('set [name] [resource-group] [sku]')
    .description($('Set properties of an existing Azure Analysis Services server'))
    .usage('[--name <name> --resource-group <resource-group> --sku <sku> [options]]')
    .option('-n, --name <name>', $('the name of the new Azure Analysis Services server'))
    .option('-g, --resource-group <resource-group>', $('the resource group to create the account in'))
    .option('--sku <sku>', $('the sku of the new Azure Analysis Services server. Valid values are S1, S2, S4, D1'))
    .option('-t, --tags [tags]', $('Tags to set to the the Azure Analysis Services server. Can be mutliple. ' +
            'In the format of \'name=value\'. Name is required and value is optional. For example, -t tag1=value1;tag2'))
    .option('--no-tags', $('remove all existing tags'))
    .option('-a, --administrators [administrators]', $('a comma separated string of user/group accounts that have to be made administrators on the new server. E.x. user1@contoso.com,group1@constso.com'))
    .option('-s, --subscription <id>', $('the subscription identifier'))
    .execute(function (name, resourceGroup, sku, options, _) {
        
        ///////////////////////
        // Parse arguments.  //
        ///////////////////////
        
        log.verbose('arguments: ' + JSON.stringify({
            name: name,
            options: options
        }));
        
        options.name = options.name || name;
        options.resourceGroup = options.resourceGroup || resourceGroup;
        options.sku = options.sku ||  sku;
		options.tags = options.tags || tags;
		options.administrators = options.administrators || administrators;
        
		log.info(util.format($('PARAMS: %s, %s, %s, %s'), name, resourceGroup, options.sku, options.tags, options.administrators ))

        if (!options.name) {
            return cli.missingArgument('name');
        } else if (!options.resourceGroup) {
            return cli.missingArgument('resource-group');
        }
                
        /////////////////////////
        // Create the server.  //
        /////////////////////////
        var subscription = profile.current.getSubscription(options.subscription);
        var analysisServer = createOrUpdateAnalysisServicesServer(resourceGroup, subscription, name, null, options, false, _);
        analysisServiceUtils.formatOutput(cli, log, options, analysisServer);
    });
    
    
    servers.command('list [resource-group]')
    .description($('List all available Analysis Services servers'))
    .usage('[--resource-group <resource-group> ]')
    .option('-g, --resource-group <resource-group>', $('the optional resource group to list the accounts in'))
    .option('-s, --subscription <subscriptionid>', $('the subscription identifier'))
    .execute(function (resourceGroup, options, _) {
        
        ///////////////////////
        // Parse arguments.  //
        ///////////////////////
        
        log.verbose('arguments: ' + JSON.stringify({
            options: options
        }));
        
        options.resourceGroup = options.resourceGroup || resourceGroup;
        
        var subscription = profile.current.getSubscription(options.subscription);
        var servers = listAllAnalysisServicesServers(subscription, resourceGroup, _);
        analysisServiceUtils.formatOutputList(cli, log, options, servers);
    });
    
    servers.command('show [name] [resource-group]')
    .description($('Get an available Analysis Services server'))
    .usage('[--name <name> --resource-group <resource-group> ]')
    .option('-n, --name <name>', $('the Analysis Services server name'))
    .option('-g, --resource-group <resource-group>', $('the optional resource group to list the accounts in'))
    .option('-s, --subscription <subscriptionid>', $('the subscription identifier'))
    .execute(function (name, resourceGroup, options, _) {
        
        ///////////////////////
        // Parse arguments.  //
        ///////////////////////
        
        log.verbose('arguments: ' + JSON.stringify({
            name: name,
            options: options
        }));
        
        options.name = options.name || name;
        options.resourceGroup = options.resourceGroup || resourceGroup;
        
        if (!options.name) {
            return cli.missingArgument('name');
        } else if (!options.resourceGroup) {
            return cli.missingArgument('resource-group');
        }
        
        /////////////////////////
        // Create the client.  //
        /////////////////////////
        var subscription = profile.current.getSubscription(options.subscription);
        var client = utils.createAnalysisServicesManagementClient(subscription);
        
        //////////////////////////
        // Get the server resource //
        //////////////////////////
        var operation = null;
        var progress = cli.interaction.progress(util.format($('Getting Anlysis Services server ')));
        try {
            operation = client.servers.getDetails(resourceGroup, name, _);
        }
        catch (e) {
            if (e.code === 'ResourceNotFound') {
                throw new Error(analysisServiceUtils.showNotFoundError(options.resourceGroup, options.name));
            }
            else {
                throw e;
            }
        } finally {
            progress.end();
        }
        
        ////////////////////////////
        // Get server Properties. //
        ////////////////////////////
        
        var result = operation;
        if (!resourceGroup) {
            var progressRG = cli.interaction.progress(util.format($('Getting Analysis Services server Resource Group ')));
            try {
                result.resourceGroup = resourceUtils.getResourceInformation(result.id).resourceGroup;
            } finally {
                progressRG.end();
            }
        }
        
        analysisServiceUtils.formatOutput(cli, log, options, result);
    });
    
    servers.command('delete [name] [resource-group]')
    .description($('Delete an available Analysis Services server'))
    .usage('[--name <name> --resource-group <resource-group> ]')
    .option('-n, --name <name>', $('the Analysis Services server name'))
    .option('-g, --resource-group <resource-group>', $('the optional resource group to list the accounts in'))
    .option('-s, --subscription <subscriptionid>', $('the subscription identifier'))
    .execute(function (name, resourceGroup, options, _) {
        
        if (!options.quiet && !cli.interaction.confirm(util.format($('Delete Analysis Services server %s? [y/n] '), name), _)) {
            return;
        }
        
        ///////////////////////
        // Parse arguments.  //
        ///////////////////////
        
        log.verbose('arguments: ' + JSON.stringify({
            name: name,
            options: options
        }));
        
        options.name = options.name || name;
        options.resourceGroup = options.resourceGroup || resourceGroup;
        
        if (!options.name) {
            return cli.missingArgument('name');
        } else if (!options.resourceGroup) {
            return cli.missingArgument('resource-group');
        }
        
        /////////////////////////
        // Create the client.  //
        /////////////////////////
        var subscription = profile.current.getSubscription(options.subscription);
        var client = utils.createAnalysisServicesManagementClient(subscription);
        
        //////////////////////////
        // Get the server resource //
        //////////////////////////
        var operation = null;
        var progress = cli.interaction.progress(util.format($('Deleting  Analysis Services server ')));
        try {
            operation = client.servers.deleteMethod(resourceGroup, name, _);
            log.info(util.format($('Successfully deleted the specified Analysis Services server %s.'), name));
        }
        catch (e) {
            if (e.code === 'ResourceNotFound') {
                throw new Error(analysisServiceUtils.showNotFoundError(options.resourceGroup, options.name));
            }
            else {
                throw e;
            }
        } finally {
            progress.end();
        }
    });
    
    servers.command('suspend [name] [resource-group]')
    .description($('Suspend/Pause a Analysis Services server'))
    .usage('[--name <name> --resource-group <resource-group> ]')
    .option('-n, --name <name>', $('the Analysis Services server name'))
    .option('-g, --resource-group <resource-group>', $('the optional resource group to list the accounts in'))
    .option('-s, --subscription <subscriptionid>', $('the subscription identifier'))
    .execute(function (name, resourceGroup, options, _) {
        
        if (!options.quiet && !cli.interaction.confirm(util.format($('Suspend Analysis Services server %s? [y/n] '), name), _)) {
            return;
        }
        
        ///////////////////////
        // Parse arguments.  //
        ///////////////////////
        
        log.verbose('arguments: ' + JSON.stringify({
            name: name,
            options: options
        }));
        
        options.name = options.name || name;
        options.resourceGroup = options.resourceGroup || resourceGroup;
        
        if (!options.name) {
            return cli.missingArgument('name');
        } else if (!options.resourceGroup) {
            return cli.missingArgument('resource-group');
        }
        
        /////////////////////////
        // Create the client.  //
        /////////////////////////
        var subscription = profile.current.getSubscription(options.subscription);
        var client = utils.createAnalysisServicesManagementClient(subscription);
        
        //////////////////////////
        // Get the server resource //
        //////////////////////////
        var operation = null;
        var progress = cli.interaction.progress(util.format($('Suspending Analysis Services server ')));
        try {
            result = client.servers.suspend(resourceGroup, name, _);
            log.info(util.format($('Successfully suspended the specified Analysis Services server %s.'), name));
        }
        catch (e) {
            if (e.code === 'ResourceNotFound') {
                throw new Error(analysisServiceUtils.showNotFoundError(options.resourceGroup, options.name));
            }
            else {
                throw e;
            }
        } finally {
            progress.end();
        }
    });
    
    servers.command('resume [name] [resource-group]')
    .description($('Resume a Analysis Services server'))
    .usage('[--name <name> --resource-group <resource-group> ]')
    .option('-n, --name <name>', $('the Analysis Services server name'))
    .option('-g, --resource-group <resource-group>', $('the optional resource group to list the accounts in'))
    .option('-s, --subscription <subscriptionid>', $('the subscription identifier'))
    .execute(function (name, resourceGroup, options, _) {
        
        if (!options.quiet && !cli.interaction.confirm(util.format($('Resume Analysis Services server %s? [y/n] '), name), _)) {
            return;
        }
        
        ///////////////////////
        // Parse arguments.  //
        ///////////////////////
        
        log.verbose('arguments: ' + JSON.stringify({
            name: name,
            options: options
        }));
        
        options.name = options.name || name;
        options.resourceGroup = options.resourceGroup || resourceGroup;
        
        if (!options.name) {
            return cli.missingArgument('name');
        } else if (!options.resourceGroup) {
            return cli.missingArgument('resource-group');
        }
        
        /////////////////////////
        // Create the client.  //
        /////////////////////////
        var subscription = profile.current.getSubscription(options.subscription);
        var client = utils.createAnalysisServicesManagementClient(subscription);
        
        //////////////////////////
        // Get the server resource //
        //////////////////////////
        var operation = null;
        var progress = cli.interaction.progress(util.format($('Resuming Analysis Services server ')));
        try {
            result = client.servers.suspend(resourceGroup, name, _);
            log.info(util.format($('Successfully resumed the specified Analysis Services server %s.'), name));
        }
        catch (e) {
            if (e.code === 'ResourceNotFound') {
                throw new Error(analysisServiceUtils.showNotFoundError(options.resourceGroup, options.name));
            }
            else {
                throw e;
            }
        } finally {
            progress.end();
        }
    });

    function createOrUpdateAnalysisServicesServer(resourceGroup, subscription, name, location, options, create, _) {
        if (!name) {
            return cli.missingArgument('name');
        } else if (!resourceGroup) {
            return cli.missingArgument('resourceGroup');
        }

		log.info(util.format($('Optional params %s %s %s %s.'), options.sku, options.tags, options.no-tags, options.administrators));

        var client = utils.createAnalysisServicesManagementClient(subscription);       
        var serverAdministrators = analysisServiceUtils.parseServerAdministrators(cli, log, options.administrators);
        var resourceSku = analysisServiceUtils.getResourceSkuFromName(cli, log, util.format($('%s'), options.sku));

        if (create) {
			var tags = {};
			tags = tagUtils.buildTagsParameter(tags, options);

            // server object to create
            var serverToCreate = {
                sku: resourceSku,
                tags: tags,
                name: name,
                location: location,
                properties: {
                    asAdministrators: serverAdministrators
                }
            };
            
            var progress = cli.interaction.progress(util.format($('Creating Analysis Services server %s'), name));
            try {
                client.servers.create(resourceGroup, serverToCreate.name, serverToCreate, _);
            } finally {
                progress.end();
            }
        }
        else {
			var existingServer = client.servers.getDetails(resourceGroup, name, _);
			log.info(util.format($('Found server %s. Updating...'), existingServer.name));

			var tags = {};
			if(!options.tags && !options.no-tags) {
				tags = dataLakeAnalyticsAccount.tags;
			}
			else {
				tags = tagUtils.buildTagsParameter(tags, options);
			}

            var serverUpdateParameters = {
                sku: existingServer.sku,
                tags: tags,
                asAdministrators: serverAdministrators
            }
            
            client.servers.update(resourceGroup, existingServer.name, serverUpdateParameters, _);
        }
        
        return client.servers.getDetails(resourceGroup, name, _);
    }
    
    function listAllAnalysisServicesServers(subscription, resourceGroup, _) {
        var client = utils.createAnalysisServicesManagementClient(subscription);
        var response;
        if (!resourceGroup) {
            response = client.servers.list(_);
        }
        else {
            response = client.servers.listByResourceGroup(resourceGroup, _);
        }
        
        return response;
    }
    
    function getResrouceGroupByServerName(subscription, resourceGroup, name, _) {
        var servers = listAllAnalysisServicesServers(subscription, resourceGroup, _);
        for (var i = 0; i < servers.length; i++) {
            if (servers[i].name === name) {
                var serverId = servers[i].id;
                var rgStart = serverId.indexOf('resourceGroups/') + ('resourceGroups/'.length);
                var rgEnd = serverId.indexOf('/providers/');
                return serverId.substring(rgStart, rgEnd);
            }
        }
        
        throw new Error($('Could not find server: ' + name + ' in any resource group in subscription: ' + subscription.name + ' with id: ' + subscription.id));
    }
    
    function displayAnalysisServer(row, server) {
        row.cell($('Name'), server.Name);
        row.cell($('Sku'), server.sku.tier);
        var serverDetails = analysisServiceUtils.getServerDetails(server);
        row.cell($('Properties'), serverDetails.properties);
    }

};

// required functions for reading data
var readStreamToBuffer = function (strm, callback) {
    var bufs = [];
    strm.on('data', function (d) {
        bufs.push(d);
    });
    strm.on('end', function () {
        callback(null, Buffer.concat(bufs));
    });
};
