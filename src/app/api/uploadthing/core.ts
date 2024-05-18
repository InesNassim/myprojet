
// uploadthing/core.ts

/*import { getSession } from 'next-auth/react';
import { createUploadthing } from 'uploadthing/next';
import connectMongoDB from '../../lib/mongodb'; 
import db from"../../../db";
import File from"../../models/fileModel";
import {PDFLoader} from "langchain/document_loaders/fs/pdf"
import {OpenAIEmbeddings} from "langchain/embeddings/openai"
import {PineconeStore} from "langchain/vectorstores/pinecone"
//import { Pinecone } from '@pinecone-database/pinecone';
import {pinecone} from "../../lib/pinecone"
import { where } from '../../models/file';

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: '4MB' } })
    .middleware(async ({ req }) => {
      const session = await getSession();

      if (!session || !session.user || !session.user.hasOwnProperty('id')) {
        throw new Error('Unauthorized');
      }
      
      return { userId: session.user.hasOwnProperty('id') };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        // Connexion à MongoDB
        await connectMongoDB();

        // Insertion des détails du fichier dans la base de données
        const insertedFile = await File.create({
          data:{
          key: file.key,
          name: file.name,
          userId: metadata.userId,
          url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
          uploadStatus: 'PROCESSING',
          fileType: 'pdf',
          },
        });

        try {
          const response = await fetch('https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}')
          const blob= await response.blob()

          const loader = new PDFLoader(blob)

          const pageLevelDocs = await loader.load()

          const pagesAmt = pageLevelDocs.length

          //Vectoriser et indexer l’ensemble du document

          const pineconeIndex = pinecone.Index("app456")

          const embeddings = new OpenAIEmbeddings({
            openAIApiKey: process.env.OPENAI_API_KEY
          })

          await PineconeStore.fromDocuments(
            pageLevelDocs,
            embeddings,
            {
              //@ts-ignore
            pineconeIndex,
            namespace: insertedFile.id,
          })

          await File.updateOne(
            { _id: insertedFile._id }, // Filtrer par ID du fichier inséré
            { $set: { uploadStatus: "SUCCESS" } } // Mettre à jour le champ uploadStatus
        );
        } catch (err) {
          
          await File.updateOne(
            { _id: insertedFile._id }, // Filtrer par ID du fichier inséré
            { $set: { uploadStatus: "FAILED" } } // Mettre à jour le champ uploadStatus
        );
        }

        
        console.log('File inserted:', insertedFile);
      } catch (error) {
        console.error('Error inserting file:', error);
        throw new Error('Failed to insert file into database');
      }
    }),
};

export type OurFileRouter = typeof ourFileRouter;*/
/*hasOwnProperty() est utilisée pour vérifier si l'objet 
session.user possède une propriété id propre (non héritée)*/
import { getSession } from 'next-auth/react';
import { createUploadthing } from 'uploadthing/next';
import connectMongoDB from '../../lib/mongodb'; 
import db from "../../../db";
import File from "../../models/fileModel";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { pinecone } from "../../lib/pinecone";
import { Console } from 'console';

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: '4MB' } })
    .middleware(async ({ req }) => {
      const session = await getSession();

      if (!session || !session.user || !session.user.hasOwnProperty('id')) {
        throw new Error('Unauthorized');
      }
      
      return { userId: session.user.hasOwnProperty('id') };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        // Connexion à MongoDB
        await connectMongoDB();

        // Insertion des détails du fichier dans la base de données
        const insertedFile = await File.create({
          data:{
            key: file.key,
            name: file.name,
            userId: metadata.userId,
            url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
            uploadStatus: 'PROCESSING',
            fileType: 'pdf',
          },
        });

        try {
          const response = await fetch(`https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`)

          const blob = await response.blob();

          const loader = new PDFLoader(blob);
          const pageLevelDocs = await loader.load();
          const pagesAmt = pageLevelDocs.length;

          // Initialisation de l'index Pinecone
          const pineconeClient = await pinecone.getPineconeClient();
          // Remplacez "app456" par l'identifiant de votre index Pinecone
          const pineconeIndex = pineconeClient.getIndex("app456"); 

          // Vectorisation et indexation de l'ensemble du document
          const embeddings = new OpenAIEmbeddings({
            openAIApiKey: process.env.OPENAI_API_KEY
          });

          await PineconeStore.fromDocuments(
            pageLevelDocs,
            embeddings,
            {
              pineconeIndex,
              namespace: insertedFile.id,
            }
          )
          

          await File.updateOne(
            { _id: insertedFile._id },
            { $set: { uploadStatus: "SUCCESS" } }
          );
        } catch (err) {
          console.error("Error processing file:", err);
          await File.updateOne(
            { _id: insertedFile._id },
            { $set: { uploadStatus: "FAILED" } }
          );
        }

        console.log('File inserted:', insertedFile);
      } catch (error) {
        console.error('Error inserting file:', error);
        throw new Error('Failed to insert file into database');
      }
    }),
};

export type OurFileRouter = typeof ourFileRouter;
