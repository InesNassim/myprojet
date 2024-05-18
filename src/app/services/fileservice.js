// services/fileService.js
/*import { find, findById, findByIdAndDelete } from '../models/file';

const fileService = {
  async getUserFiles(userId) {
    return await find({ userId: userId });
  },

  async getFileById(fileId) {
    return await findById(fileId);
  },

  async deleteFileById(fileId) {
    return await findByIdAndDelete(fileId);
  }

  // Autres méthodes pour la gestion des fichiers
};

export default fileService;*/
import db from "../db";// Importez votre service de base de données

// Fonction pour récupérer les fichiers d'un utilisateur
export async function getUserFiles(userId) {
    return await db.file.findMany({
        where: {
            userId: userId
        }
    });
}

// Fonction pour récupérer un fichier par sa clé
export async function getFileByKey(userId, key) {
    return await db.file.findFirst({
        where: {
            userId: userId,
            key: key
        }
    });
}

// Fonction pour supprimer un fichier par son identifiant
export async function deleteFileById(userId , fileId) {
    // Vérifiez si le fichier appartient à l'utilisateur avant de le supprimer
    const file = await db.file.findFirst({
        where: {
            id: fileId,
            userId: userId
        }
    });

    if (!file) {
        throw new Error("File not found or does not belong to the user");
    }

    // Supprimez le fichier de la base de données
    await db.file.delete({
        where: {
            id: fileId
        }
    });

    return file;
}

