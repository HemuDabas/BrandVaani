"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { DEFAULT_SERVICES, ServiceData } from "@/lib/default-services";
import ServiceFaqAccordion from "@/app/components/ServiceFaqAccordion";
import { motion } from "framer-motion";
import {
  Layers,
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
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Check,
  Sparkles,
  ChevronRight,
  HelpCircle,
  Code,
  Megaphone,
  type LucideIcon,
} from "lucide-react";

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

interface CategoryInfo {
  name: string;
  subtitle: string;
  description: string;
  badge: string;
  icon: LucideIcon;
}

const CATEGORY_MAP: Record<string, CategoryInfo> = {
  "digital-marketing": {
    name: "Digital Marketing Services",
    subtitle: "High-ROI Organic Search, Paid PPC & Social Media Strategies",
    badge: "Digital Growth Engine",
    description:
      "Transform your online presence with data-driven marketing campaigns. From technical SEO and Google Ads to social media management and email automation, our digital marketing services attract high-converting leads and build long-term brand authority.",
    icon: Megaphone,
  },
  "web-development": {
    name: "Web Development Services",
    subtitle: "Ultra-Fast Next.js Web Apps, E-Commerce & UI/UX Engineering",
    badge: "Web & Engineering",
    description:
      "Craft modern, responsive, and blazing-fast websites engineered to deliver exceptional user experience and high conversion rates. Built with Next.js, React, and seamless payment gateways.",
    icon: Code,
  },
  crm: {
    name: "CRM & Customer Management Services",
    subtitle: "Automated Workflows, Lead Nurturing & CRM Integrations",
    badge: "CRM & Automation",
    description:
      "Streamline customer interactions, automate sales pipelines, and track leads effectively with custom CRM workflows and local growth management systems.",
    icon: Layers,
  },
  others: {
    name: "Local SEO, GMB & ORM Services",
    subtitle: "Google Map 3-Pack Dominance & Reputation Management",
    badge: "Local SEO & Reputation",
    description:
      "Dominate local search results in your city and build a trustworthy online reputation. We optimize your Google Business Profile (GMB) to capture local phone calls, store visits, and 5-star reviews.",
    icon: MapPin,
  },
};

