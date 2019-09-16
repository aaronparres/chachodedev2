import React from 'react'
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../images/logo.svg';

const header = () => {
  return (
    <header>
      <div className="left-side">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" className="App-logo" />
          </Link>
        </div>
        <div className="menu-options">
          <div className='link' >
            <Link to="/movies" >Movies</Link>
          </div>
          <div className='link'>
            <Link to="/series">Series</Link>
          </div>
        </div>
      </div>
    </header>
  )
}
export default header;
