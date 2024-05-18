/*"use-client"
import { Loader2, XCircle } from "lucide-react"
import { trpc } from "../../app/_trpc/client"
import Messages from "../Messages"
import ChatInput from "./Chatinput"
import { ChatContextProvider } from "./chatContext"

interface ChatWrapperProps{
    fileId:string
}

const chatWrapper =({fileId}:ChatWrapperProps) => {
 console.log("fileId",fileId)

   const {data,isLoading} = trpc.getFileUploadStatus.useQuery({
    fileId,
   },{
    refetchInterval:(data)=>
        data?.status ==="SUCCESS" ||
         data?.status === "FAILED" 
         ? false
         :500,
    
   })
   if(data?.status === "PROCESSING")  
   return(
    <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between grap-2">
        <div className="flex flex-col items-center grap-2">
            <div className="flex flex-col items-center grap-2">
                <Loader2 className="h-8 w-8 text-blue-500 animate-spin"/>
                <h3 className="font-semibold text-xl">
                    processing PDF...
                </h3>
                <p className="text-zinc-500 text-sm">
                    this won&apos;t take long.

                </p>
            </div>
        </div>
        <ChatInput isDisabled/>
    </div>
   )

   if(data?.status==="Failed" || true) return(
    <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between grap-2">
        <div className="flex flex-col items-center grap-2">
            <div className="flex flex-col items-center grap-2">
                <XCircle className="h-8 w-8 text-red-500"/>
                <h3 className="font-semibold text-xl">
                    Too many pages in PDF
                </h3>
                <p className="text-zinc-500 text-sm">
                    your <span className="font-medium">Free</span> 
                    plan supports up to 5 pages per PDF.

                </p>
            </div>
        </div>
        <ChatInput isDisabled/>
    </div>
   ) 

    return(
        <ChatContextProvider fileId={fileId}>
    <div className="relative min-h-full bg-zinc-500 flex divide-y divide-zinc-200 flex-col justify-between grap-2">
        <div className="flex-1 justify-between flex flex-col mb-28">
            <Messages/>
        </div>

        <ChatInput/>
        
    </div>
    </ChatContextProvider>
    )
}
export default chatWrapper*/
"use-client"
/*import React from 'react';
import { Loader2, XCircle } from 'lucide-react';
import { trpc } from '../../app/_trpc/client';
import ChatInput from './Chatinput';
import { ChatContextProvider } from './chatContext'
import Messages from './Messages';

interface FileUploadStatus {
    status?: string; // Ou un type plus précis si possible
    // Autres propriétés de FileUploadStatus...
}

interface ChatWrapperProps {
    fileId: string;
}

const ChatWrapper: React.FC<ChatWrapperProps> = ({ fileId }) => {
    console.log("fileId", fileId);

    const { data, isLoading } = trpc.getFileUploadStatus.useQuery<FileUploadStatus>({
        fileId,
    });

    if (isLoading) {
        return (
            <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between grap-2">
                <div className="flex flex-col items-center grap-2">
                    <div className="flex flex-col items-center grap-2">
                        <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                        <h3 className="font-semibold text-xl">
                            Processing PDF...
                        </h3>
                        <p className="text-zinc-500 text-sm">
                            This won't take long.
                        </p>
                    </div>
                </div>
                <ChatInput isDisabled />
            </div>
        );
    }

    if (data?.status === "PROCESSING") {
        return (
            <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between grap-2">
                <div className="flex flex-col items-center grap-2">
                    <div className="flex flex-col items-center grap-2">
                        <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                        <h3 className="font-semibold text-xl">
                            Processing PDF...
                        </h3>
                        <p className="text-zinc-500 text-sm">
                            This won't take long.
                        </p>
                    </div>
                </div>
                <ChatInput isDisabled />
            </div>
        );
    }

    if (data?.status === "FAILED") {
        return (
            <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between grap-2">
                <div className="flex flex-col items-center grap-2">
                    <div className="flex flex-col items-center grap-2">
                        <XCircle className="h-8 w-8 text-red-500" />
                        <h3 className="font-semibold text-xl">
                            Too many pages in PDF
                        </h3>
                        <p className="text-zinc-500 text-sm">
                            Your <span className="font-medium">Free</span>
                            plan supports up to 5 pages per PDF.
                        </p>
                    </div>
                </div>
                <ChatInput isDisabled />
            </div>
        );
    }

    return (
        <ChatContextProvider fileId={fileId}>
            <div className="relative min-h-full bg-zinc-500 flex divide-y divide-zinc-200 flex-col justify-between grap-2">
                <div className="flex-1 justify-between flex flex-col mb-28">
                    <Messages fileId={fileId}/>
                </div>
                <ChatInput />
            </div>
        </ChatContextProvider>
    );
};

export default ChatWrapper;*/

import React from 'react';
import { Loader2, XCircle } from 'lucide-react';
import { trpc } from '../../app/_trpc/client';
import ChatInput from './Chatinput';
import { ChatContextProvider } from './chatContext'
import Messages from './Messages';

interface FileUploadStatus {
    status?: string; // Ou un type plus précis si possible
    // Autres propriétés de FileUploadStatus...
}

interface ChatWrapperProps {
    fileId: string;
}

const ChatWrapper: React.FC<ChatWrapperProps> = ({ fileId }) => {
    console.log("fileId", fileId);

    const { data, isLoading } = trpc.getFileUploadStatus.useQuery<FileUploadStatus>({
        fileId,
    });

    if (isLoading) {
        return (
            <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between grap-2">
                <div className="flex flex-col items-center grap-2">
                    <div className="flex flex-col items-center grap-2">
                        <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                        <h3 className="font-semibold text-xl">
                            Processing PDF...
                        </h3>
                        <p className="text-zinc-500 text-sm">
                            This won&apos;t take long.
                        </p>
                    </div>
                </div>
                <ChatInput isDisabled />
            </div>
        );
    }

    if (data?.status === "PROCESSING") {
        return (
            <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between grap-2">
                <div className="flex flex-col items-center grap-2">
                    <div className="flex flex-col items-center grap-2">
                        <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                        <h3 className="font-semibold text-xl">
                            Processing PDF...
                        </h3>
                        <p className="text-zinc-500 text-sm">
                            This won&apos;t take long.
                        </p>
                    </div>
                </div>
                <ChatInput isDisabled />
            </div>
        );
    }

    if (data?.status === "FAILED") {
        return (
            <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between grap-2">
                <div className="flex flex-col items-center grap-2">
                    <div className="flex flex-col items-center grap-2">
                        <XCircle className="h-8 w-8 text-red-500" />
                        <h3 className="font-semibold text-xl">
                            Too many pages in PDF
                        </h3>
                        <p className="text-zinc-500 text-sm">
                            Your <span className="font-medium">Free</span>
                            plan supports up to 5 pages per PDF.
                        </p>
                    </div>
                </div>
                <ChatInput isDisabled />
            </div>
        );
    }

    return (
        <ChatContextProvider fileId={fileId}>
            <div className="relative min-h-full bg-zinc-500 flex divide-y divide-zinc-200 flex-col justify-between grap-2">
                <div className="flex-1 justify-between flex flex-col mb-28">
                    <Messages fileId={fileId}/>
                </div>
                <ChatInput />
            </div>
        </ChatContextProvider>
    );
};

export default ChatWrapper;

