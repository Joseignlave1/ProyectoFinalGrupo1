import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { postSingin } from "../../Services/api";
import "./register.css";
import logo from "../../Images/Logo.png";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await postSingin(username, email, password);
      localStorage.setItem("jwt-token", data.token);
      
      navigate("/");
      return data;
    } catch (error) {
      
    }
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <div className="logo">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <h1 className="title">fakestagram</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="username"
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
          <button type="submit" className="login-button">
            Create Account
          </button>
        </form>
        <p className="signup-text">
          Already have an account?{" "}
          <a href="/" onClick={() => (window.location.href = "/login")}>
            Login
          </a>
        </p>
      </Container>
    </>
  );
};

export default Register;
