// db.js
/*const mongoose = require('mongoose');
require('dotenv').config();

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    cachedDb = mongoose.connection;
    console.log('Connected to MongoDB');
    return cachedDb;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Définir le schéma de votre modèle User
const userSchema = new mongoose.Schema({
  // Définition du schéma de l'utilisateur
});

// Créer un modèle à partir du schéma
const User = mongoose.model('User', userSchema);

// Définir le schéma de votre modèle File
const fileSchema = new mongoose.Schema({
  // Définition du schéma du fichier
});

// Créer un modèle à partir du schéma
const File = mongoose.model('File', fileSchema);

// Définir le schéma de votre modèle Message
const messageSchema = new mongoose.Schema({
  // Définition du schéma du message
});

// Créer un modèle à partir du schéma
const Message = mongoose.model('Message', messageSchema);

// Fonction pour mettre à jour un utilisateur
async function updateUser(userId, subscription) {
  try {
    await User.updateOne(
      { _id: userId }, // Filtrer l'utilisateur par son ID
      {
        $set: {
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer,
          stripePriceId: subscription.items[0]?.price.id,
          stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
        },
      }
    );
    console.log('User updated successfully');
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

// Exporter la connexion à la base de données, les modèles et la fonction de mise à jour de l'utilisateur
module.exports = {
  connectToDatabase,

  User,
  File,
  Message,
  updateUser,
};*/

const mongoose = require('mongoose');
require('dotenv').config();

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    cachedDb = mongoose.connection;
    console.log('Connected to MongoDB');
    return cachedDb;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Définir le schéma de votre modèle User
const userSchema = new mongoose.Schema({
  // Ajouter un ID
  _id: mongoose.Schema.Types.ObjectId,
  // Définition du reste du schéma de l'utilisateur
});

// Créer un modèle à partir du schéma
const User = mongoose.model('User', userSchema);

// Définir le schéma de votre modèle File
const fileSchema = new mongoose.Schema({
  // Ajouter un ID
  _id: mongoose.Schema.Types.ObjectId,
  // Définition du reste du schéma du fichier
});

// Créer un modèle à partir du schéma
const File = mongoose.model('File', fileSchema);

// Définir le schéma de votre modèle Message
const messageSchema = new mongoose.Schema({
  // Ajouter un ID
  _id: mongoose.Schema.Types.ObjectId,
  // Définition du reste du schéma du message
});

// Créer un modèle à partir du schéma
const Message = mongoose.model('Message', messageSchema);

// Fonction pour mettre à jour un utilisateur
async function updateUser(userId, subscription) {
  try {
    await User.updateOne(
      { _id: userId }, // Filtrer l'utilisateur par son ID
      {
        $set: {
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer,
          stripePriceId: subscription.items[0]?.price.id,
          stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
        },
      }
    );
    console.log('User updated successfully');
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

// Exporter la connexion à la base de données, les modèles et la fonction de mise à jour de l'utilisateur
module.exports = {
  connectToDatabase,
  User,
  File,
  Message,
  updateUser,
};
