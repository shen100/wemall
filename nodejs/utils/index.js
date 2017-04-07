var config = require('../config');

var EnvUtil = {
    checkPackages: function() {
    	var errors = [];
        var packages;
        if (config.env === 'development') {
            packages = require('../package');
        } else {
            packages = require('../../../package');
        }
        Object.keys(packages.dependencies).forEach(function(p) {
            try {
                require.resolve(p);
            } catch (e) {
                errors.push(e.message);
            }
        });
        if (config.env === 'development') {
            Object.keys(packages.devDependencies).forEach(function(p) {
                try {
                    require.resolve(p);
                } catch (e) {
                    errors.push(e.message);
                }
            });    
        }
        if (!errors.length) {
            return true;
        }
        errors = errors.join('\n  ');
        console.error('\x1B[31mERROR: ' + packages.name + ' is unable to start due to missing dependencies:\x1B[0m\n  ' + errors);
        console.error('\x1B[32m\nPlease run `npm install` and try starting ' + packages.name + ' again.');
        var github = config.docs.github;
        var docStr = '\x1B[32mHelp and documentation can be found at ${github}\x1B[0m\n';
        console.error(docStr);
        return false;
    }
};

module.exports = {
    EnvUtil : EnvUtil
};




