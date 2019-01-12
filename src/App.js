import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import Movies from './components/Movies';
import Home from './components/Home';
import Series from './components/Series';
import Login from './components/Login';
import Footer from './components/Footer';
import Info from './components/Info';

// hello there
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
            <div className='container-home'>
                <Route path="/" exact component={Home} />
            </div>
          <Route path="/movies" component={Movies} />
          <Route path="/series" component={Series} />
            <div className='container-info'>
                <Route path="/info/:media_type/:media_id" component={Info} />
            </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
