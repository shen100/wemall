export default {
	UserAnalyze: (location, cb) => {
	    require.ensure([], require => {
	        cb(null, require('../containers/UserAnalyze').default)
	    }, 'admin/UserAnalyze');
	},
	NotFound: (location, cb) => {
	    require.ensure([], require => {
	        cb(null, require('../containers/NotFound').default)
	    }, 'admin/NotFound');
	}
}