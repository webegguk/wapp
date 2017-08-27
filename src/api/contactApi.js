import axios from 'axios';

export default class ContactApi {
    static getAllContacts() {
        return axios.get('/api/contacts')
            .then(response => response.data)
            .catch(error => {
                throw error;
            });
    }

    static saveContact(contact) {
        return axios.post('/api/contacts', contact)
            .then(response => response.data)
            .catch(error => {
                throw error;
            });
    }

    static deleteContact(id) {
        return axios.delete('/api/contacts/' + id)
            .then(response => response.data)
            .catch(error => {
                throw error;
            });
    }
}