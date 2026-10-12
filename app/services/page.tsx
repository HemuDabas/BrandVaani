import Services from "@/app/components/services";
import HorizontalTimeline from "@/app/components/timeline";
import FAQ from "@/app/components/faq";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";

export const metadata = {
  title: "All Services | BrandVaani Digital Marketing Agency",
  description:
    "Explore our full suite of digital marketing services, including SEO, Google Ads, Social Media Marketing, Web Development, and CRM solutions.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-gray-100 bg-gray-50 py-3.5 px-5 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center gap-2 text-xs font-semibold text-gray-500">
          <Link href="/" className="hover:text-[#0B1120]">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-[#0B1120] font-bold">Services</span>
        </div>
      </div>

      {/* Services Hero Header Banner */}
      <section className="relative bg-[#0B1120] py-16 sm:py-20 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_50%)]" />
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-300 border border-white/10 mb-4">
              <Sparkles size={14} className="text-blue-400" /> Complete Growth Solutions
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Scalable Services Built for Real Business Impact
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl">
              From organic search dominance and paid media customer acquisition to modern web engineering and CRM pipelines, explore our complete directory of growth services.
            </p>
          </div>
        </div>
      </section>

      <Services />
      <HorizontalTimeline />
      <FAQ />
    </div>
  );
}
