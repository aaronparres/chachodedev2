import React, { Component } from 'react'
import './Info.css';
import Axios from 'axios';
import nullPhoto from '../images/placeholder.png';


export default class Info extends Component {

    constructor() {
        super();
        this.state = {
            media: [],
            loading: true,
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
                })
            })
    };

    render() {
        let loadingText;
        if (this.state.loading) {
            document.title = "Chachodede | Info";
            loadingText = <p>Loading...</p>;
        }

        let { media } = this.state;
        let title;

        if (media.title) { //movies title
            title = media.title;
        }else if(media.name){ //series title
            title = media.name;
        }

        document.title = `Chachodede | ${title}`;

        let imagePath;
        if (media.poster_path === null) {
            imagePath = nullPhoto;
        } else {
            imagePath = `https://image.tmdb.org/t/p/w500/${media.poster_path}`;
        }
        
        return (
            <div className='info'>
                {loadingText}
                <div className="media">
                    <div className="media-header">
                        <h3>{title}</h3>
                    </div>
                    <img className='image-info' src={imagePath} alt={`img${media.id}`} />
                </div>
            </div>
        )
    }
}
