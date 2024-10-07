import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import "./Login.css"
import { useState } from 'react';
import logo from './Logo.png';
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      const user = {
        email: email,
        password: password
      };
      localStorage.setItem('user', JSON.stringify(user));
    
    } else {

      if (password === confirmPassword) {
        const newUser = {
          email: email,
          password: password
        };
        localStorage.setItem('newUser', JSON.stringify(newUser));
      } else {
        alert('Passwords do not match');
      }
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

        {isLogin ? (
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
            <button type="submit" className="login-button">Login</button>
          </form>
        ) : (
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
            <input
              type="password"
              placeholder="confirm password"
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-button">Create Account</button>
          </form>
        )}

        <p className="signup-text">
          {isLogin ? (
            <>
              Create account <a href="#signup" onClick={() => setIsLogin(false)}>here</a>
            </>
          ) : (
            <>
              Already have an account? <a href="#login" onClick={() => setIsLogin(true)}>Login</a>
            </>
          )}
        </p>
      </Container>
    </React.Fragment>
  )
}

export default Login;