'use server'
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import prisma from "@/lib/prisma";

//  const emmbeddings = new OpenAIEmbeddings({
//         model: "text-embedding-3-small",
//         apiKey: process.env.OPENAI_API_KEY,
//     });
export const generateEmbeddings = async (url: string, type: 'pdf' | 'yt' | 'text' | 'web', collecttion: string) => {
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

        // const splitter = new RecursiveCharacterTextSplitter({
        //     chunkSize: 1000,
        //     chunkOverlap: 200,
        //   });
        //   const splitDocs = await splitter.splitDocuments(docs);

        //   const enrichedDocs = splitDocs.map((doc) => ({
        //     ...doc,
        //     metadata: {
        //       ...doc.metadata,
        //       video_url: youtubeUrl,
        //       source: "youtube",
        //     },
        //   }));

    }
    if (type === 'web') {
        const loader = new CheerioWebBaseLoader(url);
        docs = await loader.load();
        // const splitter = new RecursiveCharacterTextSplitter({
        //     chunkSize: 1000,
        //     chunkOverlap: 200,
        // });
        // const splitDocs = await splitter.splitDocuments(docs);
        // const enrichedDocs = splitDocs.map((doc) => ({
        //     ...doc,
        //     metadata: {
        //         ...doc.metadata,
        //         source_url: webUrl, 
        //         source_type: "web",
        //     },
        // }));

    }
    if (type === 'text') {

    }


    const res = await prisma.models.create({
        data:{
            collection_name: collecttion,
            typeOf: type,
            model_id: "",
            userId:''
        }
    })

    return JSON.parse(JSON.stringify(docs));
}
  
export const LoadPdfEmbedings = async (url: string, collecttion: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        return (`Failed to fetch PDF: ${response.statusText}`);
    }
    const pdfBlob = await response.blob();

    const loader = new WebPDFLoader(pdfBlob);
    const docs = await loader.load();
    return JSON.parse(JSON.stringify(docs));
}