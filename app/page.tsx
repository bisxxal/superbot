import Link from "next/link";

export default async function Home() {
   
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