export default function ServiceCategoryPage() {
  const params = useParams();
  const rawSlug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug || "";
  const slugKey = rawSlug.toLowerCase().trim();

  const [allServices, setAllServices] = useState<ServiceData[]>(DEFAULT_SERVICES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services", { cache: "no-store" });
      const data = await res.json();
      if (data.success && data.services && data.services.length > 0) {
        setAllServices(data.services);
      }
    } catch (err) {
      console.error("Using default services fallback");
    } finally {
      setLoading(false);
    }
  };

  // Determine Category Details
  const defaultInfo: CategoryInfo = {
    name: rawSlug.replace(/-/g, " ").toUpperCase() + " Services",
    subtitle: `Explore specialized ${rawSlug.replace(/-/g, " ")} solutions for business growth`,
    badge: "Specialized Services",
    description: `Targeted ${rawSlug.replace(/-/g, " ")} services designed to elevate your brand visibility, streamline operations, and generate reliable customer inquiries.`,
    icon: Layers,
  };

  const catMeta = CATEGORY_MAP[slugKey] || defaultInfo;
  const CategoryIcon = catMeta.icon;

  // Filter Services Belonging to this Category
  const categoryServices = allServices.filter((serv) => {
    const servCat = (serv.category || "").toLowerCase().trim();
    const servCatSlug = servCat.replace(/[^a-z0-9]+/g, "-");
    const servTitle = (serv.title || "").toLowerCase();

    // Direct match first
    if (servCatSlug === slugKey || servCat === slugKey.replace(/-/g, " ")) {
      return true;
    }

    if (slugKey === "digital-marketing") {
      return (
        servCat.includes("marketing") ||
        servCat.includes("digital") ||
        servCat.includes("seo") ||
        servCat.includes("social") ||
        servCat.includes("ads") ||
        servCat.includes("content") ||
        servCat.includes("email") ||
        servCat.includes("copywriting") ||
        servTitle.includes("marketing") ||
        servTitle.includes("seo") ||
        servTitle.includes("ads") ||
        servTitle.includes("social")
      );
    }
    if (slugKey === "web-development") {
      return (
        servCat.includes("web") ||
        servCat.includes("dev") ||
        servCat.includes("ecommerce") ||
        servCat.includes("ui") ||
        servCat.includes("ux") ||
        servCat.includes("design") ||
        servCat.includes("app") ||
        servTitle.includes("web") ||
        servTitle.includes("development") ||
        servTitle.includes("design")
      );
    }
    if (slugKey === "crm") {
      return (
        servCat.includes("crm") ||
        servCat.includes("customer") ||
        servCat.includes("automation") ||
        servCat.includes("lead") ||
        servTitle.includes("crm")
      );
    }
    if (slugKey === "others" || slugKey === "local-seo" || slugKey === "gmb") {
      return (
        servCat.includes("other") ||
        servCat.includes("gmb") ||
        servCat.includes("local") ||
        servCat.includes("reputation") ||
        servCat.includes("consult") ||
        servCat.includes("orm") ||
        servTitle.includes("gmb") ||
        servTitle.includes("local")
      );
    }
    return (
      servCatSlug.includes(slugKey) ||
      slugKey.includes(servCatSlug) ||
      servTitle.includes(slugKey.replace(/-/g, " "))
    );
  });

  // Display matched category services
  const displayServices = categoryServices.length > 0 ? categoryServices : allServices;

  return (
    <div className="min-h-screen bg-white text-[#0B1120]">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-gray-100 bg-gray-50 py-3.5 px-5 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-xs font-semibold text-gray-500">
          <Link href="/" className="hover:text-[#0B1120]">Home</Link>
          <ChevronRight size={12} />
          <Link href="/#services" className="hover:text-[#0B1120]">Services</Link>
          <ChevronRight size={12} />
          <span className="text-[#0B1120] font-bold capitalize">{catMeta.name}</span>
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="relative bg-[#0B1120] py-20 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_50%)]" />
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-300 border border-white/10 mb-4">
              <CategoryIcon size={14} className="text-blue-400" /> {catMeta.badge}
            </span>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
              {catMeta.name}
            </h1>

            <p className="mt-3 text-xl font-medium text-blue-300">
              {catMeta.subtitle}
            </p>

            <p className="mt-5 text-base sm:text-lg leading-relaxed text-gray-300">
              {catMeta.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#services-list"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#0B1120] transition hover:bg-gray-100 shadow-md"
              >
                Explore Services ({categoryServices.length})
                <ArrowRight size={16} />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Request Custom Proposal
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section id="services-list" className="py-20 px-5 sm:px-8 lg:px-12 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Category Portfolio
            </span>
            <h2 className="text-3xl font-extrabold text-[#0B1120] mt-1">
              Active Services under {catMeta.name}
            </h2>
            <p className="text-sm text-gray-600 mt-2 max-w-2xl">
              Each service below includes detailed strategy, technical implementation, and measurable deliverables tailored to your business goals.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayServices.map((serv, index) => {
              const IconComp = getIconComponent(serv.iconName);
              const targetSlug =
                serv.serviceId ||
                serv._id ||
                serv.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

              const rawSnippet = (serv.short || serv.description || "")
                .replace(/<[^>]+>/g, " ")
                .replace(/\s+/g, " ")
                .trim();
              const displaySnippet =
                rawSnippet.length > 125 ? `${rawSnippet.substring(0, 125)}...` : rawSnippet;

              return (
                <motion.article
                  key={targetSlug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="group flex flex-col justify-between rounded-3xl bg-white border border-gray-200 p-7 shadow-sm hover:shadow-xl hover:border-[#0B1120] transition-all duration-300 h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-[#0B1120] group-hover:bg-[#0B1120] group-hover:text-white transition-colors duration-300">
                        <IconComp size={26} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#0B1120] px-3 py-1 rounded-full">
                        {serv.category || "Service"}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B1120] group-hover:text-blue-600 transition-colors">
                      {serv.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-gray-600 font-normal line-clamp-3 min-h-[3rem]">
                      {displaySnippet}
                    </p>

                    {/* Key Deliverable Points */}
                    {serv.points && serv.points.length > 0 && (
                      <ul className="mt-5 space-y-2.5 border-t border-gray-100/80 pt-4 list-none m-0 p-0">
                        {serv.points.slice(0, 4).map((pt, i) => (
                          <li key={i} className="flex items-center gap-2.5 text-xs font-semibold text-[#0B1120]/80 list-none m-0 p-0">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/80 shadow-2xs">
                              <Check size={11} strokeWidth={2.5} />
                            </span>
                            <span className="leading-snug">{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="mt-8 pt-4 border-t border-gray-100">
                    <Link
                      href={`/services/${targetSlug}`}
                      prefetch={true}
                      className="inline-flex w-full items-center justify-between rounded-xl bg-[#0B1120] px-4.5 py-3.5 text-xs font-bold text-white transition-all duration-200 hover:bg-[#1a2336] shadow-sm hover:shadow-md"
                    >
                      <span className="text-white">Read Full Service Details</span>
                      <ArrowUpRight size={16} className="text-white shrink-0" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Category FAQs Section */}
      <section className="bg-gray-50 py-16 px-5 sm:px-8 lg:px-12 border-t border-gray-200">
        <div className="mx-auto max-w-4xl">
          <ServiceFaqAccordion serviceTitle={catMeta.name} />
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="bg-[#0B1120] py-16 text-white text-center px-5">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold sm:text-4xl">Ready to get started with {catMeta.name}?</h2>
          <p className="mt-3 text-gray-300 text-base">
            Contact Team BrandVaani today for a customized roadmap and strategy consultation.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold text-[#0B1120] hover:bg-gray-100 transition shadow-lg"
            >
              Get Free Consultation <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
