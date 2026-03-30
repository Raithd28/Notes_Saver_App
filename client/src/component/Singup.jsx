import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { API } from "../config/api";
import "./AuthModal.css";

export const Singup = ({show2,handleClose2}) => {
  
  const [login, setLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPass, setCPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    if(login){
      if (!email || !password) {
        setErrorMsg("Please fill in all fields");
        setLoading(false);
        return;
      }

      const data = {
        email,
        password,
      };
      try {
        const res = await fetch(API.ENDPOINTS.LOGIN, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        
        if (res.status === 200) {
          const json = await res.json();
          if(json && json.email) {
            sessionStorage.setItem('email', json.email);
            setErrorMsg("");
            alert("✓ Login Successful!");
            setTimeout(() => window.location.reload(), 500);
          } else {
            setErrorMsg("Invalid response from server");
          }
        } else if (res.status === 401) {
          setErrorMsg("❌ Invalid email or password. Please try again or sign up.");
        } else {
          setErrorMsg("Login error: " + res.status);
        }
      } catch(error) {
        setErrorMsg("Connection error: " + error.message);
      }
    } else {
      if (!name || !email || !password || !cPass) {
        setErrorMsg("Please fill in all fields");
        setLoading(false);
        return;
      }

      if (password !== cPass) {
        setErrorMsg("❌ Passwords do not match");
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setErrorMsg("Password must be at least 6 characters");
        setLoading(false);
        return;
      }

      const data = {
        name,
        email,
        password,
      };
      try {
        const res = await fetch(API.ENDPOINTS.SIGNUP, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        
        if (res.status === 200) {
          const json = await res.json();
          sessionStorage.setItem('email', json.email);
          setErrorMsg("");
          alert("✓ Signup Successful! You can now login.");
          setName("");
          setEmail("");
          setPassword("");
          setCPass("");
          setLogin(true);
        } else {
          setErrorMsg("Signup failed: " + res.status);
        }
      } catch(error) {
        setErrorMsg("Signup error: " + error.message);
      }
    }
    setLoading(false);
  };
  return (
    <>      
      <Modal show={show2} onHide={handleClose2} centered className="auth-modal">
        <Modal.Header closeButton className="auth-header">
          <Modal.Title className="auth-title">
            {login ? "Welcome Back 👋" : "Create Account 📝"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="auth-body">
          <div className="auth-container">
            <div className="auth-form">
              
              {errorMsg && (
                <div className="alert alert-danger error-message">
                  {errorMsg}
                </div>
              )}

              {!login && (
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control auth-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    disabled={loading}
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control auth-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control auth-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                />
              </div>

              {!login && (
                <div className="form-group">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control auth-input"
                    value={cPass}
                    onChange={(e) => setCPass(e.target.value)}
                    placeholder="••••••••"
                    disabled={loading}
                  />
                </div>
              )}

              <button
                className="btn btn-auth w-100"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Processing..." : (login ? "Login" : "Create Account")}
              </button>

              <div className="auth-footer">
                <p className="toggle-text">
                  {login ? "Don't have an account? " : "Already have an account? "}
                  <a 
                    className="toggle-link" 
                    onClick={() => {
                      setLogin(!login);
                      setErrorMsg("");
                      setName("");
                      setEmail("");
                      setPassword("");
                      setCPass("");
                    }}
                  >
                    {login ? "Sign Up" : "Login"}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
