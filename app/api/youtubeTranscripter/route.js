import { NextResponse } from "next/server";

export async function POST (req) {
  const {DishInput} = await req.json()

if (!DishInput) {
  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}


    const response = await fetch(
    `https://api.supadata.ai/v1/youtube/transcript?url=${encodeURIComponent(DishInput)}&text=true`,
    {
      headers: { "x-api-key": process.env.SUPADATA_KEY }, // use env variable
    }
  );

  const data = await response.json();
  return NextResponse.json(data);

}