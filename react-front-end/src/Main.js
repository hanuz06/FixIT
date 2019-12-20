import React from "react";
import { Switch, Route } from "react-router-dom";

import Album from "./Album";
import Login from "./Login";
import Signup from "./Signup";


class Main extends React.Component {
  render() {
    console.log("PROPS FROM MAIN", this.props.name);
    return (
      <main style={{ minHeight: "70vh" }}>
        
        <div>
          <Switch>
            {/* Using the `component` prop */}
            <Route exact path="/" component={Album} ></Route>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />

            {/* Using the `render` prop */}
            {/* <Route
              path="/posts/:slug"
              render={({ match }) => <BlogPost match={match} />}
            /> */}
          </Switch>
    </div>
  
      </main>
    );
  }
}

export default Main;