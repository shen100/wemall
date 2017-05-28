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
    }, 'admin/userAnalyze');
};

const OrderAnalyze = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/OrderAnalyze').default);
    }, 'admin/orderAnalyze');
};

const ProductAnalyze = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/ProductAnalyze').default);
    }, 'admin/productAnalyze');
};

const ProductManage = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/ProductManage').default);
    }, 'admin/productManage');
};

const EditProduct = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/product/EditProduct').default);
    }, 'admin/product/editProduct');
};

const AddProduct = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/product/EditProduct').default);
    }, 'admin/product/editProduct');
};

const CategoryManage = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/CategoryManage').default);
    }, 'admin/categoryManage');
};

const EditCategory = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/category/EditCategory').default);
    }, 'admin/category/editCategory');
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
                <Route path="/product/edit/:id" getComponent={EditProduct}/>
                <Route path="/product/add" getComponent={AddProduct}/>
                <Route path="/category/manage" getComponent={CategoryManage}/>
                <Route path="/category/edit/:id" getComponent={EditCategory}/>
	        </Route>
            <Route path="/*" getComponent={NotFound}/>
	    </Router>
	);
};