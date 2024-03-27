import createChat from "../controllers/chat";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const chat = await createChat(process.env.OPENAI_API_KEY || "", req.body.code);
    res.status(200).json({ message: chat });
  } else {
    res.status(400).json({ mensagem: "Método inválido" });
  }
}
