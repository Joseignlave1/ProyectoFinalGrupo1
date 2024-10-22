import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { postLogin } from "../../Services/api";
import "./login.css";
import logo from "../../Images/Logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleDisable = !email || !password;

  const handleSubmit = (email, password) => {
    //postLogin(email, password);
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <div className="logo">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <h1 className="title">fakestagram</h1>
        <form className="login-form" onSubmit={handleSubmit(email, password)}>
          <input
            type="email"
            placeholder="email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="login-button"
            disabled={handleDisable}
          >
            Login
          </button>
        </form>
        <p className="signup-text">
          Create account <a href="/register">here</a>
        </p>
      </Container>
    </>
  );
};

export default Login;
