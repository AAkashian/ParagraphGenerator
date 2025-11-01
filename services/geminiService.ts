
import { GoogleGenAI } from "@google/genai";

// Initialize AI client lazily to avoid errors on module load
let ai: GoogleGenAI | null = null;

const getAI = (): GoogleGenAI => {
  const API_KEY = process.env.API_KEY;

  if (!API_KEY) {
    throw new Error("API_KEY environment variable not set. Please check your Vercel environment variables and ensure GEMINI_API_KEY is set correctly.");
  }

  // Validate API key format (Gemini keys start with "AIza")
  if (!API_KEY.startsWith("AIza")) {
    throw new Error("Invalid API key format. Gemini API keys should start with 'AIza'. Please verify your API key from https://aistudio.google.com/apikey");
  }

  if (!ai) {
    ai = new GoogleGenAI({ apiKey: API_KEY });
  }

  return ai;
};

export const generateParagraph = async (prompt: string): Promise<string> => {
  if (!prompt) {
    throw new Error("Prompt cannot be empty.");
  }

  // Initialize AI client only when needed
  const aiClient = getAI();

  try {
    const fullPrompt = `Create a well-structured and coherent paragraph based on the following prompt:\n\n"${prompt}"`;
    
    const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: fullPrompt,
    });

    const text = response.text;
    if (!text) {
        throw new Error("API returned an empty response.");
    }

    return text.trim();

  } catch (error) {
    console.error("Error generating paragraph:", error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes("API_KEY") || error.message.includes("API key")) {
        throw new Error("API key error: " + error.message);
      }
      if (error.message.includes("quota") || error.message.includes("limit")) {
        throw new Error("API quota exceeded. Please check your Gemini API quota.");
      }
      if (error.message.includes("invalid") || error.message.includes("401") || error.message.includes("403")) {
        throw new Error("Invalid API key. Please verify your Gemini API key from https://aistudio.google.com/apikey");
      }
    }
    
    throw new Error("Failed to generate paragraph: " + (error instanceof Error ? error.message : "Unknown error. Please check your API key and try again."));
  }
};
