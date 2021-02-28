import "./App.scss";
import UserTableContainer from "./containers/UserTable";
import UserDetailsContainer from "./containers/UserDetails";
import UserNotFound from "./components/UserDetails/UserNotFound";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginContainer from "./containers/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <LoginContainer />
          </Route>
          <PrivateRoute
            component={UserDetailsContainer}
            path="/add-user"
            componentProps={{ type: "add" }}
          />

          <PrivateRoute
            component={UserDetailsContainer}
            path="/users"
            componentProps={{ type: "edit" }}
          />

          <PrivateRoute component={UserTableContainer} exact path="/" />

          <Route>
            <UserNotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
