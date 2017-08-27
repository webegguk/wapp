import * as types from './actionTypes';
import ContactApi from '../api/contactApi';

export function loadedContacts(contacts) {
    return { type: types.LOADED_CONTACTS, contacts};
}

export function addedContact(contact) {
    return { type: types.ADDED_CONTACT, contact};
}

export function deletedContact(id) {
    return { type: types.DELETED_CONTACT, id};
}

export function loadContacts() {
    return dispatch => {
        return ContactApi.getAllContacts().then(contacts => {
            dispatch(loadedContacts(contacts));
        }).catch(error => {
            throw(error);
        });
    };
}

export function addContact(contact) {
    return dispatch => {
        return ContactApi.saveContact(contact).then(contact =>
            dispatch(addedContact(contact))
        ).catch(error => {
            throw error;
        });
    };
}

export function deleteContact(id) {
    return dispatch => {
        return ContactApi.deleteContact(id).then(() =>
            dispatch(deletedContact(id))
        ).catch(error => {
            throw error;
        });
    };
}