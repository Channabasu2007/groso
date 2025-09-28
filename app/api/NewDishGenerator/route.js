// app/api/blog/generate/route.js  (or adjust path to where you're putting it)
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { model } from "@/lib/NewDishGemini";
import { generateTextWithFetch } from "@/lib/gemini";

// --- helpers ---
function slugify(str = "") {
  return str
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// Normalize groceries (strings + objects)
function normalizeGroceriesForPrompt(groceries = []) {
  return groceries.map((g) => {
    if (typeof g === "string") return g;
    if (g && typeof g === "object") {
      const name = g.name || g.item || "unknown";

      const unit = g.unit || "";
      return [unit, name].filter(Boolean).join(" ").trim();
    }
    return String(g);
  });
}


export async function POST(req) {
      const body = await req.json().catch(() => ({}));
    const dishNameInput = body.dishName?.trim() || null;
    const groceries = Array.isArray(body.groceries) ? body.groceries : [];
  try {


    if (!dishNameInput && groceries.length === 0) {
      return NextResponse.json(
        { error: "Provide a dishName or a groceries array." },
        { status: 400 }
      );
    }

    await dbConnect();

    if (dishNameInput) {
      const slug = slugify(dishNameInput);
      const existing = await Blog.findOne({ slug }).lean();
      if (existing) {
        return NextResponse.json(existing, { status: 200 });
      }
    }

    const groceriesForPrompt = normalizeGroceriesForPrompt(groceries);

    const dishInstruction = dishNameInput
      ? `A dish name was provided by the user: "${dishNameInput}". Use it as the dish for which you are giving the details but you may lightly enhance it to sound more appetizing (keep recognizable).`
      : `No dish name was provided. Infer a realistic, appealing dish name from the ingredients.`;

    // Prompt
    const prompt = `
You are a professional culinary copywriter + expert food blogger.
${dishInstruction}

RAW INGREDIENTS (may include typos, duplicates, nonsense units):
${JSON.stringify(groceriesForPrompt, null, 2)}

Create a full recipe blog post JSON.

RULES:
1. Dish Name: Use given one (enhanced) OR infer if missing.
2. slug: lowercase-kebab-case from final dish name.
3. intro: 50–70 words. Warm, descriptive, inviting. Mention flavor + when to serve.
4. ingredients:
   - Merge duplicates, fix typos.
   - Add staples if missing (salt, oil, water, basic spices) but only if reasonable.
   - Use friendly qty + optional metric e.g. "1 cup (150g)".
5. content steps:
   - Minimum 5 steps.
   - Each step has "title": "Step X – ...".
   - "paragraph": 4–5 sentences. Explain what + why + tips.
6. plating: 2–3 sentences: serving, garnish, pairing suggestions.
7. prosCons: 3–4 pros, 2–3 gentle cons (phrased as tips, not warnings).
8. funFacts: 2–3 short interesting facts (history, ingredient trivia, regional usage).
9. heroImage: supply placeholder fields; real image will be added later.

OUTPUT JSON EXAMPLE SHAPE:
{
  "dishName": "Creamy Turmeric Potato & Tomato Curry",
  "slug": "creamy-turmeric-potato-tomato-curry",
  "intro": "50–70 word paragraph...",
  "ingredients": [
    { "name": "Potatoes", "quantity": "2 medium (300g)" }
  ],
  "content": [
    { "title": "Step 1 – Heating the Base", "paragraph": "4–5 sentences..." }
  ],
  "plating": "text",
  "prosCons": { "pros": ["..."], "cons": ["..."] },
  "funFacts": ["...", "..."]
}

RETURN RAW JSON ONLY. No markdown fences. No commentary. If unsure, make best reasonable guess.
    `.trim();

    // Call Gemini (adjust API call if lib differs)
    let raw = "";
    try {
      const result = await model.generateContent(prompt);
      raw = result?.response?.text?.() ?? "";
    } catch (e) {
      try {
        raw = await generateTextWithFetch(prompt, 'gemini-2.5-flash');
      } catch (e2) {
        return NextResponse.json(
          { error: "Failed to generate with Gemini.", details: e2?.message || e?.message },
          { status: 502 }
        );
      }
    }

    // Clean out fences if any
    const cleaned = raw
      .replace(/```(?:json)?/gi, "")
      .replace(/```/g, "")
      .trim();

    // Extract JSON block
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start === -1 || end === -1 || end < start) {
      return NextResponse.json(
        {
          error: "AI response not in expected JSON format.",
          raw: cleaned.slice(0, 500),
        },
        { status: 502 }
      );
    }

    let parsed;
    try {
      parsed = JSON.parse(cleaned.slice(start, end + 1));
    } catch (e) {
      return NextResponse.json(
        {
          error: "Failed to parse AI JSON.",
          rawSnippet: cleaned.slice(start, start + 500),
        },
        { status: 502 }
      );
    }

    // ---- Basic validation ----
    if (!parsed.dishName) {
      return NextResponse.json(
        { error: "AI output missing dishName.", parsed },
        { status: 502 }
      );
    }
    if (!Array.isArray(parsed.ingredients)) {
      return NextResponse.json(
        { error: "AI output missing ingredients array.", parsed },
        { status: 502 }
      );
    }
    if (!Array.isArray(parsed.content)) {
      return NextResponse.json(
        { error: "AI output missing content steps array.", parsed },
        { status: 502 }
      );
    }

    // Normalize & fill slug
    const dishName = String(parsed.dishName || "").trim();
    if (!dishName) {
      return NextResponse.json(
        { error: "AI output missing dishName.", parsed },
        { status: 502 }
      );
    }
    const slug = parsed.slug?.trim?.() || slugify(dishName);

    let heroImage = {
      imgUrl: "",
      photographer: "",
      alt: `Plated ${dishName}`,
      webUrl: "",
      photographer_url: "",
    };
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
    if (PEXELS_API_KEY) {
  try {
    const imgRes = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent( dishNameInput || dishName)}&per_page=1`,
      { headers: { Authorization: PEXELS_API_KEY } }
    );
    if (imgRes.ok) {
      const pexelsData = await imgRes.json();
      if (Array.isArray(pexelsData.photos) && pexelsData.photos.length > 0) {
        const p = pexelsData.photos[0];
        heroImage = {
          imgUrl: p.src?.large || p.src?.medium || p.src?.original || "",
          photographer: p.photographer || "",
          alt: p.alt || `Plated ${dishName}`,
          webUrl: p.url || "",
          photographer_url: p.photographer_url || ""
        };
      }
    } else {
      console.error("Pexels error status:", imgRes.status);
    }
  } catch (e) {
    console.error("Pexels fetch failed:", e);
  }
}


    // Normalize ingredients
    const ingredients = parsed.ingredients.map((ing) => ({
      name: String(ing.name || "Unknown").trim(),
      quantity: String(ing.quantity || "").trim(),
    }));

    // Normalize steps
    const content = parsed.content.map((st, i) => ({
      title: String(st.title || `Step ${i + 1}`).trim(),
      paragraph: String(st.paragraph || "").trim(),
    }));

    const blogDoc = {
      dishName,
      slug,
      intro: parsed.intro?.trim() || "",
      heroImage,
      ingredients,
      content,
      plating: parsed.plating?.trim() || "",
      prosCons: {
        pros: Array.isArray(parsed.prosCons?.pros)
          ? parsed.prosCons.pros.map(String)
          : [],
        cons: Array.isArray(parsed.prosCons?.cons)
          ? parsed.prosCons.cons.map(String)
          : [],
      },
      funFacts: Array.isArray(parsed.funFacts)
        ? parsed.funFacts.map(String)
        : [],
      mode: "auto",
    };

    // Save / upsert by slug
    const saved = await Blog.findOneAndUpdate({ slug }, blogDoc, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    }).lean();

    return NextResponse.json(saved, { status: 200 });
  } catch (err) {
    console.error("Blog generate error:", err);
    return NextResponse.json(
      {
        error: "Something went wrong while creating blog.",
        details: err?.message,
      },
      { status: 500 }
    );
  }
}
