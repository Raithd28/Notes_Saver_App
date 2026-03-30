import React, { useEffect, useState } from "react";
import { Card } from "../component/Card";
import { Navbar } from "../component/Navbar";
import "./Home.css";

export const Home = () => {
  const [data, setData] = useState(null);
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getData = async () => {
    try {
      const email = sessionStorage.getItem("email");
      if (!email) {
        setLoading(false);
        return;
      }

      const response = await fetch(`http://localhost:9090/api/notes/${email}`);
      if (response.ok) {
        const json = await response.json();
        setData(json || []);
        setError("");
      } else {
        setError("Failed to load notes");
        setData([]);
      }
    } catch (err) {
      setError("Error loading notes: " + err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    setFlag(email);
    getData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="home-container">
        {!flag ? (
          <div className="welcome-section">
            <div className="welcome-content">
              <h1 className="welcome-title">Welcome to NotesHub 📝</h1>
              <p className="welcome-subtitle">
                Keep your ideas organized and never forget important information
              </p>
              <div className="welcome-features">
                <div className="feature">
                  <i className="fas fa-lightbulb"></i>
                  <h3>Capture Ideas</h3>
                  <p>Write down your thoughts instantly</p>
                </div>
                <div className="feature">
                  <i className="fas fa-sync"></i>
                  <h3>Stay Organized</h3>
                  <p>Manage all your notes in one place</p>
                </div>
                <div className="feature">
                  <i className="fas fa-shield-alt"></i>
                  <h3>Secure & Safe</h3>
                  <p>Your notes are encrypted and private</p>
                </div>
              </div>
              <p className="auth-prompt">
                <i className="fas fa-arrow-right"></i> 
                Click "Login / Sign Up" to get started!
              </p>
            </div>
          </div>
        ) : (
          <div className="notes-section">
            <div className="section-header">
              <h2 className="section-title">
                <i className="fas fa-sticky-note"></i> My Notes
              </h2>
              <p className="section-subtitle">
                {data && data.length > 0 
                  ? `You have ${data.length} note${data.length !== 1 ? 's' : ''}`
                  : "No notes yet"}
              </p>
            </div>

            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
                <p>Loading your notes...</p>
              </div>
            ) : error ? (
              <div className="error-message">
                <i className="fas fa-exclamation-triangle"></i>
                <p>{error}</p>
              </div>
            ) : data && data.length > 0 ? (
              <div className="notes-grid">
                {data.map((note) => (
                  <Card 
                    key={note.id} 
                    id={note.id} 
                    title={note.title} 
                    date={note.date}
                    desc={note.description}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <i className="fas fa-inbox"></i>
                <h3>No Notes Yet</h3>
                <p>You haven't created any notes. Click "Add Note" to get started!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
