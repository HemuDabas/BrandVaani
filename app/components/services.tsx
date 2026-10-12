"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Share2,
  MousePointerClick,
  FileText,
  Mail,
  Monitor,
  ArrowUpRight,
  Check,
  type LucideIcon,
} from "lucide-react";

interface ServiceItem {
  _id?: string;
  serviceId?: string;
  id?: string;
  title: string;
  short: string;
  description: string;
  category?: string;
  iconName?: string;
  points: string[];
}

const defaultServices: ServiceItem[] = [
  {
    id: "seo",
    title: "SEO Services",
    short: "Improve rankings and organic traffic",
    description:
      "Build a stronger search presence and attract people who are actively looking for your products or services.",
    iconName: "Search",
    points: [
      "Technical SEO",
      "Keyword strategy",
      "On-page optimization",
      "Organic growth",
    ],
  },
  {
    id: "social",
    title: "Social Media Marketing",
    short: "Grow your brand and audience",
    description:
      "Create a consistent social presence that helps your brand connect with the right audience and build engagement.",
    iconName: "Share2",
    points: [
      "Social media strategy",
      "Content planning",
      "Audience engagement",
      "Brand growth",
    ],
  },
  {
    id: "google-ads",
    title: "Google Ads",
    short: "Generate targeted leads and sales",
    description:
      "Reach potential customers at the right moment with focused paid advertising campaigns.",
    iconName: "MousePointerClick",
    points: [
      "Campaign setup",
      "Keyword targeting",
      "Ad optimization",
      "Performance tracking",
    ],
  },
  {
    id: "content",
    title: "Content Marketing",
    short: "Content that attracts and converts",
    description:
      "Turn useful content into a long-term growth channel that educates your audience and supports your marketing goals.",
    iconName: "FileText",
    points: [
      "Content strategy",
      "Website content",
      "Blog content",
      "Conversion-focused copy",
    ],
  },
  {
    id: "email",
    title: "Email Marketing",
    short: "Build relationships and retain customers",
    description:
      "Use targeted email communication to nurture leads, stay connected with customers, and encourage repeat business.",
    iconName: "Mail",
    points: [
      "Email campaigns",
      "Lead nurturing",
      "Customer retention",
      "Campaign analytics",
    ],
  },
  {
    id: "web",
    title: "Web Design & Development",
    short: "Fast, modern and responsive websites",
    description:
      "Create a professional website that looks great, works smoothly across devices, and turns visitors into customers.",
    iconName: "Monitor",
    points: [
      "Modern UI design",
      "Responsive development",
      "Performance optimization",
      "Conversion-focused layouts",
    ],
  },
];

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
    case "Monitor":
    default:
      return Monitor;
  }
};

function formatServiceOverview(content: string): string {
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

export default function Services() {
  const [servicesList, setServicesList] = useState<ServiceItem[]>(defaultServices);
  const [activeServiceId, setActiveServiceId] = useState<string>("seo");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services", { cache: "no-store" });
      const data = await res.json();
      if (data.success && data.services && data.services.length > 0) {
        setServicesList(data.services);
        setActiveServiceId(data.services[0]._id || data.services[0].serviceId || "seo");
      }
    } catch (err) {
      console.error("Failed to fetch services:", err);
    }
  };

  const active =
    servicesList.find(
      (s) => (s._id || s.serviceId || s.id) === activeServiceId
    ) || servicesList[0];

  const ActiveIcon = getIconComponent(active?.iconName);

  const activeSlug =
    active?.serviceId ||
    active?.id ||
    active?.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") ||
    "seo";

  return (
    <section
      id="services"
      className="bg-white px-5  md:py-24 py-10 text-[#0B1120] sm:px-8 lg:px-12 w-full"
    >
      
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-14 max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#0B1120]/50">
            Our Services
          </p>

          <h2 className="text-4xl font-medium tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            Everything you need to
            <br />
            grow online.
          </h2>

          <p className="mt-5 max-w-xl text-lg leading-8 text-[#0B1120]/60">
            From search visibility to modern websites, we provide the
            digital services your business needs to build and grow online.
          </p>
        </div>

        {/* Services layout */}
        <div className="grid overflow-hidden rounded-3xl border border-[#0B1120]/10 bg-[#0B1120]/[0.02] lg:grid-cols-[320px_1fr]">
          {/* ================= LEFT MENU ================= */}
          <div className="border-b border-[#0B1120]/10 p-3 lg:border-b-0 lg:border-r">
            {servicesList.map((service) => {
              const currentId = service._id || service.serviceId || service.id || service.title;
              const Icon = getIconComponent(service.iconName);
              const isActive = activeServiceId === currentId;

              return (
                <button
                  key={currentId}
                  type="button"
                  onClick={() => setActiveServiceId(currentId)}
                  className={`group relative mb-1 flex w-full items-center gap-3 rounded-xl px-4 py-4 text-left transition-colors ${
                    isActive
                      ? "bg-[#0B1120] text-white"
                      : "text-[#0B1120] hover:bg-[#0B1120]/[0.06]"
                  }`}
                >
                  <Icon
                    size={19}
                    strokeWidth={1.8}
                    className={isActive ? "text-white" : "text-[#0B1120]/60"}
                  />

                  <span className="text-sm font-medium">{service.title}</span>

                  {isActive && <ArrowUpRight size={17} className="ml-auto" />}
                </button>
              );
            })}
          </div>

          {/* ================= RIGHT CONTENT ================= */}
          <div className="relative min-h-[480px] overflow-hidden p-5 sm:p-10 lg:p-14">
            {active && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={active._id || active.serviceId || active.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex h-full flex-col"
                >
                  {/* Icon */}
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B1120] text-white shadow-lg">
                    <ActiveIcon size={25} strokeWidth={1.8} />
                  </div>

                  {/* Title */}
                  <h3 className="max-w-2xl text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
                    {active.title}
                  </h3>

                  {/* Short description */}
                  <p className="mt-3 text-base font-medium text-[#0B1120]/50">
                    {active.short}
                  </p>

                  {/* Main description */}
                  {/<[a-z][\s\S]*>/i.test(active.description) ? (
                    <div
                      className="prose max-w-2xl mt-6 text-base sm:text-lg leading-relaxed text-[#0B1120]/75 line-clamp-5 overflow-hidden"
                      dangerouslySetInnerHTML={{ __html: formatServiceOverview(active.description) }}
                    />
                  ) : (
                    <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-[#0B1120]/75">
                      {active.description}
                    </p>
                  )}

                  {/* Points */}
                  {active.points && active.points.length > 0 && (
                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      {active.points.map((point) => (
                        <div key={point} className="flex items-center gap-3">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/80 shadow-2xs">
                            <Check size={14} strokeWidth={2.5} />
                          </span>

                          <span className="text-sm font-semibold text-[#0B1120]">{point}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA Buttons */}
                  <div className="mt-auto pt-8 sm:pt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5">
                    <Link
                      href={`/services/${activeSlug}`}
                      className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl bg-[#0B1120] px-5 sm:px-6 py-3.5 text-sm font-bold text-white transition hover:bg-black shadow-md hover:shadow-lg whitespace-nowrap text-center"
                    >
                      <span>Read More & Full Details</span>
                      <ArrowUpRight
                        size={16}
                        className="shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </Link>

                    <a
                      href="#contact"
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 sm:px-6 py-3.5 text-sm font-bold text-[#0B1120] transition hover:bg-gray-100 hover:border-gray-400 whitespace-nowrap text-center"
                    >
                      Discuss This Service
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}