import React, { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Detail, Home, NewTopic, Admin, NewCate } from "./container";
import { Header } from "./components";
import "./App.less";

const App: FC = () => (
  <div className="root-container">
    <Router>
      <Header></Header>
      <div className="wrapper">
        <Switch>
          <Route path="/detail">
            <Detail />
          </Route>
          <Route path="/new">
            <NewTopic />
          </Route>
          <Route path="/category">
            <NewCate />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  </div>
);

export default App;
