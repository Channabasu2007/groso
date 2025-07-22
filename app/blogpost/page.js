"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import Fuse from "fuse.js";

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  let fuse; // Fuse instance

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogspage", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        setBlogs(data);
        setFilteredBlogs(data); // Initial blogs
      } catch (err) {
        console.error("Error fetching blogs:", err);
        toast.error("Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Setup Fuse.js options
  const fuseOptions = {
    keys: ["dishName", "slug", "intro", "content.title", "content.paragraph", "ingredients.name"],
    threshold: 0.3, // 0 = exact match, 1 = very loose
  };

  // Handle search input
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (!value.trim()) {
      setFilteredBlogs(blogs); // Reset to all blogs
      return;
    }

    fuse = new Fuse(blogs, fuseOptions);
    const results = fuse.search(value);
    setFilteredBlogs(results.map((result) => result.item)); // Extract blog objects
  };

  const handleShare = async (blog) => {
    const shareData = {
      title: blog.dishName,
      text: blog.intro,
      url: `${window.location.origin}/blogpost/${blog.slug}`,
    };
    try {
      await navigator.share(shareData);
      toast.success("Shared Successfully");
    } catch (err) {
      toast.error("Sorry, something went wrong.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-gray-100 mb-3">
            Welcome to Our Recipe Blog
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl dark:text-gray-300 mb-5">
            Discover mouth-watering recipes & pro cooking tips!
          </p>
          
          {/* Search Box */}
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search recipes by name, slug, or intro..."
            className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm"
          />
        </motion.div>

        {/* Loader */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-500 animate-spin-glow" />
              <div className="absolute inset-0 flex items-center justify-center text-3xl text-green-500 animate-pulse-soft">
                🛒
              </div>
            </div>
          </div>
        )}

        {/* No Blogs */}
        {!loading && filteredBlogs.length === 0 && (
          <div className="text-center h-[60vh] flex flex-col justify-center">
            <p className="text-zinc-900 dark:text-gray-300 text-lg font-medium">
              No matching blogs found. Try a different keyword!
            </p>
          </div>
        )}

        {/* Blogs Grid */}
        {!loading && filteredBlogs.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition transform hover:-translate-y-1"
              >
                {/* Blog Image */}
                <div className="relative w-full h-48 sm:h-52 md:h-56">
                  <Image
                    src={blog.heroImage?.imgUrl || "/placeholder.jpg"}
                    alt={blog.heroImage?.alt || blog.dishName}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Blog Content */}
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    {blog.dishName}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                    {blog.intro}
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-3 flex-wrap">
                    <Link
                      href={`/blogpost/${blog.slug}`}
                      className="inline-block text-sm font-semibold px-5 py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-lg shadow-md hover:scale-105 transition"
                    >
                      Read More
                    </Link>
                    <button
                      onClick={() => handleShare(blog)}
                      className="inline-block text-sm px-5 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium shadow-md transition"
                    >
                      Share
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
