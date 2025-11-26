import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PROJECT_CONTEXT } from '../constants';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is not defined in process.env");
    throw new Error("API Key missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const sendMessageToGemini = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  try {
    const ai = getAiClient();
    
    // We use a chat model for interaction
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: PROJECT_CONTEXT,
        temperature: 0.7,
      },
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      }))
    });

    const result: GenerateContentResponse = await chat.sendMessage({
      message: message
    });

    return result.text || "Désolé, je n'ai pas pu générer de réponse.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "Une erreur est survenue lors de la communication avec l'assistant IA. Veuillez vérifier votre clé API.";
  }
};
