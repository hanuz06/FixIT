import React from "react";
import { Switch, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


function RouterPage () {   
      
    return (
      <main style={{ minHeight: "70vh" }}>
        
        <article>
          <Switch>
            {/* Using the `component` prop */}
            <Route exact path="/" component={MainPage} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />  
            
          </Switch>
        </article>
  
      </main>
    );  
}

export default RouterPage;