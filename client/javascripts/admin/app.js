import React    from 'react';
import ReactDOM from 'react-dom';

import {
    createStore, 
    combineReducers,
    applyMiddleware
} from 'redux';

import { Provider }    from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import {
    Router, 
    Route, 
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

let store = createStore(
    combineReducers({
        ...reducers,
        routing: routerReducer
    }),
    applyMiddleware(
        thunkMiddleware
    )
);

let history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/admin" component={App}>
                <Route path="/" component={Index}/>
                <Route path="/user/analyze" getComponent={routes.UserAnalyze}/>
                <Route path="/order/analyze" getComponent={routes.OrderAnalyze}/>
                <Route path="/*" getComponent={routes.NotFound}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);

