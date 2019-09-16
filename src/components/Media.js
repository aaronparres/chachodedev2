import React from 'react'
import './Media.css';
import { Link } from 'react-router-dom';
import nullPhoto from '../images/placeholder.png';

const media = (props) => {

    let { image, title, index, vote_avg, media_type, year } = props;

    let imagePath;

    if (image === null) {
        imagePath = nullPhoto;
    } else {
        imagePath = `https://image.tmdb.org/t/p/w500/${image}`;
    }

    let date = new Date(year);
    let y = date.getFullYear();

    if (year === "") { //avoid null year data to show as NaN
        y = "-";
    }


    return (
        <div className="media w3-display-container ">
            <div className='w3-display-mid'>
                <div className='w3-display-container contenedor'>
                    <Link to={`/info/${media_type}/${index}`}><img className='image w3-round' src={imagePath} alt={`img${index}`} /></Link>
                    <div className="w3-display-bottomleft w3-container votes">
                        <div className='content'>
                            <span className="voteAvg"><i className="fa fa-star"></i>{vote_avg}</span>
                            <span className="year">{y}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="media-header w3-display-bottomleft">
                <h3>{title.slice(0, 40)}{title.length > 40 && " ..."}</h3>
            </div>
        </div>
    )
}
export default media;