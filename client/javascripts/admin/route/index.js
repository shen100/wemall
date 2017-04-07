import React  from 'react';

import {
    Router, 
    Route 
} from 'react-router';

import App    from '../containers/App';
import Index  from '../containers/Index';

const UserAnalyze = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/UserAnalyze').default);
    }, 'admin/UserAnalyze');
};

const OrderAnalyze = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/OrderAnalyze').default);
    }, 'admin/OrderAnalyze');
};

const NotFound = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/NotFound').default);
    }, 'admin/NotFound');
};

export default (history) => {
	return (
		<Router history={history}>
	        <Route path="/admin" component={App}>
	            <Route path="/" component={Index}/>
	            <Route path="/user/analyze" getComponent={UserAnalyze}/>
	            <Route path="/order/analyze" getComponent={OrderAnalyze}/>
	            <Route path="/*" getComponent={NotFound}/>
	        </Route>
	    </Router>
	);
};