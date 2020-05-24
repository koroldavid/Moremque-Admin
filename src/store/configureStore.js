import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware                           from 'redux-thunk';

import reducers from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState) {
	return createStore(
		reducers,
		initialState,
		composeEnhancers(applyMiddleware(thunkMiddleware))
	);
}