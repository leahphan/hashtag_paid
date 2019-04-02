import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Gallery from './components/Gallery';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Gallery />
      </div>
    );
  }
}

export default App;
