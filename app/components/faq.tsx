"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

interface FAQItem {
  _id?: string;
  question: string;
  answer: string;
  category?: string;
}

const defaultFAQs: FAQItem[] = [
  {
    question: "How long does it take to see organic results from SEO?",
    answer:
      "Search Engine Optimization is a long-term compound growth strategy. Initial technical & keyword optimizations typically start reflecting in search rankings within 4 to 8 weeks, with substantial organic traffic growth achieved between 3 to 6 months.",
  },
  {
    question: "Do you offer custom digital marketing strategies or fixed templates?",
    answer:
      "We build 100% custom growth strategies tailored around your business goals, target audience, and current market position. No cookie-cutter templates—every client receives a dedicated strategy.",
  },
  {
    question: "How do you track ROI and campaign performance?",
    answer:
      "Transparency is key. We set up comprehensive analytics tracking across Google Analytics, Meta Pixel, and custom conversion dashboards. You receive detailed weekly reports showing cost per acquisition (CPA) and exact revenue generated.",
  },
  {
    question: "Can BrandVaani redesign our website while preserving our current SEO rankings?",
    answer:
      "Yes! Our web development team works directly alongside our SEO specialists. We perform thorough URL mapping, 301 redirect management, and meta preservation to guarantee your hard-earned SEO authority remains intact during the launch.",
  },
];

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQItem[]>(defaultFAQs);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const res = await fetch("/api/faqs");
      const data = await res.json();
      if (data.success && data.faqs && data.faqs.length > 0) {
        setFaqs(data.faqs);
      }
    } catch (err) {
      console.error("Failed to fetch FAQs:", err);
    }
  };

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#f8f9fa] py-20 px-5 sm:px-8 lg:px-12 text-[#0B1120] border-t border-gray-100">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-200 bg-white mb-3 shadow-sm text-xs font-semibold uppercase tracking-wider text-[#0B1120]">
            <HelpCircle size={14} /> Frequently Asked Questions
          </div>
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
            Got questions? We've got answers.
          </h2>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq._id || faq.question}
                className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between p-5 text-left font-semibold text-base text-[#0B1120] hover:text-black transition cursor-pointer"
                >
                  <span className="pr-4">{faq.question}</span>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${
                      isOpen ? "bg-[#0B1120] text-white" : "bg-gray-100 text-gray-600"
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
                      <div className="px-5 pb-5 pt-0 text-sm leading-relaxed text-gray-600 border-t border-gray-100 mt-1 pt-3">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
