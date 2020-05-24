import React              from 'react';
import ReactDOM           from 'react-dom';
import App                from './App';
// import * as serviceWorker from './serviceWorker';
import {BrowserRouter}    from 'react-router-dom';
import configureStore     from './store/configureStore.js';
import { Provider }       from 'react-redux';
import config 			  from './config';

import './index.less';

const initialState = {};
export const store = configureStore(initialState);

ReactDOM.render(
    <BrowserRouter  basename={config.basename}>
        <Provider store={store} >
            <App />
        </Provider>
    </BrowserRouter>, document.getElementById('root'));

// serviceWorker.unregister();
