/**
 * 包裹登录后的页面以及路由
 */
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { withAuthorization } from "@inrupt/solid-react-components";

const PrivateLayout = ({ routes, webId, location, history, ...rest }) => {
  return (
    <React.Fragment>
      <Route
        {...rest}
        component={() => (
          <Switch>
            {routes.map((route) => {
              const { component: RouteComponent } = route;
              return (
                <Route
                  key={route.id}
                  path={route.path}
                  render={(routerProps) => (
                    <RouteComponent {...routerProps} webId={webId} />
                  )}
                  webId={webId}
                  exact
                />
              );
            })}
            <Redirect to="/404" />
          </Switch>
        )}
      />
    </React.Fragment>
  );
};

export default withAuthorization(PrivateLayout);
