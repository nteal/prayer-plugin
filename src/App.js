import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Idea from './loveIsItem.js';
import IdeaBox from './ideaBox.js';

class App extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    // hello
    // }
    this.handleClick = this.handleClick.bind(this);

  }
  handleClick() {
    console.log('clicked!')
    console.log('this handles the click!')
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Love Is...</h2>
        </div>
        <div onClick={this.handleClick}>Fill in the Blank</div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <IdeaBox url='http://localhost:3001/api/ideas' ideaInterval={2000}/>

        <a href="#" className="button">
          Submit
        </a>
      </div>

    );
  }
}


export default App;
