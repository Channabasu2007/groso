// app/blogs/[slug]/page.jsx
// No "use client" directive means this is a Server Component by default

import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotFoundDish from "@/components/NotFoundDish"; // Might still be useful as a fallback
import BlogData from "@/components/BlogData";
import Loader from "@/components/Loader"; // Added Loader for initial server-side fetch delay (optional, Next.js handles it often)

// 1. generateMetadata: Fetches data for SEO metadata
export async function generateMetadata({ params, searchParams }) {
  const dishName = await params.slug; // params is directly available

  // Fetch post information for metadata
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WEBSITEURL_FOR_SHARE_FEATURE}/api/blog/${encodeURIComponent(dishName)}`, {
      cache: "no-store", // Or 'force-cache' if blog content is highly static
    });

    if (!res.ok) {
      // If the API call fails or returns non-OK, fall back to a generic title
      // We don't call notFound() here directly for metadata, but ensure a valid metadata object is returned
      console.error(`Failed to fetch metadata for slug: ${dishName}, Status: ${res.status}`);
      return {
        title: "Blog Post Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    const blogData = await res.json();
    const post = blogData.blogDoc; // Assuming your API returns { blogDoc: ... }

    // Check if post data itself is null or undefined from the successful JSON response
    if (!post) {
      return {
        title: "Blog Post Data Missing",
        description: "The blog post data was not found in the API response.",
      };
    }

    return {
      title: post.dishName || "Blog Post",
      description: post.intro ||  "Read interesting articles and updates.",
      openGraph: {
        title: post.dishName,
        description: post.intro,
        images: [post.heroImage?.imgUrl || '/default-blog-image.jpg'], // Use optional chaining for safety
        url: `${process.env.NEXT_PUBLIC_WEBSITEURL_FOR_SHARE_FEATURE}/blogpost/${post.slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.dishName,
        description: post.intro,
        images: [post.heroImage?.imgUrl || '/default-blog-image.jpg'], // Use optional chaining for safety
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    // If there's an error during fetch itself, return a fallback metadata
    return {
      title: "Error Loading Blog Post",
      description: "There was an issue fetching the blog post information.",
    };
  }
}

// 2. The Page component: Fetches data for the content rendering
export default async function Page({ params, searchParams }) {
  const dishName = params.slug; // params is directly available

  let blog = null;
  let hasError = false;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WEBSITEURL_FOR_SHARE_FEATURE}/api/blog/${encodeURIComponent(dishName)}`, {
      cache: "no-store", // Ensure fresh data
    });

    if (!res.ok) {
      // If the API call fails or returns non-OK, trigger notFound().
      // This will stop rendering and show app/not-found.js
      notFound();
    }

    const blogData = await res.json();
    blog = blogData.blogDoc; // Assign to the 'blog' variable

    if (!blog) {
      // If blogDoc itself is null/undefined from a successful API response
      console.warn(`BlogDoc was null for slug: ${dishName}`);
      hasError = true; // Indicate an error state for rendering
    }
  } catch (error) {
    console.error("Error fetching blog content:", error);
    hasError = true; // Indicate an error state
  }

  // --- Render Logic ---
  return (
    <>
      <Navbar />

      {hasError || !blog ? ( // If there was an error or blog data is missing
        <div className="h-[89vh] w-full flex items-center justify-center">
          <NotFoundDish /> {/* Use your NotFoundDish component here */}
        </div>
      ) : (
        // If data is successfully fetched and available
        <BlogData blogData={blog} />
      )}

      <Footer />
    </>
  );
}