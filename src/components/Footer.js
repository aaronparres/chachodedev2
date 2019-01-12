import React, { Component } from 'react'
import './Footer.css';

export default class Footer extends Component {
    render() {
        return (
            <footer className=' footer'>
                <div className='list'>
                    <ul>
                        <li><a href="#TC">Terms and conditions</a></li>
                        <li><a target="_blank" rel='noreferrer noopener' href='https://developers.themoviedb.org/3/getting-started/introduction'>API</a></li>
                        <li><a href='#DMCA'>DMCA</a></li>
                        <li><a href='#FAQ'>FAQ</a></li>
                    </ul>
                </div>
                <div className='copy'>
                    <p>© 2018 - Chachodede</p>
                </div>
            </footer>
        )
    }
}
