import produce        from 'immer';

import * as constants from '../constants';


const initialState = {
    structure : []
};

/* eslint-disable no-param-reassign, default-case, no-case-declarations */
export default function recipes(state = initialState, action) {
    return produce(state, draftState => {
        switch (action.type) {
        case constants.GET_STRUCTURE: {
            draftState.structure = [ ...action.payload.structure ];
            break;
        }
        }
    });
}