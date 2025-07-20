// components/BlogCard.jsx
import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ blog, handelShare }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition hover:shadow-xl">
      <div className="relative w-full h-48">
        <Image
          src={blog.heroImage?.imgUrl || "/placeholder.jpg"}
          alt={blog.heroImage?.alt || blog.dishName}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          {blog.dishName}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
          {blog.intro}
        </p>
        <div className="flex gap-3 flex-wrap">
          <Link
            href={`/blogpost/${blog.slug}`}
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-yellow-500 text-white hover:scale-105 transition"
          >
            Read More
          </Link>
          <button
            onClick={() => handelShare(`${window.location.origin}/blogpost/${blog.slug}`)}
            className="px-5 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium shadow-md transition"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
