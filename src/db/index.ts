
 
/*async function handleRequest(req, res) {
  try {
    const db = await connectToDatabase();
    // Utiliser la connexion à MongoDB...
  } catch (error) {
    console.error('Une erreur est survenue lors de la connexion à la base de données :', error);
    // Gérer l'erreur...
  }
}

export default handleRequest;

function connectToDatabase() {
  throw new Error("Function not implemented.");
}*/
const { MongoClient } = require('mongodb');

async function connectToDatabase() {
  const uri ='mongodb+srv:lamadev:123456yy789@cluster0.3ikhvob.mongodb.net/?retryWrites=true&w=majority'; // Remplacez ceci par l'URI de votre base de données MongoDB
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
  try {
    await client.connect();
    console.log('Connecté à la base de données');
    return client.db('lamadev'); 
  } catch (error) {
    console.error('Erreur lors de la connexion à la base de données :', error);
    throw error;
  }
}

async function handleRequest(req, res) {
  try {
    const db = await connectToDatabase();
    // Utiliser la connexion à MongoDB...
  } catch (error) {
    console.error('Une erreur est survenue lors de la connexion à la base de données :', error);
    // Gérer l'erreur...
  }
}

export default handleRequest;

