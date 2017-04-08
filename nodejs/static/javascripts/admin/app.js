import 'isomorphic-fetch';

import React    from 'react';
import ReactDOM from 'react-dom';

import {
    createStore, 
    combineReducers,
    applyMiddleware
} from 'redux';

import { Provider }    from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { hashHistory } from 'react-router';

import {
    syncHistoryWithStore, 
    routerReducer 
} from 'react-router-redux';

import reducers    from './reducers';
import route       from './route';

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
        {route(history)} 
    </Provider>,
    document.getElementById('app')
);
