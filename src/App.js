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
import SVDashboard from "./pages/SVDashboard.jsx"
import OptDashboard from './pages/OptDashboard.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/CreateAccount" element={<LoginPage />} />
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/dashboard" element={<UserDashboard />} />
        <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
        <Route exact path="/supervisor/dashboard" element={<SVDashboard />} />
        <Route exact path="/operator/dashboard" element={<OptDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
