import produce        from 'immer';

import * as constants from '../constants/category';


const initialState = {
    category : []
};

/* eslint-disable no-param-reassign, default-case, no-case-declarations */
export default function recipes(state = initialState, action) {
    return produce(state, draftState => {
        switch (action.type) {
        case constants.LIST_CATEGORY:
            draftState.category = [ ...action.payload.category ];
            break;
        case constants.CREATE_CATEGORY:
            draftState.category = [ action.payload.category, ...state.category ];
            break;
        }
    });
}