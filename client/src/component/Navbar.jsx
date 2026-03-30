import React, { useState } from 'react'
import { Addnote } from "../component/Addnote";
import { Singup } from './Singup';
import "./Navbar.css";

export const Navbar = () => {

  const [show, setShow] = useState(false);
  const data = { "id": "", "title": "", "desc": "" }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  
  const handleLogout = () => {
    sessionStorage.removeItem('email');
    alert("✓ Logged out successfully");
    window.location.reload();
  }

  const userEmail = sessionStorage.getItem("email");

  return (
    <>
      <nav className="navbar-custom">
        <div className="navbar-container">
          <div className="navbar-brand">
            <h1 className="brand-title">
              <i className="fas fa-sticky-note"></i> NotesHub
            </h1>
            <p className="brand-subtitle">Your Ideas, Organized</p>
          </div>

          <div className="navbar-actions">
            {userEmail ? (
              <>
                <div className="user-info">
                  <i className="fas fa-user-circle"></i>
                  <span className="user-email">{userEmail}</span>
                </div>
                <button 
                  className="btn btn-add-note"
                  onClick={handleShow}
                >
                  <i className="fas fa-plus"></i> Add Note
                </button>
                <button 
                  className="btn btn-logout"
                  onClick={handleLogout}
                >
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </>
            ) : (
              <button 
                className="btn btn-login"
                onClick={handleShow2}
              >
                <i className="fas fa-sign-in-alt"></i> Login / Sign Up
              </button>
            )}
          </div>
        </div>
      </nav>

      {show && <Addnote handleClose={handleClose} show={show} data={data} edit={false} />}
      {show2 && <Singup handleClose2={handleClose2} show2={show2} />}
    </>
  );
};
