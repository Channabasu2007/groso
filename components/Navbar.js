"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles } from "lucide-react";
import ThemeToggler from './ThemeToggler'


const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Main", href: "/main"},
    { name: "About", href: "/about" },
    { name: "Recipes", href: "/blogpost" },
   
  ];

  return (
    <nav className="w-full sticky top-0 z-50 bg-white/90 dark:bg-zinc-950/90 border-b border-zinc-200 dark:border-zinc-800 shadow-md rounded-b-2xl px-4 md:px-16 py-3 flex justify-between items-center transition-all">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <span className="inline-flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 rounded-xl p-2">
          <Sparkles size={26} className="text-green-600" />
        </span>
        <span className="text-xl md:text-3xl font-extrabold text-zinc-900 dark:text-white">
          GroceryFinder
        </span>
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden lg:flex items-center gap-10">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`${
                pathname === item.href
                  ? "font-bold underline text-lg"
                  : "text-lg font-normal"
              } hover:text-green-600 transition`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Auth Buttons Desktop */}
      <div className="hidden lg:flex items-center gap-3">
       <ThemeToggler/>

        {/* <button className="py-2 px-5 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-xl text-lg font-bold shadow hover:bg-zinc-800 dark:hover:bg-zinc-200 transition cursor-pointer">
          Sign In
        </button>

        <button className="py-2 px-5 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-xl text-lg font-bold shadow hover:bg-zinc-800 dark:hover:bg-zinc-200 transition cursor-pointer">
          Sign Up
        </button> */}

    
      </div>

      {/* Hamburger Icon and Auth for Mobile */}
      <div className="flex items-center lg:hidden gap-2">
       
<ThemeToggler/>
        {/* <Link
          href="/SignUp"
          className="py-1 px-3 text-[1rem] bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-lg font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition cursor-pointer text-center"
        >
          Sign Up
        </Link> */}
        <div
          className="lg:hidden cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-zinc-950 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out rounded-l-2xl flex flex-col gap-8 pt-24 px-8 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-6 right-6"
          onClick={() => setMenuOpen(false)}
        >
          <X size={28} />
        </button>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${
              pathname === item.href
                ? "font-bold underline text-lg"
                : "text-lg font-normal"
            } hover:text-green-600 transition`}
            onClick={() => setMenuOpen(false)}
          >
            {item.name}
          </Link>
        ))}

        {/* <button className="py-2 px-4 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-xl text-lg font-bold shadow hover:bg-zinc-800 dark:hover:bg-zinc-200 transition text-center">
          Sign In
        </button>

        <button className="py-2 px-4 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-xl text-lg font-bold shadow hover:bg-zinc-800 dark:hover:bg-zinc-200 transition text-center">
          Sign Up
        </button> */}
<ThemeToggler/>
     
      </div>
      {/* Overlay for mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
