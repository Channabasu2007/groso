import React from "react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

const BlogData = () => {
  const blogData = {
    dishName: "Creamy Turmeric Potato & Tomato Curry",
    slug: "creamy-turmeric-potato-tomato-curry",
    intro:
      "Creamy Turmeric Potato & Tomato Curry is a comforting, homestyle dish that brings together earthy potatoes, tangy tomatoes, and the warm glow of turmeric. Its velvety texture and mild spice make it perfect for a cozy family dinner. Pair with rice or naan for a hearty, flavorful meal that feels both rustic and modern.",

    heroImage: {
      imgUrl:
        "https://images.pexels.com/photos/20408461/pexels-photo-20408461.jpeg",
      photographer: "Joey Farina",
      alt: "Brown Rocks During Golden Hour",
      webUrl:
        "https://www.pexels.com/photo/brown-rocks-during-golden-hour-2014422/",
      photographer_url: "https://www.pexels.com/@joey",
    },

    ingredients: [
      { name: "Potatoes", quantity: "2 medium (300g)" },
      { name: "Onion", quantity: "1 medium (150g), chopped" },
      { name: "Tomatoes", quantity: "3 medium (450g), chopped" },
      { name: "Butter", quantity: "2 tbsp (30g)" },
      { name: "Turmeric Powder", quantity: "1 tsp" },
      { name: "Salt", quantity: "1/2 tsp or to taste" },
      { name: "Black Pepper", quantity: "1/4 tsp" },
      { name: "Vegetable Oil", quantity: "1 tbsp" },
      { name: "Water", quantity: "1 cup (250ml)" },
    ],
    content: [
      {
        title: "Step 1 – Heating the Base",
        paragraph:
          "Begin by heating a tablespoon of oil along with butter in a deep pan over medium heat. The butter adds richness, while the oil prevents it from burning. Watch for the gentle sizzle and shimmering surface — this signals that the fat is ready to infuse your curry with its first layer of flavor.",
      },
      {
        title: "Step 2 – Building the Aroma",
        paragraph:
          "Add finely chopped onions and sauté them slowly, allowing their natural sweetness to emerge. Stir frequently until the onions turn golden brown, which builds the foundational flavor for your curry. This step is all about patience — rushing can lead to raw, sharp-tasting onions instead of the smooth, mellow base you’re aiming for.",
      },
      {
        title: "Step 3 – Adding Spices",
        paragraph:
          "Sprinkle in the turmeric powder, and let it toast for 30 seconds. You’ll notice the oil taking on a warm golden hue. This brief toasting awakens the earthy, slightly peppery aroma of turmeric, ensuring the flavor blooms in the dish instead of tasting raw or harsh. Keep stirring to prevent burning.",
      },
      {
        title: "Step 4 – Combining Ingredients",
        paragraph:
          "Add the diced potatoes and chopped tomatoes, allowing them to coat evenly in the spiced oil. Season generously with salt and a pinch of black pepper. Pour in the water, bring everything to a gentle simmer, and cover the pan. Let it cook for 15–20 minutes until the potatoes become tender and the sauce thickens beautifully.",
      },
      {
        title: "Step 5 – Serving",
        paragraph:
          "Once the curry reaches the perfect consistency, turn off the heat. Garnish with freshly chopped cilantro for a burst of freshness or a squeeze of lime for a tangy lift. Serve steaming hot with soft naan bread or fluffy rice, letting the rich flavors of the curry shine in every bite.",
      },
    ],
    plating:
      "Serve in a warm bowl, garnished with fresh cilantro or a dollop of plain yogurt. Rice or naan bread make excellent accompaniments.",
    prosCons: {
      pros: ["Easy to make", "Budget-friendly", "Healthy and flavorful"],
      cons: [
        "Might need spice adjustments",
        "Can be bland without enough seasoning",
      ],
    },
    funFacts: [
      "Turmeric has been used in Indian cooking for over 4000 years as both a spice and a medicine.",
    ],
  };

  const [showAll, setShowAll] = useState(false);

  const displayedIngredients = showAll
    ? blogData.ingredients
    : blogData.ingredients.slice(0, 4);

  const handelShare = async () => {
    const shareData = {
      title: `${blogData.dishName}`,
      text: `${blogData.intro}`,
      url: ``,

    };


    try {
      await navigator.share(shareData);
      toast.success("Shared Successfully");
    } catch (err) {
      toast.error("Sorry, something went wrong.");
    }
  }

  return (
    <div className="bg-white dark:bg-zinc-950 text-gray-800 dark:text-gray-100 min-h-screen p-6 max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-10 px-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3">
          {blogData.dishName}
        </h1>
        <p className="text-sm sm:text-base lg:text-lg opacity-80 max-w-2xl mx-auto">
          {blogData.intro}
        </p>
        <button
          onClick={handelShare}
          className="px-5 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium mt-2 shadow-md transition"
        >
          Share
        </button>

        <div className="relative w-full max-w-4xl mx-auto mt-6 rounded-xl overflow-hidden shadow-lg">
          <Link target="_blank" href={`${blogData.heroImage.webUrl}`}>
            <Image
              src={blogData.heroImage.imgUrl}
              alt={blogData.heroImage.alt}
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </Link>
          <span className="flex gap-2 w-full text-[10px]  md:text-[15px] justify-center items-center">
            Image Credits:
            <Link target="_blank" href={`${blogData.heroImage.photographer_url}`}>
              <h3 className="font-semibold"> {blogData.heroImage.photographer}</h3>
            </Link>
          </span>
        </div>
      </div>

      {/* Ingredients */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
          Ingredients
        </h2>

        {/* Grid of cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {displayedIngredients.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-zinc-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4 flex flex-col items-center justify-center hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Show All button */}
        {blogData.ingredients.length > 4 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-yellow-500 rounded-full shadow-md hover:opacity-90 opacity-80 transition"
            >
              {showAll ? "Show Less" : "Show All"}
            </button>
          </div>
        )}
      </div>

      {/* Steps */}
      <section className="mb-8">
        <h2 className="text-3xl font-bold mb-6">Cooking Steps 👨‍🍳</h2>
        <div className="relative border-l-2 border-orange-400  pl-8 space-y-8">
          {blogData.content.map((step, index) => (
            <div key={index} className="relative">
              {/* Number Badge */}
              <span className="absolute -left-4 top-0 bg-orange-500 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center">
                {index + 1}
              </span>

              {/* Step Content */}
              <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-md hover:scale-[1.02] transition-transform">
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.paragraph}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Plating */}
      <section className="mb-8">
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-orange-500 flex items-center gap-2">
            🍽️ Plating & Serving ✨
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {blogData.plating}
          </p>
        </div>
      </section>

      {/* Pros & Cons */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Pros & Cons 👍👎</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Pros */}
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-green-600 dark:text-green-300 mb-2">
              Pros
            </h3>
            <ul className="space-y-2 text-green-700 dark:text-green-200">
              {blogData.prosCons.pros.map((pro, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-green-500">✔</span> {pro}
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-300 mb-2">
              Cons
            </h3>
            <ul className="space-y-2 text-red-700 dark:text-red-200">
              {blogData.prosCons.cons.map((con, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-red-500">✖</span> {con}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Fun Facts */}
      <section className="mb-8 bg-yellow-500/50 dark:bg-yellow-800 rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4 ">Fun Facts 🎉</h2>
        <ul className="space-y-3">
          {blogData.funFacts.map((fact, idx) => (
            <li
              key={idx}
              className="flex items-start text-xl font-semibold gap-2 text-gray-700 dark:text-gray-200"
            >
              <span className="text-xl">✨</span>
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </section>

      <div>


      </div> <button
        onClick={handelShare}
        className="fixed bottom-6 right-6 px-3 py-3 rounded-full bg-green-500 text-white shadow-lg hover:scale-105 transition"
        aria-label="Share Recipe"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="23"
          fill="currentColor"
          className="bi bi-share-fill"
          viewBox="0 0 16 16"

        >
          <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5" />
        </svg>
      </button>
      <div className="mt-8 flex justify-center">
        <button
          onClick={handelShare}
          className="px-5 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium shadow-md transition"
        >
          Share This Recipe
        </button>
      </div>

    </div>
  );
};

export default BlogData;
