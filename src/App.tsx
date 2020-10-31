import React, { FC } from "react";
// import { Detail, Home, NewTopic, Admin, NewCate } from "./container";
// import { Header } from "./components";
import Route from "./routes";
import "./App.less";

const App: FC = () => (
  <div className="root-container">
    <Route />
    {/* <Router>
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
    </Router> */}
  </div>
);

export default App;
