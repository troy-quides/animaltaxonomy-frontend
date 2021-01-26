import React, { useState } from "react";
import App from "./App";
import axios from "axios";

export default function Landing() {
  const userURL = "https://animaltaxonomy.herokuapp.com/user/";
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggingIn, setLoggingIn] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    const req = {
      username: username,
      password: password,
    };
    axios
      .post(`${userURL}login`, req)
      .then((res) => {
        console.log(res);
        localStorage.setItem("userToken", res.data.token);
        setLoggedIn(true);
      })
      .catch(() => alert("Invalid credentials"));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const req = {
      username: username,
      password: password,
    };
    axios
      .post(`${userURL}signup`, req)
      .then((res) => {
        console.log(res);
        alert("You're all signed up!");
        setLoggingIn(true);
      })
      .catch((error) => {
        console.log(error);
        alert("Invalid input");
      });
  };

  return loggedIn || localStorage.getItem("userToken") ? ( // check localStorage to check if logged out or not on reload
    <App />
  ) : (
    <div className="login vertical-center">
      <div className="container">
        {loggingIn ? <h2>Login</h2> : <h2>Sign Up</h2>}
        <form method="post" onSubmit={loggingIn ? handleLogin : handleSignUp}>
          <label>Username: </label>
          <input
            type="text"
            name="username"
            min="6"
            max="255"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password: </label>
          <input
            type="password"
            name="password"
            min="6"
            max="255"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Submit</button>
        </form>
        {loggingIn ? (
          <button onClick={(e) => setLoggingIn(false)}>Register</button>
        ) : (
          <button onClick={(e) => setLoggingIn(true)}>Cancel</button>
        )}
      </div>
    </div>
  );
}
