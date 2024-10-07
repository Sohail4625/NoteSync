import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [collaborators, setCollaborators] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSaveNote = async (e) => {
    e.preventDefault();

    const newNote = {
      title,
      content,
      collaborators: collaborators.split(',').map(name => name.trim()), 
    };

    try {
      const response = await fetch('/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });

      if (response.ok) {
        alert('Note created successfully!');
        navigate('/'); // Redirect to home page after success
      } else {
        alert('Failed to create note. Please try again.');
      }
    } catch (err) {
      alert('Error creating note.');
      console.error('Error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-8 space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">Create New Note</h1>

        <form onSubmit={handleSaveNote} className="space-y-4">
  
          <div className="form-group">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="form-group">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Note
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter the note content"
              rows="5"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="collaborators" className="block text-sm font-medium text-gray-700">
              Collaborators
            </label>
            <input
              type="text"
              id="collaborators"
              value={collaborators}
              onChange={(e) => setCollaborators(e.target.value)}
              placeholder="Add names separated by commas"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
