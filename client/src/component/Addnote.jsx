import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./Addnote.css";

export const Addnote = ({show,handleClose,edit,data}) => {
  const [title, setTitle] = useState(data.title || "");
  const [description, setDescription] = useState(data.desc || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!title.trim() || !description.trim()) {
      setError("Title and description cannot be empty");
      return;
    }

    setLoading(true);
    try {
      if(edit){
        const res = await fetch(`http://localhost:9090/api/notes/${data.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description }),
        });
        if (res.ok) {
          alert("✓ Note updated successfully");
          setTitle("");
          setDescription("");
          handleClose();
          window.location.reload();
        } else {
          setError("Failed to update note");
        }
      } else {
        const res = await fetch(`http://localhost:9090/api/notes/${sessionStorage.getItem("email")}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description }),
        });
        if (res.ok) {
          alert("✓ Note created successfully");
          setTitle("");
          setDescription("");
          handleClose();
          window.location.reload();
        } else {
          setError("Failed to create note");
        }
      }
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };
     



  return (
    <>
      <Modal show={show} onHide={handleClose} centered className="note-modal" size="lg">
        <Modal.Header closeButton className="note-modal-header">
          <Modal.Title className="note-modal-title">
            {edit ? "✏️ Edit Note" : "📝 Create New Note"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="note-modal-body">
          {error && (
            <div className="alert alert-danger error-alert">
              <i className="fas fa-exclamation-circle"></i> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="note-form">
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                <i className="fas fa-heading"></i> Note Title
              </label>
              <input
                type="text"
                id="title"
                className="form-control note-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title..."
                disabled={loading}
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">
                <i className="fas fa-pen"></i> Note Content
              </label>
              <textarea
                id="description"
                className="form-control note-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write your note here..."
                rows={6}
                disabled={loading}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="note-modal-footer">
          <Button 
            variant="secondary" 
            onClick={handleClose}
            disabled={loading}
            className="btn-cancel"
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSubmit}
            disabled={loading}
            className="btn-save"
          >
            {loading ? "Saving..." : (edit ? "Update Note" : "Create Note")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
