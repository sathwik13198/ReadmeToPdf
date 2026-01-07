
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const refineMarkdown = async (markdown: string, instruction: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Refine the following markdown based on this instruction: "${instruction}". Keep the output as pure markdown without any markdown code block wrappers (unless they are part of the content).\n\n${markdown}`,
  });
  return response.text || markdown;
};

export const suggestCSS = async (markdown: string, styleDescription: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on this markdown preview:\n${markdown.substring(0, 1000)}\n\nGenerate CSS that achieves this look: "${styleDescription}". Provide ONLY the CSS code, no explanation.`,
  });
  return response.text?.replace(/```css|```/g, '').trim() || '';
};
