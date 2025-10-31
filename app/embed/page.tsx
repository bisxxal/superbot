'use client';
import { useSearchParams } from "next/navigation";
import ChatbotPage from "../chatbot/page";
import { Suspense } from 'react';

function EmbedContent() {
  const search = useSearchParams();
  const col = search.get("siteId") || "";
  return <ChatbotPage collections={col} />;
}

export default function EmbedPage() {
  return (
    <Suspense fallback={<>...</>}>
      <EmbedContent />
    </Suspense>
  );
}
