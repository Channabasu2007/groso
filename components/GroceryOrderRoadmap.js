"use client";
import React from 'react';
import { ShoppingCart, Search, BadgePercent, Truck, PackageCheck } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    title: "Search or Enter Items",
    description: "Search for the groceries you need or tell us what you want—we'll handle the rest for you.",
    icon: <Search size={28} />,
    color: "bg-green-600 text-white",
  },
  {
    title: "Compare & Find the Best Deals",
    description: "Our AI compares top delivery apps to find the lowest prices and fastest delivery for every item.",
    icon: <BadgePercent size={28} />,
    color: "bg-yellow-400 text-zinc-900",
  },
  {
    title: "Order in One Click",
    description: "Place your order directly through our site. We order on your behalf from multiple stores if needed.",
    icon: <ShoppingCart size={28} />,
    color: "bg-blue-600 text-white",
  },
  {
    title: "Sit Back & Save Money",
    description: "Your groceries arrive while you save time, effort, and money—automatically handled for you.",
    icon: <Truck size={28} />,
    color: "bg-purple-600 text-white",
  },
];

const GroceryOrderRoadmap = () => {
  return (
    <section className="relative py-24 bg-zinc-50 dark:bg-zinc-950 px-4 overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 dark:text-white mb-4">
          How Grocery Ordering Works
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed">
          Shop smarter with AI. Instantly search, compare prices across top delivery apps, and get your groceries faster—all in one place.
        </p>
      </div>

            {/* Desktop Horizontal Timeline */}
            <div className="hidden md:flex justify-between items-start max-w-6xl mx-auto relative pt-10">
              {/* Connecting Line - refined to align with icon centers and not overflow */}
             
              {steps.map((step, idx) => (
                <div key={idx} className="relative flex flex-col  items-center w-1/4 z-10">
                  {/* Icon */}
                  <div className={`flex items-center justify-center w-14 h-14 rounded-full border-4 border-white dark:border-zinc-900 shadow-lg ${step.color} mb-4 z-10`}>{step.icon}</div>
                  <span className="text-xs uppercase font-bold text-zinc-400 mb-1 tracking-wide">Step {idx + 1}</span>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2 text-center w-full px-2 mx-auto ">{step.description}</p>
                  {step.badge && (
                    <span className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-semibold px-3 py-1 rounded-full mt-1">
                      <BadgePercent size={14} /> You save more!
                    </span>
                  )}
                </div>
              ))}
            </div>
      
            {/* Mobile Vertical Timeline */}
            <div className="md:hidden flex flex-col w-full mx-auto relative gap-10">
              {steps.map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-4">
                  {/* Icon */}
                  <div className={`flex items-center justify-center w-fit px-2 object-cover  h-12 rounded-full border-4 border-white dark:border-zinc-900 shadow-lg ${step.color} z-10`}>
                    {step.icon}
                  </div>
                  {/* Vertical Line - only between steps, perfectly aligned */}
      
                  {/* Content */}
                  <div>
                    <span className="text-xs uppercase font-bold text-zinc-400">Step {idx + 1}</span>
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-white mb-1">{step.title}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400  text-center">{step.description}</p>
                    {step.badge && (
                      <span className="inline-flex items-center gap-1  bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-semibold px-3 py-1 rounded-full mt-2">
                        <BadgePercent size={14} /> You save more!
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

      {/* CTA */}
      <div className="mt-16 flex justify-center">
        <Link href="/main?mode=grocery" className="px-8 py-4 rounded-full bg-green-600 text-white font-bold text-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition">
          Start Grocery Order
        </Link>
      </div>
    </section>
  );
};

export default GroceryOrderRoadmap;
