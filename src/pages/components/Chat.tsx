import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

const ChatComponent = () => {
  const [code, setCode] = useState("");
  const [score, setScore] = useState(null);
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);

  const [scoreColor, setScoreColor] = useState("");
  const [textColor, setTextColor] = useState("");

  const handleChange = (event: any) => {
    setCode(event.target.value);
  };

  const handleClick = async () => {
    setLoading(true);

    const cleanCode = code.replace(/\\+/g, "");

    try {
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

        const scoreValue = data.message.score;
        if (scoreValue <= 4) {
          setScoreColor("bg-red-800");
          setTextColor("text-white");
        } else if (scoreValue >= 5 && scoreValue <= 7) {
          setScoreColor("bg-yellow-500");
          setTextColor("text-black");
        } else {
          setScoreColor("bg-green-500");
          setTextColor("text-black");
        }
      }
    } catch (error) {
      console.error("Erro ao processar a solicitação:", error);
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <div className="w-full flex items-center justify-center mt-5 mb-5">
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
      {loading && (
        <div className="w-full flex items-center justify-center mt-5 mb-5">
          <ClipLoader color={"#2563eb"} loading={loading} size={50} />
        </div>
      )}
      {score !== null && !loading && (
        <div className={`w-full flex items-center justify-center mt-5 mb-5 ${scoreColor}`}>
          <div className="rounded-lg p-6 w-full max-w-full shadow-lg">
            <p className={`${textColor} font-bold text-xl mb-4`}>
              Sua pontuação de código é:{" "}
              <span className={`font-bold ${textColor}`}>{score}/10</span>
            </p>
            <p className={`text-md font-medium ${textColor}`}>{comments}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
