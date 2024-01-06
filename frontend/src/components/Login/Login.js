import React, { useState } from "react";
import { useNavigate } from "react-router";

import AuthService from "../../services/AuthService";

import "./Login.css";
import TokenService from "../../services/TokenService";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    AuthService.login(email, password)
      .then((res) => {
        TokenService.setUser({ email, token: res.data.token });
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <h1>Eventify</h1>
      <form className="form">
        <input
          className="input-field"
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
        />
        <input
          className="input-field"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
        />
        <button className="submit-button" onClick={handleSignIn}>
          Sign In
        </button>
      </form>
    </div>
  );
}
