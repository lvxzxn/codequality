import Head from "next/head";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Code Quality</title>
        <meta property="og:title" content="Code Quality" key={"title"}></meta>
        <meta property="og:description" 
          content="A project designed to help you improve the quality of your code." 
          key={"description"}>
        </meta>
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-between text-white text-center p-24 ${inter.className}`}
      >
        <div>
          <h1 className="font-semibold text-2xl md:text-4xl uppercase mb-2">Code Quality</h1>
        </div>
      </main>
    </>
  );
}
