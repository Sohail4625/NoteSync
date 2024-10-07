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
    return <p className="text-center mt-4">Loading note...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{note.title}</h1>
        <div className="space-x-2">
          <button 
            onClick={handleEdit} 
            className="px-4 py-2 bg-blue-500 text-sm text-white rounded hover:bg-blue-600 transition">
            Edit Note
          </button>
          <button 
            onClick={handleViewVersions} 
            className="px-4 py-2 bg-green-500 text-sm text-white rounded hover:bg-green-600 transition">
            View Versions
          </button>
          <button 
            onClick={handleDelete} 
            className="px-4 py-2 bg-red-500 text-sm text-white rounded hover:bg-red-600 transition">
            Delete Note
          </button>
        </div>
      </div>

      <p className="text-gray-700 mb-4">{note.content}</p>

      <div className="note-meta">
        <small className="text-gray-500">
          Last updated: {new Date(note.updatedAt).toLocaleString()}
        </small>
      </div>
    </div>
  );
};

export default NoteDetails;
