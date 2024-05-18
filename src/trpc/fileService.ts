/*import { privateProcedure, TRPCError } from './trpc';
import { z } from 'zod';
import db from '../db';

export const fileService = {
  async getUserFiles(ctx: any) {
    const { userId } = ctx;

    return await db.file.findMany({
      where: {
        userId,
      },
    });
  },

  async getFile(ctx: any, input: { key: string }) {
    const { userId } = ctx;

    const file = await db.file.findFirst({
      where: {
        key: input.key,
        userId,
      },
    });

    if (!file) throw new TRPCError({ code: 'NOT_FOUND' });

    return file;
  },

  async deleteFile(ctx: any, input: { id: string }) {
    const { userId } = ctx;

    const file = await db.file.findFirst({
      where: {
        id: input.id,
        userId,
      },
    });

    if (!file) throw new TRPCError({ code: 'NOT_FOUND' });

    await db.file.delete({
      where: {
        id: input.id,
      },
    });

    return file;
  },
};

// Connecter les fonctions du service au routeur TRPC
privateProcedure.input(z.object({})).use(fileService.getUserFiles);
privateProcedure.input(z.object({ key: z.string() })).use(fileService.getFile);
privateProcedure.input(z.object({ id: z.string() })).use(fileService.deleteFile);
*/
// fileService.ts

import db from "../db";
import File,{IFile}from'../app/models/fileModel'
// Fonction pour récupérer les fichiers d'un utilisateur
/*export async function getUserFiles(userId: string) {
    return await db.file.findMany({
        where: {
            userId: userId
        }
    });
}

// Fonction pour récupérer un fichier par sa clé
export async function getFileByKey(userId: string, key: string) {
    return await db.file.findFirst({
        where: {
            userId: userId,
            key: key
        }
    });
}

// Fonction pour supprimer un fichier par son identifiant
export async function deleteFileById(userId: string, fileId: string) {
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
}*/

// Fonction pour récupérer les fichiers d'un utilisateur
export async function getUserFiles(userId: string): Promise<IFile[]> {
    return await File.find({ userId: userId }).exec();
}

// Fonction pour récupérer un fichier par sa clé
export async function getFileByKey(userId: string, key: string): Promise<IFile | null> {
    return await File.findOne({ userId: userId, key: key }).exec();
}

// Fonction pour supprimer un fichier par son identifiant
export async function deleteFileById(userId: string, fileId: string): Promise<IFile | null> {
    return await File.findOneAndDelete({ _id: fileId, userId: userId }).exec();
}

