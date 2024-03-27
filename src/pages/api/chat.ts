import OpenAI from "openai";
import { NextApiRequest, NextApiResponse } from "next";
import createChat from "../controllers/chat";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const chat = await createChat("vai se fode");
  const content = chat.content as string;
  let message;
  try {
    message = JSON.parse(content);
  } catch (error) {
    return res.status(500).json({ error: true, message: "Erro interno do servidor" });
  }
  
  return res.status(200).json(message);
}
