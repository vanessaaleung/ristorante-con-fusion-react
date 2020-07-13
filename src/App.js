// Make use of the MainComponent

import React, { Component } from 'react';
import Main from './components/MainComponent.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}

export default App;
