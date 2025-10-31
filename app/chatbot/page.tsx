"use client"
import { chatAIAction } from "@/action/chat.ai";
import { formatedText } from "@/lib/util";
import { useState, useRef, useEffect } from "react"

export default function ChatbotPage({ collections }: { collections: string }) {

  console.log(collections,'in chatbot')
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {

    if (!input.trim() || !collections ) return

    const userMsg = { role: "user", content: input }
    setMessages((m) => [...m, userMsg])
    setInput("")
    setIsLoading(true)

    try {
      const res = await chatAIAction(input, collections);
      const formattedResponse =  formatedText(res!);
      setMessages((m) => [...m, { role: "assistant", content: formattedResponse }])
    } catch (err) {
      console.error("Error fetching chat response:", err)
      setMessages((m) => [...m, { role: "assistant", content: "Oops! Something went wrong." }])
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="flex flex-col h-screen max-h-screen bg-gray-950 text-white rounded-lg shadow-lg p-4">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto space-y-4 p-2 mb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
       
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                ? "bg-blue-600 text-white rounded-br-none"
                : "bg-gray-800 text-gray-100 rounded-bl-none"
                }`}
              dangerouslySetInnerHTML={{ __html: msg.content }}
            />
          </div>
        ))}

        {
          isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed bg-gray-800 text-gray-100 rounded-bl-none animate-pulse">
                {isLoading ?
                  <div className="flex flex-row gap-2">
                    <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
                    <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
                    <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
                  </div>
                  : "Thinking..."}
              </div>
            </div>
          )
        }
        <div ref={chatEndRef} />
      </div>
 
      <div className="flex items-center bg-gray-900 border border-gray-800 rounded-full px-4 py-2">
        <input
          type="text"
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="ml-2 bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-full text-sm font-medium"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
 
      <p className="text-xs text-gray-600 text-center mt-3">
        Powered by <span className="font-semibold text-blue-500">Superbot X AI</span>
      </p>
    </div>
  )
}
