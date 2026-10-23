import { DEFAULT_BLOGS, BlogData } from "./default-blogs";
import { DEFAULT_SERVICES, ServiceData } from "./default-services";
import connectToDatabase from "./mongodb";
import Blog from "./models/Blog";
import Service from "./models/Service";

export interface KeywordLinkItem {
  keyword: string;
  href: string;
  title: string;
  type: "Guide & Article" | "Growth Service" | string;
}

/**
 * Strict category matcher:
 * Returns true ONLY if itemCategory belongs strictly to the same category group as targetCategory.
 */
export function isStrictCategoryMatch(itemCategory: string, targetCategory: string): boolean {
  if (!itemCategory || !targetCategory) return false;

  const c1 = itemCategory.trim().toLowerCase();
  const c2 = targetCategory.trim().toLowerCase();

  if (c1 === c2) return true;

  // E-Commerce group
  const isC1Ecom = c1.includes("e-commerce") || c1.includes("ecommerce") || c1.includes("shop");
  const isC2Ecom = c2.includes("e-commerce") || c2.includes("ecommerce") || c2.includes("shop");
  if (isC1Ecom || isC2Ecom) {
    return isC1Ecom && isC2Ecom;
  }

  // Web Development group
  const isC1Web = c1.includes("web") || c1.includes("dev") || c1.includes("ui");
  const isC2Web = c2.includes("web") || c2.includes("dev") || c2.includes("ui");
  if (isC1Web || isC2Web) {
    return isC1Web && isC2Web;
  }

  // Local SEO & GMB group
  const isC1Local = c1.includes("local") || c1.includes("gmb") || c1.includes("map");
  const isC2Local = c2.includes("local") || c2.includes("gmb") || c2.includes("map");
  if (isC1Local || isC2Local) {
    return isC1Local && isC2Local;
  }

  // Digital Marketing group
  const isC1Digital = c1.includes("digital") || c1.includes("marketing");
  const isC2Digital = c2.includes("digital") || c2.includes("marketing");
  if (isC1Digital || isC2Digital) {
    return isC1Digital && isC2Digital;
  }

  return false;
}

async function getCachedBlogsAndServices(): Promise<{ blogs: BlogData[]; services: ServiceData[] }> {
  let blogs: BlogData[] = DEFAULT_BLOGS;
  let services: ServiceData[] = DEFAULT_SERVICES;

  try {
    await connectToDatabase();
    const [dbBlogs, dbServices] = await Promise.all([
      Blog.find({ isPublished: true }).select("title slug category").lean(),
      Service.find({}).select("title serviceId category").lean(),
    ]);

    if (dbBlogs && dbBlogs.length > 0) {
      blogs = JSON.parse(JSON.stringify(dbBlogs));
    }
    if (dbServices && dbServices.length > 0) {
      services = JSON.parse(JSON.stringify(dbServices));
    }
  } catch (err) {
    // Fallback to in-memory default lists immediately
  }

  return { blogs, services };
}

/**
 * Dynamically fetches related links STRICTLY for pages in the SAME category.
 */
export async function fetchRelatedKeywordLinksForBlog(
  currentSlug: string,
  category: string
): Promise<KeywordLinkItem[]> {
  const { blogs, services } = await getCachedBlogsAndServices();

  const result: KeywordLinkItem[] = [];
  const seenKeys = new Set<string>();

  // 1. Strictly match other blog articles in the same category
  blogs.forEach((b) => {
    if (b.slug !== currentSlug && isStrictCategoryMatch(b.category, category)) {
      const key = `blog-${b.slug}`;
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        result.push({
          keyword: b.title,
          href: `/blogs/${b.slug}`,
          title: b.title,
          type: "Guide & Article",
        });
      }
    }
  });

  // 2. Strictly match services in the same category
  services.forEach((s) => {
    if (isStrictCategoryMatch(s.category, category)) {
      const key = `service-${s.serviceId}`;
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        result.push({
          keyword: s.title.toLowerCase().includes("services") ? s.title : `${s.title} Services`,
          href: `/services/${s.serviceId}`,
          title: s.title,
          type: "Growth Service",
        });
      }
    }
  });

  return result;
}

/**
 * Dynamically fetches related links STRICTLY for pages in the SAME category.
 */
export async function fetchRelatedKeywordLinksForService(
  currentServiceId: string,
  category: string
): Promise<KeywordLinkItem[]> {
  const { blogs, services } = await getCachedBlogsAndServices();

  const result: KeywordLinkItem[] = [];
  const seenKeys = new Set<string>();

  // 1. Strictly match services in the same category (excluding current service)
  services.forEach((s) => {
    if (s.serviceId !== currentServiceId && isStrictCategoryMatch(s.category, category)) {
      const key = `service-${s.serviceId}`;
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        result.push({
          keyword: s.title.toLowerCase().includes("services") ? s.title : `${s.title} Services`,
          href: `/services/${s.serviceId}`,
          title: s.title,
          type: "Growth Service",
        });
      }
    }
  });

  // 2. Strictly match blog articles in the same category
  blogs.forEach((b) => {
    if (isStrictCategoryMatch(b.category, category)) {
      const key = `blog-${b.slug}`;
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        result.push({
          keyword: b.title,
          href: `/blogs/${b.slug}`,
          title: b.title,
          type: "Guide & Article",
        });
      }
    }
  });

  return result;
}
