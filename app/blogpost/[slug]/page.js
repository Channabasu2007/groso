"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DOMPurify from "dompurify";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import NotFoundDish from "@/components/NotFoundDish";
import BlogData from "@/components/BlogData";

const BlogPage = () => {
  const [pageLoading, setpageLoading] = useState(true);
  const [NotFound, setNotFound] = useState(false);
  const params = useParams();
  const dishName = params.slug;
  const [blog,setBlog] = useState();

  useEffect(() => {
    findTheDishDetails();
    setTimeout(() => {
      setpageLoading(false);
    }, 400);
  }, []);

  const findTheDishDetails = async () => {
    if (!dishName) {
      setNotFound(true);
      return;
    }
    setpageLoading(true);
    try {
      const res = await fetch(`/api/blog/${encodeURIComponent(dishName)}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        setNotFound(true);
        return;
      }

      const blogData = await res.json();
      setBlog(blogData)
      setNotFound(false);
    } catch (error) {
      console.error("Error fetching dish:", error);
      setNotFound(true);
    } finally {
      setpageLoading(false);
    }
  };

  if (pageLoading) {
    return <Loader />;
  }
  return (
    <>
      <Navbar />
{!NotFound ? <div className="h-[89vh] w-full flex items-center justify-center"><NotFoundDish/></div> : <BlogData blogData={blog} />  }

      <Footer />
    </>
  );
};

export default BlogPage;
