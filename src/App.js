import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Views/Login/Login";
import Register from "./Views/Register/Register";
import Feed from './Views/Feed/Feed';
import Profile from './Views/Profile/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
