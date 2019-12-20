import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Main from './Main.js'
import Header from './Header.js'
import Footer from './Footer.js'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'Click the button to load data!'
    }
  }

  fetchData = () => {
    axios.get('/api/data') // You can simply make your requests to "/api/whatever you want"
    .then((response) => {
      // handle success
      console.log(response.data) // The entire response from the Rails API

      console.log(response.data.message) // Just the message
      this.setState({
        message: response.data.message
      });
    }) 
  }

  render() {
    return (
      <div className="App">
        {/* <Header removeSession={this.removeSession} name={this.state.name} /> */}
        < Header />
        < Main name={this.state.name} />
        < Footer /> 
      </div>
    );
  }
}

export default App;


