/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import TodoPage from "./components/TodoPage";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

/* eslint-enable no-unused-vars */

import loginService from "./services/login";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedTodoAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (credentials) => {
    const user = await loginService.login(credentials);
    window.localStorage.setItem("loggedTodoAppUser", JSON.stringify(user));
    setUser(user);
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  // eslint-disable-next-line no-unused-vars
  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={() =>
          user != null ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          )
        }
      />
    );
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect
            to={{
              pathname: "/todo",
            }}
          />
        </Route>

        <Route exact path="/todo">
          {user != null ? (
            <TodoPage handleLogout={handleLogout} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          )}
        </Route>

        <Route exact path="/login">
          {user === null ? (
            <LoginForm handleLogin={handleLogin} />
          ) : (
            <Redirect
              to={{
                pathname: "/todo",
              }}
            />
          )}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
