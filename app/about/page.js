"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const AboutPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-black text-zinc-800 dark:text-zinc-200">
      <Navbar />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full text-center py-16 md:py-24 bg-gradient-to-r from-green-400 to-yellow-400 dark:from-green-700 dark:to-yellow-600 text-white shadow-xl"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          About Our App
        </h1>
        <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
          Discover recipes, manage your grocery list, and enjoy AI-powered suggestions – all in one place.
        </p>
      </motion.div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-20">
        {/* Intro Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-zinc-800 shadow-xl rounded-3xl p-8 md:p-12 mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-green-500 mb-6">
            What is this App?
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-zinc-600 dark:text-zinc-300">
            This app simplifies cooking and grocery management. Simply add a dish name or ingredients, and 
            our AI will generate a complete grocery list. It can also **translate** your groceries into 
            multiple languages and generate beautiful **blog posts** with detailed recipes.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {[
            {
              title: "AI Ingredient Detection",
              desc: "Get accurate ingredient lists by just typing a dish name or pasting a YouTube link.",
              color: "from-green-400 to-green-600",
            },
            {
              title: "Language Translation",
              desc: "Translate your grocery list into your preferred language with just one click.",
              color: "from-yellow-400 to-orange-500",
            },
            {
              title: "Recipe Blogs",
              desc: "Instantly generate a beautiful blog post with steps and tips for your dish.",
              color: "from-pink-400 to-purple-500",
            },
            {
              title: "Manual Grocery Mode",
              desc: "Add your own custom groceries and organize your cooking plans easily.",
              color: "from-blue-400 to-blue-600",
            },
            {
              title: "Smart Suggestions",
              desc: "AI suggests alternate ingredients and cooking tips based on what you have.",
              color: "from-orange-400 to-red-500",
            },
            {
              title: "Mobile Friendly",
              desc: "Fully responsive with a sleek mobile experience for cooking on the go.",
              color: "from-indigo-400 to-violet-500",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-2xl shadow-lg bg-gradient-to-r ${feature.color} text-white`}
            >
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-base">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Button
            onClick={() => router.push("/")}
            className="bg-gradient-to-r from-green-500 to-yellow-500 text-white px-8 py-4 text-lg rounded-2xl font-semibold hover:scale-110 hover:shadow-xl transition-transform duration-300"
          >
            Back to Home
          </Button>
        </motion.div>
      </main>
      <Footer/>
    </div>
  );
};

export default AboutPage;
