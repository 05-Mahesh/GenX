
import { GoogleGenAI } from "@google/genai";

/**
 * GenX Trade Intelligence Service
 * Optimized for professional user experience and silent error handling.
 */
export async function getTradeAdvice(query: string, history: { role: string; text: string }[]) {
  const apiKey = process.env.API_KEY;

  // Silent check for key to prevent crashing
  if (!apiKey || apiKey === "undefined" || apiKey.length < 10) {
    console.error("Trade Desk: API_KEY is not configured in environment.");
    return "Thank you for your inquiry. Our automated trade desk is currently undergoing a scheduled update. For immediate assistance with pricing or logistics, please contact our export team at genxoverseasindia1@gmail.com.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: apiKey });
    
    const contents = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    contents.push({
      role: 'user',
      parts: [{ text: query }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: `You are the Lead Export Strategist for GenX Overseas India.
        GENX PROFILE: Indian Export-Import house (Turmeric, Onions, Rice, Electronics).
        GOAL: Provide expert trade advice. Use industry terms like FOB, CIF, MT.
        REAL-TIME: Use googleSearch for current Mandi prices.
        If asked for price, mention that GenX offers competitive rates matching these market standards.`,
        tools: [{ googleSearch: {} }],
        temperature: 0.1,
      },
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    let citation = "";
    if (groundingChunks && groundingChunks.length > 0) {
      const urls = groundingChunks
        .map((chunk: any) => chunk.web?.uri)
        .filter((uri: string) => !!uri);
      if (urls.length > 0) {
        citation = `\n\n(Market Data Source: ${urls[0]})`;
      }
    }

    return (response.text || "I am analyzing the current market data for you...") + citation;

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Professional fallback based on error type
    if (error?.status === 401 || error?.status === 403) {
      return "Our trade intelligence system is currently verifying updated export protocols. For an instant quote, please email genxoverseasindia1@gmail.com with your requirements.";
    }

    return "The trade desk is currently processing high volume. Please rephrase your question or contact our support team directly for a priority response.";
  }
}
