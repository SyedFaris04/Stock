
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFinancialInsight = async (ticker: string, sentiment: number, prediction: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `As a senior quantitative financial analyst at Alpha Technologies, provide a short 2-sentence market outlook for ${ticker}. 
      The current sentiment score is ${sentiment.toFixed(2)} and our model suggests a "${prediction}" action. 
      Keep it professional, data-driven, and concise.`,
      config: {
        temperature: 0.7,
        topP: 0.8,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Market insights currently unavailable. Please check back later.";
  }
};

export const getEducationalContent = async (topic: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Explain the concept of "${topic}" in the context of quantitative trading. 
      Keep the explanation beginner-friendly but technically accurate. 
      Use Markdown formatting. Maximum 150 words.`,
      config: {
        temperature: 0.5,
      }
    });
    return response.text;
  } catch (error) {
    return "Content could not be loaded.";
  }
};

export const getStockAnalysis = async (ticker: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a comprehensive analysis for the stock ticker: ${ticker}.
      Include:
      1. Company Overview (1 sentence)
      2. Key Financial Metrics (briefly mention 3)
      3. Sentiment Analysis Summary (based on general market trends)
      4. Investment Thesis: Should a user buy this stock? (Provide a "Think to Buy" section with pros and cons)
      5. Educational Tip: Explain one technical indicator that is currently relevant for this stock.
      
      Format the output in clear Markdown with headers.`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "Detailed analysis for this stock is currently unavailable.";
  }
};
