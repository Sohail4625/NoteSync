import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom"; 

const CollaborativeNote = () => {
  const { noteId } = useParams(); 
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Fetch initial content and title from the server for the given noteId
    const fetchNote = async () => {
      try {
        const response = await fetch(`/api/getNote/${noteId}`);
        const respjson = await response.json();
        const { title, content } = respjson;
        setTitle(title);
        setContent(content);
      } catch (error) {
        console.error("Error fetching the note:", error);
      }
    };

    fetchNote();

    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    // Listen for updates from other clients
    newSocket.on("noteUpdated", ({ noteId: updatedNoteId, content: updatedContent }) => {
      if (updatedNoteId === noteId) {
        setContent(updatedContent);
      }
    });

    // Handle unsaved changes before navigating away
    const handleBeforeUnload = (event) => {
      if (!isSaving) {
        event.preventDefault();
        event.returnValue = "You have unsaved changes. Are you sure you want to leave?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      newSocket.disconnect();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [noteId, isSaving]);

  const handleContentChange = (e) => {
    const updatedContent = e.target.value;
    setContent(updatedContent);

    // Emit the updateNote event to the server
    if (socket) {
      socket.emit("updateNote", noteId, updatedContent);
    }
  };

  const handleSave = async () => {
    setIsSaving(true); 

    try {
      const response = await fetch(`/api/update/${noteId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content }),
      });

      // Check if the update was successful
      if (response.status === 200) {
        alert("Note saved successfully!");
        navigate("/");
      } else {
        alert("Failed to save the note. Please try again.");
        setIsSaving(false); 
      }
    } catch (error) {
      console.error("Error saving the note:", error);
      alert("An error occurred while saving the note.");
      setIsSaving(false); 
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Collaborative Note: {title}
        </h2>
        <textarea
          className="w-full p-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-4"
          value={content}
          onChange={handleContentChange}
          placeholder="Start collaborating on this note..."
          rows="10"
        />
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-6 py-2 text-white font-semibold rounded-lg ${
              isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            } transition duration-300`}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollaborativeNote;
