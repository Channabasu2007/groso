import { model } from "@/lib/transcripterGemini";

export async function POST(req) {
  try {
    const { script, servings } = await req.json();

    // Prompt for Gemini
const prompt = `You are a professional chef assistant specializing in precise and user-friendly ingredient measurements.
Your task is to analyze the following transcript and extract:
1. The dish name being prepared (as accurately as possible).
2. A comprehensive list of ingredients.

Transcript: """${script}"""

${servings 
  ? `Adjust the ingredient quantities and units to serve exactly ${servings} people.` 
  : `Use the quantities and units as mentioned in the transcript, estimating only when missing (e.g., for water or salt).`}

Your response MUST be a single valid JSON object only. Do NOT include any text beyond the JSON itself.

The JSON structure must be:
{
  "DishName": "The dish name you inferred",
  "servings":"The Given Servings",
  "ingredients": [
    { "name": "Ingredient Name", "quantity": "2 cups", "unit": "400g" },
    { "name": "Another Ingredient", "quantity": "1 tbsp", "unit": "15ml" }
  ]
}
Rules for DishName:
- It should not contain the servings information.
- it should be the name of the dish which is prepaired in transcript.
- It should be the most accurate name possible.

Rules for servings: 
- if servings is not given then consider it as 1 serving.

Rules for ingredients:
- Each "name" must be in the same language as in the transcript.
- "quantity" must be a user-friendly home measurement (cups, tbsp, tsp, pieces, to taste, etc.).
- "unit" must be the precise metric equivalent (e.g., "400g", "30ml"). If not applicable, use "".
- Only include valid ingredients mentioned in the transcript.
- Do not include steps or extra words.
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
