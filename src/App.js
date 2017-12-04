import React, {Component} from 'react';
// import { Route, Link } from 'react-router-dom'
// import Home from './scripts/components/Home'
import Routes from './Routes';
import fire from './fire';

class App extends Component {
    constructor() {
        super();
        this.state = {
            currentItem: '',
            username: '',
            items: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const itemsRef = fire.database().ref('items');
        const item = {
            title: this.state.currentItem,
            user: this.state.username
        }
        itemsRef.push(item);
        this.setState({
            currentItem: '',
            username: ''
        });
    }
    componentDidMount() {
        const itemsRef = fire.database().ref('items');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                newState.push({
                    id: item,
                    title: items[item].title,
                    user: items[item].user
                });
            }
            this.setState({
                items: newState
            });
        });
    }
    removeItem(itemId) {
        const itemRef = fire.database().ref(`/items/${itemId}`);
        itemRef.remove();
    }
    render() {
        return (
            <div>
                <Routes/>
                <div className='app'>
                    <header>
                        <div className="wrapper">
                            <h1>Fun Food Friends</h1>

                        </div>
                    </header>
                    <div className='container'>
                        <section className='add-item'>
                            <form onSubmit={this.handleSubmit}>
                                <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
                                <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
                                <button>Add Item</button>
                            </form>
                        </section>
                        <section className='display-item'>
                            <div className="wrapper">
                                <ul>
                                    {this.state.items.map((item) => {
                                        return (
                                            <li key={item.id}>
                                                <h3>{item.title}</h3>
                                                <p>brought by: {item.user}
                                                    <button onClick={() => this.removeItem(item.id)}>Remove Item</button>
                                                </p>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
