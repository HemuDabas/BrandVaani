"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface GoogleReview {
  id: number;
  name: string;
  timeAgo: string;
  avatarBg?: string;
  initial?: string;
  photo?: string;
  rating: number;
  comment: string;
}

const googleReviews: GoogleReview[] = [
  {
    id: 1,
    name: "Shaksham Kumar",
    timeAgo: "last year",
    avatarBg: "bg-purple-700",
    initial: "S",
    rating: 5,
    comment:
      "BrandVaani is the best company for website development and UI UX designing in Gurgaon. Recommended for all.",
  },
  {
    id: 2,
    name: "Rama Shankar N",
    timeAgo: "2 years ago",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    comment:
      "I had a fantastic experience with BrandVaani for my website development project. Their team was highly professional, delivering quality work on time.",
  },
  {
    id: 3,
    name: "Aarna",
    timeAgo: "3 years ago",
    avatarBg: "bg-orange-600",
    initial: "A",
    rating: 5,
    comment:
      "BrandVaani is the best digital marketing agency in Gurgaon. Thanks for completing my project on time. I would highly recommend them.",
  },
  {
    id: 4,
    name: "Amit Verma",
    timeAgo: "5 months ago",
    avatarBg: "bg-blue-600",
    initial: "A",
    rating: 5,
    comment:
      "Great experience working with BrandVaani for SEO and Google Ads campaigns. Highly transparent reporting and quick response team.",
  },
  {
    id: 5,
    name: "Deepak Yadav",
    timeAgo: "8 months ago",
    avatarBg: "bg-emerald-600",
    initial: "D",
    rating: 5,
    comment:
      "Top class agency for eCommerce web development. Within 3 months our website speed and leads increased significantly.",
  },
  {
    id: 6,
    name: "Neha Sharma",
    timeAgo: "1 year ago",
    avatarBg: "bg-pink-600",
    initial: "N",
    rating: 5,
    comment:
      "Extremely satisfied with their social media marketing and web design services. Very creative and supportive team!",
  },
];

const GoogleIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
);

const slideVariants: Variants = {
  enter: (dir: string) => ({
    x: dir === "right" ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
  exit: (dir: string) => ({
    x: dir === "right" ? -80 : 80,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  }),
};

export default function Testimonials() {
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isPaused, setIsPaused] = useState(false);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(googleReviews.length / itemsPerPage);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [pageIndex, isPaused]);

  const handleNext = () => {
    setDirection("right");
    setPageIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setDirection("left");
    setPageIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentItems = googleReviews.slice(
    pageIndex * itemsPerPage,
    pageIndex * itemsPerPage + itemsPerPage
  );

  return (
    <section className="w-full bg-white text-[#0B1120] py-20 px-5 sm:px-8 lg:px-12 border-t border-gray-100">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#0B1120]/45">
              Customer Reviews
            </p>

            <h2 className="text-4xl  font-medium leading-[1.06] tracking-[-0.045em] sm:text-5xl lg:text-[56px]">
              What People Say
            </h2>
          </motion.div>
        </div>
        
        {/* Main Grid: Left Summary Panel + Right 3-Card Carousel */}
        <div
          className="grid  pt-10 grid-cols-1 lg:grid-cols-12 gap-8 items-center relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Summary Box */}
          <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-full">
            <div>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#0B1120] text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-md">
                  BV
                </div>
                <div>
                  <h3 className="font-bold text-[#0B1120] text-base leading-tight">
                    BrandVaani: Web & Digital Marketing
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl font-bold text-[#0B1120]">4.9</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-amber-400" />
                  ))}
                </div>
              </div>

              <p className="text-xs font-semibold text-gray-500 mb-3">
                Based on 52 reviews
              </p>

              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-6">
                <span>powered by</span>
                <GoogleIcon />
                <span className="font-semibold text-gray-700">Google</span>
              </div>
            </div>

            <Link
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-full bg-[#121827] hover:bg-[#1557b0] text-white font-semibold text-xs transition shadow-sm"
            >
              review us on <GoogleIcon />
            </Link>
          </div>

          {/* Right Carousel Slider (3 Cards per slide) */}
          <div className="lg:col-span-9 relative">
            {/* Prev / Next Circular Buttons matching screenshot */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center shadow-md hover:bg-gray-50 transition cursor-pointer"
              aria-label="Previous reviews"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center shadow-md hover:bg-gray-50 transition cursor-pointer"
              aria-label="Next reviews"
            >
              <ChevronRight size={20} />
            </button>

            {/* Viewport */}
            <div className="overflow-hidden px-2 py-1 min-h-[220px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={pageIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="grid grid-cols-1 md:grid-cols-3 gap-5"
                >
                  {currentItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#f5f5f7] p-5 rounded-2xl border border-gray-200/60 shadow-none flex flex-col justify-between relative hover:shadow-md transition"
                    >
                      {/* Top Bar: Avatar + Name/Time + Google G Icon */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {item.photo ? (
                            <img
                              src={item.photo}
                              alt={item.name}
                              className="w-10 h-10 rounded-full object-cover shadow-sm"
                            />
                          ) : (
                            <div
                              className={`w-10 h-10 rounded-full ${item.avatarBg} text-white font-bold flex items-center justify-center text-sm shadow-sm`}
                            >
                              {item.initial}
                            </div>
                          )}

                          <div>
                            <h4 className="font-bold text-sm text-[#0B1120] leading-tight">
                              {item.name}
                            </h4>
                            <p className="text-[11px] text-gray-400 font-medium">
                              {item.timeAgo}
                            </p>
                          </div>
                        </div>

                        {/* Google G Logo in Top Right */}
                        <GoogleIcon />
                      </div>

                      {/* 5 Stars */}
                      <div className="flex items-center gap-1 mb-3 text-amber-500">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                        ))}
                      </div>

                      {/* Natural Review Text */}
                      <p className="text-xs leading-relaxed text-gray-700 line-clamp-4 font-normal">
                        {item.comment}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Dots at Bottom matching screenshot */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setDirection(index > pageIndex ? "right" : "left");
                    setPageIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    index === pageIndex
                      ? "w-4 bg-amber-500"
                      : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}





