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

const emmbeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
    apiKey: process.env.OPENAI_API_KEY,
});

const qclient = new QdrantClient({
    url: 'https://044ba285-2d3a-44cd-b697-9608ce6873b9.eu-west-2-0.aws.cloud.qdrant.io:6333',
    apiKey: process.env.QDRANT_API_KEY!,
});


export const generateEmbeddings = async (url: string, type:  'yt' | 'text' | 'web', collecttion: string) => {

    const session = await getServerSession(authOptions);
    let docs;

    if (!url && !collecttion && !type) {
        return "Invalid parameters"
    }
    if (type === 'yt') {
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

        const vectorStore = await QdrantVectorStore.fromDocuments(
            enrichedDocs,
            emmbeddings,
            {
                client: qclient,
                collectionName: session?.user.name + "_youtube_collection"+Date.now(),
            }
        );

    }
    if (type === 'web') {
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
                collectionName: session?.user.name + "_web_collection"+Date.now(),
            }
        );

        // console.log(vectorStore, "sucee")

    }
    if (type === 'text') {

    }


    const res = await prisma.models.create({
        data: {
            collection_name: collecttion,
            typeOf: type,
            model_id: "",
            userId: session?.user.id!,
        }
    })

    return JSON.parse(JSON.stringify(docs));
}

export const LoadPdfEmbedings = async (url: string ) => {
    const session = await getServerSession(authOptions);

    const response = await fetch(url);
    if (!response.ok) {
        return (`Failed to fetch PDF: ${response.statusText}`);
    }
    const pdfBlob = await response.blob();

    const loader = new WebPDFLoader(pdfBlob);
    const docs = await loader.load();


    const vectorStore = await QdrantVectorStore.fromDocuments(docs, emmbeddings, {
        client: qclient,
        collectionName: session?.user.name + "_pdf_collection"+Date.now(),
    })

    const res = await prisma.models.create({
        data: {
            collection_name: session?.user.name + "_pdf_collection"+Date.now(),
            typeOf: 'pdf',
            model_id: "",
            userId: session?.user.id!,
        }
    })

    // console.log(docs);
    return JSON.parse(JSON.stringify(res));
}