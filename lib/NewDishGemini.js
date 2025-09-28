import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY_NEW_DISH || process.env.GEMINI_API_KEY,
  baseUrl: 'https://generativelanguage.googleapis.com/v1'
});

export const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });