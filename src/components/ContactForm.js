import React from 'react';

export default class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.onAddClick = this.onAddClick.bind(this);
    }

    onAddClick(event) {
        event.preventDefault();
        let contact = {};
        contact.name = this.refs.name.value;
        contact.mobile = this.refs.mobile.value;
        contact.email = this.refs.email.value;
        this.props.onAddContact(contact);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onAddClick}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" ref="name" required />
                    </div>
                    <div className="form-group">
                        <label>Mobile</label>
                        <input type="text" className="form-control" ref="mobile" required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" ref="email" required />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Contact" className="btn btn-xs btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}