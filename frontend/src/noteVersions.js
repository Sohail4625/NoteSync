import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const NoteVersions = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [versions, setVersions] = useState([]); 
  const navigate = useNavigate(); 

  // Fetch the note and its versions 
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const getNote = await fetch(`/api/getNote/${id}`);
        const notejson = await getNote.json();
        setNote(notejson);

        const response = await fetch(`/api/versions/${id}`);
        const data = await response.json();
        setVersions(data);
      } catch (err) {
        console.error('Error fetching the note versions', err);
      }
    };

    fetchNote();
  }, [id]);

  // Function to restore a version as the current one
  const handleRestoreVersion = async (versionContent) => {
    try {
      const response = await fetch(`/api/update/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: versionContent }),
      });

      if (response.ok) {
        alert('Version restored successfully');
        navigate('/');
      } else {
        alert('Failed to restore the version');
      }
    } catch (err) {
      alert('Error restoring version');
      console.error('Error restoring the version', err);
    }
  };

  if (!note) {
    return <p>Loading versions...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Versions of {note.title}
        </h1>

        {versions.length === 0 ? (
          <p className="text-gray-600 text-center">No versions available.</p>
        ) : (
          <div className="space-y-6">
            {versions.map((version, index) => (
              <div key={index} className="border rounded-lg p-6 bg-gray-50 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Version {index + 1}</h3>
                <p className="text-gray-700 whitespace-pre-wrap mb-4">{version.content}</p>
                <small className="text-gray-500 block mb-4">
                  Created at: {new Date(version.createdAt).toLocaleString()}
                </small>
                <button
                  onClick={() => handleRestoreVersion(version.content)}
                  className="inline-block text-sm bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700"
                >
                  Make this the Current Version
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteVersions;
