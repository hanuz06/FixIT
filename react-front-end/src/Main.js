import React from "react";
import { Switch, Route } from "react-router-dom";
import MainPages from "./pages/MainPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


class Main extends React.Component {
  render() {
    console.log("PROPS FROM MAIN", this.props.name);
    return (
      <main style={{ minHeight: "70vh" }}>
        
        <div>
          <Switch>
            {/* Using the `component` prop */}
            <Route exact path="/" component={MainPages} ></Route>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            {/* <Route path="/order" component={Order} /> */}

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