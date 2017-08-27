import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore';
import Contacts from './Contacts';
import {loadContacts} from '../actions/contactActions';


const store = configureStore();
store.dispatch(loadContacts());


class ShowContacts extends Component {


    render() {

        return (
            <div>
                <Provider store={store}>
                    <Contacts/>
                </Provider>
            </div>
        )
    }
}


export default ShowContacts;