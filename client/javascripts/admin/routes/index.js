export default {
	UserAnalyze: (location, cb) => {
	    require.ensure([], require => {
	        cb(null, require('../containers/UserAnalyze').default);
	    }, 'admin/UserAnalyze');
	},
	OrderAnalyze: (location, cb) => {
	    require.ensure([], require => {
	        cb(null, require('../containers/OrderAnalyze').default);
	    }, 'admin/OrderAnalyze');
	},
	NotFound: (location, cb) => {
	    require.ensure([], require => {
	        cb(null, require('../containers/NotFound').default);
	    }, 'admin/NotFound');
	}
};