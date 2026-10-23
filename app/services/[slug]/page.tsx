import { DEFAULT_SERVICES, ServiceData } from "@/lib/default-services";
import { fetchRelatedKeywordLinksForService } from "@/lib/related-keywords";
import ServiceFaqAccordion from "@/app/components/ServiceFaqAccordion";
import Link from "next/link";
import { notFound } from "next/navigation";


export const revalidate = 3600;
import {
  Search,
  Share2,
  MousePointerClick,
  FileText,
  Mail,
  Monitor,
  ShoppingCart,
  Layout,
  MapPin,
  ShieldCheck,
  Compass,
  CheckCircle2,
  Check,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Send,
  Building2,
  Tag,
  type LucideIcon,
} from "lucide-react";

import connectToDatabase from "@/lib/mongodb";
import Service from "@/lib/models/Service";

async function getService(slug: string): Promise<ServiceData | null> {
  const slugLower = slug.toLowerCase();

  // Check DEFAULT_SERVICES in-memory first for ultra-fast response
  const defaultMatch = DEFAULT_SERVICES.find(
    (s) => s.serviceId.toLowerCase() === slugLower
  );

  // Check MongoDB for updated / custom services
  try {
    await connectToDatabase();
    const service = await Service.findOne({
      $or: [{ serviceId: slug }, { slug: slug }, { serviceId: slugLower }, { slug: slugLower }],
    }).lean();
    if (service) return JSON.parse(JSON.stringify(service));
  } catch (err) {
    console.error("DB lookup error:", err);
  }

  if (defaultMatch) return defaultMatch;

  return null;
}

// Pre-render all service slugs at build time for instant CDN loading
export async function generateStaticParams() {
  const paramsMap = new Map<string, { slug: string }>();

  DEFAULT_SERVICES.forEach((s) => {
    paramsMap.set(s.serviceId.toLowerCase(), { slug: s.serviceId.toLowerCase() });
  });

  try {
    await connectToDatabase();
    const dbServices = await Service.find({}, "serviceId slug").lean();
    if (dbServices && dbServices.length > 0) {
      dbServices.forEach((s: any) => {
        if (s.serviceId) paramsMap.set(s.serviceId.toLowerCase(), { slug: s.serviceId.toLowerCase() });
        if (s.slug) paramsMap.set(s.slug.toLowerCase(), { slug: s.slug.toLowerCase() });
      });
    }
  } catch (err) {
    console.error("Static params fallback to default services");
  }

  return Array.from(paramsMap.values());
}

async function getAllServices(): Promise<ServiceData[]> {
  const serviceMap = new Map<string, ServiceData>();

  // Add default services as base
  DEFAULT_SERVICES.forEach((s) => {
    serviceMap.set(s.serviceId.toLowerCase(), s);
  });

  try {
    await connectToDatabase();
    const services = await Service.find({}).sort({ createdAt: -1 }).lean();
    if (services && services.length > 0) {
      services.forEach((s: any) => {
        const item: ServiceData = JSON.parse(JSON.stringify(s));
        const key = (item.serviceId || (item._id ? String(item._id) : "") || item.title).toLowerCase();
        serviceMap.set(key, item);
      });
    }
  } catch (err) {}

  return Array.from(serviceMap.values());
}

function normalizeCategory(cat?: string): string {
  return (cat || "").toLowerCase().trim().replace(/[^a-z0-9]/g, "");
}

function matchesServiceCategory(cat1?: string, cat2?: string): boolean {
  if (!cat1 || !cat2) return false;
  const c1 = cat1.trim().toLowerCase();
  const c2 = cat2.trim().toLowerCase();
  if (c1 === c2) return true;
  return normalizeCategory(c1) === normalizeCategory(c2);
}

function shuffleServices<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const getIconComponent = (name?: string): LucideIcon => {
  switch (name) {
    case "Search":
      return Search;
    case "Share2":
      return Share2;
    case "MousePointerClick":
      return MousePointerClick;
    case "FileText":
      return FileText;
    case "Mail":
      return Mail;
    case "ShoppingCart":
      return ShoppingCart;
    case "Layout":
      return Layout;
    case "MapPin":
      return MapPin;
    case "ShieldCheck":
      return ShieldCheck;
    case "Compass":
      return Compass;
    case "Monitor":
    default:
      return Monitor;
  }
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    return {
      title: "Service Not Found | BrandVaani",
    };
  }

  const metaTitle = service.metaTitle || `${service.title} - ${service.category} Services | BrandVaani`;
  const metaDescription = service.metaDescription || service.short || service.description;
  const keywords = service.keywords || "";

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
    },
  };
}

