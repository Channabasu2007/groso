"use client";

import { useRouter } from "next/navigation";

export default function NotFoundDish({ dishName }) {
  const router = useRouter();

  return (
    <div className="w-full max-w-md p-6 rounded-xl shadow-lg space-y-4 text-center 
                    bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-100">
      {dishName ? (
        <>
          <h1 className="text-2xl font-bold">Dish Not Found</h1>
          <p>
            We couldn't find a blog for <strong>{dishName}</strong>.  
            Go to the main page and add ingredients to generate this dish!
          </p>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold">No Dish Selected</h1>
          <p>
            Please add a dish name or choose ingredients on the main page to get started.
          </p>
        </>
      )}

      <div className="flex gap-4 justify-center">
        <button
          onClick={() => router.push("/blogpost")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 
                     dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          All Recipes
        </button>
        <button
          onClick={() => router.push("/main")}
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 
                     dark:bg-green-600 dark:hover:bg-green-700"
        >
          New Recipe
        </button>
      </div>
    </div>
  );
}
