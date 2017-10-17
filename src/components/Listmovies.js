import React, {Component} from 'react';
import axios from 'axios';

class Listmovies extends Component {
    constructor() {
        super();
        this.state = {
            movies: []
        }
    }

    componentDidMount() {
        let dataURL = "http://wapi.webegg.co.uk/wp-json/wp/v2/movies?_embed";
        axios.get(dataURL)
            .then(response => response.data)
            .then(response => {
                this.setState({
                    movies: response
                })
            })
            .catch(error => {
                throw error;
            });
    }

    render() {
        let movies = this.state.movies.map((movie, index) => {
            return <div key={index}>
                <img alt="" src={movie._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url}/>
                <p><strong>Title:</strong> {movie.title.rendered}</p>
                <p><strong>Release Year:</strong> {movie.acf.release_year}</p>
                <p><strong>Rating:</strong> {movie.acf.rating}</p>
                <div><strong>Description:</strong>
                    <div dangerouslySetInnerHTML={ {__html: movie.acf.description} }/>
                </div>
            </div>
        });

        return (
            <div className="container">
                <h2>Star Wars Movies coming from WP (wapi.webegg.co.uk)</h2>
                {movies}
            </div>
        )
    }
}

export default Listmovies;
