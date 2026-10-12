import { DEFAULT_BLOGS, BlogData } from "@/lib/default-blogs";
import { fetchRelatedKeywordLinksForBlog } from "@/lib/related-keywords";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  User,
  MapPin,
  Tag,
  Share2,
  Building2,
  BookOpen,
  Sparkles,
} from "lucide-react";

async function getBlog(slug: string): Promise<BlogData | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/blogs/${slug}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.blog) {
        return data.blog;
      }
    }
  } catch (err) {
    // Fallback below
  }

  // Fallback to DEFAULT_BLOGS
  const found = DEFAULT_BLOGS.find(
    (b) =>
      b.slug.toLowerCase() === slug.toLowerCase() ||
      b.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug.toLowerCase()
  );

  return found || null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Blog Not Found | BrandVaani",
    };
  }

  const metaTitle = blog.metaTitle || `${blog.title} | BrandVaani Insights`;
  const metaDescription = blog.metaDescription || blog.short;
  const keywords = blog.keywords || "";

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords, // Hidden on UI, rendered into HTML meta tags for Google indexing
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: [blog.image],
    },
  };
}

function formatBlogDescription(content: string): string {
  if (!content) return "";
  let str = content.trim();

  if (str.includes("&lt;") || str.includes("&gt;")) {
    str = str
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
  }

  // Unwrap <article> wrapper if present
  if (/^<article[\s\S]*<\/article>$/i.test(str)) {
    str = str.replace(/^<article[^>]*>/i, "").replace(/<\/article>$/i, "");
  }

  if (/^<p>\s*<(h[1-6]|p|ul|ol|div|blockquote|hr)/i.test(str)) {
    str = str.replace(/^<p>/i, "").replace(/<\/p>$/i, "");
  }

  return str;
}

export default async function SingleBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  const keywordLinks = await fetchRelatedKeywordLinksForBlog(
    blog.slug,
    blog.category
  );

  const relatedBlogs = DEFAULT_BLOGS.filter(
    (b) => b.slug !== blog.slug
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-[#0B1120]">
      {/* HTML Head Meta Keywords for Google SEO crawling (hidden on UI as requested) */}
      {blog.keywords && (
        <head>
          <meta name="keywords" content={blog.keywords} />
        </head>
      )}

      {/* TOP HERO BANNER */}
      <section className="relative overflow-hidden bg-[#0B1120] py-20 text-white min-h-[340px] flex items-center">
        {/* Conditional Background Header Banner Image & Rich Dark Overlay */}
        {blog.image ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500 scale-105"
              style={{ backgroundImage: `url('${blog.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120]/95 via-[#0B1120]/85 to-[#0B1120]/75 backdrop-blur-[2px]" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_50%)]" />
        )}
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 relative z-10 w-full">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition mb-8"
          >
            <ArrowLeft size={16} /> Back to All Articles
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
              {blog.category}
            </span>
            {blog.location && (
              <span className="rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <MapPin size={12} /> Location: {blog.location}
              </span>
            )}
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white leading-tight">
            {blog.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-gray-400 font-medium border-t border-white/10 pt-6">
            <span className="flex items-center gap-1.5">
              <User size={14} className="text-white" /> Author: {blog.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-white" /> {blog.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* FEATURED COVER IMAGE */}
      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="h-80 sm:h-[420px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gray-100">
          <img
            src={blog.image}
            alt={blog.title}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* MAIN ARTICLE BODY */}
      <article className="py-16 px-5 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Intro Tagline Excerpt */}
        <div className="bg-gray-50 border-l-4 border-[#0B1120] p-6 rounded-r-2xl mb-10 text-lg font-medium text-gray-700 leading-relaxed">
          {blog.short}
        </div>

        {/* Formatted HTML Content / Description */}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: formatBlogDescription(blog.description) }}
        />

        {/* DYNAMIC RELATED KEYWORDS & INTERNAL LINKS SECTION */}
        {keywordLinks.length > 0 && (
          <section className="mt-16 pt-10 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={18} className="text-blue-600 animate-pulse" />
              <h3 className="text-xl font-bold text-[#0B1120]">
                Related Topics & Search Keywords
              </h3>
            </div>
            <p className="text-xs text-gray-500 mb-6">
              Explore related growth guides and digital marketing services for {blog.category}:
            </p>

            <div className="flex flex-wrap gap-2.5">
              {keywordLinks.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gray-50 hover:bg-[#0B1120] text-gray-700 hover:text-white border border-gray-200 hover:border-[#0B1120] transition-all duration-200 shadow-2xs"
                  title={`Explore related ${item.type}: ${item.title}`}
                >
                  <Tag size={13} className="text-blue-600 group-hover:text-blue-300 transition" />
                  <span className="capitalize">{item.keyword}</span>
                  <span className="text-[10px] opacity-60 group-hover:opacity-100 font-mono">
                    ({item.type})
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      {/* RELATED ARTICLES */}
      <section className="bg-gray-50 py-16 px-5 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#0B1120]">Related Articles</h2>
            <Link href="/blogs" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
              View All Insights <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {relatedBlogs.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blogs/${rel.slug}`}
                className="group rounded-2xl bg-white p-5 border border-gray-200 hover:border-[#0B1120] transition shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="h-36 w-full rounded-xl overflow-hidden mb-3 bg-gray-100">
                    <img src={rel.image} alt={rel.title} className="h-full w-full object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-gray-400">
                    {rel.category} • {rel.location}
                  </span>
                  <h4 className="text-sm font-bold text-[#0B1120] mt-1 group-hover:text-blue-600 line-clamp-2">
                    {rel.title}
                  </h4>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#0B1120] group-hover:underline">
                  Read Article <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
