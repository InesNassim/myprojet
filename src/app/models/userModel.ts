
import mongoose, { Schema, Document } from 'mongoose';

// Définissez l'interface du document utilisateur
export interface UserDocument extends Document {
  id: string;
  email: string;
  fields: Schema.Types.ObjectId[];
  messages: Schema.Types.ObjectId[];
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  stripePriceId?: string;
  stripeCurrentPeriodEnd?: Date;
}

// Définissez le schéma de l'utilisateur avec Mongoose
const userSchema = new Schema({
  id: { type: String, index: true, unique: true },
  email: { type: String, index: true, unique: true },
  fields: [{ type: Schema.Types.ObjectId, ref: 'File' }],
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  stripeCustomerId: { type: String, unique: true, index: true, sparse: true },
  stripeSubscriptionId: { type: String, unique: true, index: true, sparse: true },
  stripePriceId: { type: String, index: true },
  stripeCurrentPeriodEnd: { type: Date },
});

// Créez un modèle à partir du schéma
const User = mongoose.model<UserDocument>('User', userSchema);

// Exportez le modèle utilisateur
export default User;
