/*tentative d'exportation d'une fonction de gestion des requêtes HTTP GET et 
POST utilisant TRPC (Transportable RPC), une bibliothèque pour 
créer des API basées sur des fonctions RPC (Remote Procedure Call) transportables*/


import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { NextApiRequest, NextApiResponse } from 'next';
import appRouter from '../[trpc]/routeurTRPC'; // Importer le routeur TRPC
import { createContext } from 'react';
//import createContext from './createContext'; // Importer la fonction createContext

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  /*try {
    const trpcHandler = fetchRequestHandler({
      endpoint: '/api/trpc',
      req,
      router: appRouter,
      createContext: createContext,
    });

    await trpcHandler(req, res);
 // Appeler le gestionnaire TRPC avec les objets req et res
  } catch (error) {
    console.error('Error handling TRPC request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};*/
// Assurez-vous que trpcHandler est correctement importé et défini
const trpcHandler = fetchRequestHandler({
  endpoint: '/api/trpc',
  req,
  router: appRouter,
  createContext: createContext,
});

// Attendre la résolution de la promesse retournée par trpcHandler
const response = await trpcHandler;

// Envoyer la réponse au client
res.status(response.status).json(await response.json());
}

export default handler;

