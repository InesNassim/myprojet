
// Interface décrivant les propriétés d'un document de fichier
/*export interface IFile extends Document {
  key: string;
  name: string;
  userId: string;
  url: string;
  uploadStatus: string;
  fileType: string;
}

// Schéma Mongoose pour le modèle de fichier
const FileSchema: Schema = new Schema({
  key: { type: String, required: true },
  name: { type: String, required: true },
  userId: { type: String, required: true },
  url: { type: String, required: true },
  uploadStatus: { type: String, required: true },
  fileType: { type: String, required: true },
});

// Export du modèle de fichier
export default mongoose.model<IFile>('File', FileSchema);*/


import mongoose, { Schema } from 'mongoose';

const fileSchema = new Schema({
  id: { type: String, default: () => cuid(), index: true, unique: true },
  name: { type: String, required: true },
  uploadStatus: { type: String, enum: ['PENDING', 'IN_PROGRESS', 'COMPLETE'], default: 'PENDING' },
  url: { type: String },
  key: { type: String },
  relatedFiles: [{ type: Schema.Types.ObjectId, ref: 'File' }], // Champ pour la relation avec d'autres fichiers
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  userId: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

fileSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const FileModel = mongoose.model('File', fileSchema);

export default FileModel;
