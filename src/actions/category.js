import * as constants from '../constants';
import api            from '../apiSingleton';

export function create(item) {
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

export function update(category) {
    return async dispatch => {
        await api.category.update(category);

        dispatch({
            type    : constants.UPDATE_CATEGORY,
            payload : {
                category
            }
        });
    };
}

export function deleting(id) {
    return async dispatch => {
        await api.category.delete(id);

        dispatch({
            type    : constants.DELETE_CATEGORY,
            payload : {
                id
            }
        });
    };
}
