import './App.css';
import LoginView from './Views/LoginView';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyProfile from './components/Myprofile';
import SignIn from './components/SingIn';
import Feed from './components/Feed';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/register" element={<SignIn/>} />
          <Route path="/feed" element={<Feed />} />

          <Route path="/Myprofile" element={<MyProfile />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
