/**
 * 包裹登录前的页面：登录页
 */
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { withWebId } from "@inrupt/solid-react-components";

const NotLoggedInLayout = (props) => {
  const { component: Component, webId, ...rest } = props;
  return !webId ? (
    <Route
      {...rest}
      component={(matchProps) => <Component {...matchProps} />}
    />
  ) : (
    <Redirect to="/" />
  );
};

export default withWebId(NotLoggedInLayout);
