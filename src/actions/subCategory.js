import * as constants from '../constants';
import api            from '../apiSingleton';

export function create(item) {
    return async dispatch => {
        const subCategory = await api.subCategory.create(item);

        dispatch({
            type    : constants.CREATE_SUB_CATEGORY,
            payload : {
                subCategory
            }
        });  
    };
}

export function update(subCategory) {
    return async dispatch => {
        await api.subCategory.update(subCategory);

        dispatch({
            type    : constants.UPDATE_SUB_CATEGORY,
            payload : {
                subCategory,
                categoryId: subCategory.categoryId
            }
        });
    };
}

export function deleting(id, categoryId) {
    return async dispatch => {
        await api.subCategory.delete(id);

        dispatch({
            type    : constants.DELETE_SUB_CATEGORY,
            payload : {
                id,
                categoryId
            }
        });
    };
}
