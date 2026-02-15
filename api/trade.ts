import { GoogleGenAI } from "@google/genai";

export const config = { runtime: "nodejs" };

export default async function handler(req: Request) {
  const { query, history } = await req.json();
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({
      reply: "Trade Desk temporarily unavailable. Please contact genxoverseasindia1@gmail.com."
    }), { status: 500 });
  }

  const ai = new GoogleGenAI({ apiKey });

  const contents = history.map((msg: any) => ({
    role: msg.role === "user" ? "user" : "model",
    parts: [{ text: msg.text }]
  }));

  contents.push({ role: "user", parts: [{ text: query }] });

  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents,
  });

  return new Response(JSON.stringify({ reply: response.text }), { status: 200 });
}
