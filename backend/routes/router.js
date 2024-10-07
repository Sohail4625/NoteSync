const express = require('express');
const router = express.Router();

const { getNotes, createNote, updateNote, deleteNote, getNote, getVersions } = require("../controllers/NoteControllers")

// Creating a new note
router.post('/api/create', createNote);  

// Deleting a note
router.delete("/api/delete/:id", deleteNote);

// Updating a note
router.post('/api/update/:id', updateNote);  

// Getting a note from database
router.get("/api/getNote/:id", getNote); 

// Get all notes
router.get("/api/getNotes",getNotes)

// Get all versions
router.get("/api/versions/:id",getVersions)

module.exports = router;
