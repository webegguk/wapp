import React, {Component} from 'react';
import logo from '../logo.svg';


class Home extends Component {


    render() {

        return (
            <div className="App">
                <div className="App-header clearfix">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h2>Welcome to React</h2>
                </div>
                <div className="container">
                    <h2>Hello from the components folder in react!!</h2>
                </div>
            </div>
        )
    }
}


export default Home;