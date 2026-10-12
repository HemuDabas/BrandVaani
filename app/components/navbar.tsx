"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
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
  Megaphone,
  Code,
  Layers,
  ArrowRight,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { DEFAULT_SERVICES, ServiceData, categorizeServices } from "@/lib/default-services";

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

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Mega Menu State & Data
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesList, setServicesList] = useState<ServiceData[]>(DEFAULT_SERVICES);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services", { cache: "no-store" });
      const data = await res.json();
      if (data.success && data.services && data.services.length > 0) {
        setServicesList(data.services);
      }
    } catch (err) {
      console.error("Using default services fallback");
    }
  };

  const handleMouseEnterMega = () => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    setMegaMenuOpen(true);
  };

  const handleMouseLeaveMega = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 150);
  };

  // Hide main website navbar on all /admin and shield portal pages
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/brandvaani/shield")) {
    return null;
  }

  const { digitalMarketing, webDevelopment, others } = categorizeServices(servicesList);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
        <nav className="mx-auto flex h-[76px] max-w-[1200px] items-center justify-between px-5 sm:px-6 lg:px-8">
          {/* LOGO */}
          <Link
            href="/"
            onClick={() => {
              setIsOpen(false);
              setMegaMenuOpen(false);
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex h-9 w-9 items-center justify-center">
              <div className="absolute h-7 w-7 rotate-45 rounded-[5px] bg-[#0B1120]" />
              <div className="absolute h-4 w-4 rotate-45 rounded-[3px] bg-white" />
            </div>

            <div className="leading-none">
              <div className="text-[21px] font-bold tracking-tight text-[#0B1120]">
                Brand<span className="text-[#0B1120]">Vaani</span>
              </div>
              <div className="mt-1 text-[9px] font-medium tracking-wide text-gray-500 uppercase">
                Digital Marketing Agency
              </div>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden items-center gap-8 lg:flex">
            <Link
              href="/"
              className="py-6 text-[14px] font-medium text-[#0B1120] transition-colors hover:text-black"
            >
              Home
            </Link>

            <Link
              href="/#about"
              className="py-6 text-[14px] font-medium text-[#0B1120] transition-colors hover:text-black"
            >
              About
            </Link>

            {/* SERVICES MEGA MENU TRIGGER */}
            <div
              className="relative py-6"
              onMouseEnter={handleMouseEnterMega}
              onMouseLeave={handleMouseLeaveMega}
            >
              <div className="flex items-center gap-1">
                <Link
                  href="/#services"
                  onClick={() => setMegaMenuOpen(false)}
                  className="py-6 text-[14px] font-medium text-[#0B1120] transition-colors hover:text-black"
                >
                  Services
                </Link>
                <button
                  type="button"
                  onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                  className="p-1 text-gray-500 hover:text-black cursor-pointer"
                  aria-label="Toggle Services Menu"
                >
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-200 ${
                      megaMenuOpen ? "rotate-180 text-black" : "text-gray-400"
                    }`}
                  />
                </button>
              </div>

              {/* DESKTOP MEGA MENU DROPDOWN */}
              {megaMenuOpen && (
                <div
                  onMouseEnter={handleMouseEnterMega}
                  onMouseLeave={handleMouseLeaveMega}
                  className="absolute left-1/2 top-[calc(100%-4px)] -translate-x-1/2 w-[940px] max-w-[92vw] rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  <div className="grid grid-cols-3 gap-6 divide-x divide-gray-100">
                    {/* SECTION 1: DIGITAL MARKETING */}
                    <div className="pr-4 space-y-3">
                      <Link
                        href="/services/category/digital-marketing"
                        onClick={() => setMegaMenuOpen(false)}
                        className="group flex items-center gap-2.5 pb-2 border-b border-gray-100 hover:border-blue-500 transition"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <Megaphone size={16} />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-[#0B1120] group-hover:text-blue-600 flex items-center gap-1 transition-colors">
                            Digital Marketing <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h3>
                          <p className="text-[10px] text-gray-500 font-medium">
                            SEO, Social, Ads & Content
                          </p>
                        </div>
                      </Link>

                      <div className="space-y-1 pt-1">
                        {digitalMarketing.map((serv) => {
                          const Icon = getIconComponent(serv.iconName);
                          const targetSlug = serv.serviceId || serv._id || serv.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                          return (
                            <Link
                              key={targetSlug}
                              href={`/services/${targetSlug}`}
                              onClick={() => setMegaMenuOpen(false)}
                              className="group flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-gray-50"
                            >
                              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-[#0B1120] group-hover:bg-[#0B1120] group-hover:text-white transition-colors mt-0.5">
                                <Icon size={14} />
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-[#0B1120] group-hover:text-black transition-colors">
                                  {serv.title}
                                </h4>
                                <p className="text-[11px] text-gray-500 line-clamp-1">
                                  {serv.short}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* SECTION 2: WEB DEVELOPMENT */}
                    <div className="px-4 space-y-3">
                      <Link
                        href="/services/category/web-development"
                        onClick={() => setMegaMenuOpen(false)}
                        className="group flex items-center gap-2.5 pb-2 border-b border-gray-100 hover:border-purple-500 transition"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                          <Code size={16} />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-[#0B1120] group-hover:text-purple-600 flex items-center gap-1 transition-colors">
                            Web Development <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h3>
                          <p className="text-[10px] text-gray-500 font-medium">
                            Websites, E-Commerce & UI/UX
                          </p>
                        </div>
                      </Link>

                      <div className="space-y-1 pt-1">
                        {webDevelopment.map((serv) => {
                          const Icon = getIconComponent(serv.iconName);
                          const targetSlug = serv.serviceId || serv._id || serv.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                          return (
                            <Link
                              key={targetSlug}
                              href={`/services/${targetSlug}`}
                              onClick={() => setMegaMenuOpen(false)}
                              className="group flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-gray-50"
                            >
                              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-[#0B1120] group-hover:bg-[#0B1120] group-hover:text-white transition-colors mt-0.5">
                                <Icon size={14} />
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-[#0B1120] group-hover:text-black transition-colors">
                                  {serv.title}
                                </h4>
                                <p className="text-[11px] text-gray-500 line-clamp-1">
                                  {serv.short}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* SECTION 3: OTHERS (GMB & LOCAL) */}
                    <div className="pl-4 space-y-3">
                      <Link
                        href="/services/category/others"
                        onClick={() => setMegaMenuOpen(false)}
                        className="group flex items-center gap-2.5 pb-2 border-b border-gray-100 hover:border-amber-500 transition"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                          <Layers size={16} />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-[#0B1120] group-hover:text-amber-600 flex items-center gap-1 transition-colors">
                            Others & Local SEO <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h3>
                          <p className="text-[10px] text-gray-500 font-medium">
                            GMB, Reputation & Branding
                          </p>
                        </div>
                      </Link>

                      <div className="space-y-1 pt-1">
                        {others.map((serv) => {
                          const Icon = getIconComponent(serv.iconName);
                          const targetSlug = serv.serviceId || serv._id || serv.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                          return (
                            <Link
                              key={targetSlug}
                              href={`/services/${targetSlug}`}
                              onClick={() => setMegaMenuOpen(false)}
                              className="group flex items-start gap-3 rounded-xl p-2.5 transition hover:bg-gray-50"
                            >
                              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-[#0B1120] group-hover:bg-[#0B1120] group-hover:text-white transition-colors mt-0.5">
                                <Icon size={14} />
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-[#0B1120] group-hover:text-black transition-colors">
                                  {serv.title}
                                </h4>
                                <p className="text-[11px] text-gray-500 line-clamp-1">
                                  {serv.short}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Mega Menu Footer Quick Link */}
                  <div className="mt-5 pt-3.5 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-500">Need a comprehensive service overview?</span>
                    <Link
                      href="/services"
                      onClick={() => setMegaMenuOpen(false)}
                      className="font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition"
                    >
                      Explore All Services <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/#portfolio"
              className="py-6 text-[14px] font-medium text-[#0B1120] transition-colors hover:text-black"
            >
              Portfolio
            </Link>

            <Link
              href="/blogs"
              className="py-6 text-[14px] font-medium text-[#0B1120] transition-colors hover:text-black flex items-center gap-1"
            >
              Blogs
            </Link>

            <Link
              href="/contact"
              className="py-6 text-[14px] font-medium text-[#0B1120] transition-colors hover:text-black"
            >
              Contact
            </Link>
          </div>

          {/* DESKTOP CONTACT CTA */}
          <div className="hidden items-center gap-4 lg:flex">
            <a
              href="/#contact"
              className="flex items-center gap-2 rounded-[14px] bg-[#0B1120] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-black hover:shadow-lg"
            >
              Enquire Now
            </a>
          </div>

          {/* MOBILE BUTTON */}
          <button
            type="button"
            aria-label="Toggle Menu"
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-[#0B1120] lg:hidden cursor-pointer"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="border-t border-gray-100 bg-white px-6 py-5 lg:hidden space-y-4 max-h-[85vh] overflow-y-auto">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-[#0B1120]"
            >
              Home
            </Link>

            <Link
              href="/#about"
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-[#0B1120]"
            >
              About
            </Link>

            {/* MOBILE SERVICES ACCORDION */}
            <div className="border-y border-gray-100 py-3 space-y-2">
              <div className="flex items-center justify-between">
                <Link
                  href="/#services"
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium text-[#0B1120]"
                >
                  Services
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="p-1 text-[#0B1120]"
                  aria-label="Toggle Mobile Services"
                >
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 ${
                      mobileServicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {mobileServicesOpen && (
                <div className="pl-2 pt-3 space-y-4">
                  <Link
                    href="/services"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between rounded-xl bg-blue-50 px-3 py-2 text-xs font-bold text-blue-600 hover:bg-blue-100 transition"
                  >
                    <span>View All Services </span>
                    <ArrowRight size={14} />
                  </Link>

                  {/* Digital Marketing */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase text-blue-600 tracking-wider">
                      Digital Marketing
                    </p>
                    <div className="space-y-2 pl-2">
                      {digitalMarketing.map((serv) => {
                        const targetSlug = serv.serviceId || serv._id || serv.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                        return (
                          <Link
                            key={targetSlug}
                            href={`/services/${targetSlug}`}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 text-sm text-gray-700 hover:text-black py-1"
                          >
                            <ChevronRight size={14} className="text-gray-400" />
                            <span>{serv.title}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Web Development */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase text-purple-600 tracking-wider">
                      Web Development
                    </p>
                    <div className="space-y-2 pl-2">
                      {webDevelopment.map((serv) => {
                        const targetSlug = serv.serviceId || serv._id || serv.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                        return (
                          <Link
                            key={targetSlug}
                            href={`/services/${targetSlug}`}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 text-sm text-gray-700 hover:text-black py-1"
                          >
                            <ChevronRight size={14} className="text-gray-400" />
                            <span>{serv.title}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Others & GMB Services */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase text-amber-600 tracking-wider">
                      Others & GMB Services
                    </p>
                    <div className="space-y-2 pl-2">
                      {others.map((serv) => {
                        const targetSlug = serv.serviceId || serv._id || serv.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                        return (
                          <Link
                            key={targetSlug}
                            href={`/services/${targetSlug}`}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 text-sm text-gray-700 hover:text-black py-1"
                          >
                            <ChevronRight size={14} className="text-gray-400" />
                            <span>{serv.title}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/#portfolio"
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-[#0B1120]"
            >
              Portfolio
            </Link>

            <Link
              href="/blogs"
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-[#0B1120]"
            >
              Blogs
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-[#0B1120]"
            >
              Contact
            </Link>

            <div className="pt-4 border-t border-gray-100">
              <a
                href="/#contact"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0B1120] py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-black"
              >
                Enquire Now
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}