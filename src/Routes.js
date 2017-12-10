import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import Home from './components/Home';
import Datepicker from './components/Datepicker';
import Listmovies from './components/Listmovies';
import ShowContacts from './components/ShowContacts';
import Food from './components/Food';


const AppRoutes = () => (
    <Router>
        <div>
        <div className="header">
            <div className="container">
                <nav>
                    <ul className="nav nav-pills nav-fill">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/datepicker">Datepicker</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/topics">Topics</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/listmovies">List Movies</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/showcontacts">Show Contacts</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/food">Fun Food Friends</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
        <div>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/datepicker" component={Datepicker}/>
            <Route path="/topics" component={Topics}/>
            <Route path="/listmovies" component={Listmovies}/>
            <Route path="/showcontacts" component={ShowContacts}/>
            <Route path="/food" component={Food}/>
        </div>
        </div>
    </Router>
)

const About = () => (
    <div className="container">
        <h2>About</h2>
    </div>
)

const Topics = ({match}) => (
    <div className="container">
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>
                    Rendering with React
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>
                    Components
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>
                    Props v. State
                </Link>
            </li>
        </ul>

        <Route path={`${match.url}/:topicId`} component={Topic}/>
        <Route exact path={match.url} render={() => (
            <h3>Please select a topic.</h3>
        )}/>
    </div>
)

const Topic = ({match}) => (
    <div className="container">
        <h3>{match.params.topicId}</h3>
    </div>
)

export default AppRoutes;