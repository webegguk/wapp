import * as types from '../actions/actionTypes';

export default function contactReducer(state=[], action) {
    switch (action.type) {
        case types.LOADED_CONTACTS:
            return action.contacts;

        case types.ADDED_CONTACT:
            return [
                ...state,
                Object.assign({}, action.contact)
            ];

        case types.DELETED_CONTACT:
            return state.filter(contact => contact.id !== action.id);

        default:
            return state;
    }
}