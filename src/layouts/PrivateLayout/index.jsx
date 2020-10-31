import React, { useCallback, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import {
  withAuthorization,
  //AppPermission,
  //AccessControlList,
} from "@inrupt/solid-react-components";

const PrivateLayout = ({ routes, webId, location, history, ...rest }) => {
  const checkPermissions = useCallback(async () => {}, [webId]);

  useEffect(() => {
    if (webId) checkPermissions();
  }, [webId]);

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
