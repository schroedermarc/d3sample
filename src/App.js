import React, { Component } from 'react';
import './App.scss';

import './Graph';
import Graph from './Graph';

class App extends Component {

  state = {
    stateFilter: 1
  };

  handleSet1Button = () => {
    this.setState({ stateFilter: 1 });
  }

  handleSet2Button = () => {
    this.setState({ stateFilter: 2 });
  }

  handleBothSetButton = () => {
    this.setState({ stateFilter: null });
  }

  render() {
    return (
      <div className="App">
        <Graph stateFilter={this.state.stateFilter}></Graph>
        <div className='button-container'>
          <button onClick={this.handleSet1Button}>SET 1</button>
          <button onClick={this.handleSet2Button}>SET 2</button>
          <button onClick={this.handleBothSetButton}>SET 1 & 2</button>
        </div>
      </div >
    );
  }
}


export default App;
