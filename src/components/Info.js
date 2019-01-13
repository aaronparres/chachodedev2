import React, { Component } from 'react'
import './Info.css';
import ReactStars from 'react-stars';
import Axios from 'axios';
import nullPhoto from '../images/placeholder.png';
import nullBackdrop from '../images/backdrop.png';
import nullActor from '../images/actorNull.png';

export default class Info extends Component {

    constructor() {
        super();
        this.state = {
            media: [],
            loading: true,
            averageStars: [],
            trailer: [],
            cast: []
        }
    }

    componentDidMount = () => {
        let mediaId = this.props.match.params.media_id;
        let mediaType = this.props.match.params.media_type;

        Axios.get(`https://api.themoviedb.org/3/${mediaType}/${mediaId}?api_key=843677e73368e75286271faf9ac60e2e&language=en-US`)
            .then(response => {
                this.setState({
                    media: response.data,
                    loading: false
                });

            });
        Axios.get(`https://api.themoviedb.org/3/${mediaType}/${mediaId}/videos?api_key=843677e73368e75286271faf9ac60e2e&language=en-US`)
            .then(response => {
                this.setState({
                    trailer: response.data.results,
                })


            })
            .catch(err => {
                this.setState({
                    trailer: "XcRGr2HGwuo", //default video if trailer is not found
                })
            })
        Axios.get(`https://api.themoviedb.org/3/${mediaType}/${mediaId}/credits?api_key=843677e73368e75286271faf9ac60e2e`)
            .then(response => {
                this.setState({
                    cast: response.data.cast,
                })
            })
            .catch(err => {
                console.log(err);
            })

        window.scrollTo(0, 0); //avoid scroll problem when clicking a media that is scrolled down
    }

    render() {
        let loadingText;
        if (this.state.loading) {
            document.title = "Chachodede | Info";
            loadingText = <p>Loading...</p>;
        }

        let { media, trailer, cast } = this.state;
        let title;
        let filteredDate;

        if (media.title) { //movies title
            title = media.title;
        } else if (media.name) { //series title
            title = media.name;
        }

        if (media.first_air_date) {
            filteredDate = media.first_air_date;
        } else if (media.release_date) {
            filteredDate = media.release_date;
        }

        document.title = `Chachodede | ${title}`;

        let imagePath;
        if (media.poster_path === null) {
            imagePath = nullPhoto;
        } else {
            imagePath = `https://image.tmdb.org/t/p/w500/${media.poster_path}`;
        }

        let backdropImage;
        if (media.backdrop_path === null) {
            backdropImage = `url('${nullBackdrop}')`;
        } else {
            backdropImage = `url(https://image.tmdb.org/t/p/original/${media.backdrop_path})`;
        }

        let background = {
            width: 'auto',
            height: '400px',
            backgroundImage: backdropImage,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed'
        };

        let x = '';
        let y = '';
        let z = '';
        let releaseDate = "";

        if (filteredDate !== "") {
            let date = new Date(filteredDate);
            x = date.getDate();
            y = date.getMonth();
            z = date.getFullYear();
            releaseDate = `${x}-${y}-${z}`;
        } else {
            releaseDate = "unknown";
        }


        return (
            <div className='info'>
                {loadingText}
                <div style={background}>
                </div>
                <div className='caja'>
                    <div className="w3-container image-info">
                        <img className='image-info' src={imagePath} alt={`img${media.id}`} />
                    </div>
                    <div className='w3-container contentBox'>
                        <div className="media-header">
                            <h3>{title}</h3>
                            <ReactStars className='stars' count={10} value={media.vote_average} size={20} color2={'#ffd700'} edit={false} />
                            <p>{media.vote_average}</p>
                        </div>
                        <div className="infoBox">
                            {media.number_of_seasons && <p><b>Seasons:</b> {media.number_of_seasons}</p>}
                            {media.number_of_episodes && <p><b>Episodes:</b> {media.number_of_episodes}</p>}
                            {media.tagline && <p><em>"{media.tagline}"</em></p>}
                            <p><b>Release date:</b> {releaseDate}</p>
                            {media.runtime && <p><b>Runtime:</b> {media.runtime} min</p>}
                            {media.episode_run_time && <p><b>Episode runtime:</b> {media.episode_run_time[0]} min</p>}
                            {media.genres && <span><b>Genres: </b>
                                {media.genres.map((genre) => <span className="genreStyle" key={genre.id}>&nbsp;{genre.name}&nbsp;</span>)}</span>}
                            <p><strong>Sinopsis:</strong></p>
                            <p>{media.overview}</p>
                        </div>
                        {cast.length > 0 && <p><strong>Cast:</strong></p>}
                        {cast.length > 0 && <div className="actorsBox">
                            {cast.slice(0, 6).map((actor, index) =>
                                <div key={index} className="eachActor w3-card">
                                    {actor.profile_path ?
                                        <img height="100px" src={`https://image.tmdb.org/t/p/w138_and_h175_face${actor.profile_path}`} alt={actor.id} />
                                        : <img height="100px" src={nullActor} alt={actor.id} />}
                                    <ul>
                                        <li className="actorName">{actor.name}</li>
                                        <li>{actor.character.slice(0, 25)}</li>
                                    </ul>
                                </div>
                            )}</div>}

                        <div>
                            <p><b>Trailers ({trailer.length}):</b></p>
                            <div className="marginTrailerBox">
                                {trailer !== "" && trailer.map((trailer, index) => <iframe className="w3-margin" key={index} title="Youtube Trailer" width="560" height="315" src={`https://www.youtube.com/embed/${trailer.key}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen></iframe>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
