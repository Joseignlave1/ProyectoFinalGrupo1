import { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { postLogin } from "../../Services/api";
import "./login.css";
import logo from "../../Images/Logo.png";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleDisable = !email || !password;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await postLogin(email, password);
      // Guardamos token JWT en localStorage
      localStorage.setItem("jwt-token", data.token);
      localStorage.setItem("user-id", data._id);
      localStorage.setItem("username", data.username);
      navigate("/feed");
    } catch (error) {
      setErrorMessage("Credenciales Incorrectas, Intente nuevamente");
    }
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <div className="logo">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <h1 className="title">Fakestagram</h1>
        <form className="login-form" onSubmit={handleSubmit}>
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
            Ingresar
          </button>
        </form>
        <p className="signup-text">
          Crear cuenta <a href="/register">Ingresa aquí</a>
        </p>
        {errorMessage && <p>{errorMessage}</p>}
      </Container>
    </>
  );
};

export default Login;
