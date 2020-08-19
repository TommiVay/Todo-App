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
  const AuthenticatedRoute = ({ children, ...rest }) => {
    return (
      <Route {...rest}>
        {user != null ? children : <Redirect to={{ pathname: "/login" }} />}
      </Route>
    );
  };

  // eslint-disable-next-line no-unused-vars
  const UnauthenticatedRoute = ({ children, ...rest }) => {
    return (
      <Route {...rest}>
        {user === null ? children : <Redirect to={{ pathname: "/todo" }} />}
      </Route>
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

        <UnauthenticatedRoute exact path="/login">
          <LoginForm handleLogin={handleLogin} />
        </UnauthenticatedRoute>

        <AuthenticatedRoute exact path="/todo">
          <TodoPage handleLogout={handleLogout} />
        </AuthenticatedRoute>
      </Switch>
    </Router>
  );
}

export default App;
