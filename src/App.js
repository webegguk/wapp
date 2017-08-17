import React, { Component } from 'react';
// import { Route, Link } from 'react-router-dom'
// import Home from './scripts/components/Home'
import Routes from './Routes'

class App extends Component {
    constructor() {
        super();
        this.state = {
            movies: []
        }
    }

    componentDidMount() {
        let dataURL = "http://local.wapi/wp-json/wp/v2/movies?_embed";
        fetch(dataURL)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    movies: res
                })
            })
    }

    render() {
        let movies = this.state.movies.map((movie, index) => {
            return <div key={index}>
              <img alt="" src={movie._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url} />
              <p><strong>Title:</strong> {movie.title.rendered}</p>
              <p><strong>Release Year:</strong> {movie.acf.release_year}</p>
              <p><strong>Rating:</strong> {movie.acf.rating}</p>
              <div><strong>Description:</strong><div dangerouslySetInnerHTML={ {__html: movie.acf.description} } /></div>
            </div>
        });

        return (
            <div>
<Routes/>
              <h2>Star Wars Movies</h2>
                {movies}
            </div>
        )
    }
}

export default App;
