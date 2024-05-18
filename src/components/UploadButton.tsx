"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "../../@/components/ui/dialog"
import { DialogTrigger } from "@radix-ui/react-dialog"
import Button from "./ui/Button"
import React,{useCallback}  from "react";
//import { useToast } from "../../@/components/ui/use-toast"
//import {useToast} from'../components/useToast'
import Dropzone from 'react-dropzone';
import { Cloud, File, Loader2 } from "lucide-react"
import { useUploadThing } from "../app/lib/uploadthing"
import { trpc } from "../app/_trpc/client"
import { useRouter } from "next/navigation"
const UploadDropzone=() =>{
    const router= useRouter()
    const [isuploading,setuploading] =
    useState<boolean>(false)
    const[uploadProgress,setuploadProgress]=
    useState<number>(0)
    const {toast}=useToast()

    const{startUpload}=useUploadThing("pdfUploader")
    const {mutate:startPolling}=trpc.getFile.useMutation({
        onSuccess:(file) =>{
            router.push('/dashboard/${file.id}')
        },
        retry:true,
        retryDelay:500,
    })
    const startSimulatedProgress = ()=>{
        setuploadProgress(0)
        
        const interval = setInterval(()=>{
            setuploadProgress((prevProgress) =>{
                if(prevProgress >= 95){
                    clearInterval(interval)
                    return prevProgress
                }
                return prevProgress + 5
            })
        },500)
        return interval 
    }
    return( 
        
        <Dropzone
    multiple={false} 
    onDrop={async (acceptedFiles) => {
        try {
            setuploading(true)
            const progressInterval = startSimulatedProgress()

            // Gérer le téléchargement du fichier
            const res = await startUpload(acceptedFiles) // Utiliser acceptedFiles[0] au lieu de acceptedFile[0]

            if (!res) {
                throw new Error('Upload failed')
            }

            const [fileResponse] = res

            const key = fileResponse?.key
            if (!key) {
                throw new Error('Key not found in response')
            }

            clearInterval(progressInterval)
            setuploadProgress(100)
            startPolling({ key })
        } catch (error) {
            console.error('Error during file upload:', error)
            toast({
                title: 'Something went wrong',
                description: 'Please try again later',
                variant: 'destructive',
            })
        }
    }}>
        {({getRootProps, getInputProps, acceptedFiles})=> (
            <div 
            {...getRootProps()}
             className="border h-64 m-4 border-dashed border-gray-300 rounded-lg">
                <div className="flex items-center justify-center h-full w-full">
                    <label htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Cloud className="h-6 w-6 text-zinc-500 mb-2"/>
                            <p className="mb-2 text-sm text-zinc-700">
                                <span className="font-semibold">click to upload
                                </span>{''}
                                or drag and drop
                            </p>
                            <p className="text-xs text-zinc-500">PDF (up to 4MB)</p>
                        </div>

                        {acceptedFiles && acceptedFiles[0] ?(
                            <div className="max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
                                <div className="px-3 py-2 h-full grid place-items-center">
                                    <File className="h-4 w-4 text-blue-500"/>
                                </div>
                                <div className="px-3 py-2 h-full text-sm truncate">
                                    {acceptedFiles[0].name}
                                </div>
                            </div>
                        ): null}

                   {isuploading ? (
                     <div className="w-full mt-4 max-w-xs mx-auto">
                     <progress
                     value={uploadProgress}
                    className={`h-1 w-full bg-zinc-200 ${uploadProgress === 100 ? 'bg-green-500' : ''}`}
                 />
        {uploadProgress === 100 ? (
            <div className="flex grap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2">
                <Loader2 className="h-3 w-3 animate-spin" />
                Redirecting...
            </div>
        ) : null}
    </div>
) : null}

                        <input
                         {...getInputProps()} 
                        type="file"  
                        id= 'dropzone-file'
                        className="hidden" 
                        />
                    </label>
                </div>
                 
            </div>
        )}
    </Dropzone>
)}
const UploadButton = () => {
    const [isOpen ,setIsopen]= useState<boolean>(false)

    return(
       < Dialog open={isOpen} onOpenChange={(v) =>{
        if(!v) {
            setIsopen(v)
        }
       }}>
        <DialogTrigger onClick={() =>setIsopen(true)} asChild>
            <Button>upload PDF</Button>
        </DialogTrigger>
        <DialogContent>
          <UploadDropzone/>
        </DialogContent>
       </Dialog>
    )
}
export default UploadButton

function useToast(): { toast: any } {
    throw new Error("Function not implemented.")
}
