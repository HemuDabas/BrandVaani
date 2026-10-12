"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { ServiceData } from "@/lib/default-services";

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Automatically extracts or generates relevant FAQs for a given service based on its content.
 */
export function extractOrGenerateServiceFaqs(service: ServiceData): FAQItem[] {
  const extractedFaqs: FAQItem[] = [];

  // 1. Try to extract explicit FAQs from HTML if present in description
  if (service.description && typeof window !== "undefined") {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(service.description, "text/html");

      const headingElements = doc.querySelectorAll("h3, h4, h2");
      headingElements.forEach((hEl) => {
        const text = hEl.textContent?.trim() || "";
        if (text.endsWith("?") || /what|how|why|can|is|does|will/i.test(text)) {
          let next = hEl.nextElementSibling;
          let answerText = "";
          while (next && next.tagName.toLowerCase() === "p") {
            answerText += next.textContent?.trim() + " ";
            next = next.nextElementSibling;
          }
          if (text && answerText.trim()) {
            extractedFaqs.push({
              question: text,
              answer: answerText.trim(),
            });
          }
        }
      });
    } catch (e) {
      // Fallback below
    }
  }

  // Regex fallback extraction if DOMParser not available or SSR
  if (extractedFaqs.length === 0 && service.description) {
    const qMatches = service.description.match(/<h[234][^>]*>(.*?\?.*?)<\/h[234]>\s*<p>(.*?)<\/p>/gi);
    if (qMatches) {
      qMatches.forEach((match) => {
        const qText = match.replace(/<h[234][^>]*>/i, "").replace(/<\/h[234]>[\s\S]*/i, "").replace(/<[^>]+>/g, "").trim();
        const aText = match.replace(/[\s\S]*?<p>/i, "").replace(/<\/p>$/i, "").replace(/<[^>]+>/g, "").trim();
        if (qText && aText) {
          extractedFaqs.push({ question: qText, answer: aText });
        }
      });
    }
  }

  if (extractedFaqs.length > 0) {
    return extractedFaqs;
  }

  // 2. Auto-generate tailored FAQs based on service content, category, points, and location
  const locationSuffix = service.location ? ` in ${service.location}` : "";
  const pointsList = service.points && service.points.length > 0
    ? service.points.slice(0, 4).join(", ")
    : service.short;

  const categoryTimeframe =
    service.category?.toLowerCase().includes("seo") || service.title.toLowerCase().includes("seo")
      ? "Initial technical improvements and Google Business profile enhancements reflect within 3 to 4 weeks, with compound search traffic and organic customer inquiry growth achieved within 60 to 90 days."
      : service.category?.toLowerCase().includes("web") || service.title.toLowerCase().includes("web")
      ? "Standard web development and design projects typically take 2 to 4 weeks depending on requirements, including custom UI/UX, mobile responsiveness, speed optimization, and launch testing."
      : "Campaign setup and audience positioning take 3-7 days, with performance analytics and qualified lead generation building steadily within the first 2 weeks.";

  return [
    {
      question: `What is included in the ${service.title} service${locationSuffix}?`,
      answer: `Our ${service.title} package provides an end-to-end solution tailored directly to your business goals. Core deliverables include: ${pointsList}. We focus on driving real customer inquiries, brand trust, and measurable ROI.`,
    },
    {
      question: `How soon can I expect results from ${service.title}?`,
      answer: categoryTimeframe,
    },
    {
      question: `Why should my business choose BrandVaani for ${service.title}${locationSuffix}?`,
      answer: `BrandVaani pairs dedicated growth strategists with 100% custom-tailored execution—no generic templates. You get dedicated account management and transparent weekly reporting showing exact returns on your investment.`,
    },
    {
      question: `Can ${service.title} be customized for my specific industry?`,
      answer: `Yes, absolutely. We customize every component of ${service.title}—from audience targeting and copywriting to conversion-focused landing pages—specifically for your business niche and target audience.`,
    },
    {
      question: `How will performance and ROI be tracked for ${service.title}?`,
      answer: `You receive regular performance reports detailing key performance indicators including total leads, customer inquiries, search visibility gains, and cost per acquisition (CPA).`,
    },
  ];
}

interface ServiceFaqAccordionProps {
  service?: ServiceData;
  serviceTitle?: string;
}

export default function ServiceFaqAccordion({ service, serviceTitle }: ServiceFaqAccordionProps) {
  const targetService: ServiceData = service || {
    serviceId: "category-faq",
    title: serviceTitle || "Service",
    category: serviceTitle || "Digital Marketing",
    short: serviceTitle || "Service",
    description: "",
    iconName: "HelpCircle",
    points: [],
  };

  const faqs = extractOrGenerateServiceFaqs(targetService);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mt-14 pt-10 border-t border-gray-100">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-200 bg-blue-50/80 mb-3 text-xs font-bold uppercase tracking-wider text-blue-700">
          <HelpCircle size={14} /> Frequently Asked Questions
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0B1120]">
          Got questions about {targetService.title}?
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Everything you need to know about our {targetService.category} deliverables and workflow:
        </p>
      </div>

      {/* Accordions */}
      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition duration-200 overflow-hidden ${
                isOpen
                  ? "border-[#0B1120] bg-white shadow-md ring-1 ring-[#0B1120]/10"
                  : "border-gray-200 bg-gray-50/50 hover:bg-white hover:border-gray-300"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-[#0B1120] transition cursor-pointer"
              >
                <span className="pr-4 leading-snug">{faq.question}</span>
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                    isOpen ? "bg-[#0B1120] text-white" : "bg-gray-200/80 text-gray-700"
                  }`}
                >
                  {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-5 pt-0 text-sm leading-relaxed text-gray-600 border-t border-gray-100/80 mt-1 pt-3">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
