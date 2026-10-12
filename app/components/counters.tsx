"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface CounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}

function AnimatedCounter({ target, prefix = "", suffix = "", decimals = 0, label }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1800; // 1.8 seconds
    const steps = 60;
    const stepTime = duration / steps;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="p-2 sm:p-4 flex flex-col items-center justify-center"
    >
      <h3 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1120] tracking-tight font-mono mb-2 whitespace-nowrap">
        {prefix}
        {count.toFixed(decimals)}
        {suffix}
      </h3>
      <p className="text-[11px] sm:text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wider text-center">
        {label}
      </p>
    </motion.div>
  );
}

export default function Counters() {
  return (
    <section className="w-full bg-[#f8f9fa] border-y border-gray-100 py-10 sm:py-16 px-4 sm:px-8 lg:px-12 text-[#0B1120]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-8 text-center divide-x-0 md:divide-x divide-gray-200">
          <AnimatedCounter target={120} suffix="+" label="Successful Projects" />
          <AnimatedCounter target={98} suffix="%" label="Client Retention Rate" />
          <AnimatedCounter target={4.9} decimals={1} suffix=" / 5" label="Average Client Rating" />
          <AnimatedCounter target={25} prefix="₹" suffix="M+" label="Client Revenue Generated" />
        </div>
      </div>
    </section>
  );
}

