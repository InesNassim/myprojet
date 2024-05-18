"use client"

/*import {  PropsWithChildren, useState } from "react"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { trpc } from "../app/_trpc/client"
//import { TRPCRouterRecord } from "@trpc/server"
import { httpBatchLink } from "@trpc/react-query"
const queryClient=new QueryClient();

const providers =({children}:PropsWithChildren<{}>) => {
   const [queryClient]= useState(()=> new QueryClient())
   const [trpcClient]=useState(()=> 
    trpc.CreateClient({
    links: [
        httpBatchLink({
            url:'http://localhost:3000/api/trpc',
        }),
    ],

   })
   );
   return(
    <trpc.Provider client={trpcClient}
     queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
            {children}
            </QueryClientProvider>
    </trpc.Provider>
   );
    

};
export default providers
//configuration pour fournir des services de gestion de 
//l'état et d'appel de fonctions RPC (Remote Procedure Call) */
/*import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "../app/_trpc/client";
import { httpBatchLink } from "@trpc/react-query";

const queryClient = new QueryClient();

const Providers = ({ children }: PropsWithChildren<{}>) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/api/trpc',
        }),
      ],
    })
  );

  return (
    <trpc.Provider value={trpcClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default Providers;*/
import { createContext, useContext, PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "../app/_trpc/client";
import { httpBatchLink } from "@trpc/react-query";

// Créer un contexte pour stocker le client TRPC
const TRPCContext = createContext<any>(null);

// Hook personnalisé pour utiliser le client TRPC
export const useTRPC = () => useContext(TRPCContext);

const queryClient = new QueryClient();

const Providers = ({ children }: PropsWithChildren<{}>) => {
  // Créer le client TRPC
  const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: 'http://localhost:3000/api/trpc',
      }),
    ],
  });

  return (
    // Fournir le client TRPC et le QueryClient via le contexte
    <TRPCContext.Provider value={trpcClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </TRPCContext.Provider>
  );
};

export default Providers;
/*la configuration et de la fourniture de contextes et de fournisseurs pour la gestion des requêtes côté client, spécifiquement 
avec TRPC (Transportable React Procedure Calls) et React Query.*/