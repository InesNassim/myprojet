
/*import { getSession } from 'next-auth/react';
import { SendMessageValidator } from '../../lib/validators/SendMessageValidator';
import db from '../../../db';
import file from '../../models/file';

export default async function handler(req, res) {
    try {
        const session = await getSession({ req });

        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { fileId: fileIdentifier, userMessage } = req.body; // Changement de 'fileId' à 'fileIdentifier' et 'message' à 'userMessage'

        if (!fileIdentifier || !userMessage) { // Changement de 'message' à 'userMessage'
            return res.status(400).json({ error: 'Missing fileIdentifier or userMessage' }); // Changement de 'message' à 'userMessage'
        }

        const userId = session.user.id; // Changement de 'id' à 'userId'

        const foundFile = await db.File.findFirst({ // Changement de 'File' à 'File' en utilisant la casse correcte
            where: {
                identifier: fileIdentifier, // Changement de 'id' à 'identifier'
                userId: userId,
            },
        });

        if (!foundFile) {
            return res.status(404).json({ error: 'File not found' });
        }

        await db.Message.create({
            data: {
                text: userMessage, // Changement de 'message' à 'userMessage'
                isUserMessage: true,
                userId: userId,
                fileId: foundFile.fileId, // Utilisation de l'identifiant de fichier trouvé
            },
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}*/

/*import { getSession } from 'next-auth/react';
import { SendMessageValidator } from '../../lib/validators/SendMessageValidator';
import db from '../../../db';
import file from '../../models/file';

export default async function handler(req, res) {
    try {
        const session = await getSession({ req });

        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { fileIdentifier, userMessage } = req.body;

        if (!fileIdentifier || !userMessage) {
            return res.status(400).json({ error: 'Missing fileIdentifier or userMessage' });
        }

        const userId = session.user.userId;

        const foundFile = await db.file.findFirst({
            where: {
                identifier: fileIdentifier,
                userId: userId,
            },
        });

        if (!foundFile) {
            return res.status(404).json({ error: 'File not found' });
        }

        await db.Message.create({
            data: {
                text: userMessage,
                isUserMessage: true,
                userId: userId,
                fileId: foundFile.fileId,
            },
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}*/
/*import { getSession } from 'next-auth/react';
import db from '../../../db';

export default async function handler(req, res) {
    try {
        const session = await getSession({ req });

        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { fileIdentifier, userMessage } = req.body;

        if (!fileIdentifier || !userMessage) {
            return res.status(400).json({ error: 'Missing fileIdentifier or userMessage' });
        }

        const userId = session.user.id; // Accès à l'ID de l'utilisateur à partir de la session

        const foundFile = await db.file.findFirst({
            where: {
                identifier: fileIdentifier,
                userId: userId,
            },
        });

        if (!foundFile) {
            return res.status(404).json({ error: 'File not found' });
        }

        await db.Message.create({
            data: {
                text: userMessage,
                isUserMessage: true,
                userId: userId,
                fileId: foundFile.fileId,
            },
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}*/

/*import { getSession } from 'next-auth/react';
import lib from 'zod/lib';
//import { db } from '../../models/file';
//import db from '../../../db'; // Importez le type File si disponible
const path = require('path');
const dbPath = path.resolve(__dirname, '../../lib/db');
const db = require(dbPath);

export default async function handler(req, res) {
    try {
        const session = await getSession({ req });

        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { fileIdentifier, userMessage } = req.body;

        if (!fileIdentifier || !userMessage) {
            return res.status(400).json({ error: 'Missing fileIdentifier or userMessage' });
        }

        const userId = session.user.id;

        const foundFile: File | null = await db.file.findFirst({
            where: {
                identifier: fileIdentifier,
                userId: userId,
            },
        });

        if (!foundFile) {
            return res.status(404).json({ error: 'File not found' });
        }

        await db.message.create({
            data: {
                text: userMessage,
                isUserMessage: true,
                userId: userId,
                fileId: foundFile,
            },
        });


        
        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}*/


import { getSession } from 'next-auth/react';
const path = require('path');
const dbPath = path.resolve(__dirname, '../../lib/db');
const db = require(dbPath);

export default async function handler(req, res) {
    try {
        const session = await getSession({ req });

        if (!session) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { fileIdentifier, userMessage } = req.body;

        if (!fileIdentifier || !userMessage) {
            return res.status(400).json({ error: 'Missing fileIdentifier or userMessage' });
        }

        const userId = session.user.id;

        const foundFile = await db.File.findOne({
            identifier: fileIdentifier,
            userId: userId,
        });

        if (!foundFile) {
            return res.status(404).json({ error: 'File not found' });
        }

        await db.Message.create({
            text: userMessage,
            isUserMessage: true,
            userId: userId,
            fileId: foundFile._id, // Utilisez l'identifiant du fichier
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



