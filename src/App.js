import './App.css';
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import UserDashboard from './pages/UserDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/CreateAccount" element={<RegisterPage />} />
        <Route exact path="/" element={<RegisterPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/dashboard" element={<UserDashboard />} />
        <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
