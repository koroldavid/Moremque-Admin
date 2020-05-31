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
        case constants.CREATE_CATEGORY: {
            const { name, _id } = action.payload.category;
            draftState.structure = [ ...state.structure, { name, _id, subStructure: [] } ];
            break;
        }
        case constants.UPDATE_CATEGORY: {
            const { name, _id } = action.payload.category;

            draftState.structure = [ ...state.structure ].map(structure => {
                if (structure._id === _id) {
                    return {
                        ...structure,
                        name
                    };
                }

                return structure;
            });
            break;
        }
        case constants.DELETE_CATEGORY: {
            draftState.structure = [ ...state.structure.filter(category => category._id !== action.payload.id) ];
            break;
        }
        case constants.CREATE_SUB_CATEGORY: {
            const { name, _id, categoryId } = action.payload.subCategory;

            const newStucture = [ ...state.structure ].map(structure => {
                if (structure._id === categoryId) {
                    return {
                        ...structure,
                        subStructure: [...structure.subStructure, { name, _id }]
                    };
                } 
                
                return structure;
            });

            draftState.structure = newStucture;
            break;
        }
        case constants.UPDATE_SUB_CATEGORY: {
            const { subCategory, categoryId } = action.payload;
            const { name, _id } = subCategory;

            const newStucture = [ ...state.structure ].map(structure => {
                if (structure._id === categoryId) {
                    return {
                        ...structure,
                        subStructure: [...structure.subStructure ].map(subStr => {
                            if (subStr._id === _id) {
                                return {
                                    ...subStr,
                                    name
                                };
                            }

                            return subStr;
                        })
                    };
                }

                return structure;
            });

            draftState.structure = newStucture;
            break;
        }
        case constants.DELETE_SUB_CATEGORY: {
            const { id, categoryId } = action.payload;

            const newStucture = [ ...state.structure ].map(structure => {
                if (structure._id === categoryId) {
                    return {
                        ...structure,
                        subStructure: [...structure.subStructure ].filter(subStr => subStr._id !== id)
                    };
                }

                return structure;
            });

            draftState.structure = newStucture;
            break;
        }
        }
    });
}