import { NextResponse } from "next/server";
import { listModels, generateTextWithFetch } from "@/lib/gemini";

export async function GET() {
  try {
    const models = await listModels().catch((e) => ({ status: 0, body: String(e?.message || e) }));

    const probes = {};
    for (const name of [
      "gemini-1.5-flash-002",
      "gemini-1.5-pro-002",
      "gemini-1.5-flash",
      "gemini-1.5-pro"
    ]) {
      try {
        const text = await generateTextWithFetch("ping", name);
        probes[name] = { ok: true, sample: String(text).slice(0, 80) };
      } catch (e) {
        probes[name] = { ok: false, error: String(e?.message || e) };
      }
    }

    return NextResponse.json({ models, probes }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
  }
}


