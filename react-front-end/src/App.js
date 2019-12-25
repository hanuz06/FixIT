import React, { useState } from 'react';
import axios from 'axios';
import './App.scss';
import RouterPage from './RouterPage.js'
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import Loader from './components/Loader'
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  
  const [loading, setLoading] = useState(false)
   
    return (
      <div className="App" >
        {/* <CssBaseline /> */}
        {/* <Header removeSession={this.removeSession} name={this.state.name} /> */}
        < Header />
        {loading && <Loader />}
        < RouterPage />
        < Footer /> 
      </div>
    );
  
}

export default App;


