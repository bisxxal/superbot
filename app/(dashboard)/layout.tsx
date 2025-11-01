import Navbar from "@/components/navbar";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard | SuperBot X",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Navbar />
      <div className=" mt-[70px] px-6 max-md:px-2">

        <div className=" flex items-center !mt-[100px] gap-3">
          <Link href="/dashboard">
            <div className=" buttonbg text-white px-4 py-2 rounded inline-block mb-6">
              Uplaod Content
            </div>
          </Link>
          <Link href="/my-chatbot">
            <div className=" buttonbg text-white px-4 py-2 rounded inline-block mb-6">
              My Chatbots
            </div>
          </Link>
          <Link href="/scripts">
            <div className=" buttonbg text-white px-4 py-2 rounded inline-block mb-6">
              Generate Scripts
            </div>
          </Link>
          <Link href="/profile">
            <div className=" buttonbg text-white px-4 py-2 rounded inline-block mb-6">
              Profile
            </div>
          </Link>


        </div>
        {children}
      </div>
    </main>

  );
}
