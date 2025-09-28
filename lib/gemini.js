// lib/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize client with explicit v1 API configuration
export const genAI = new GoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseUrl: 'https://generativelanguage.googleapis.com/v1'
});

// Helper to get a text model instance
export function getModel(modelName = "gemini-2.5-flash") {
  return genAI.getGenerativeModel({ model: modelName });
}

// Alternative implementation using HTTP fetch directly (stable v1)
export async function generateTextWithFetch(prompt, modelName = 'gemini-2.5-flash') {
  const API_KEY = process.env.GEMINI_API_KEY;
  const makeUrl = (apiVersion) => `https://generativelanguage.googleapis.com/${apiVersion}/models/${modelName}:generateContent?key=${API_KEY}`;
  
  try {
    if (!API_KEY) {
      throw new Error('Missing GEMINI_API_KEY in environment');
    }
    // Try stable v1 first
    let response = await fetch(makeUrl('v1'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });
    
    if (!response.ok) {
      let details = '';
      try { details = await response.text(); } catch {}
      // If model not found on v1, try v1beta
      if (response.status === 404 && /not found|NOT_FOUND/i.test(details)) {
        response = await fetch(makeUrl('v1beta'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        });
        if (!response.ok) {
          let detailsBeta = '';
          try { detailsBeta = await response.text(); } catch {}
          throw new Error(`API Error (v1beta) ${response.status}: ${detailsBeta}`);
        }
      } else {
        throw new Error(`API Error ${response.status}: ${details}`);
      }
    }
    
    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error('No text returned by Gemini');
    }
    return text;
    
  } catch (error) {
    console.error('Fetch API error:', error);
    throw error;
  }
}

export async function generateText(prompt) {
  // Prefer stable v1 HTTP endpoint directly to avoid SDK version routing issues
  const modelNames = [
    "gemini-2.5-flash",
    "gemini-2.5-pro"
  ];
  let lastError;
  for (const modelName of modelNames) {
    try {
      console.log(`Trying model (HTTP v1): ${modelName}`);
      const text = await generateTextWithFetch(prompt.replace(/\s+$/,''), modelName).catch((e) => { throw e; });
      if (text && typeof text === 'string' && text.trim().length > 0) {
        return text;
      }
      lastError = new Error(`Empty response from ${modelName}`);
    } catch (error) {
      lastError = error;
      console.error(`Failed with model ${modelName} via HTTP:`, error?.message || error);
      continue;
    }
  }
  throw new Error(`All models failed via HTTP v1. Last error: ${lastError?.message || String(lastError)}`);
}

// Optional: list available models for the API key (debug aid)
export async function listModels() {
  const API_KEY = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`;
  const res = await fetch(url);
  const txt = await res.text();
  return { status: res.status, body: txt };
}
