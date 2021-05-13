import React, { ReactElement } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import {
  Login,
  CreateOrder,
  Home,
  Sales,
  Purchases,
  Register,
  EditOrder,
  ViewOrder,
  Panel,
} from "./pages";

const PrivateRoute = ({
  children,
  ...rest
}: {
  children: ReactElement;
  path: string;
  exact?: boolean;
}) => {
  const { user } = React.useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export function Routes() {
  return (
    <Router>
      {/*Public Routes*/}
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>

        {/*Private Routes*/}
        <PrivateRoute exact path="/create">
          <CreateOrder />
        </PrivateRoute>
        <PrivateRoute exact path="/sales">
          <Sales />
        </PrivateRoute>
        <PrivateRoute exact path="/purchases">
          <Purchases />
        </PrivateRoute>
        <PrivateRoute path="/:orderType/:orderId/edit">
          <EditOrder />
        </PrivateRoute>
        <PrivateRoute path="/:orderType/:orderId/view">
          <ViewOrder />
        </PrivateRoute>
        <PrivateRoute exact path="/panel">
          <Panel />
        </PrivateRoute>

        <Route path="*">
          <div style={{ marginTop: "200px", marginRight: "200px" }}>
            NOT FOUND!
          </div>
        </Route>
      </Switch>
    </Router>
  );
}
