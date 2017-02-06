'use strict';

let config = require('../config/global_config');

module.exports = {
	name        : config.system.name,
    version     : config.system.version,
    latestVer   : config.system.latestVer,
	officialUrl : config.system.officialUrl,
};