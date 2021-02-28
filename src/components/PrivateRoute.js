import React from "react";

import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({
  component: Component,
  componentProps,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props => {
        const loginToken = localStorage.getItem("loginToken");
        if (loginToken) return <Component {...props} {...componentProps} />;

        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        );
      }}
    />
  );
}
