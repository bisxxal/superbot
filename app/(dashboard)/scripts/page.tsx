'use client'
import { toastSuccess } from '@/lib/toast';
import React, { useState } from 'react'
type Chatbot = {
  id: string;
  collection_name: string;
  [key: string]: any;
};
const ScriptsPage = () => {
  const [generatedScript, setGeneratedScript] = useState<string>("");
  const [selectedChatbot, setSelectedChatbot] = useState<Chatbot | null>(null);

  const [chatbots, setChatbots] = useState(() => {
    if (typeof window !== 'undefined') {
      const val = localStorage.getItem('models');
      return JSON.parse(val);
    }
    return null;
  })



  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = chatbots?.res.find(c => c.collection_name === e.target.value);
    setSelectedChatbot(selected || null);
  };


  const handleGenerate = () => {
    if (!selectedChatbot) return;
    const script = `<script
          id="superbot-widget"
          src="https://super-bot-x.vercel.app/widget.js"
          data-site-id="${selectedChatbot.collection_name}"
          data-unique-id="${selectedChatbot.id}"
          data-welcome-message="Hello! How can I assist you today?"
        ></script>`;
    setGeneratedScript(script);
  };

  async function copyTextToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      toastSuccess('Script copied to clipboard!');
    }
    catch (err) {
    }
  }

  return (
    <div>
      <h2 className=' text-2xl font-semibold '>Generate Embed Script
      </h2>
      <p className=' mt-2 text-gray-500'>Generate the embedding script for your AI chatbot. Copy the generated code and paste it into your website.</p>

      <div className=' mt-10 flex gap-5 justify-between'>

        <div className='w-1/2'>
          <div className=' card full rounded-3xl p-4'>
            <h2 className=' text-medium text-xl'>Chatbot Selection</h2>
            <select
              onChange={handleSelectChange}
              className="mt-5 border-2 border-amber-500/60 outline-none px-5 py-2 rounded-3xl"
            >
              <option value="">Select Chatbot</option>
              {chatbots?.res?.map((chatbot, index) => (
                <option key={index} value={chatbot.collection_name}>
                  {chatbot.name ? chatbot.name : chatbot.collection_name}
                </option>
              ))}
            </select>

            {/* <div className='mt-5 mb-1'>
              <p>Welcome message</p>
              <input
                type="text"
                name="youtube"
                placeholder="How can i assist you"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSelectedChatbot(prev => prev ? { ...prev, welcome_message: e.currentTarget.value } : prev)
                }
                className="w-full p-2 mb-4 border-2 border-amber-500/50 outline-none placeholder:text-amber-900/30 rounded-xl"
              />
            </div> */}

          </div>
          <button onClick={handleGenerate} className="mt-5 buttonbg px-4 py-2">
            Generate Script
          </button>

        </div>


        {generatedScript && <div className=' min-h-[200px] card w-1/2 rounded-3xl p-4'>

          <div className=' flex justify-between items-center'>
            <h2 className='textbg text-xl font-medium text-medium mb-4'>Generated Script</h2>
            <button onClick={() => copyTextToClipboard(generatedScript)} className=' bg-green-500 text-white px-3 py-1 rounded-2xl '>Copy </button>
          </div>

          {generatedScript && (
            <div className="bg-[#111827] text-[#43C374] p-3 rounded-md  overflow-x-auto">
              {generatedScript}
              <p className='text-[#ffffffb5] text-sm'>
              // Add the script tag to your website's HTML where you want the chatbot to appear.
              </p>
            </div>)}

        </div>}

      </div>


    </div>
  )
}

export default ScriptsPage