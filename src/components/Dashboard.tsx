"use client"
/*import React, { useState } from "react";
import { Ghost, Loader2, MessageSquare, Plus, Trash } from "lucide-react/dist/esm/lucide-react";
import UploadButton from "./UploadButton";
import { trpc } from "../app/_trpc/client";
import { format } from "date-fns";
import Button from "./ui/Button";

// Interface pour décrire la structure d'un fichier
interface File {
    id: string;
    name: string; // Ajoutez d'autres propriétés si nécessaire
    createdAt: Date;
    // Ajoutez d'autres propriétés si nécessaire
}

const Dashboard = () => {
    const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<string | null>(null);
    const utils = trpc.useContext();

    const { data: files, isLoading } = trpc.getUserFiles.useQuery();
    console.log("files:", files); // Vérification des données renvoyées

    const { mutate: deleteFileMutation } = trpc.deleteFile.useMutation({
        onSuccess: () => {
            utils.getUserFiles.invalidate();
        },
        onMutate: (data) => {
            if (data && data.id) { // Vérification que data et data.id sont définis
                setCurrentlyDeletingFile(data.id);
            }
        },
        onSettled() {
            setCurrentlyDeletingFile(null);
        }
    });

    return (
        <main className="mx-auto max-w-7xl md:p-10">
            <div className="mt-8 flex-col items-start justif-between grap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:grap-0">
                <h1 className="mb-3 font-bold text-5xl text-gray-900">my files</h1>
                <UploadButton />
            </div>

            {files && files.length !== 0 ? (
                <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
                    {files.map((file: File) => { // Utilisation de l'interface pour typiser file
                        console.log("file:", file); // Vérification des données de chaque fichier
                        return (
                            <li key={file.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg">
                                <a href={`/Dashboard/${file.id}`} className="flex flex-col gap-2">
                                    <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"/>
                                        <div className="flex-1 truncate">
                                            <div className="flex items-center space-x-3">
                                                <h3 className="truncate text-lg font-medium text-zinc-900">
                                                    {file.name}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <div className="px-6 mt-4 grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
                                    <div className="flex items-center gap-2">
                                        <Plus className="h-4 w-4"/>
                                        {format(new Date(file.createdAt), "MMM yyyy")}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="h-4 w-4"/> 
                                        mocked
                                    </div>
                                    <Button
                                        onClick={() => deleteFileMutation({ id: file.id })}
                                        size="sm"
                                        className="w-full"
                                    >
                                        {currentlyDeletingFile === file.id ? (
                                            <Loader2 className="h-4 w-4 animation-spin"/>
                                        ) : (
                                            <Trash className="h-4 w-4"/>
                                        )}
                                    </Button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : isLoading ? (
                <div className="my-2">Loading...</div>
            ) : (
                <div className="mt-16 flex flex-col items-center gap-2">
                    <Ghost className="h-8 w-8 text-zinc-800"/>
                    <h3 className="font-semibold text-xl">pretty empty around here</h3>
                    <p>let's upload your first PDF.</p>
                </div>
            )}
        </main>
    );
};

export default Dashboard;*/

import React, { useState } from "react";
import { Ghost, Loader2, MessageSquare, Plus, Trash } from "lucide-react/dist/esm/lucide-react";
import UploadButton from "./UploadButton";
import { trpc } from "../app/_trpc/client";
import { format } from "date-fns";
import Button from "./ui/Button";

// Interface pour décrire la structure d'un fichier
interface File {
    id: string;
    name: string; // Ajoutez d'autres propriétés si nécessaire
    createdAt: Date;
    // Ajoutez d'autres propriétés si nécessaire
}

const Dashboard = () => {
    const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<string | null>(null);
    const utils = trpc.useContext();

    const { data: files, isLoading } = trpc.getUserFiles.useQuery();
    console.log("files:", files); // Vérification des données renvoyées

    const { mutate: deleteFileMutation } = trpc.deleteFile.useMutation({
        onSuccess: () => {
            utils.getUserFiles.invalidate();
        },
        onMutate: (data) => {
            if (data && data.id) { // Vérification que data et data.id sont définis
                setCurrentlyDeletingFile(data.id);
            }
        },
        onSettled() {
            setCurrentlyDeletingFile(null);
        }
    });

    return (
        <main className="mx-auto max-w-7xl md:p-10">
            <div className="mt-8 flex-col items-start justif-between grap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:grap-0">
                <h1 className="mb-3 font-bold text-5xl text-gray-900">my files</h1>
                <UploadButton />
            </div>

            {files && files.length !== 0 ? (
                <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
                    {files.map((file: File) => { // Utilisation de l'interface pour typiser file
                        console.log("file:", file); // Vérification des données de chaque fichier
                        return (
                            <li key={file.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg">
                                <a href={`/Dashboard/${file.id}`} className="flex flex-col gap-2">
                                    <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"/>
                                        <div className="flex-1 truncate">
                                            <div className="flex items-center space-x-3">
                                                <h3 className="truncate text-lg font-medium text-zinc-900">
                                                    {file.name}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <div className="px-6 mt-4 grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
                                    <div className="flex items-center gap-2">
                                        <Plus className="h-4 w-4"/>
                                        {format(new Date(file.createdAt), "MMM yyyy")}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="h-4 w-4"/> 
                                        mocked
                                    </div>
                                    <Button
                                        onClick={() => deleteFileMutation({ id: file.id })}
                                        size="sm"
                                        className="w-full"
                                    >
                                        {currentlyDeletingFile === file.id ? (
                                            <Loader2 className="h-4 w-4 animation-spin"/>
                                        ) : (
                                            <Trash className="h-4 w-4"/>
                                        )}
                                    </Button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : isLoading ? (
                <div className="my-2">Loading...</div>
            ) : (
                <div className="mt-16 flex flex-col items-center gap-2">
                    <Ghost className="h-8 w-8 text-zinc-800"/>
                    <h3 className="font-semibold text-xl">pretty empty around here</h3>
                    <p>let&apos;s upload your first PDF.</p>
                </div>
            )}
        </main>
    );
};

export default Dashboard;



