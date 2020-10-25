import React, { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Detail, Home, NewTopic } from "./container";
import { Header } from "./components";
import "./App.less";

const App: FC = () => (
  <div className="root-container">
    <Header></Header>
    <div className="wrapper">
      <Router>
        <Switch>
          <Route path="/detail">
            <Detail />
          </Route>
          <Route path="/new">
            <NewTopic />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>{" "}
    </div>
  </div>
);

export default App;
