import logo from './logo.svg';
import './App.css';
import LoginView from './Views/LoginView';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyProfile from './components/Myprofile';
import SignIn from './components/SignIn'; 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/register" element={<LoginView />} />
          <Route path="/singIn" element={<SignIn />} /> 
          <Route path="/Myprofile" element={<MyProfile />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
