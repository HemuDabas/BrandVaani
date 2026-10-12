"use client";

import { motion } from "framer-motion";

const timelineSteps = [
  {
    num: ".01",
    title: "Website & App Development",
    description: "Custom UI/UX, mobile responsiveness, fast loading speed & conversion optimization.",
    position: "top", // Pin on top, label below
    hoverBg: "group-hover:bg-gradient-to-tr group-hover:from-[#1e3a8a] group-hover:to-[#3b82f6]",
    hoverShadow: "group-hover:shadow-blue-500/40",
    hoverTitle: "group-hover:text-[#2563eb]",
    hoverStem: "group-hover:bg-[#2563eb]",
  },
  {
    num: ".02",
    title: "Organic SEO & SMO",
    description: "Technical SEO, Google Maps visibility, high-authority backlinking & active social presence.",
    position: "bottom", // Pin on bottom, label above
    hoverBg: "group-hover:bg-gradient-to-tr group-hover:from-[#3b82f6] group-hover:to-[#8b5cf6]",
    hoverShadow: "group-hover:shadow-purple-500/40",
    hoverTitle: "group-hover:text-[#7c3aed]",
    hoverStem: "group-hover:bg-[#7c3aed]",
  },
  {
    num: ".03",
    title: "Digital Marketing Advertising",
    description: "Targeted Google Ads & Meta campaigns for instant high-intent customer lead generation.",
    position: "top", // Pin on top, label below
    hoverBg: "group-hover:bg-gradient-to-tr group-hover:from-[#ec4899] group-hover:to-[#d946ef]",
    hoverShadow: "group-hover:shadow-pink-500/40",
    hoverTitle: "group-hover:text-[#db2777]",
    hoverStem: "group-hover:bg-[#db2777]",
  },
  {
    num: ".04",
    title: "Data Analysis & Remarketing",
    description: "Conversion tracking, custom ROI dashboards & automated retargeting funnels.",
    position: "bottom", // Pin on bottom, label above
    hoverBg: "group-hover:bg-gradient-to-tr group-hover:from-[#ea580c] group-hover:to-[#f59e0b]",
    hoverShadow: "group-hover:shadow-amber-500/40",
    hoverTitle: "group-hover:text-[#ea580c]",
    hoverStem: "group-hover:bg-[#ea580c]",
  },
];

export default function HorizontalTimeline() {
  return (
    <section className="w-full bg-white text-[#0B1120] py-14 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-12 overflow-hidden border-t border-gray-100">
      <div className="mx-auto max-w-6xl">
        {/* Responsive Header Title Badge */}
        <div className="text-center mb-10 sm:mb-16 md:mb-24">
          <span className="inline-block bg-[#0B1120] text-white font-bold text-lg sm:text-2xl md:text-4xl px-5 py-3 sm:px-8 sm:py-3.5 rounded-2xl shadow-lg tracking-tight leading-snug max-w-full">
            Steps to Build a Successful Online Business
          </span>
        </div>

        {/* ---------------------------------------------------- */}
        {/* MOBILE & TABLET VERTICAL TIMELINE (< md) */}
        {/* ---------------------------------------------------- */}
        <div className="block md:hidden relative my-6 pl-2 pr-1">
          {/* Vertical Connecting Line */}
          <div className="absolute left-[31px] sm:left-[39px] top-6 bottom-6 w-1 bg-gradient-to-b from-[#0B1120] via-[#2563eb] to-[#ea580c] rounded-full z-0 opacity-80" />

          <div className="space-y-8 relative z-10">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={`mobile-${step.num}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-4 sm:gap-6 group"
              >
                {/* Circular Pin Badge */}
                <div className={`w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-[#0B1120] text-white flex items-center justify-center font-extrabold text-lg sm:text-2xl shadow-lg border-4 border-white z-10 shrink-0 transition-transform duration-300 group-hover:scale-105 ${step.hoverBg}`}>
                  {step.num}
                </div>

                {/* Step Details Card */}
                <div className="flex-1 bg-gray-50/90 hover:bg-white border border-gray-200/80 hover:border-blue-200 p-4 sm:p-5 rounded-2xl shadow-sm transition-all duration-300">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-blue-100/70 text-blue-700">
                      Step {index + 1}
                    </span>
                  </div>
                  <h4 className={`text-base sm:text-lg font-bold text-[#0B1120] leading-snug transition-colors duration-200 ${step.hoverTitle}`}>
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* DESKTOP HORIZONTAL ALTERNATING TIMELINE (>= md) */}
        {/* ---------------------------------------------------- */}
        <div className="hidden md:block relative py-20 my-10">
          {/* Connected Arrow Horizontal Line */}
          <div className="flex items-center w-full absolute top-1/2 -translate-y-1/2 z-0 px-8">
            <div className="h-4 bg-[#0B1120] flex-1 rounded-l-full relative" />
            <div className="h-4 bg-[#1e293b] flex-1 relative" />
            <div className="h-4 bg-[#334155] flex-1 relative" />
            <div className="h-4 bg-[#475569] flex-1 rounded-r-lg relative" />
            {/* Arrow Tip */}
            <div className="w-0 h-0 border-t-[14px] border-t-transparent border-b-[14px] border-b-transparent border-l-[22px] border-l-[#475569] shrink-0 -ml-1" />
          </div>

          {/* Grid of Steps with Alternating Top/Bottom Pins */}
          <div className="grid grid-cols-4 gap-4 relative z-10">
            {timelineSteps.map((step, index) => {
              const isTop = step.position === "top";

              return (
                <motion.div
                  key={`desktop-${step.num}`}
                  initial={{ opacity: 0, y: isTop ? -20 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="flex flex-col items-center text-center relative group cursor-pointer"
                >
                  {/* Top Title (For Bottom Pins) */}
                  {!isTop && (
                    <div className="mb-12 h-16 flex items-center justify-center">
                      <h4 className={`text-lg font-bold text-[#0B1120] max-w-[180px] leading-tight tracking-tight transition-colors duration-300 ${step.hoverTitle}`}>
                        {step.title}
                      </h4>
                    </div>
                  )}

                  {/* Pin Circle with Connector Line */}
                  <div className="relative flex flex-col items-center">
                    {/* Top Pin Stem Line */}
                    {isTop && (
                      <div className={`w-[3px] h-10 bg-[#0B1120] absolute top-full transition-colors duration-300 ${step.hoverStem}`} />
                    )}

                    {/* Circular Number Pin with Color Hover Transition */}
                    <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#0B1120] text-white flex items-center justify-center font-extrabold text-2xl sm:text-3xl shadow-xl border-4 border-white z-10 transition-all duration-300 group-hover:scale-110 ${step.hoverBg} ${step.hoverShadow}`}>
                      {step.num}
                    </div>

                    {/* Bottom Pin Stem Line */}
                    {!isTop && (
                      <div className={`w-[3px] h-10 bg-[#0B1120] absolute bottom-full transition-colors duration-300 ${step.hoverStem}`} />
                    )}
                  </div>

                  {/* Bottom Title (For Top Pins) */}
                  {isTop && (
                    <div className="mt-12 h-16 flex items-center justify-center">
                      <h4 className={`text-lg font-bold text-[#0B1120] max-w-[180px] leading-tight tracking-tight transition-colors duration-300 ${step.hoverTitle}`}>
                        {step.title}
                      </h4>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
