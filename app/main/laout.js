// app/layout.js (or app/page/layout.js if using nested layouts)
export const metadata = {
  title: "GroceryFinder – Find Recipes & Ingredients Easily",
  description:
    "Search for delicious recipes, explore ingredients, and get instant cooking ideas. GroceryFinder helps you find the perfect dish with simple inputs.",
  openGraph: {
    title: "GroceryFinder – Find Recipes & Ingredients Easily",
    description:
      "Quickly discover tasty recipes by entering the ingredients you have. Perfect for home cooks looking for inspiration.",
    url: `${process.env.NEXT_PUBLIC_WEBSITEURL_FOR_SHARE_FEATURE}`,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "GroceryFinder – Find Recipes & Ingredients Easily",
    description:
      "Discover recipes and cooking ideas with just the ingredients you have at home.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-zinc-950 min-h-screen">
        {children}
      </body>
    </html>
  );
}
