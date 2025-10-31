"use client"

import { generateEmbeddings } from "@/ai-utils/embeding"
import PdfUploader from "@/components/pdfupload"
import BotennicaChatbot from "@/temp"
import { Loader, LoaderCircle } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

function DashBoardPage() {
  const { data } = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<string | null>(null)
  const sumbitForm = async (formData: FormData) => {
    const youtube = formData.get("youtube") as string
    const website = formData.get("website") as string
    const textData = formData.get("textData") as string
    const pdfdata = formData.get("pdfdata") as File

    // console.log("Text Data:", textData)
    // console.log("pdf", pdfdata)
    // console.log("Youtube Link:", youtube)
    // console.log("Website Link:", website)

    try {

      // if (pdfdata) {
      //   const url = URL.createObjectURL(pdfdata)
      //   console.log(url)
      //   // const res =  await generateEmbeddings( pdfdata , 'pdf')
      //   // console.log("PDF Embeddings:", res)
      //   setIsLoading("Generating Pdf Embeddings...")
      // }

      if (youtube) {
        const collectionName = data?.user.name + "_youtube_collection"
        setIsLoading("Generating Youtube Embeddings...")
        const res = await generateEmbeddings(youtube, 'yt', collectionName)
        console.log("Youtube Embeddings:", res)
      }
      if (website) {
        setIsLoading("Generating Web Embeddings...")
        const collectionName = data?.user.name + "_web_collection"
        const res = await generateEmbeddings(website, 'web', collectionName)
        console.log("Website Embeddings:", res)
      }
      if (textData) {
        setIsLoading("Generating text Embeddings...")
        const collectionName = data?.user.name + "_text_collection"
        const res = await generateEmbeddings(textData, 'text', collectionName)
        console.log("Text Embeddings:", res)
      }
    } catch (error) {

    }
    finally {
      setIsLoading(null)
    }
  }

  return (
    <div className=" w-full px-10">
      <h1 className=" text-center font-bold text-4xl my-5">Build your rag model . </h1>

      {
        isLoading !== null && (
          <div className=" w-full card h-[70px] flex items-center justify-center mb-4">
            <LoaderCircle className=" animate-spin mr-2" />
            <p className=" text-lg font-medium">{isLoading}</p>
          </div>
        )
      }

      <PdfUploader />
      <form action={sumbitForm}>
        <div className="card  mb-6 p-4 flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Provide Youtube Video link</h2>
          <input
            type="text"
            name="youtube"
            placeholder="Enter Youtube Video link"
            className="w-full p-2 mb-4 border  rounded"
          />
          <button className="bg-blue-600 px-4 py-2 rounded text-white">Submit</button>

        </div>

        <div className="card  mb-6 p-4 flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Provide Website link</h2>
          <input
            type="text"
            name="website"
            placeholder="Enter Website link"
            className="w-full p-2 mb-4 border  rounded"
          />
          <button className="bg-blue-600 px-4 py-2 rounded text-white">Submit</button>

        </div>


        <div className="card  mb-6 p-4 flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Add text content</h2>
          <textarea
            rows={10}
            name="textData"
            className="w-full p-2 mb-4 border  rounded"

            placeholder="
Paste or type additional context here... (e.g., FAQ answers, product descriptions, company policies)
You can add up to 10,000 characters of text context."
          />
          <button className="bg-blue-600 px-4 py-2 rounded text-white">Submit</button>

        </div>

      </form>


       
    </div>
  )
}


export default DashBoardPage