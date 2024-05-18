const mongoose = require('mongoose');
const { Schema } = mongoose;

// Définissez le schéma du message avec Mongoose
const messageSchema = new Schema({
  id: { type: String, default: () => cuid(), index: true, unique: true },
  text: { type: String, index: 'text' },
  isUserMessage: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  userId: { type: String },
  File: { type: Schema.Types.ObjectId, ref: 'User' },
  
  // Ajoutez d'autres champs ici en fonction de vos besoins
});

// Mettez à jour la date de mise à jour avant chaque sauvegarde
messageSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Créez un modèle à partir du schéma
const message = mongoose.model('Message', messageSchema);

module.exports = message;
function cuid() {
    throw new Error("Function not implemented.");
}

