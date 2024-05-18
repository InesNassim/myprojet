/*import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import connectMongoDB from "../lib/mongodb";
import { User, Users } from "lucide-react";
import {isEqual} from 'lodash';
export  async function POST(req) {
    try {
        // Récupérer les données de la requête POST
        const { email, password } = await req.JSON();

        // Connexion à la base de données MongoDB
        await connectMongoDB();
        
        // Rechercher l'utilisateur par email dans la base de donnée

        const users = await User.find({ email  });
        
        // Vérifier si un utilisateur correspondant a été trouvé
        let foundUser = null;
        for (const user of users) {
            if (isEqual(user.email, email)) {
                foundUser = user;
                break;
            }
        }
        
        if (!foundUser) {
            // Utilisateur non trouvé
           return NextResponse.json({ message: "Email n'est pas trouver." }, { status: 401 });
        }
        // Hasher le mot de passe fourni par l'utilisateur
        const hashedPassword = await bcrypt.hash(password, 10);

        // Comparer le mot de passe hashé avec celui stocké dans la base de données
        const passwordMatch = await bcrypt.compare(hashedPassword,foundUser.password);

        if (!passwordMatch) {        
            // Mot de passe incorrect
            
            return NextResponse.json({ message: "Email ou mot de passe incorrect." }, { status: 401 });
        }
        // Authentification réussie
        return NextResponse.json({ message: "Authentification réussie." }, { status: 200 });
    } catch (error) {
        console.error("Une erreur s'est produite lors de la connexion :", error);
        return NextResponse.json({ message: "Une erreur s'est produite lors de la connexion." }, { status: 500 });
    }
};*/
/*import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import connectMongoDB from "../lib/mongodb";
import { useSession } from 'next-auth/react';

export default async function handler(req, res) {
    const session = await useSession();
    try {
        // Récupérer les données de la requête POST
        const { email, password } = await req.body;

        // Connexion à la base de données MongoDB
        await connectMongoDB();
        
        // Rechercher l'utilisateur par email dans la base de données
        const user = await req.db.collection('users').findOne({ email });

        if (!user) {
            // Utilisateur non trouvé
            return NextResponse.json({ message: "Email n'existe pas." }, { status: 401 });
        }
        // Hasher le mot de passe fourni par l'utilisateur
        const hashedPassword = await bcrypt.hash(password, 10);

        // Comparer le mot de passe fourni avec celui stocké dans la base de données
        const passwordMatch = await bcrypt.compare(hashedPassword, user.password);
        

        if (!passwordMatch) {        
            // Mot de passe incorrect
            return NextResponse.json({ message: "Email ou mot de passe incorrect." }, { status: 401 });
        }

        // Authentification réussie
        return NextResponse.json({ message: "Authentification réussie." }, { status: 200 });
    } catch (error) {
        console.error("Une erreur s'est produite lors de la connexion :", error);
        return NextResponse.json({ message: "Une erreur s'est produite lors de la connexion." }, { status: 500 });
    }
};*/

import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import connectMongoDB from "../lib/mongodb";
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    try {
        // Récupérer la session utilisateur
        const session = await getSession({ req });

        // Vérifier si l'utilisateur est authentifié
        if (!session) {
            return NextResponse.json({ message: "Utilisateur non authentifié." }, { status: 401 });
        }

        // L'utilisateur est authentifié, récupérer les données de la requête POST
        const { email, password } = await req.body;

        // Connexion à la base de données MongoDB
        await connectMongoDB();
        
        // Rechercher l'utilisateur par email dans la base de données
        const user = await req.db.collection('users').findOne({ email });

        if (!user) {
            // Utilisateur non trouvé
            return NextResponse.json({ message: "Email n'existe pas." }, { status: 401 });
        }

        // Comparer le mot de passe fourni avec celui stocké dans la base de données
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {        
            // Mot de passe incorrect
            return NextResponse.json({ message: "Email ou mot de passe incorrect." }, { status: 401 });
        }

        // Authentification réussie
        return NextResponse.json({ message: "Authentification réussie." }, { status: 200 });
    } catch (error) {
        console.error("Une erreur s'est produite lors de la connexion :", error);
        return NextResponse.json({ message: "Une erreur s'est produite lors de la connexion." }, { status: 500 });
    }
};



