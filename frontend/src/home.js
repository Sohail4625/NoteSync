import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  // Fetch all notes when the page is loaded
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('/api/getNotes');
        const respjson = await response.json();
        console.log(respjson)
        setNotes(respjson);
      } catch (err) {
        console.error('Error fetching notes', err);
      }
    };

    fetchNotes();
  }, []);

  // Redirection for editing a note
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  // Redirection to view note versions
  const handleViewVersions = (id) => {
    navigate(`/versions/${id}`);
  };

  //  Note deletion
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this note?');
    if (confirmDelete) {
      try {
        const response = await fetch(`/api/delete/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Note deleted successfully');
          window.location.reload(); 
        } else {
          alert('Failed to delete the note');
        }
      } catch (err) {
        alert('Error deleting the note');
        console.error('Error deleting the note', err);
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">NoteSync</h1>
      <div className="flex justify-end mb-4">
        <Link
          to={'/new'}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          New Note
        </Link>
      </div>

      {notes.length === 0 ? (
        <p className="text-center text-gray-500">No notes available.</p>
      ) : (
        <div className="">
          {notes.map(note => (
            <div
              key={note._id}
              className="bg-white p-6 rounded-lg shadow-lg mb-3 hover:shadow-lg transform hover:scale-105 transition duration-300"
            >
              <h2 className="text-2xl font-semibold mb-2">
                <Link to={`/notes/${note._id}`} className="hover:text-blue-500 underline">
                  {note.title}
                </Link>
              </h2>
              <p className="text-gray-700 mb-4">{note.content.substring(0, 30)}...</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(note._id)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-semibold py-1 px-3 rounded transition duration-300"
                >
                  Edit Note
                </button>
                <button
                  onClick={() => handleViewVersions(note._id)}
                  className="bg-green-400 hover:bg-green-500 text-sm text-white font-semibold py-1 px-3 rounded transition duration-300"
                >
                  View Versions
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="bg-red-500 hover:bg-red-600 text-sm text-white font-semibold py-1 px-3 rounded transition duration-300"
                >
                  Delete Note
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesList;
