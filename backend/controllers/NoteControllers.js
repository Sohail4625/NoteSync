const mongoose = require("../config/db");
const Note = require("../models/notesdb");

// Get all the notes from the database
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};


// create a new note and add it to the database
const createNote = async (req, res) => {
    const { title, content, collaborators } = req.body;
  try {
    const newNote = new Note({ title, content, collaborators });
    newNote.createdAt = new Date()
    newNote.updatedAt = new Date()
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all the versions of a note and return it to the user
const getVersions = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        res.status(200).json(note.versions);
      } catch (err) {
        res.status(500).json({ message: "Server Error" });
      }
}

// Getting the data of a specific note
const getNote = async (req, res) => {
  try {
    const notes = await Note.findById(req.params.id);
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Updating a note 
const updateNote = async (req, res) => {
  const { content } = req.body;
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    note.versions.push({ content: note.content, createdAt: new Date() });
    note.content = content;
    note.updatedAt = new Date();

    await note.save();
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Deleting a note
const deleteNote = async (req, res) => {
  console.log(req.params.id);
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    console.log(note);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getNotes, createNote, updateNote, deleteNote, getNote, getVersions };
