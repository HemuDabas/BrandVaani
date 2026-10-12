
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="bg-white px-5 py-20 text-[#0B1120] sm:px-8 lg:px-12 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]"
        >
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#0B1120]/45">
              About BrandVaani
            </p>

            <h2 className="max-w-3xl text-4xl font-medium leading-[1.06] tracking-[-0.045em] sm:text-5xl lg:text-[56px]">
              Helping businesses build
              <br className="hidden sm:block" />
              a stronger digital presence.
            </h2>
          </div>

          <div className="flex items-end">
            <p className="max-w-lg text-base leading-7 text-[#0B1120]/55">
              BrandVaani is a digital marketing service provider helping
              businesses grow through thoughtful strategy, creative work and
              technology. We believe marketing works best when it starts with
              understanding the business behind the brand.
            </p>
          </div>
        </motion.div>

        {/* Mission / Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-14 overflow-hidden rounded-2xl bg-[#0B1120] text-white"
        >
          <div className="grid lg:grid-cols-2">

            {/* Mission */}
            <div className="p-8 sm:p-10 lg:p-12 bg-white text-[#0B1120]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0B1120]">
                Our Mission
              </p>

              <h3 className="mt-6 max-w-xl text-2xl font-medium leading-[1.25] tracking-[-0.025em] sm:text-3xl">
                To help businesses grow through marketing that is clear,
                purposeful and genuinely useful.
              </h3>

              <p className="mt-6 max-w-xl text-sm leading-7 text-[#0B1120]/65">
                We take the time to understand what makes each business
                different and turn that understanding into digital strategies
                that connect with the right audience and create meaningful
                growth.
              </p>
            </div>

            {/* Vision */}
            <div className="border-t border-white/10 p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                Our Vision
              </p>

              <h3 className="mt-6 max-w-xl text-2xl font-medium leading-[1.25] tracking-[-0.025em] sm:text-3xl">
                To become a trusted digital growth partner for ambitious
                businesses.
              </h3>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/55">
                We want to build long-term relationships with businesses and
                create digital experiences that are useful to people, valuable
                to brands and built to last.
              </p>
            </div>

          </div>
        </motion.div>

        {/* Experience / Approach */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">

          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-[#0B1120]/10 bg-[#f8f8f7] p-8 sm:p-10"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0B1120]/40">
              Our Journey
            </p>

            <div className="mt-8 flex items-end gap-3">
              <span className="text-7xl font-medium leading-none tracking-[-0.07em]">
                4
              </span>

              <span className="mb-1 text-lg text-[#0B1120]/45">
                years
              </span>
            </div>

            <div className="mt-7 h-px w-full bg-[#0B1120]/10" />

            <p className="mt-6 text-sm leading-7 text-[#0B1120]/55">
              Four years of learning, adapting and growing alongside the
              businesses we work with.
            </p>
          </motion.div>

          {/* Approach */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0B1120]/40">
              Our Approach
            </p>

            <h3 className="mt-5 max-w-2xl text-2xl font-medium leading-[1.3] tracking-[-0.025em] sm:text-3xl">
              No fixed formulas. Just marketing built around your business.
            </h3>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[#0B1120]/55">
              Every business has different goals, customers and challenges.
              That's why we start by understanding the business first, then
              build a digital strategy around what actually matters.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-7 text-[#0B1120]/55">
              From SEO and social media to paid advertising, content and web
              development, every part of our work is focused on helping your
              business move forward.
            </p>

            <motion.a
              href="#contact"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              className="mt-7 flex w-fit items-center gap-2 text-sm font-semibold"
            >
              Let's work together
              <ArrowUpRight size={16} />
            </motion.a>
          </motion.div>

        </div>

       

      </div>
    </section>
    
  );
}

