import React, { useState } from "react";

import './Login.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    // Perform sign-in logic here
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
