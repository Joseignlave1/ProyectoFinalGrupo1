import './App.css';
import LoginView from './Views/LoginView';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MyProfile from './components/Myprofile';
import SignIn from './components/SingIn';
import Feed from './components/Feed';
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    setIsAuthenticated(true); // Cambia el estado a autenticado
  };

  // Función para manejar el registro
  const handleRegister = () => {
    setIsAuthenticated(true); // Cambia el estado a autenticado después de registrarse
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<LoginView onLogin={handleLogin} />} />
          <Route path="/register" element={<SignIn onRegister={handleRegister} />} />

          {/* Rutas protegidas */}
          <Route path="/feed" element={isAuthenticated ? <Feed /> : <Navigate to="/" />} />
          <Route path="/myprofile" element={isAuthenticated ? <MyProfile /> : <Navigate to="/" />} />

          {/* Ruta para página no encontrada */}
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;