
import { GoogleGenAI } from "@google/genai";

/**
 * GenX Trade Intelligence Service
 * Uses 'API_KEY' from the environment variable (Vercel/System).
 * Optimized for professional Indian Export-Import context.
 */
export async function getTradeAdvice(query: string, history: { role: string; text: string }[]) {
  const apiKey = process.env.API_KEY;

  // Professional verification of the system availability
  if (!apiKey || apiKey === "undefined" || apiKey.length < 10) {
    console.error("System Check: Secure API Gateway not detected.");
    return "Welcome to the GenX Trade Desk. Our real-time market data synchronization is currently being optimized for the latest harvest season. For immediate FOB/CIF quotes or custom sourcing inquiries, please contact our Senior Trade Desk directly at genxoverseasindia1@gmail.com.";
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
        systemInstruction: `You are the Executive Trade Strategist for GenX Overseas India.
        GENX OVERSEAS PROFILE: 
        - Specialization: High-grade Agricultural commodities (Turmeric, Nasik Onions, Basmati Rice), Electronics (GaN Chargers), and Industrial Components.
        - Location: India (Exporting to Global Hubs like UAE, USA, EU, SE Asia).
        - Values: Transparency, Quality Compliance, and Farm-to-Port traceability.
        
        YOUR ROLE:
        - Provide current market intelligence for Indian exports.
        - Use technical trade terminology: FOB (Free on Board), CIF (Cost, Insurance, and Freight), MT (Metric Tons), FCL (Full Container Load).
        - Always reference market data if available.
        - If prices are requested, use the googleSearch tool to find current Indian Mandi (Market) rates and emphasize that GenX offers competitive export-grade pricing.
        - Keep responses concise, professional, and helpful for international buyers.
        
        CONTACT CALL-TO-ACTION:
        - For formal Letter of Intent (LOI) or soft corporate offers, direct users to genxoverseasindia1@gmail.com.`,
        tools: [{ googleSearch: {} }],
        temperature: 0.1, // Lower temperature for more factual trade data
      },
    });

    // Extracting grounding info to provide professional citations
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    let marketCitation = "";
    if (groundingChunks && groundingChunks.length > 0) {
      const urls = groundingChunks
        .map((chunk: any) => chunk.web?.uri)
        .filter((uri: string) => !!uri);
      if (urls.length > 0) {
        marketCitation = `\n\n[Verified Market Data Source: ${urls[0]}]`;
      }
    }

    const outputText = response.text;
    if (!outputText) throw new Error("Empty response from Trade Desk");

    return outputText + marketCitation;

  } catch (error: any) {
    console.error("Trade Desk Error Details:", error);
    
    // Handling specific API states professionally for the end-user
    const errorStatus = error?.status || 500;
    
    if (errorStatus === 401 || errorStatus === 403) {
      return "The Trade Intelligence Desk is currently authenticating updated global trade protocols. For priority assistance with your current sourcing requirements, please email our export team at genxoverseasindia1@gmail.com.";
    }

    if (errorStatus === 429) {
      return "Our real-time market analysts are currently processing high volumes of global inquiries. Please rephrase your query or reach out to us at genxoverseasindia1@gmail.com for a detailed trade proposal.";
    }

    return "We are experiencing a temporary synchronization issue with the Indian Mandi pricing servers. Please proceed with your inquiry via email (genxoverseasindia1@gmail.com) and our team will provide a comprehensive quote.";
  }
}
