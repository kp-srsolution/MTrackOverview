// Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from "../logo4.png";
import { Modal, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  if (loading) return <p>Loading dashboard...</p>;

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="main-container">
      <div className="user-dashboard-container" style={{
        paddingBottom: "150px"
      }}>
        <nav className="admin-nav-bar" style={{ position: "fixed", left: 0, zIndex: "100" }}>
          <div className="admin-nav-content-container">
            <div className="admin-nav-logo-container">
              <img src={logo} alt="Dashboard" style={{
                width: "auto",
                height: "60px",
                borderRadius: "9px"
              }} />
              {/* <div className="tabs-container">
                <div className="tab-container">
                  <div className="tab" onClick={() => handleTabChange(1)}>
                    <div className={"indicator" + (selectedTab === 1 ? " active-indicator" : "")}>
                      PRODUCTS' DATA
                    </div>
                  </div>
                  <div className="tab" onClick={() => handleTabChange(2)}>
                    <div className={"indicator" + (selectedTab === 2 ? " active-indicator" : "")}>
                      REPORTS
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="admin-nav-option-container">
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", color: "red", cursor: "pointer", fontSize: "18px", fontWeight: "600" }} onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}>LOGOUT <LogoutIcon style={{ marginLeft: "5px", fontSize: "17px", fontWeight: "700" }} /></div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}