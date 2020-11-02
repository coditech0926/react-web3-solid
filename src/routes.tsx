import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Detail, Home, NewTopic, Admin, NewCate, Login } from "./container";
import { PrivateLayout, NotLoggedLayout } from "./layouts";
import { Header } from "./components";
const routesList = [
  {
    id: "detail",
    path: "/detail",
    component: Detail,
  },
  {
    id: "new",
    path: "/new",
    component: NewTopic,
  },
  {
    id: "category",
    path: "/category",
    component: NewCate,
  },
  {
    id: "admin",
    path: "/admin",
    component: Admin,
  },
  {
    id: "home",
    path: "/",
    component: Home,
  },
];

const Routes = () => (
  <Router>
    <Header></Header>
    <div className="wrapper">
      <Switch>
        <NotLoggedLayout
          component={Login}
          path="/login"
          exact
        ></NotLoggedLayout>
        <PrivateLayout path="/" routes={routesList}></PrivateLayout>
      </Switch>
    </div>
  </Router>
);

export default Routes;
