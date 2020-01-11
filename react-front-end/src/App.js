import React from 'react';
import './App.scss';
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import CssBaseline from '@material-ui/core/CssBaseline';

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import {AlertState} from './context/alert/AlertState'
// STRIPE 
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from "./components/CheckoutForm"

function App() {  
  
  //const [loggedIn, setLogin] = useState(false)
  const userId = sessionStorage.getItem('userId')

    return (
      <AlertState>
        <Router>
          <div className="App" >
            <CssBaseline />
            {/* <Header removeSession={this.removeSession} name={this.state.name} /> */}
            < Header />       
            {/* < RouterPage /> */}            
            <Switch>
                {/* Using the `component` prop */}
               
                <Route exact path="/" >

                  < MainPage />                   

                </Route>
               
                <Route path="/login">
                {userId ? <Redirect to="/" /> :
                  <Login />}
                </Route>                     
                
                <Route path="/signup">
                {userId ? <Redirect to="/" /> :
                  <Signup />
                  }
                </Route>
              </Switch>  
            < Footer /> 
          </div>
        </Router>
      </AlertState>
    );
  
}

export default App;


    