function formatServiceDescription(content: string): string {
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

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    notFound();
  }

  const ServiceIcon = getIconComponent(service.iconName);

  const keywordLinks = await fetchRelatedKeywordLinksForService(
    service.serviceId,
    service.category
  );

  const allServices = await getAllServices();

  // Filter out the current service being viewed
  const currentKey = (service.serviceId || slug).toLowerCase();
  const otherServices = allServices.filter((s) => {
    const sId = (s.serviceId || "").toLowerCase();
    const sTitle = (s.title || "").toLowerCase();
    const sMongoId = s._id ? String(s._id) : "";
    const currentMongoId = service._id ? String(service._id) : "";

    if (sId && sId === currentKey) return false;
    if (sTitle && sTitle === (service.title || "").toLowerCase()) return false;
    if (sMongoId && currentMongoId && sMongoId === currentMongoId) return false;
    return true;
  });

  // Randomize the other services pool on every request
  const randomOtherServices = shuffleServices(otherServices).slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-[#0B1120]">
      {/* Top Banner / Breadcrumb */}
      <section className="relative overflow-hidden bg-[#0B1120] py-20 text-white min-h-[340px] flex items-center">
        {/* Conditional Background Header Banner Image & Rich Dark Overlay */}
        {service.image ? (
          <>
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-500 scale-105"
              style={{ backgroundImage: `url('${service.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1120]/90 via-[#0B1120]/75 to-[#0B1120]/20 backdrop-blur-[2px]" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_50%)]" />
        )}
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 relative z-10 w-full">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition mb-8"
          >
            <ArrowLeft size={16} /> Back to All Services
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-300 border border-white/10 mb-4">
                {service.category}
              </span>

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
                {service.title}
              </h1>

              <p className="mt-4 text-xl font-medium text-gray-300">
                {service.short}
              </p>
            </div>

            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-white/10 text-white backdrop-blur-md border border-white/20 shadow-2xl">
              <ServiceIcon size={44} strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#0B1120] mb-4">
            Overview & Value
          </h2>
          {/<[a-z][\s\S]*>/i.test(service.description) ? (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: formatServiceDescription(service.description) }}
            />
          ) : (
            <p className="text-lg leading-relaxed text-gray-600 whitespace-pre-wrap">
              {service.description}
            </p>
          )}
        </div>

        {service.points && service.points.length > 0 && (
          <div className="rounded-3xl border border-gray-100 bg-gray-50/70 p-8">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#0B1120] mb-6">
              <Sparkles size={18} className="text-blue-600" /> Key Features & Deliverables
            </div>

            <div className="grid gap-3.5 sm:grid-cols-2">
              {service.points.map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3.5 rounded-2xl bg-white p-4 border border-gray-200/80 shadow-xs hover:border-emerald-500/30 transition-all duration-200"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                    <Check size={14} strokeWidth={2.5} />
                  </span>
                  <span className="text-sm font-semibold text-[#0B1120] leading-snug">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Why Work With BrandVaani */}
        <div className="border-t border-gray-100 pt-10">
          <h3 className="text-xl font-bold mb-4">Why Choose BrandVaani for {service.title}?</h3>
          <ul className="space-y-3 text-gray-600 text-sm">
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#0B1120]" />
              Dedicated marketing strategists and specialists assigned to your project.
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#0B1120]" />
              Data-driven campaigns focused directly on business ROI and conversions.
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#0B1120]" />
              100% transparent weekly reporting and dedicated client dashboard.
            </li>
          </ul>
        </div>

        {/* DYNAMIC SERVICE FAQ ACCORDIONS */}
        <ServiceFaqAccordion service={service} />

        {/* DYNAMIC RELATED SEARCH KEYWORDS & QUICK LINKS SECTION */}
        {keywordLinks.length > 0 && (
          <div className="border-t border-gray-100 pt-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={18} className="text-blue-600 animate-pulse" />
              <h3 className="text-xl font-bold text-[#0B1120]">
                Related Search Keywords & Growth Guides
              </h3>
            </div>
            <p className="text-xs text-gray-500 mb-6">
              Explore complementary services and in-depth strategy guides for {service.category}:
            </p>

            <div className="flex flex-wrap gap-2.5">
              {keywordLinks.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gray-50 hover:bg-[#0B1120] text-gray-700 hover:text-white border border-gray-200 hover:border-[#0B1120] transition-all duration-200 shadow-2xs"
                  title={`View ${item.type}: ${item.title}`}
                >
                  <Tag size={13} className="text-blue-600 group-hover:text-blue-300 transition" />
                  <span className="capitalize">{item.keyword}</span>
                  <span className="text-[10px] opacity-60 group-hover:opacity-100 font-mono">
                    ({item.type})
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Other Services Section (Randomized) */}
      {randomOtherServices.length > 0 && (
        <section className="bg-gray-50/80 py-16 sm:py-20 px-5 sm:px-6 lg:px-8 border-t border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                {/* <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 border border-blue-200/60 mb-3">
                  <Sparkles size={13} className="text-blue-600" /> More Solutions
                </span> */}
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1120]">
                  Other Growth Services
                </h2>
                <p className="mt-2 text-sm text-gray-500 max-w-xl">
                  Explore other digital marketing and development services designed to help your brand grow.
                </p>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0B1120] hover:text-blue-600 transition group self-start sm:self-auto"
              >
                <span>View All Services</span>
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {randomOtherServices.map((rel) => {
                const RelIcon = getIconComponent(rel.iconName);
                const targetSlug =
                  rel.serviceId ||
                  (rel._id ? String(rel._id) : rel.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                return (
                  <Link
                    key={rel.serviceId || String(rel._id)}
                    href={`/services/${targetSlug}`}
                    className="group rounded-2xl bg-white p-6 sm:p-7 border border-gray-200/80 hover:border-[#0B1120] transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-1 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B1120] text-white shadow-xs group-hover:scale-105 transition-transform">
                          <RelIcon size={20} strokeWidth={2} />
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">
                          {rel.category || "Service"}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-[#0B1120] group-hover:text-blue-600 transition-colors">
                        {rel.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 mt-2.5 line-clamp-2 leading-relaxed">
                        {rel.short || rel.description}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#0B1120] group-hover:text-blue-600">
                      <span>Learn More</span>
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
