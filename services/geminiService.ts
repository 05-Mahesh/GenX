
import { GoogleGenAI } from "@google/genai";

export async function getTradeAdvice(query: string, history: { role: string; text: string }[]) {
  try {
    // ALWAYS initialize the client inside the function to ensure the latest API key is used
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Format history for the API
    const contents = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // Add the current query
    contents.push({
      role: 'user',
      parts: [{ text: query }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: `You are a Senior Trade Researcher at GenX Overseas, specializing in Indian markets. 
        Your expertise covers:
        1. Indian Agricultural Exports (Turmeric, Onions, Grapes).
        2. "Make in India" electronics and high-end accessories.
        3. Market research on Indian supply chains and global demand.
        4. Logistics compliance (APEDA, FSSAI, GlobalGAP).
        
        Provide detailed, data-driven advice. If a user asks about research, reference our case studies (Organic Turmeric, Tech Hubs, Cold-Chain Efficiency).
        Be professional, succinct, and encouraging of international trade with India.`,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Check for "Requested entity was not found" or other key issues
    if (error?.message?.includes("Requested entity was not found") || error?.message?.includes("API_KEY")) {
      return "I'm having trouble connecting to the trade database. Please ensure your API key is correctly configured. You may need to click 'Reset Connection' if the issue persists.";
    }
    
    return "I apologize, but I encountered a network error. This usually happens if the AI Studio connection is refused. Please try again in a moment.";
  }
}
