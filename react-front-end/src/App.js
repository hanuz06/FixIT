import React, { useState } from 'react';
import axios from 'axios';
import './App.scss';
import RouterPage from './RouterPage.js'
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
   
    return (
      <div className="App">
        {/* <Header removeSession={this.removeSession} name={this.state.name} /> */}
        < Header />
        < RouterPage />
        < Footer /> 
      </div>
    );
  
}

export default App;


