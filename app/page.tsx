import { generateEmbeddings } from "@/ai-utils/embeding";
import Link from "next/link";

export default async function Home() {
  // const res = await generateEmbeddings('https://ik.imagekit.io/cqy7eyhof/attentionisallyouneed.pdf?updatedAt=1761884091841','pdf');
  // console.log(res)
  return (
   <div className=" center flex-col min-h-screen">
    <h1>Welcome to the Home Page</h1>
    <div>
      <Link href="/sign-in">
        Sign-in
      </Link>
    </div>
   </div>
  );
}
