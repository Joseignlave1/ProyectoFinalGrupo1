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
    const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await postSingin(username, email, password);
      // Guardamos token JWT en localStorage
      localStorage.setItem("jwt-token", data.token);
      // Redirige al feed
      navigate("/feed");
    } catch (error) {
      setErrorMessage("Error al crear el usuario, Intente nuevamente");
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
            Crear cuenta
          </button>
        </form>
        <p className="signup-text">
          Ya tienes una cuenta?{" "}
          <a href="/" onClick={() => (window.location.href = "/login")}>
            Login
          </a>
        </p>
        {errorMessage && <p>{errorMessage}</p>}
      </Container>
    </>
  );
};

export default Register;
