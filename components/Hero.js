"use client";
import React from 'react';
import { ShoppingCart, UtensilsCrossed, Sparkles } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 py-14 bg-white dark:bg-zinc-950 transition-colors">
      <div className="max-w-6xl w-full flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-0 mx-auto">
        {/* Left: Text Content */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-7 md:pr-12">
          {/* Muted Tagline */}
          <span className="uppercase tracking-widest text-xs md:text-sm text-zinc-400 font-semibold mb-2">AI Grocery Delivery</span>
          {/* Main Heading */}
          <h1 className="flex flex-col gap-1 font-extrabold leading-tight">
            <span className="text-4xl md:text-5xl mb-1 text-zinc-900 dark:text-white">Order Smarter.</span>
            <span className="text-4xl md:text-5xl mb-1 text-green-600">Save Bigger.</span>
            <span className="text-4xl md:text-5xl text-yellow-400">Every Time.</span>
          </h1>
          {/* Subheading */}
          <div className="flex items-center gap-2 max-w-md text-zinc-600 dark:text-zinc-300 text-base md:text-lg font-medium mt-2">
           
            <span>Let AI handle the grocery hunt. Get the best deals on everything you need, delivered to your doorstep.</span>
          </div>
          {/* Buttons */}
          <div className="flex gap-4 mt-7 w-full md:w-auto justify-center md:justify-start">
            <Link href="/main?mode=dish-to-grocery" className="px-7 py-3 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold shadow hover:shadow-lg transition text-lg border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-green-500">
              Order by Dish
            </Link>
            <Link href="/main?mode=grocery" className="px-7 py-3 rounded-xl bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white font-bold shadow hover:shadow-lg transition text-lg border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-yellow-400">
              Shop Groceries
            </Link>
          </div>
        </div>
        {/* Divider (desktop only) */}
        <div className="hidden md:block h-80 w-px bg-zinc-200 dark:bg-zinc-800 mx-8 rounded-full" />
        {/* Right: Illustration/Icon Cluster */}
        <div className="flex-1 flex items-center justify-center mb-10 md:mb-0">
          <div className="relative w-72 h-72 flex items-center justify-center">
            {/* Main Icon Card */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-100 dark:border-zinc-800 w-40 h-40 flex flex-col items-center justify-center z-10 animate-float-slow">
              <ShoppingCart size={56} className="text-yellow-400 mb-2" />
              <span className="font-bold text-lg text-zinc-900 dark:text-white">AI Grocery</span>
            </div>
            {/* Floating Cards */}
            <div className="absolute -top-6 left-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-md border border-zinc-100 dark:border-zinc-800 w-20 h-20 flex items-center justify-center animate-float">
              <UtensilsCrossed size={32} className="text-green-600" />
            </div>
            <div className="absolute bottom-4 right-2 bg-white dark:bg-zinc-900 rounded-2xl shadow-md border border-zinc-100 dark:border-zinc-800 w-16 h-16 flex items-center justify-center animate-float-reverse">
              <Sparkles size={24} className="text-yellow-400" />
            </div>
            <div className="absolute top-10 right-0 bg-white dark:bg-zinc-900 rounded-2xl shadow-md border border-zinc-100 dark:border-zinc-800 w-14 h-14 flex items-center justify-center animate-float">
              <ShoppingCart size={20} className="text-green-600" />
            </div>
          </div>
        </div>
      </div>
      {/* Animations for floating icons */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float 3s ease-in-out infinite reverse;
        }
        .animate-float-slow {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

     
    </section>
  );
};

export default Hero;
