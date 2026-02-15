
import { GoogleGenAI } from "@google/genai";

/**
 * GenX Trade Intelligence Service
 * Optimized for Vercel Environment Variables.
 */
export async function getTradeAdvice(query: string, history: { role: string; text: string }[]) {
  const apiKey = process.env.API_KEY;

  // 1. Initial Check for the Key
  if (!apiKey || apiKey === "undefined" || apiKey === "" || apiKey.length < 10) {
    return "CONFIG_ERROR: The 'API_KEY' is missing or not yet active in your Vercel Environment. ACTION REQUIRED: Please add 'API_KEY' in Vercel Settings and click REDEPLOY.";
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
        GENX PROFILE: Indian Export-Import house specializing in Agriculture (Salem Turmeric, Nasik Onions, Basmati Rice), Electronics, and Industrial Castings.
        GOAL: Provide expert trade advice. Use industry terms like FOB, CIF, MT, FCL.
        REAL-TIME: Use googleSearch to find current Mandi prices for commodities.
        CONTACT: Lead inquiries to genxoverseasindia1@gmail.com.`,
        tools: [{ googleSearch: {} }],
        temperature: 0.2,
      },
    });

    // Extract Grounding
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    let citation = "";
    if (groundingChunks && groundingChunks.length > 0) {
      const urls = groundingChunks
        .map((chunk: any) => chunk.web?.uri)
        .filter((uri: string) => !!uri);
      if (urls.length > 0) {
        citation = `\n\n📊 Market Source: ${urls[0]}`;
      }
    }

    return (response.text || "Analyzing markets...") + citation;

  } catch (error: any) {
    console.error("Gemini API Error:", error);

    // 2. Specific Error Mapping for User Support
    if (error?.status === 401 || error?.message?.includes('401') || error?.message?.includes('API_KEY_INVALID')) {
      return "AUTH_ERROR: The API Key is invalid. Please verify the key in Vercel matches your Google AI Studio key exactly.";
    }

    if (error?.status === 403 || error?.message?.includes('403')) {
      return "PERMISSION_ERROR: Access Denied. Your Google Project may not have the Gemini API enabled, or your key is restricted.";
    }

    if (error?.status === 429) {
      return "QUOTA_ERROR: Hourly limit reached for the free AI tier. Please try again in 1 hour.";
    }

    return "CONNECTION_ERROR: I'm having trouble reaching the trade database. Please ensure your Vercel Deployment is fresh and your internet is stable.";
  }
}
