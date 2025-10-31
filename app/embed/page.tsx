// export default function EmbedPage() {
//   return (
//     <div className="w-full h-full bg-white text-black p-4">
//       <h2 className="text-lg font-semibold mb-2">SuperBot 🤖</h2>
//       <iframe
//         src="/chat"
//         style={{ width: "100%", height: "90%", border: "none" }}
//       ></iframe>
//     </div>
//   );
// }

import ChatbotPage from "../chatbot/page";

export default function EmbedPage() {
  return <ChatbotPage />;
}
