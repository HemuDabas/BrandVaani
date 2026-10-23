"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Hide on admin or shield portal routes
  const isHiddenRoute =
    pathname?.startsWith("/admin") || pathname?.startsWith("/brandvaani/shield");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // Show after scrolling 240px
      if (currentScrollY > 240) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Calculate 0 to 100% progress
      if (scrollHeight > 0) {
        const progress = Math.min(
          100,
          Math.max(0, (currentScrollY / scrollHeight) * 100)
        );
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (isHiddenRoute) return null;

  // SVG circular progress parameters
  const size = 52;
  const strokeWidth = 2.5;
  const center = size / 2;
  const radius = center - strokeWidth - 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 15 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="fixed bottom-6 right-6 z-40 print:hidden"
        >
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.94 }}
            aria-label="Scroll to top of page"
            className="group relative flex h-[52px] w-[52px] items-center justify-center rounded-full bg-white shadow-[0_8px_30px_rgb(11,17,32,0.14)] border border-gray-100 transition-all duration-300 hover:shadow-[0_12px_35px_rgb(11,17,32,0.22)] cursor-pointer"
          >
            {/* SVG Circular Scroll Progress Ring */}
            <svg
              width={size}
              height={size}
              className="absolute inset-0 -rotate-90 pointer-events-none"
            >
              {/* Background Track */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="#0B1120"
                strokeOpacity="0.08"
                strokeWidth={strokeWidth}
              />
              {/* Active Progress */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="#0B1120"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-[stroke-dashoffset] duration-150 ease-out"
              />
            </svg>

            {/* Inner Core Circle */}
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#0B1120] text-white shadow-inner transition-colors duration-200 group-hover:bg-black">
              <motion.div
                animate={{ y: 0 }}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowUp
                  size={17}
                  strokeWidth={2.5}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5"
                />
              </motion.div>
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
