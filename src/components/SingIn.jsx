import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import "./Login.css";
import { useState } from 'react';
import logo from './Logo.png';
import { useNavigate } from 'react-router-dom';

const SignIn = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();
      if (response.ok) {
        // Guardar el usuario en localStorage o usar un token si es necesario
        localStorage.setItem('newUser', JSON.stringify(newUser));
        // Llamar a la función onRegister para cambiar el estado de autenticación
        onRegister();
        // Redirigir al usuario al Feed o MyProfile
        navigate('/feed');
      } else {
        setErrorMessage(data.message || "Registration failed");
      }
    } catch (error) {
      setErrorMessage("An error occurred during registration");
    }
  };

  return (
    <React.Fragment>
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
          <button type="submit" className="login-button">Create Account</button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p className="signup-text">
          Already have an account? <a href="/login">Login</a>
        </p>
      </Container>
    </React.Fragment>
  );
};

export default SignIn;