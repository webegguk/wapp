import React from 'react';

export default class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
    }

    onDelete() {
        this.props.onDelete(this.props.id);
    }

    render() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.mobile}</td>
                <td>{this.props.email}</td>
                <td><button onClick={this.onDelete} className="btn btn-xs btn-danger">Delete</button></td>
            </tr>
        );
    }
}