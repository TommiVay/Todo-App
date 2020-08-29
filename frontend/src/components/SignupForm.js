import React, { useState } from "react";
import userService from "../services/user";
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

const SignupForm = ({ handleLogin }) => {
  const history = useHistory();
  const username = useField("text");
  const password = useField("password");
  const confirmPassword = useField("password");
  const [notification, setNotification] = useState(null);

  const notify = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username.value.length < 3 || password.value.length < 3) {
      notify("Username and password must be atleast 3 characters long");
      return;
    }
    if (password.value !== confirmPassword.value) {
      notify("Passwords are not matching");
      password.reset();
      confirmPassword.reset();
      return;
    }
    try {
      await userService.create({
        username: username.value,
        password: password.value,
      });
    } catch (e) {
      notify(e.response.data.error);
      return;
    }
    await handleLogin({
      username: username.value,
      password: password.value,
    });
  };

  const fieldsEmpty = () =>
    (username.value.length &&
      password.value.length &&
      confirmPassword.value.length) !== 0;

  // eslint-disable-next-line no-unused-vars
  const removeReset = ({ reset, ...rest }) => rest;

  return (
    <div className="Login">
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <Alert show={notification !== null} variant="danger">
          {notification}
        </Alert>
        <FormGroup controlId="username" size="large">
          <FormLabel>Username</FormLabel>
          <FormControl autoFocus {...removeReset(username)} />
        </FormGroup>
        <FormGroup controlId="password" size="large">
          <FormLabel>Password</FormLabel>
          <FormControl {...removeReset(password)} />
        </FormGroup>
        <FormGroup controlId="confirmPassword" size="large">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl {...removeReset(confirmPassword)} />
        </FormGroup>
        <Button disabled={!fieldsEmpty()} block size="lg" type="submit">
          Sign up
        </Button>
        <div className="Links">
          <p>Already have an account?</p>
          <p className="Redirect" onClick={() => history.push("/login")}>
            Sign in
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

export default SignupForm;
