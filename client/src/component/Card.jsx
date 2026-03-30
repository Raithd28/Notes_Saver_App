import React, { useState } from "react";
import { Addnote } from "../component/Addnote";
import { API } from "../config/api";
import "./Card.css";

export const Card = ({ id, title, desc , date}) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const data={"id":id,"title":title,"desc":desc}
  
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        const res = await fetch(`${API.ENDPOINTS.NOTES_BASE}/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          alert("✓ Note deleted successfully");
          window.location.reload();
        } else {
          alert("Error deleting note");
        }
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "No date";
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <>
      <div className="note-card">
        <div className="note-header">
          <h5 className="note-title">{title}</h5>
          <span className="note-date">
            <i className="fas fa-calendar-alt"></i> {formatDate(date)}
          </span>
        </div>

        <div className="note-content">
          <p className="note-description">{desc}</p>
        </div>

        <div className="note-actions">
          <button 
            className="note-btn edit-btn"
            onClick={handleShow}
            title="Edit note"
          >
            <i className="fas fa-edit"></i>
          </button>
          <button 
            className="note-btn delete-btn"
            onClick={handleDelete}
            title="Delete note"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>

      {show && <Addnote handleClose={handleClose} show={show} data={data} edit={true} />}
    </>
  );
};
