import React from "react";
import { Switch, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


function RouterPage () {   
      
    return (
      <React.Fragment>       
          <Switch>
            {/* Using the `component` prop */}
            <Route exact path="/" >
              < MainPage />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
          </Switch>  
      </React.Fragment>
    );  
}

export default RouterPage;