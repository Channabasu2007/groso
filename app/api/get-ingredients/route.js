import { model } from "@/lib/gemini";

export async function POST(req) {
  try {
    const { dishName, servings,  } = await req.json();

    // Prompt for Gemini
const prompt = `You are a professional chef assistant specializing in precise and highly user-friendly ingredient measurements.
Your task is to provide a comprehensive list of ingredients for the dish "${dishName}" adjusted to serve **exactly ${servings} people**.

Your response MUST be valid JSON only. Do NOT include any introductory, concluding text, conversational filler, or Markdown beyond the JSON itself.

Each ingredient in the list must be an object with the following three properties:
- "name": The common name of the ingredient (string).
- "quantity": The user-friendly, common household measurement string, already calculated for ${servings} people. This should include the number and the unit (e.g., "2 cups", "1 tbsp", "500 ml", "3 pieces", "to taste"). Use the most common unit for home cooks.
- "unit": The precise metric measurement string for buying or exact culinary use, already calculated for ${servings} people (e.g., "400g", "15ml", "0.5kg"). If a precise metric measurement is not directly applicable or meaningful (e.g., for "to taste" or items where weight varies wildly like "1 onion"), use an empty string "".

Example of the ONLY expected JSON format (quantities should be accurately calculated by you, the AI):
{
  "ingredients": [
    { "name": "Rice", "quantity": "2 cups", "unit": "400g" },
    { "name": "Chicken Breast", "quantity": "500 grams", "unit": "0.5kg" },
    { "name": "Onion", "quantity": "1 piece", "unit": "120g" }, // Example: if an estimate is reasonable
    { "name": "Garlic", "quantity": "3 cloves", "unit": "" },
    { "name": "Tomato Paste", "quantity": "50 grams", "unit": "50g" },
    { "name": "Water", "quantity": "250 ml", "unit": "250ml" },
    { "name": "Olive Oil", "quantity": "2 tablespoons", "unit": "30ml" },
    { "name": "Salt", "quantity": "1.5 teaspoons", "unit": "7.5g" },
    { "name": "Black Pepper", "quantity": "0.5 teaspoon", "unit": "2.5g" }
  ]
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Clean and parse JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return new Response(JSON.stringify({ error: "Invalid response" }), { status: 500 });
    }

    const data = JSON.parse(jsonMatch[0]);

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
