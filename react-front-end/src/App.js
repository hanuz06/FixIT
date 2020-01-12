import React from 'react';
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import CssBaseline from '@material-ui/core/CssBaseline';

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AlertState } from './context/alert/AlertState'

function App() { 
  const userId = sessionStorage.getItem('userId')

    return (
      <AlertState>
        <Router>
          <div className="App" >
            <CssBaseline />            
            < Header />                      
            <Switch>           
                <Route exact path="/" >
                  < MainPage />
                </Route>               
                <Route path="/login">
                {userId ? <Redirect to="/" /> : <Login />}
                </Route>               
                <Route path="/signup">
                {userId ? <Redirect to="/" /> : <Signup />}
                </Route>
              </Switch>  
            < Footer /> 
          </div>
        </Router>
      </AlertState>
    );  
}

export default App;


    
