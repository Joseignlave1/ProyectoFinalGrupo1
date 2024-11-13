import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Views/Login/Login";
import Register from "./Views/Register/Register";
import Feed from './Views/Feed/Feed';
import Profile from './Views/Profile/Profile';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
            <Route path="*" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />
          <Route
            path="user/profile/:id"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
