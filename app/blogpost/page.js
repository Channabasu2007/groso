// app/blog/page.jsx
"use client"
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import BlogCard from "@/components/BlogCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default async function BlogListingPage() {
//   await dbConnect();
//   const blogs = await Blog.find().sort({ createdAt: -1 }).lean();



const blogs = [
  {
    dishName: "Creamy Turmeric Potato & Tomato Curry",
    slug: "creamy-turmeric-potato-tomato-curry",
    intro:
      "A cozy blend of earthy potatoes and tangy tomatoes with the golden warmth of turmeric. Perfect with soft naan or fragrant rice.",
    heroImage: {
      imgUrl:
        "https://images.pexels.com/photos/20408461/pexels-photo-20408461.jpeg",
      alt: "Creamy Turmeric Curry",
    },
  },
  {
    dishName: "Zesty Lemon Herb Pasta",
    slug: "zesty-lemon-herb-pasta",
    intro:
      "Bright and refreshing, this pasta combines lemon zest, fresh herbs, and a drizzle of olive oil for a light yet flavorful meal.",
    heroImage: {
      imgUrl:
        "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg",
      alt: "Lemon Herb Pasta",
    },
  },
  {
    dishName: "Classic Chocolate Brownies",
    slug: "classic-chocolate-brownies",
    intro:
      "Rich, fudgy, and irresistibly chocolatey — the kind of brownies that melt in your mouth and make every bite memorable.",
    heroImage: {
      imgUrl:
        "https://images.pexels.com/photos/302680/pexels-photo-302680.jpeg",
      alt: "Chocolate Brownies",
    },
  },
  {
    dishName: "Smoky Grilled Veggie Sandwich",
    slug: "smoky-grilled-veggie-sandwich",
    intro:
      "Loaded with smoky grilled vegetables, this hearty sandwich is a colorful, healthy, and satisfying meal option.",
    heroImage: {
      imgUrl:
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
      alt: "Grilled Veggie Sandwich",
    },
  },
  {
    dishName: "Garlic Butter Shrimp Rice Bowl",
    slug: "garlic-butter-shrimp-rice-bowl",
    intro:
      "Juicy shrimp tossed in garlic butter and served over fluffy rice with a sprinkle of fresh herbs — pure comfort in a bowl.",
    heroImage: {
      imgUrl:
        "https://images.pexels.com/photos/327098/pexels-photo-327098.jpeg",
      alt: "Garlic Butter Shrimp Rice Bowl",
    },
  },
  {
    dishName: "Fresh Mango Salsa",
    slug: "fresh-mango-salsa",
    intro:
      "A vibrant mix of sweet mangoes, zesty lime, and a hint of chili — this salsa pairs perfectly with chips or grilled meats.",
    heroImage: {
      imgUrl:
        "https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg",
      alt: "Fresh Mango Salsa",
    },
  },
  {
    dishName: "Spicy Paneer Tikka",
    slug: "spicy-paneer-tikka",
    intro:
      "Char-grilled paneer cubes marinated in tangy spices, served hot with mint chutney for a perfect appetizer.",
    heroImage: {
      imgUrl:
        "https://images.pexels.com/photos/1640778/pexels-photo-1640778.jpeg",
      alt: "Paneer Tikka",
    },
  },
  {
    dishName: "Hearty Lentil Soup",
    slug: "hearty-lentil-soup",
    intro:
      "A nourishing bowl of lentils simmered with aromatic vegetables and spices — warm, hearty, and packed with protein.",
    heroImage: {
      imgUrl:
        "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg",
      alt: "Hearty Lentil Soup",
    },
  },
  {
    dishName: "Cheesy Veggie Pizza",
    slug: "cheesy-veggie-pizza",
    intro:
      "A golden crust topped with gooey cheese, colorful vegetables, and herbs — a true crowd-pleaser for pizza nights.",
    heroImage: {
      imgUrl:
        "https://images.pexels.com/photos/1640776/pexels-photo-1640776.jpeg",
      alt: "Veggie Pizza",
    },
  },
  {
    dishName: "Crispy Falafel Wrap",
    slug: "crispy-falafel-wrap",
    intro:
      "Crisp falafel balls wrapped in warm pita bread with fresh veggies and creamy tahini sauce — Middle Eastern goodness.",
    heroImage: {
      imgUrl:
        "https://images.pexels.com/photos/1437261/pexels-photo-1437261.jpeg",
      alt: "Falafel Wrap",
    },
  },
];




  return (<>
  <Navbar/>
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Latest Recipes
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard key={blog.dishName} blog={blog} />
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
}
