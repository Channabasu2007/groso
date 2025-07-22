// app/blogpost/layout.js
export const metadata = {
  title: "All Recipes & Blog Posts | GroceryFinder",
  description:
    "Discover a curated collection of delicious recipes, cooking tips, and food stories. Explore flavorful dishes, from Indian classics to global favorites, all in one place.",
  openGraph: {
    title: "All Recipes & Blog Posts | GroceryFinder",
    description:
      "Browse our collection of tasty recipes, cooking guides, and chef tips. Perfect for food lovers seeking inspiration for their next meal.",
    url: `${process.env.NEXT_PUBLIC_WEBSITEURL_FOR_SHARE_FEATURE}/blogpost`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Recipes & Blog Posts | GroceryFinder",
    description:
      "A curated collection of tasty recipes and cooking tips to inspire your kitchen adventures.",
    
  },
};

export default function BlogPostLayout({ children }) {
  return (
    <main className="bg-white dark:bg-zinc-950 min-h-screen">
      {children}
    </main>
  );
}
