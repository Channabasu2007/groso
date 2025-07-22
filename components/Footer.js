"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Facebook, Instagram, Twitter, Github } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-300 py-12 px-6 md:px-20 rounded-t-2xl shadow-inner transition-colors duration-300">
      {/* Logo Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10"
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 rounded-xl p-2">
            <Sparkles size={26} className="text-green-500" />
          </span>
          <span className="text-xl md:text-2xl font-extrabold text-zinc-900 dark:text-white">
            GroceryFinder
          </span>
        </div>

        {/* Social Icons */}
        <div className="flex gap-5">
          {[
            { icon: <Facebook size={22} />, href: "#" },
            { icon: <Twitter size={22} />, href: "#" },
            { icon: <Instagram size={22} />, href: "#" },
            { icon: <Github size={22} />, href: "#" },
          ].map((item, idx) => (
            <motion.a
              key={idx}
              href={item.href}
              whileHover={{ scale: 1.2 }}
              className="p-2 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-lg transition-colors"
            >
              {item.icon}
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Links Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm mb-8"
      >
        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">Navigation</h3>
          <ul className="space-y-1">
            <li><Link href="/" className="hover:text-green-500">Home</Link></li>
            <li><Link href="/main" className="hover:text-green-500">Main</Link></li>
            <li><Link href="/about" className="hover:text-green-500">About</Link></li>
            <li><Link href="/blogpost" className="hover:text-green-500">Recipes</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">Resources</h3>
          <ul className="space-y-1">
            <li><Link href="#" className="hover:text-green-500">Blog</Link></li>
            <li><Link href="#" className="hover:text-green-500">Docs</Link></li>
            <li><Link href="#" className="hover:text-green-500">API</Link></li>
            <li><Link href="#" className="hover:text-green-500">Community</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">Support</h3>
          <ul className="space-y-1">
            <li><Link href="#" className="hover:text-green-500">Contact</Link></li>
            <li><Link href="#" className="hover:text-green-500">Help Center</Link></li>
            <li><Link href="#" className="hover:text-green-500">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-green-500">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">Subscribe</h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-2">Get updates and recipes in your inbox.</p>
          <input
            type="email"
            placeholder="Your email"
            className="px-3 py-2 rounded-lg w-full mb-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-500 border border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-green-400"
          />
          <button className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
            Subscribe
          </button>
        </div>
      </motion.div>

      {/* Bottom Text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center text-zinc-600 dark:text-zinc-400 text-sm border-t border-zinc-300 dark:border-zinc-700 pt-6"
      >
        <p>© {new Date().getFullYear()} GroceryFinder. All rights reserved.</p>
        <p className="mt-2">Built with ❤️ for smarter grocery shopping.</p>
      </motion.div>
    </footer>
  );
};

export default Footer;
