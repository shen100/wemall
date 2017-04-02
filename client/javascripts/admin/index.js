import 'babel-polyfill';

import React    from 'react';
import ReactDOM from 'react-dom';

import {
    createStore, 
    combineReducers,
    applyMiddleware
} from 'redux';

import { Provider }    from 'react-redux';
import thunkMiddleware from 'redux-thunk'

import {
    Router, 
    Route, 
    IndexRoute,
    hashHistory 
} from 'react-router';

import {
    syncHistoryWithStore, 
    routerReducer 
} from 'react-router-redux';
 
import reducers     from './reducers';
import routes       from './routes';
import App          from './containers/App';
import Index        from './containers/Index';
import OrderAnalyze from './containers/OrderAnalyze';

const store = createStore(
    combineReducers({
        ...reducers,
        routing: routerReducer
    }),
    applyMiddleware(
        thunkMiddleware
    )
);

const history = syncHistoryWithStore(hashHistory, store)

console.log('abc');

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/admin" component={App}>
                <Route path="/" component={Index}/>
                <Route path="/user/analyze" getComponent={routes.UserAnalyze}/>
                <Route path="/order/analyze" component={OrderAnalyze}/>
                <Route path="/*" getComponent={routes.NotFound}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);

