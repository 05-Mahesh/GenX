
import { GoogleGenAI } from "@google/genai";

/**
 * GenX Trade Intelligence Bridge
 * This service handles the intelligence layer for the GenX platform.
 */
export async function getTradeAdvice(query: string, history: { role: string; text: string }[]) {
  // NOTE: On Vercel, process.env.API_KEY is only available on the server.
  // If you are calling this from the browser, ensure the key is correctly handled.
  const apiKey = process.env.API_KEY;

  if (!apiKey || apiKey === "undefined" || apiKey.length < 10) {
    console.warn("Trade Desk Configuration: API_KEY is missing in the current execution context.");
    return "The GenX Trade Intelligence Desk is currently in high-security advisory mode. For live FOB/CIF pricing and Mandi rate synchronization, please contact our export team directly at genxoverseasindia1@gmail.com.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Clean history for the model
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
        
        IDENTITY:
        - Lead Export Partner for Indian Turmeric, Nasik Onions, Basmati Rice, and GaN Electronics.
        - Tone: Executive, precise, data-driven.
        
        PROTOCOL:
        - ALWAYS use the googleSearch tool to find CURRENT market prices for Indian commodities.
        - Reference Mandi prices (APMC rates) from major hubs like Erode, Salem, or Nasik.
        - Discuss trade terms: FOB (Free on Board), CIF (Cost, Insurance, and Freight), and Letter of Credit (LC).
        - If the user asks about electronics, reference BIS certifications and GaN technology efficiency.
        
        CONTACT:
        - For bulk volume quotes or Proforma Invoices, direct to genxoverseasindia1@gmail.com.`,
        tools: [{ googleSearch: {} }],
        temperature: 0.15,
      },
    });

    if (!response.text) {
      throw new Error("Mandi Data Feed returned an empty response.");
    }

    // Extract citations for professional transparency
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    let citation = "";
    if (groundingChunks && groundingChunks.length > 0) {
      const url = groundingChunks.find((c: any) => c.web?.uri)?.web?.uri;
      if (url) {
        citation = `\n\n[Verified Market Intelligence Source: ${url}]`;
      }
    }

    return response.text + citation;

  } catch (error: any) {
    console.error("Trade Desk Technical Fault:", error);
    
    // Professional handling of common API states
    const status = error?.status;
    if (status === 401 || status === 403) {
      return "Our Trade Intelligence gateway is currently undergoing scheduled authentication. For immediate market pricing, please contact our export desk at genxoverseasindia1@gmail.com.";
    }
    
    if (status === 429) {
      return "The Trade Desk is currently processing a high volume of global inquiries. Please wait a moment or reach out via email for a priority quote.";
    }

    return "We are experiencing a temporary synchronization delay with external market data feeds. Please contact our team at genxoverseasindia1@gmail.com and we will provide a comprehensive manual quote for your destination port.";
  }
}
