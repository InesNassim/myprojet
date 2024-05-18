// models/File.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  }
  // Autres champs de fichier
});

module.exports = mongoose.model('File', fileSchema);
