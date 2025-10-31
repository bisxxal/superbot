"use client"
import { useState } from "react"

export default function ChatbotPage({ searchParams }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const siteId = searchParams.siteId

  const sendMessage = async () => {
    const userMessage = { role: "user", content: input }
    setMessages([...messages, userMessage])

    const res = await fetch("/api/query", {
      method: "POST",
      body: JSON.stringify({ siteId, query: input }),
    })
    const data = await res.json()
    setMessages([...messages, userMessage, { role: "assistant", content: data.answer }])
    setInput("")
  }

  return (
    <div className="bg-gray-900 text-white h-full p-4 flex flex-col">
      <div className="flex-1 overflow-auto space-y-2">
        {messages.map((m, i) => (
          <div key={i} className={`${m.role === "user" ? "text-blue-400" : "text-green-400"}`}>
            {m.content}
          </div>
        ))}
      </div>
      <div className="mt-2 flex">
        <input
          className="flex-1 p-2 bg-gray-800 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
        />
        <button className="ml-2 bg-blue-600 px-4 py-2 rounded" onClick={sendMessage}>Send</button>
      </div>
      <p className="text-xs text-gray-500 mt-2">Powered by <span className="font-bold">Bisxxal AI</span></p>
    </div>
  )
}
