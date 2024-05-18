"use client"
/*import { Loader2,UserSearch } from 'lucide-react'
import {useRouter,useSearchParams} from 'next/navigation'
import { trpc } from '../_trpc/client'


const page =() => {
    const router =useRouter()

    const searchParams = useSearchParams() 
    const origin = searchParams.get('origin')


    const {data, isLoading} = trpc.authCallback.useQuery(undefined,{
      onSuccess: ({success}) => {
        if(success){
            //user is synced to database
            router.push(origin ? '/${origin}' :'/dashboard')
        }
       },
       onError: (err)=>{
        if(err.data?.code === "UNAUTHORIZED"){
        router.push("/sing-in")
       }
    }, 
    retry:true,
    retryDelay:500
    }
    )
    return(
       <div className='w-full mt-24 flex justify-center'>
        <div className='flex flex-col items-center grap-2'>
          <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
          <h3 className='font-semibold text-xl'>setting up your account...</h3>
          <p>you will be redirected automatically.</p>  
        </div>
       </div> 
    )
}

export default page */
/*récupérer les paramètres de requête de l'URL et effectuer une requête à une API*/
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { trpc } from '../_trpc/client';

const Page = () => {
    const router = useRouter();
    const searchParams = useSearchParams(); 
    const origin = searchParams.get('origin');

    const { data, isLoading, error } = trpc.authCallback.useQuery(undefined, {
        retry: true,
        retryDelay: 500,
    });

    useEffect(() => {
        if (error) {
            if (error.data?.code === "UNAUTHORIZED") {
                router.push("/sing-in");
            }
        }
    }, [error, router]);

    useEffect(() => {
        if (!isLoading && data?.success) {
            router.push(origin ? `/${origin}` : '/dashboard');
        }
    }, [isLoading, data, router, origin]);

    return (
        <div className='w-full mt-24 flex justify-center'>
            <div className='flex flex-col items-center gap-2'>
                <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
                <h3 className='font-semibold text-xl'>Setting up your account...</h3>
                <p>You will be redirected automatically.</p>  
            </div>
        </div> 
    );
};

export default Page;
