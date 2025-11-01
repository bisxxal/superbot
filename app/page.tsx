'use client'
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {

  const [show, setShow] = useState(true);
  return (
    <div className=" w-full min-h-screen bg-[#FDFCFB] text-[#111827]  ">
      <nav className="h-[70px] flex w-full justify-between px-5 items-center border-b border-[#111827] ">
        <Link href="/"> Superbot X </Link>
        <Link className="bg-[#F16230] px-4 py-2 rounded-full text-white shadow-xl" href="/sign-in">
          Sign-in
        </Link>
      </nav>

      <div className=" px-20 py-6 mt-[50px] max-md:px-2 w-full">
        <div className=" mx-auto w-fit border rounded-full  ">
          <button onClick={() => setShow(true)} className={`${show ? 'buttonbg shadow-xl' : ''} px-5 rounded-full py-2`}>Ai bot</button>
          <button onClick={() => setShow(false)} className={`${!show ? 'buttonbg shadow-xl' : ''} px-5 rounded-full py-2`}>Notebook</button>
        </div>
        {show ? <AiBot /> : <NotebookLLm />}

      </div>
    </div>
  );
}

const AiBot = () => {
  return (
    <div className=" mt-20" >
      <h1 className="w-[70%] mx-auto text-center font-bold text-5xl md:text-7xl  tracking-tighter mt-1 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-red-500 pb-2 font-space-mono ">Transform Your Website with
        Intelligent AI Chatbots</h1>

      <p className=" mt-20 text-center w-[70%] mx-auto">Upload documents, add YouTube videos, extract website content, or paste text to train your AI chatbot. Generate custom scripts and embed them on your website for instant, intelligent customer support.</p>


      <div className=" flex center gap-3">
        <Link href={`/dashboard`} className=" buttonbg p-4 flex gap-3 rounded-2xl my-[100px] hover:scale-[1.09] transition-all ">Start building your bot <ArrowRight /> </Link>
        <button className=" border   p-4 rounded-2xl my-[100px] hover:scale-[1.09] transition-all">Watch demo</button>
      </div>




      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="group">
          <div className=" px-3 p-2 border border-e-amber-600  card rounded-2xl  hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-105">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-upload w-8 h-8"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" x2="12" y1="3" y2="15"></line></svg></div><h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">Multi-Source Context</h3><p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">Upload PDFs, documents, Excel files, or add YouTube videos, websites, and text to train your AI chatbot.</p></div></div><div className="group"><div className="
                px-3 p-2 border border-e-amber-600  card rounded-2xl  hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-105"><div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-code w-8 h-8"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg></div><h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">One-Click Script Generation</h3><p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">Generate embeddable JavaScript code instantly. Copy and paste to your website in seconds.</p></div></div>
        <div className="group">
          <div className="px-3 p-2 border border-e-amber-600  card rounded-2xl  hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-105">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-message-square w-8 h-8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></div><h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">Smart Conversations</h3><p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">AI-powered responses that understand context and provide accurate, helpful answers to your customers.</p></div></div><div className="group">
          <div className="px-3 p-2 border border-e-amber-600  card rounded-2xl  hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-105"><div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-bar-chart3 w-8 h-8"><path d="M3 3v18h18"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg></div><h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">Analytics &amp; Insights</h3><p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">Track conversation quality, popular questions, and customer satisfaction with detailed analytics.</p></div></div><div className="group">
          <div className="px-3 p-2 border border-e-amber-600  card rounded-2xl  hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-105"><div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-zap w-8 h-8"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg></div><h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">Lightning Fast</h3><p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">Sub-second response times with 99.9% uptime. Your customers get instant answers, always.</p></div></div><div className="group"><div className=" card px-3 p-2 border border-e-amber-600  card rounded-2xl   hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-105"><div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300  group-hover:scale-110"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shield w-8 h-8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path></svg></div><h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">Enterprise Security</h3><p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">SOC 2 compliant with end-to-end encryption. Your data and conversations are completely secure.</p></div></div></div>
    </div>

  )
}

const NotebookLLm = () => {
  return (
    <div className=" mt-20 center flex-col" >

      <div className=" h-[50vh]">

        <h1 className=" text-center font-bold text-5xl md:text-7xl  tracking-tighter mt-1 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500  to-purple-500 pb-2 font-space-mono ">
          Understand Anything </h1>
        <p className="text-gray-500 mt-[50px] text-center ">Your research and thinking partner, grounded in the information you trust </p>
        <div className="center">
          <Link href={`/dashboard`} className=" buttonbg mt-20 text-2xl  mx-auto  px-5 py-3 text-white rounded-2xl">Try Superbot X now</Link>
        </div>
      </div>


      <div className=" gap-5">
        <h2 className=" text-4xl text-center my-10 "> Your AI-Powered Research Partner </h2>

        <div className=" flex justify-between  items-center">
          <div className=" w-[30%] h-[500px] ">
            <h3 className=" text-xl font-medium ">Upload your sources</h3>
            <p className=" text-gray-400">Upload PDFs, websites, YouTube videos, audio files, Google Docs, Google Slides and more, and NotebookLM will summarize them and make interesting connections between topics, all powered by the latest version of Gemini’s multimodal understanding capabilities.</p>
          </div>

          <div className="w-1/2  image ">
            <video className=" w-full rounded-3xl " autoPlay loop muted src="/upload.mp4"></video>
          </div>
        </div>
      </div>

      <div className=" flex justify-between  items-center">
        <div className=" w-[30%] ">
          <h3 className=" text-xl font-medium ">See the source, not just the answer</h3>
          <p className=" text-gray-400">
            Gain confidence in every response because NotebookLM provides clear citations for its work, showing you the exact quotes from your sources.</p>
        </div>

        <div className="w-1/2  image ">
          <video className=" w-full h-[500px] rounded-3xl " autoPlay loop muted src="/source.mp4"></video>
        </div>
      </div>

    </div>
  )
}