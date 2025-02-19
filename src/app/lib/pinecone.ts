/*import { Pinecone } from "@pinecone-database/pinecone"

export const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
    environment:"gcp-starter",
})*/
/*import {PineconeClient} from '@pinecone-database/pinecone'

export const getPineconeClient = async ()=>{
    const client = new PineconeClient()

    await client.init({
        apikey:process.env.PINECONE_API_KEY!,
        environment:'gcp-starter',
    })
    return client
}*/
import { PineconeClient } from '@pinecone-database/pinecone';

export const getPineconeClient = async () => {
    const client = new PineconeClient();

    await client.init({
        apikey: process.env.PINECONE_API_KEY!,
        environment: 'gcp-starter',
    });
    return client;
}

export const pinecone = {
    getPineconeClient
};
