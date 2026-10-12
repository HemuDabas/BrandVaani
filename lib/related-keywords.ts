import { DEFAULT_BLOGS, BlogData } from "./default-blogs";
import { DEFAULT_SERVICES, ServiceData } from "./default-services";

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

/**
 * Dynamically fetches related links STRICTLY for pages in the SAME category.
 * If no matching pages exist in this category, returns an empty array [].
 */
export async function fetchRelatedKeywordLinksForBlog(
  currentSlug: string,
  category: string
): Promise<KeywordLinkItem[]> {
  let blogs: BlogData[] = DEFAULT_BLOGS;
  let services: ServiceData[] = DEFAULT_SERVICES;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const [blogsRes, servicesRes] = await Promise.all([
      fetch(`${baseUrl}/api/blogs`, { cache: "no-store" }).catch(() => null),
      fetch(`${baseUrl}/api/services`, { cache: "no-store" }).catch(() => null),
    ]);

    if (blogsRes && blogsRes.ok) {
      const data = await blogsRes.json();
      if (data.success && Array.isArray(data.blogs) && data.blogs.length > 0) {
        blogs = data.blogs;
      }
    }

    if (servicesRes && servicesRes.ok) {
      const data = await servicesRes.json();
      if (data.success && Array.isArray(data.services) && data.services.length > 0) {
        services = data.services;
      }
    }
  } catch (err) {
    // Fallback to defaults
  }

  const result: KeywordLinkItem[] = [];
  const seenKeys = new Set<string>();

  // 1. Strictly match blogs in the same category
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
 * If no matching pages exist in this category, returns an empty array [].
 */
export async function fetchRelatedKeywordLinksForService(
  currentServiceId: string,
  category: string
): Promise<KeywordLinkItem[]> {
  let blogs: BlogData[] = DEFAULT_BLOGS;
  let services: ServiceData[] = DEFAULT_SERVICES;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const [blogsRes, servicesRes] = await Promise.all([
      fetch(`${baseUrl}/api/blogs`, { cache: "no-store" }).catch(() => null),
      fetch(`${baseUrl}/api/services`, { cache: "no-store" }).catch(() => null),
    ]);

    if (blogsRes && blogsRes.ok) {
      const data = await blogsRes.json();
      if (data.success && Array.isArray(data.blogs) && data.blogs.length > 0) {
        blogs = data.blogs;
      }
    }

    if (servicesRes && servicesRes.ok) {
      const data = await servicesRes.json();
      if (data.success && Array.isArray(data.services) && data.services.length > 0) {
        services = data.services;
      }
    }
  } catch (err) {
    // Fallback to defaults
  }

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
