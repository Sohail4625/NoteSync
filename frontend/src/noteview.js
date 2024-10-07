import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const NoteDetails = () => {
  const { id } = useParams(); 
  const [note, setNote] = useState(null); 
  const navigate = useNavigate();

  // Fetch the note details
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`/api/getNote/${id}`);
        const respjson = await response.json();
        console.log(respjson);
        setNote(respjson);
      } catch (err) {
        console.error('Error fetching the note', err);
      }
    };

    fetchNote();
  }, [id]);

  // Redirection for editing the note
  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  // Redirection to view note versions
  const handleViewVersions = () => {
    navigate(`/versions/${id}`);
  };

  // Note deletion
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this note?');
    if (confirmDelete) {
      try {
        const response = await fetch(`/api/delete/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Note deleted successfully');
          navigate('/'); 
        } else {
          alert('Failed to delete the note');
        }
      } catch (err) {
        alert('Error deleting the note');
        console.error('Error deleting the note', err);
      }
    }
  };

  if (!note) {
    return <p>Loading note...</p>;
  }

  return (
    <div className="note-details">
      <div className="note-actions">
        <button onClick={handleEdit}>Edit Note</button>
        <button onClick={handleViewVersions}>View Versions</button>
        <button onClick={handleDelete}>Delete Note</button>
      </div>

      <h1>{note.title}</h1>
      <p>{note.content}</p>

      <div className="note-meta">
        <small>Last updated: {new Date(note.updatedAt).toLocaleString()}</small>
      </div>
    </div>
  );
};

export default NoteDetails;
