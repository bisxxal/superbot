'use server'
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import prisma from "@/lib/prisma";
import { QdrantClient } from "@qdrant/js-client-rest";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Document } from "@langchain/core/documents";

const emmbeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
    apiKey: process.env.OPENAI_API_KEY,
});
const qclient = new QdrantClient({
    url: process.env.QDRANT_URL!,
    apiKey: process.env.QDRANT_API_KEY!,
});


export const generateEmbeddings = async (url: string, type: 'yt' | 'text' | 'web', collecttion: string, mode: 'bot' | 'notebook') => {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id!;
    let docs;
    let name
    if (!url && !collecttion && !type) {
        return "Invalid parameters"
    }
    if (type === 'yt') {
        try {
            const loader = YoutubeLoader.createFromUrl(url, {
                language: "en",
                addVideoInfo: true,
            });
            docs = await loader.load();

            const splitter = new RecursiveCharacterTextSplitter({
                chunkSize: 1000,
                chunkOverlap: 200,
            });
            const splitDocs = await splitter.splitDocuments(docs);

            const enrichedDocs = splitDocs.map((doc) => ({
                ...doc,
                metadata: {
                    ...doc.metadata,
                    video_url: url,
                    source: "youtube",
                },
            }));
            name = enrichedDocs[0].metadata?.title;

            const vectorStore = await QdrantVectorStore.fromDocuments(
                enrichedDocs,
                emmbeddings,
                {
                    client: qclient,
                    collectionName: collecttion,
                }
            );
            const res = createModelsInPrisma(collecttion, type, mode, name, userId);
            return JSON.parse(JSON.stringify(res));

        } catch (error) {

        }

    }
    if (type === 'web') {
        try {
            const loader = new CheerioWebBaseLoader(url);
            docs = await loader.load();
            const splitter = new RecursiveCharacterTextSplitter({
                chunkSize: 1000,
                chunkOverlap: 200,
            });
            const splitDocs = await splitter.splitDocuments(docs);
            const enrichedDocs = splitDocs.map((doc) => ({
                ...doc,
                metadata: {
                    ...doc.metadata,
                    source_url: url,
                    source_type: "web",
                },
            }));
            const vectorStore = await QdrantVectorStore.fromDocuments(
                enrichedDocs,
                emmbeddings,
                {
                    client: qclient,
                    collectionName: collecttion,
                }
            );
            name = enrichedDocs[0].metadata?.title;
            const res = createModelsInPrisma(collecttion, type, mode, name, userId);
            return JSON.parse(JSON.stringify(res));

        } catch (error) {
            // console.log(error)
        }


    }
    if (type === 'text') {

        try {
            const splitter = new RecursiveCharacterTextSplitter({
                chunkSize: 1000,
                chunkOverlap: 200,
            });
            const rawDoc = new Document({
                pageContent: url,
                metadata: {
                    source_type: "text",
                },
            });

            const splitDocs = await splitter.splitDocuments([rawDoc]);

            const vectorStore = await QdrantVectorStore.fromDocuments(
                splitDocs,
                emmbeddings,
                {
                    client: qclient,
                    collectionName: collecttion,
                }
            );

            const res = createModelsInPrisma(collecttion, type, mode, name, userId);
            return JSON.parse(JSON.stringify(res));

        } catch (error) {
        }

    }
    
}

export const LoadPdfEmbedings = async (url: string, mode: 'bot' | 'notebook') => {
    const session = await getServerSession(authOptions);
    const response = await fetch(url);
    if (!response.ok) {
        return (`Failed to fetch PDF: ${response.statusText}`);
    }
    const pdfBlob = await response.blob();
    const loader = new WebPDFLoader(pdfBlob);
    const docs = await loader.load();

    const collectionName = session?.user.name + "_pdf_collection" + Date.now();

    const vectorStore = await QdrantVectorStore.fromDocuments(docs, emmbeddings, {
        client: qclient,
        collectionName: collectionName,
    })

    const res = await prisma.models.create({
        data: {
            collection_name: collectionName,
            source: 'pdf',
            userId: session?.user.id!,
            type: mode,
            name: "Untitled Pdf"
        }
    })

    return JSON.parse(JSON.stringify(res));
}

const createModelsInPrisma = async (collection_name: string, source: string, type: 'bot' | 'notebook', name: string, userId: string) => {
    try {
        const res = await prisma.models.create({
            data: {
                collection_name,
                source,
                userId,
                type,
                name: name ? name : "Untitled"
            }
        })
        return res;
    } catch (error) {

    }
}