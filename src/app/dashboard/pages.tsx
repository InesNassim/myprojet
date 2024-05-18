/*import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { User } from "lucide-react"
import { redirect } from "next/navigation"
import Dashboard from "../../components/Dashboard"
import db from "../../db"

const page =async () => {
    const { getUser } = getKindeServerSession()
    const User =getUser()

    if(!User||!(await User).id) redirect ('/auth-callback?origine=dashboard')
    
    const dbUser =(await db).User.findFirst({
        where:{
            id:(await User).id
        }
    })
    if(!dbUser)redirect ('/auth-callback?origine=dashboard')

       return <Dashboard/>
}
export default page */
//assurer l'authentification de l'utilisateur avant d'afficher 
//le tableau de bord de l'application. 
/*import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Dashboard from "../../components/Dashboard";
import db from "../../db";

const DashboardPage = async () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  
  // Vérifier si l'utilisateur est authentifié
  if (!session?.user) {
    // Rediriger vers la page de connexion ou de callback d'authentification
    redirect('/auth-callback?origine=dashboard');
    return null;
  }

  // Recherche de l'utilisateur dans la base de données MongoDB
  const dbUser = await db.user.findFirst({
    where: {
      id: session.user.id,
    },
  });

  if (!dbUser) {
    // Rediriger vers la page de callback d'authentification
    redirect('/auth-callback?origine=dashboard');
    return null;
  }

  // Afficher le composant Dashboard une fois que l'utilisateur est authentifié
  return <Dashboard />;
};

export default DashboardPage;*/
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Dashboard from '../../components/Dashboard';
const DashboardPage = ({ userExists }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === 'loading') return <div>Loading...</div>;

  // Vérifier si l'utilisateur est authentifié
  if (!session?.user) {
    // Rediriger vers la page de connexion ou de callback d'authentification
    router.push('/auth-callback?origine=dashboard');
    return null;
  }

  // Vérifier si l'utilisateur existe dans la base de données
  if (!userExists) {
    // Rediriger vers la page de callback d'authentification
    router.push('/auth-callback?origine=dashboard');
    return null;
  }

  // Afficher le composant Dashboard une fois que l'utilisateur est authentifié et existe dans la base de données
  return <Dashboard />;
};

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase(); // Connectez-vous à la base de données MongoDB

  // Recherchez l'utilisateur dans la base de données MongoDB
  const user = await db.collection('users').findOne({
    id: context.session?.user.id,
  });

  return {
    props: {
      userExists: !!user,
    },
  };
}

export default DashboardPage;

function connectToDatabase(): { db: any; } | PromiseLike<{ db: any; }> {
  throw new Error('Function not implemented.');
}

