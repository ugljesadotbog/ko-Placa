import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  try {
    if (!req.body) {
      throw new Error("Nema podataka u request body!");
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const prompt = body?.prompt;

    if (!prompt) {
      throw new Error("Prompt nije definisan!");
    }

    console.log("Primljen prompt:", prompt);

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        systemInstruction: "Razmisljas kao osoba od 18 godina."
      }
    });

    res.status(200).json({ text: response.text });
  } catch (error) {
    console.error("Error handling Gemini API", error);
    res.status(500).json({ error: error.message });
  }
}
