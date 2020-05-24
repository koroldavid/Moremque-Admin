import * as constants from '../constants/category';
import api            from '../apiSingleton';

export function listCategory () {
    return async dispatch => {
        const category = await api.category.list();

        dispatch({
            type    : constants.LIST_CATEGORY,
            payload : {
                category
            }
        });  
    };
}

export function createCategory ({item}) {
    return async dispatch => {
        const category = await api.category.create(item);

        dispatch({
            type    : constants.CREATE_CATEGORY,
            payload : {
                category
            }
        });
    };
}
