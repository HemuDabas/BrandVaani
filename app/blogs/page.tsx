"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DEFAULT_BLOGS, BlogData } from "@/lib/default-blogs";
import {
  BookOpen,
  MapPin,
  Clock,
  User,
  ArrowRight,
  Search,
  Sparkles,
  Tag,
} from "lucide-react";

export default function BlogsListingPage() {
  const [blogs, setBlogs] = useState<BlogData[]>(DEFAULT_BLOGS);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const [dbCategories, setDbCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      if (data.success && data.blogs && data.blogs.length > 0) {
        setBlogs(data.blogs);
      }
    } catch (err) {
      console.error("Using default blogs fallback");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (data.success && data.categories) {
        const catNames = data.categories
          .filter((c: any) => c.type === "blog")
          .map((c: any) => c.name);
        setDbCategories(catNames);
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  // Get list of unique categories for filters
  const categories = [
    "All",
    ...Array.from(
      new Set([
        ...blogs.map((b) => b.category).filter(Boolean),
        ...dbCategories,
      ])
    ),
  ];

  const filteredBlogs = blogs.filter((b) => {
    const matchesCat = selectedCategory === "All" || b.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.short.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.location && b.location.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white text-[#0B1120]">
      {/* HERO BANNER */}
      <section className="relative bg-[#0B1120] py-20 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_50%)]" />
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-300 border border-white/10 mb-4">
            <BookOpen size={14} className="text-white" /> Digital Marketing & SEO Knowledge Base
          </span>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
            BrandVaani Insights & Blogs
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
            Expert strategies on local SEO, Google Business Profile optimization, Next.js web development, and digital growth.
          </p>

          {/* SEARCH BAR */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, strategies or topics..."
              className="w-full rounded-2xl bg-white/10 border border-white/20 pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-400 outline-none backdrop-blur-md focus:border-white transition"
            />
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER CONTROLS */}
      <section className="py-6 bg-gray-50 border-b border-gray-100 px-5 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2 py-1 overflow-x-auto scrollbar-none no-scrollbar">
            <span className="text-xs font-bold uppercase text-gray-500 flex items-center gap-1 shrink-0 mr-2">
              <Tag size={14} /> Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#0B1120] text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BLOGS GRID */}
      <section className="py-16 px-5 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
            <Sparkles className="mx-auto h-12 w-12 text-gray-400 mb-3" />
            <h3 className="text-xl font-bold text-gray-800">No blog posts found</h3>
            <p className="text-sm text-gray-500 mt-1">
              Try adjusting your category filter or search keywords.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 bg-[#0B1120] text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.slug}
                className="group rounded-3xl bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#0B1120] transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="h-full w-full object-cover m-0 p-0 block border-0 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-[#0B1120]/90 text-white backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 font-medium">
                      <span className="flex items-center gap-1">
                        <User size={12} /> {blog.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {blog.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-[#0B1120] group-hover:text-blue-600 transition-colors leading-snug">
                      {blog.title}
                    </h2>

                    <p className="mt-3 text-xs text-gray-600 line-clamp-3 leading-relaxed">
                      {blog.short}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-gray-100 mt-4 flex items-center justify-between">
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B1120] group-hover:text-blue-600 transition"
                  >
                    Read Full Article <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
