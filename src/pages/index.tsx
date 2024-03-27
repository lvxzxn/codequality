import Head from "next/head";
import Link from "next/link";

import { useState } from "react";
import { ClipLoader } from "react-spinners";

export default function Home() {
  const [code, setCode] = useState("");
  const [score, setScore] = useState(null);
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event: any) => {
    setCode(event.target.value);
  };

  const handleClick = async () => {
    setLoading(true);

    const cleanCode = code.replace(/\\+/g, "");

    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ code: cleanCode }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      setScore(data.message.score);
      setComments(data.message.comments);
    }

    setLoading(false);
  };

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
        <div className="w-full max-w-screen-lg mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-white text-center">
            Code Quality
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-400 text-center">
            Um projeto designado para ajudar você a melhorar o seu código 🤝
          </p>
          {loading && (
            <div className="w-full flex items-center justify-center mt-5 mb-5">
              <ClipLoader color={"#2563eb"} loading={loading} size={50} /> {}
            </div>
          )}
          {score !== null && !loading && (
            <div className="w-full flex items-center justify-center mt-5 mb-5">
              <div className="bg-red-800 rounded-lg p-6 w-full max-w-full shadow-lg">
                <p className="text-white text-xl mb-4">
                  Sua pontuação de código é:{" "}
                  <span className="font-bold text-white">{score}/10</span>
                </p>
                <p className="text-md font-semibold text-gray-300">
                  {comments}
                </p>
              </div>
            </div>
          )}
          <div className="w-full mt-5">
            <textarea
              className="bg-gray-800 text-white w-full min-h-40 p-4 rounded-md resize-none outline-none"
              placeholder="Cole seu código aqui..."
              value={code}
              rows={8}
              onChange={handleChange}
            />
          </div>
          <button
            type="button"
            onClick={handleClick}
            className="inline-flex justify-center items-center rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:z-10 outline-none outline-nonemt-4 px-6 py-3 mt-4 w-full"
          >
            Checar pontuação
          </button>
        </div>
        <footer className="p-6 bottom-0 text-white text-center mt-9 mb-6 sm:mb-12">
          {`</> `} por Luiz Guilherme - {" "}
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
