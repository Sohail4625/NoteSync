const mongoose = require('mongoose');

// Schema for the notes
const noteSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  versions: [{ content: String, createdAt: Date }],  // Stores version history
  collaborators: [{ type: String }],  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', noteSchema);
