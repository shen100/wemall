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

const ProductAnalyze = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/ProductAnalyze').default);
    }, 'admin/ProductAnalyze');
};

const ProductManage = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/ProductManage').default);
    }, 'admin/ProductManage');
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
                <Route path="/product/analyze" getComponent={ProductAnalyze}/>
                <Route path="/product/manage" getComponent={ProductManage}/>
	        </Route>
            <Route path="/*" getComponent={NotFound}/>
	    </Router>
	);
};