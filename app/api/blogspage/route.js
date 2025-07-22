import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";

export async function GET(request) {
    await dbConnect();
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean();
        if (!blogs || blogs.length === 0) {
            return new Response(JSON.stringify({ message: "No blogs found" }), { status: 404 });
        }
        return new Response(JSON.stringify(blogs), { status: 200 });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}