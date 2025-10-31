📦 ai-chatbot-platform/
├── app/
│   ├── (chatbot-ui)/        → public chatbot UI for embedding
│   ├── api/
│   │   ├── crawl/route.ts   → fetch + scrape site content
│   │   ├── index/route.ts   → create embeddings + store in Qdrant
│   │   ├── query/route.ts   → RAG: search + respond
│   ├── dashboard/           → (optional) user dashboard for site owners
│   └── page.tsx             → landing page
├── lib/
│   ├── qdrant.ts
│   ├── embeddings.ts
│   └── scraper.ts
└── prisma/ or db.ts         → optional DB for storing site + API keys

