'use server'
import { OpenAIEmbeddings } from "@langchain/openai";
import OpenAI from "openai";
import { QdrantClient } from '@qdrant/js-client-rest';
import { QdrantVectorStore } from "@langchain/qdrant";

const qclient = new QdrantClient({
    url: 'https://044ba285-2d3a-44cd-b697-9608ce6873b9.eu-west-2-0.aws.cloud.qdrant.io:6333',
    apiKey: process.env.QDRANT_API_KEY!,
});

const client = new OpenAI({
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
    apiKey: process.env.GEMINI_API_KEY!,
});

const emmbeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
    apiKey: process.env.OPENAI_API_KEY!,
});
export const chatAIAction = async (userQuary: string, collection: string) => {

    if  (!userQuary || !collection) {
        return "Invalid parameters"
    }

    const vectorStore = await QdrantVectorStore.fromExistingCollection(emmbeddings, {
        client: qclient,
        collectionName: collection,
    })

    const vectorSearcher = vectorStore.asRetriever({
        k: 3,
    })
    const releventChunk = await vectorSearcher.invoke(userQuary);

    const SYSTEM_POMPT = `You are a helpful AI assistant. who helps resoving user quary based on the context available to you . also provide some useful link if needed.
    
    only answer based in the avaliable context from the file.
    
    Contex:
    ${JSON.stringify(releventChunk)}
    `;

    const response = await client.chat.completions.create({
        model: "gemini-2.5-flash",
        messages: [
            { role: "system", content: SYSTEM_POMPT },
            {
                role: "user",
                content: userQuary
            },
        ]
    });

    console.log("🤖 => ", response.choices[0].message.content);

    return response.choices[0].message.content;
}

// Vishal B_web_collection