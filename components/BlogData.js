"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const BlogData = ({ blogData }) => {
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();
  if (!blogData || !blogData.ingredients) {
    return <p className="text-center animate-pulse">Loading recipe...</p>;
  }

  const displayedIngredients = showAll
    ? blogData.ingredients
    : blogData.ingredients.slice(0, 4);

  const handelShare = async () => {
    const shareData = {
      title: blogData.dishName,
      text: blogData.intro,
      url: window.location.href,
    };
    try {
      await navigator.share(shareData);
      toast.success("Shared Successfully");
    } catch (err) {
      toast.error("Sharing not supported or canceled.");
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-950 text-gray-800 dark:text-gray-100 min-h-screen p-6 max-w-4xl mx-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 px-4"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-green-500 to-yellow-500 bg-clip-text py-5 text-transparent mb-3">
          {blogData.dishName}
        </h1>
        <p className="text-sm sm:text-lg opacity-80 max-w-2xl mx-auto mb-3">
          {blogData.intro}
        </p>
        <button
          onClick={handelShare}
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-green-500 to-yellow-500 hover:scale-105 hover:shadow-lg transition-transform text-white font-medium mt-2"
        >
          Share
        </button>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-4xl mx-auto mt-6 rounded-xl overflow-hidden shadow-lg aspect-video"
        >
          <Link target="_blank" href={blogData.heroImage.webUrl}>
            <Image
              src={blogData.heroImage.imgUrl}
              alt={blogData.heroImage.alt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              priority
            />
          </Link>
          <span className="absolute bottom-0 left-0 right-0 flex gap-2 text-xs sm:text-sm justify-center items-center bg-black/70 text-white py-1 rounded-b-xl">
            Image Credits:
            <Link target="_blank" href={blogData.heroImage.photographer_url}>
              <h3 className="font-semibold">{blogData.heroImage.photographer}</h3>
            </Link>
          </span>
        </motion.div>
      </motion.div>

      {/* Ingredients */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-green-500 to-yellow-500 bg-clip-text text-transparent">
          Ingredients
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {displayedIngredients.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white dark:bg-zinc-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4 flex flex-col items-center justify-center hover:scale-[1.03] hover:shadow-lg transition-all"
            >
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {item.quantity}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {blogData.ingredients.length > 4 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-yellow-500 rounded-full shadow-md hover:scale-105 transition-transform"
            >
              {showAll ? "Show Less" : "Show All"}
            </button>
          </div>
        )}
      </motion.div>

      {/* Steps */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold mb-6">Cooking Steps 👨‍🍳</h2>
        <div className="relative border-l-2 border-orange-400 pl-8 space-y-8">
          {blogData.content.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="relative"
            >
              <span className="absolute -left-4 top-0 bg-orange-500 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center">
                {index + 1}
              </span>
              <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-md hover:scale-[1.02] transition-transform">
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.paragraph}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
     
{/* Plating */}
<section className="mb-12">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-gradient-to-r from-orange-100 via-white to-orange-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 rounded-xl shadow-lg p-6"
  >
    <h2 className="text-2xl font-bold mb-4 text-orange-600 dark:text-orange-400 flex items-center gap-2">
      🍽️ Plating & Serving ✨
    </h2>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
      {blogData.plating}
    </p>
  </motion.div>
</section>

{/* Pros & Cons */}
<section className="mb-12">
  <motion.h2
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="text-3xl font-extrabold mb-6 text-center text-gray-900 dark:text-gray-100"
  >
    Pros & Cons 👍👎
  </motion.h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
    {/* Pros */}
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 p-5 rounded-xl shadow hover:shadow-lg transition"
    >
      <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-3 flex items-center gap-2">
        ✅ Pros
      </h3>
      <ul className="space-y-2 text-green-800 dark:text-green-200 font-medium">
        {blogData.prosCons.pros.map((pro, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="text-green-500">✔</span> {pro}
          </li>
        ))}
      </ul>
    </motion.div>

    {/* Cons */}
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 p-5 rounded-xl shadow hover:shadow-lg transition"
    >
      <h3 className="text-xl font-bold text-red-700 dark:text-red-300 mb-3 flex items-center gap-2">
        ❌ Cons
      </h3>
      <ul className="space-y-2 text-red-800 dark:text-red-200 font-medium">
        {blogData.prosCons.cons.map((con, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="text-red-500">✖</span> {con}
          </li>
        ))}
      </ul>
    </motion.div>
  </div>
</section>

{/* Fun Facts */}
<section className="mb-12">
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-700/30 dark:to-yellow-800 rounded-xl p-6 shadow-lg"
  >
    <h2 className="text-2xl font-bold mb-4 text-yellow-800 dark:text-yellow-300 flex items-center gap-2">
      🎉 Fun Facts
    </h2>
    <ul className="space-y-3 text-gray-800 dark:text-gray-100 font-medium">
      {blogData.funFacts.map((fact, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <span className="text-xl">✨</span>
          <span>{fact}</span>
        </li>
      ))}
    </ul>
  </motion.div>
</section>

      {/* Footer actions */}
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={handelShare}
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-green-500 to-yellow-500 hover:scale-105 hover:shadow-lg transition-transform text-white font-medium"
        >
          Share This Recipe
        </button>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-zinc-500"
        >
          <CalendarDays size={18} className="text-green-500" />
          <span>
            Posted on{" "}
           <span className="font-medium text-zinc-700 dark:text-zinc-200">
      {blogData.createdAt
        ? format(new Date(blogData.createdAt), "MMMM dd, yyyy 'at' hh:mm a")
        : "Date not available"}
    </span>
          </span>
        </motion.p>
      </div>
      <div className="mt-10 text-center w-[100%] ">
        <motion.button
          onClick={() => router.push("/blogpost")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative inline-flex items-center justify-center px-6 py-2 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-yellow-500 rounded-full shadow-md transition-all duration-300"
        >
          Other Recipes
          <span className="ml-2 text-xl transition-transform group-hover:translate-x-1">
            ➜
          </span>
        </motion.button>

      </div>


    </div>
  );
};

export default BlogData;
