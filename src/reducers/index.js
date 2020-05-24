import { combineReducers }  from 'redux';

import recipes              from './recipes';
import category             from './category';

export default combineReducers({
    recipes,
    category
});