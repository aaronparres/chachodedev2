import React, { Component } from 'react'
import './Series.css';
import Axios from 'axios';
import Media from './Media';


export default class Series extends Component {
    constructor() {
        super();
        this.state = {
            series: [],
            query: "",
            loading: false
        }
    }

    onChange = event => {
        this.setState({
            query: event.target.value
        });
        let { query } = this.state;
        Axios.get(`https://api.themoviedb.org/3/search/tv?api_key=843677e73368e75286271faf9ac60e2e&language=en-US&query=${query}`)
            .then(response => {
                this.setState({
                    series: response.data.results,
                    loading: false
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    onSubmit = (e) => {
        e.preventDefault();
        /* let { query } = this.state;
        Axios.get(`https://api.themoviedb.org/3/search/tv?api_key=843677e73368e75286271faf9ac60e2e&language=en-US&query=${query}`)
            .then(response => {
                this.setState({
                    series: response.data.results,
                    loading: false
                })
            })
            .catch(err => {
                console.log(err);
            }) */
    }

    render() {
        document.title = "Chachodede | Series Search";
        let loadingText;
        if (this.state.loading) {
            loadingText = <p>Loading...</p>;
        }
        let { series, query } = this.state;
        let searchText;
        if (!query) {
            searchText = "Series searching page";
        } else {
            searchText = `Series search result for: '${query}'`;
        }

        return (
            <div className='series'>
                {loadingText}
                <div className="w3-container">
                    <form onSubmit={this.onSubmit} className="w3-container w3-card-4 w3-text-blue w3-margin">
                        <div className="w3-row w3-section">
                            <div className="w3-col">
                                <i className="w3-xlarge fa fa-search"></i>
                            </div>
                            <div className="w3-rest">
                                <input className="w3-input w3-animate-input" value={this.state.query} type="search" placeholder="Search" onChange={this.onChange} />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="w3-container">
                    <h2 className="w3-margin">{searchText}</h2>
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


