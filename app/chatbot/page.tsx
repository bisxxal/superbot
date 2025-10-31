"use client"
import { useState } from "react"

export default function ChatbotPage({ searchParams }: { searchParams: { siteId: string } }) {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [input, setInput] = useState("")

  const handleSend = async () => {
    const userMsg = { role: "user", content: input }
    setMessages((m) => [...m, userMsg])

    const res = await fetch("/api/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ siteId: searchParams.siteId, query: input }),
    })
    const data = await res.json()

    setMessages((m) => [...m, userMsg, { role: "assistant", content: data.answer }])
    setInput("")
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white p-4 rounded-lg">
      <div className="flex-1 overflow-auto space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "user" ? "text-blue-400" : "text-green-400"}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="mt-3 flex">
        <input
          className="flex-1 p-2 bg-gray-800 rounded"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="ml-2 bg-blue-600 px-4 py-2 rounded"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">
        Powered by <span className="font-semibold">Bisxxal AI</span>
      </p>
    </div>
  )
}
