import React from "react";
import { Switch, Route } from "react-router-dom";
import MainPages from "./pages/MainPages";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


function RoutePage () { 
      
    return (
      <main style={{ minHeight: "70vh" }}>
        
        <article>
          <Switch>
            {/* Using the `component` prop */}
            <Route exact path="/" component={MainPages} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />  
            
          </Switch>
        </article>
  
      </main>
    );  
}

export default RoutePage;