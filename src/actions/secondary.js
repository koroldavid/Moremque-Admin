import * as constants from '../constants/secondary';
import api            from '../apiSingleton';

export function loadStructure () {
    return async dispatch => {
        const structure = await api.secondary.getStructure();

        dispatch({
            type    : constants.GET_STRUCTURE,
            payload : {
                structure
            }
        });  
    };
}
