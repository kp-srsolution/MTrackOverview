import React, { useState, useEffect } from 'react';
import '../CSS/style.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SpinLoader from "../components/SpinLoader.tsx"
import logo from "../MTrack transparent.png";
import data from "../data/userData.jsx"
import userdata from '../data/userData.jsx';

const LoginPage = () => {

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(1);
  const [passwordValid, setPasswordValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();

  useEffect(
    () => {
      const token = localStorage.getItem("token");

      if (token) {
        navigate("/dashboard");
      }
    }, []);

  const validatePassword = (pw) => {
    // Regex for 8+ characters, mix of letters, numbers, and symbols
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]|:;"'<>,.?/~`]).{8,}$/;
    return regex.test(pw);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordValid(validatePassword(newPassword));
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailValid(validateEmail(newEmail));
  };

  const handleRoles = (count) => {
    if (count === 1) {
      if (role !== count) {
        setRole(count);
      }
    } else if (count === 2) {
      if (role !== count) {
        setRole(count);
      }
    } else if (count === 3) {
      if (count !== role) {
        setRole(count);
      }
    } else if (count === 4 && count !== role) {
      setRole(count);
    }
  }

  const handleSubmit = async () => {
    console.log(password, passwordValid, role);
    try {
      setLoading(true);
      console.log(userdata);
      
      // const result = await axios.post(
      //   "http://localhost:5000/api/users/login",
      //   {
      //     email,
      //     password,
      //     type: role.toString(),
      //   },
      //   {
      //     headers: { "Content-Type": "application/json" }
      //   }
      // );
      // console.log(result.data.user);

      for (let i = 0; i < userdata.length; i++) {
        if (userdata[i].email == email && userdata[i].password == password) {
          localStorage.setItem("firstname", userdata[i].firstname);
          localStorage.setItem("lastname", userdata[i].lastname);
          localStorage.setItem("email", userdata[i].email);
          localStorage.setItem("type", userdata[i].type);
          if (userdata[i].type == 4) {
            navigate("/admin/dashboard");
          } else if(userdata[i].type == 3) {
            navigate("/supervisor/dashboard");
          } else {
            navigate("/operator/dashboard");
          }
          break;
        }
        if (i === userdata.length - 1) {
          setLoginError(true);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="main-container">
      <div className="login-container">
        <div className="logo-container" style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "600px",
        }}>
          <img src={logo} alt="" style={{
            width: "150px",
            height: "auto",
          }} />
        </div>
        <div className="register-form-box">
          <div className="form-header-container poppins-medium" style={{
            color: "#264D78"
          }}>
            Log into your account
            <b style={{ fontSize: "11px", fontWeight: "300", textAlign: "right" }}>
              Don't you have any account? <Link to="/createaccount">Signup</Link> here.
            </b>
          </div>
          <div className="form-inputs-container">
            <div className="form-input-cont">
              <label htmlFor="role">Select your role</label>
              <div className="role-selection-bar">
                <div className="role-container login-role-container" style={role === 1 ? { color: "#efefef", backgroundColor: "#264D78", fontWeight: "700" } : { color: "#090909", backgroundColor: "transparent", fontWeight: "400" }} onClick={() => handleRoles(1)}>Operator</div>
                <div className="role-container login-role-container" style={role === 3 ? { color: "#efefef", backgroundColor: "#264D78", fontWeight: "700" } : { fontWeight: "400", color: "#090909", backgroundColor: "transparent" }} onClick={() => handleRoles(3)}>Supervisor</div>
                <div className="role-container login-role-container" style={role === 4 ? { color: "#efefef", backgroundColor: "#264D78", fontWeight: "700" } : { fontWeight: "400", color: "#090909", backgroundColor: "transparent" }} onClick={() => handleRoles(4)}>Admin</div>
              </div>
            </div>
            <div className="form-input-cont">
              <label htmlFor="email">Enter your email</label>
              <input type="text" className="form-input" name="email" id="email" placeholder="Enter email" onChange={(e) => handleEmailChange(e)} />
              {!emailValid && email.length > 0 && (
                <b style={{ color: 'red', fontSize: "13px", fontWeight: "500" }}>
                  Enter valid email address.
                </b>
              )}
            </div>
            <div className="form-input-cont">
              <label htmlFor="password">Create your password</label>
              <input type="text" className="form-input" name="password" id="password" placeholder="Enter password" onChange={(e) => handlePasswordChange(e)} />
              {!passwordValid && password.length > 0 && (
                <b style={{ color: 'red', fontSize: "13px", fontWeight: "500" }}>
                  Password must be 8 or more characters with a mix of letters, numbers, and symbols.
                </b>
              )}
            </div>
            <div className="form-input-cont">
              <input type="button" className="login-submit-button" style={!passwordValid || email === '' ? { backgroundColor: "grey", cursor: "default" } : { backgroundColor: "#264D78", cursor: "pointer", }} value={loading ? "" : "Login"} onClick={passwordValid && email !== '' ? () => handleSubmit() : undefined} />
              <b style={{ fontSize: "13px", fontWeight: "500", textAlign: "center" }}>
                Don't you have any account? <Link to="/createaccount">Signup</Link> here.
              </b>
              {
                loading ? <SpinLoader /> : <></>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default LoginPage;