import { model } from "@/lib/translatorGemini"; // Your Gemini model instance
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { lang, ingredients } = await req.json();

    if (!lang || !ingredients || !Array.isArray(ingredients)) {
      return NextResponse.json(
        { error: "Missing language or ingredients array" },
        { status: 400 }
      );
    }

    // Prompt to translate ingredients
    const prompt = `You are a multilingual culinary assistant. 
Translate the following ingredient names into "${lang}" while keeping them as ingredient names only, 
with no extra text, numbers, or explanation. 
Return the result as a JSON array of strings.

Ingredients: ${JSON.stringify(ingredients)}

Expected format example:
["Rice", "Chicken Breast", "Salt"]
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Extract JSON array from AI response
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("AI response format invalid. Could not extract array.");
    }

    const translatedIngredients = JSON.parse(jsonMatch[0]);

    return NextResponse.json(translatedIngredients, { status: 200 });
  } catch (err) {
    console.error("Translation API Error:", err);
    return NextResponse.json(
      { error: "Failed to translate ingredients" },
      { status: 500 }
    );
  }
}
