import React from "react";
import { useField } from "../hooks/useField";

const LoginForm = ({ handleLogin }) => {
  const username = useField("text");
  const password = useField("password");

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleLogin({
      username: username.value,
      password: password.value,
    });
    username.reset();
    password.reset();
  };

  // eslint-disable-next-line no-unused-vars
  const removeReset = ({ reset, ...rest }) => rest;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input {...removeReset(username)} />
      </div>
      <div>
        <input {...removeReset(password)} />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
