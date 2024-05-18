/*import NextAuth from "next-auth/next";
import  CredentialsProvider  from "next-auth/providers/credentials";
 
const aauthOption ={
    providers:[
        CredentialsProvider({
            name:"credentials",
            credentials: {},
            async authorize(credentials){
                const userId=session.user.id;
                return user;
            },
        }),
    ],
    session:{
        strategy:"jwt",
    },
    secret:process.env.NEXTAUTH_SECRET,
    pages:{
        singin:"/",
        count:"/",
    }
};
const handler=NextAuth(aauthOption);

export {handler as GET, handler as POST};*/

/*import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials, session) {
                // Utilisez l'objet de session pour accéder à l'identifiant de l'utilisateur
                if (session && session.user && session.user.id) {
                    const userId = session.user.id;
                    // Faites quelque chose avec l'ID de l'utilisateur, comme le stocker dans la base de données ou le récupérer
                    return { id: userId }; // Renvoyez un objet utilisateur avec l'ID
                }
                return null; // Si l'ID de l'utilisateur n'est pas disponible dans la session
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signin: "/", 
        count: "/", 
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };*/


import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials, session) {
                // Utilisez l'objet de session pour accéder à l'identifiant de l'utilisateur
                if (session && session.user && session.user.id) {
                    const userId = session.user.id;
                    // Faites quelque chose avec l'ID de l'utilisateur, comme le stocker dans la base de données ou le récupérer
                    return { id: userId }; // Renvoyez un objet utilisateur avec l'ID
                }
                return null; // Si l'ID de l'utilisateur n'est pas disponible dans la session
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signin: "/", // Page de connexion
        count: "/", // Page de déconnexion
        
    }
};

export default NextAuth(authOptions);


