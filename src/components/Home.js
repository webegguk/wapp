import React, {Component} from 'react';
import Responsive from 'react-responsive-decorator';
import logo from '../logo.svg';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobile: false
        };
    }
    componentDidMount() {
        this.props.media({ minWidth: 768 }, () => {
            this.setState({
                isMobile: false
            });
        });

        this.props.media({ maxWidth: 768 }, () => {
            this.setState({
                isMobile: true
            });
        });
    }
    render() {
        const { isMobile } = this.state;

        return (
            <div className="App">
                <div className="App-header clearfix">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to Wapp</h2>
                </div>
                <div className="container">
                    <h2>Hello from the components folder in react!!</h2>
                </div>
                {isMobile ?
                    <div>Mobile</div> :
                    <div>Not mobile</div>
                }
            </div>
        )
    }
}

export default Responsive(Home);