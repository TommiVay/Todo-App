import React, { useState } from "react";
import { useField } from "../hooks/useField";
import { useHistory } from "react-router-dom";
import logo from "./img/GitHub-Mark-Light-32px.png";
/* eslint-disable no-unused-vars */
import {
  Alert,
  Button,
  FormGroup,
  FormControl,
  FormLabel,
} from "react-bootstrap";
/* eslint-enable no-unused-vars */

const LoginForm = ({ handleLogin }) => {
  const history = useHistory();
  const username = useField("text");
  const password = useField("password");
  const [notification, setNotification] = useState(null);

  const notify = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleLogin({
        username: username.value,
        password: password.value,
      });
    } catch (e) {
      notify(e.response.data.error);
      username.reset();
      password.reset();
    }
  };

  const fieldsEmpty = () =>
    (username.value.length && password.value.length) !== 0;

  // eslint-disable-next-line no-unused-vars
  const removeReset = ({ reset, ...rest }) => rest;
  return (
    <div className="Login">
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <h2>Sing in</h2>
        <Alert show={notification != null} variant="danger">
          {notification}
        </Alert>
        <FormGroup controlId="email" size="lg">
          <FormLabel>Username</FormLabel>
          <FormControl autoFocus {...removeReset(username)} />
        </FormGroup>
        <FormGroup controlId="password" size="lg">
          <FormLabel>Password</FormLabel>
          <FormControl {...removeReset(password)} />
        </FormGroup>
        <Button disabled={!fieldsEmpty()} block size="lg" type="submit">
          Sing in
        </Button>
        <div className="Links">
          <p>or</p>
          <p className="Redirect" onClick={() => history.push("/register")}>
            create an account
          </p>
          <a
            href="https://github.com/TommiVay"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={logo} alt="Github" />
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
