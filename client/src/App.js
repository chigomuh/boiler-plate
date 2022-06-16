import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import CheckAuth from "./hoc/auth";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={CheckAuth(LandingPage, null)} />
          <Route path="/login" element={CheckAuth(LoginPage, false)} />
          <Route path="/register" element={CheckAuth(RegisterPage, false)} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
