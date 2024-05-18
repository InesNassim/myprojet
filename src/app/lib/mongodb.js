// Import mongoose
//import mongoose from 'mongoose';
// // Import dotenv
// import dotenv from 'dotenv';

// // Load environment variables
// dotenv.config();

/*const connectMongoDB = async () => {
  try {
    const URI = process.env.MONGODB_URI;
    if (!URI) {
      throw new Error("MONGODB_URI is not defined in the environment variables.");
    }

    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectMongoDB;*/
import mongoose from 'mongoose';
//Import dotenv
 import dotenv from 'dotenv';
 // Load environment variables
dotenv.config();


const connectMongoDB = async () => {
  try {
    const URI = process.env.MONGODB_URI;
    if (!URI) {
      throw new Error("MONGODB_URI is not defined in the environment variables.");
    }

    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // Ajout d'un processus de sortie dans le cas d'une erreur de connexion
    process.exit(1);
  }

  // Gestionnaire d'événements pour écouter les erreurs de connexion
  mongoose.connection.on('error', err => {
    console.error("MongoDB connection error:", err);
    // Terminer le processus dans le cas d'une erreur de connexion
    process.exit(1);
  });
};

export default connectMongoDB;


