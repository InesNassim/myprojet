// AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { getSession } from 'next-auth/client';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();
      setUser(session?.user ?? null);
    }

    fetchSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}
//Le AuthContext est un contexte utilisé dans les applications React pour
// gérer l'état global lié à l'authentification de l'utilisateur

export function useAuth() {
  return useContext(AuthContext);
}
