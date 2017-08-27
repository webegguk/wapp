import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import * as contactActions from '../actions/contactActions';
import ContactForm from './ContactForm';
import Contact from './Contact';

class Contacts extends Component {
    constructor(props) {
        super(props);
        toastr.options.timeOut = 1000;
        toastr.options.positionClass = "toast-bottom-right";
        this.addContact = this.addContact.bind(this);
        this.deleteContact = this.deleteContact.bind(this);
    }

    addContact(contact) {
        this.props.actions.addContact(contact)
            .then(()=> toastr.success('Contact added'))
            .catch(error => {
                alert(error);
            });
    }


    deleteContact(id) {
        this.props.actions.deleteContact(id)
            .then(()=> toastr.success('Contact deleted'))
            .catch(error => {
                alert(error);
            });
    }

    render() {
        return (
            <div className="container">
                <br/>
                <div className="row">
                    <div className="col-sm-8">
                        <div className='panel panel-primary'>
                            <div className='panel-heading'>
                                <b>Contacts</b>
                            </div>
                            <div className='panel-body'>
                                <table className='table table-striped table-condensed'>
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Mobile</th>
                                        <th>Email</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.props.contacts.map(contact =>
                                        <Contact key={contact.id} id={contact.id}
                                                          name={contact.name} mobile={contact.mobile} email={contact.email}
                                                          onDelete={this.deleteContact} />
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <ContactForm onAddContact={this.addContact} />
                    </div>
                </div>
                <p>The API server is running on a node express instance so needs to be run in a development environment. <a href="https://github.com/webegguk/wapp">Repo is here</a> </p>
            </div>);
    }
}

Contacts.propTypes = {
    contacts: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        contacts: state.contacts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(contactActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);