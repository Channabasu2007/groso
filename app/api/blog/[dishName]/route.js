import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";

export async function GET(req, { params }) {
  const { dishName } =await params; // from URL segment

  if (!dishName) {
    return NextResponse.json(
      { error: "Dish name is required." },
      { status: 400 }
    );
  }

  await dbConnect();


  let blogDoc;
  try {
    blogDoc = await Blog.findOne({
      slug: new RegExp(`^${dishName}$`, "i"),
    });
  } catch (err) {
    console.error("DB Find Error:", err);
    return NextResponse.json(
      { error: "Database error while finding blog." },
      { status: 500 }
    );
  }

  if (!blogDoc) {
    return NextResponse.json(
      { error: "Blog not found." },
      { status: 404 }
    );
  }

  
  return NextResponse.json(
   {blogDoc},
    { status: 200 }
  );
}
