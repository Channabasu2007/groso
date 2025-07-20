import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_TRASNCRIPT_INGREDIENTS);

// Create a model instance using gemini-1.5-flash
export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });