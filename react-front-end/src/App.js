import React, { useState } from 'react';
import axios from 'axios';
import './App.scss';
import RoutePage from './RoutePage.js'
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import Loader from './components/Loader'

// class App extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       message: 'Click the button to load data!'
//     }
//   }
function App() {

  const [message, setMessage]=useState();
  const [loading, setLoading]=useState(true);

  const fetchData = () => {
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
    return (
      <div className="App">
        {/* <Header removeSession={this.removeSession} name={this.state.name} /> */}
        < Header />
        < RoutePage />
        < Footer /> 
      </div>
    );
  
}

export default App;


