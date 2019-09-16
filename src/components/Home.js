import React, { Component } from 'react'
import './Home.css';
import Axios from 'axios';
import Media from './Media';

export default class Home extends Component {
    state = {
        movies: [],
        series: [],
        loading: true,
    }

    componentDidMount = () => {
        Axios.get("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=843677e73368e75286271faf9ac60e2e")
            .then(response => {
                this.setState({
                    movies: response.data.results,
                    loading: false
                })
            })
            .catch(err => {
                console.log(err);
            });

        Axios.get("https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=843677e73368e75286271faf9ac60e2e")
            .then(response => {
                this.setState({
                    series: response.data.results,
                })
            })
            .catch(err => {
                console.log(err);
            })
    };

    render() {
        document.title = "Chachodede | Home";
        let loadingText;
        if (this.state.loading) {
            loadingText = <p>Loading...</p>;
        }
        let { movies, series } = this.state;

        return (
            <div className='w3-container home'>
                {loadingText}
                <div className="w3-container movie">
                    <h2>Movies</h2>
                    <div>
                        {movies.map((media) =>
                            <Media key={media.id} index={media.id} image={media.poster_path} title={media.title} vote_avg={media.vote_average} media_type={"movie"} year={media.release_date} />
                        )}
                    </div>
                </div>
                <div className="w3-container serie">
                    <h2>Series</h2>
                    <div>
                        {series.map((media) =>
                            <Media key={media.id} index={media.id} image={media.poster_path} title={media.name} vote_avg={media.vote_average} media_type={"tv"} year={media.first_air_date} />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}
