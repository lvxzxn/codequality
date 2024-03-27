import Head from "next/head";
import Link from "next/link";
import ChatComponent from "./components/Chat";

export default function Home() {
  return (
    <>
      <Head>
        <title>Code Quality</title>
        <meta property="og:title" content="Code Quality" key={"title"} />
        <meta
          property="og:description"
          content="A project designed to help you improve the quality of your code."
          key={"description"}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen py-6 px-4 sm:px-6 lg:px-8 ">
        <h1 className="text-3xl sm:text-4xl font-bold text-white text-center">
          Code Quality
        </h1>
        <p className="mt-3 text-sm sm:text-base text-gray-400 text-center">
          Um projeto designado para ajudar você a melhorar o seu código 🤝
        </p>
        <ChatComponent />
        <footer className="p-6 bottom-0 text-white text-center mt-9 mb-6 sm:mb-12">
          {`</> `} por Luiz Guilherme -{" "}
          <Link
            className="text-blue-600 hover:underline hover:cursor-pointer"
            href="https://www.linkedin.com/in/luizgguilherme/"
            target="_blank"
          >
            LinkedIn
          </Link>
          {" - "}
          <Link
            className="text-blue-600 hover:underline hover:cursor-pointer"
            href="https://github.com/lvxzxn/"
            target="_blank"
          >
            Github
          </Link>
        </footer>
      </main>
    </>
  );
}
