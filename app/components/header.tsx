"use client";

import {
  Search,
  Monitor,
  Share2,
  Smartphone,
  Leaf,
  BarChart3,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const cardTransition = {
  repeat: Infinity,
  ease: "easeInOut" as const,
};

export default function Header() {
  return (
    <section className="min-h-screen w-full overflow-hidden bg-white text-[#0B1120]">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:px-10 xl:px-12">

        {/* =====================================================
            LEFT CONTENT
        ====================================================== */}

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
          className="flex max-w-2xl flex-col"
        >
          {/* Badge */}
          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: 20,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: "easeOut",
                },
              },
            }}
            className="mb-7 flex w-fit items-center gap-2 rounded-full border border-[#0B1120]/10 bg-[#0B1120]/[0.03] px-4 py-2 text-sm font-medium"
          >
            <span className="h-2 w-2 rounded-full bg-[#0B1120]" />
            Digital Growth Partner
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={{
              hidden: {
                opacity: 0,
                y: 30,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.8,
                  ease: "easeOut",
                },
              },
            }}
            className="text-5xl font-medium leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-[4.25rem] xl:text-[4.8rem]"
          >
            Grow Your Business
            <br />
            with SmartDigital
            <br />
            Marketing
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={{
              hidden: {
                opacity: 0,
                y: 20,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.7,
                  ease: "easeOut",
                },
              },
            }}
            className="mt-7 max-w-xl text-lg leading-8 text-[#0B1120]/60 sm:text-xl"
          >
            Build a stronger digital presence with thoughtful strategy,
            modern design, and marketing that helps your business move
            forward.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: 20,
              },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: "easeOut",
                },
              },
            }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <motion.button
              type="button"
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
              transition={{
                duration: 0.2,
              }}
              className="group inline-flex items-center gap-3 rounded-md bg-[#0B1120] px-6 py-3.5 text-sm font-medium text-white shadow-sm"
            >
              Get started

              <motion.span
                initial={{ x: 0, y: 0 }}
                whileHover={{
                  x: 2,
                  y: -2,
                }}
              >
                <ArrowUpRight size={17} />
              </motion.span>
            </motion.button>

            <motion.button
              type="button"
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="inline-flex items-center gap-2 rounded-md border border-[#0B1120]/15 px-6 py-3.5 text-sm font-medium"
            >
              Explore services
            </motion.button>
          </motion.div>
        </motion.div>

        {/* =====================================================
            RIGHT VISUAL
        ====================================================== */}

        <div className="relative mx-auto h-[470px] w-full max-w-[620px] sm:h-[530px]">

          {/* Background grid */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 1,
            }}
            className="absolute inset-8 rounded-[40px] bg-[linear-gradient(to_right,#0B112008_1px,transparent_1px),linear-gradient(to_bottom,#0B112008_1px,transparent_1px)] bg-[size:32px_32px]"
          />

          {/* Dark circle */}
          <motion.div
            initial={{
              scale: 0.8,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="absolute right-[6%] top-[12%] h-[280px] w-[280px] rounded-full bg-[#0B1120] sm:h-[360px] sm:w-[360px]"
          />

          {/* =================================================
              LAPTOP
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -30,
              y: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
            }}
            transition={{
              duration: 0.9,
              delay: 0.25,
              ease: "easeOut",
            }}
            className="absolute left-[4%] top-[27%] z-20 w-[82%]"
          >
            {/* Screen */}
            <div className="overflow-hidden rounded-t-[14px] border-[7px] border-[#0B1120] bg-white shadow-2xl">

              {/* Browser */}
              <div className="flex h-7 items-center gap-1.5 border-b border-[#0B1120]/10 px-3">
                <span className="h-2 w-2 rounded-full bg-[#0B1120]/20" />
                <span className="h-2 w-2 rounded-full bg-[#0B1120]/20" />
                <span className="h-2 w-2 rounded-full bg-[#0B1120]/20" />

                <div className="mx-auto h-3.5 w-1/2 rounded-full bg-[#0B1120]/5" />
              </div>

              {/* Dashboard */}
              <div className="p-4 sm:p-6">

                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <div className="mb-2 h-3 w-24 rounded bg-[#0B1120]" />
                    <div className="h-2 w-36 rounded bg-[#0B1120]/10" />
                  </div>

                  <div className="rounded-lg bg-[#0B1120] p-2 text-white">
                    <BarChart3 size={17} />
                  </div>
                </div>

                {/* Chart */}
                <div className="relative h-36 sm:h-48">

                  <div className="absolute inset-0 flex items-end justify-between gap-2 px-1 sm:gap-3 sm:px-2">
                    {[35, 50, 42, 68, 58, 82, 72].map(
                      (height, index) => (
                        <motion.div
                          key={index}
                          initial={{
                            height: 0,
                          }}
                          animate={{
                            height: `${height}%`,
                          }}
                          transition={{
                            duration: 0.8,
                            delay: 0.5 + index * 0.08,
                            ease: "easeOut",
                          }}
                          className="w-full rounded-t-sm bg-[#0B1120]/10"
                        >
                          {index === 6 && (
                            <div className="h-full w-full rounded-t-sm bg-[#0B1120]" />
                          )}
                        </motion.div>
                      )
                    )}
                  </div>

                  {/* Growth line */}
                  <motion.svg
                    viewBox="0 0 500 180"
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <motion.path
                      d="M10 150 L80 125 L145 135 L215 92 L280 105 L350 55 L420 70 L490 18"
                      fill="none"
                      stroke="#0B1120"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{
                        pathLength: 0,
                      }}
                      animate={{
                        pathLength: 1,
                      }}
                      transition={{
                        duration: 1.8,
                        delay: 0.5,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.svg>
                </div>
              </div>
            </div>

            {/* Laptop base */}
            <div className="relative h-5 rounded-b-xl bg-[#0B1120] shadow-xl">
              <div className="absolute left-1/2 top-0 h-1.5 w-24 -translate-x-1/2 rounded-b-md bg-white/20" />
            </div>

            <div className="mx-auto h-3 w-[90%] rounded-[50%] bg-[#0B1120]/10 blur-md" />
          </motion.div>

          {/* =================================================
              SEO CARD
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, -9, 0],
            }}
            transition={{
              opacity: {
                duration: 0.6,
                delay: 0.8,
              },
              x: {
                duration: 0.6,
                delay: 0.8,
              },
              y: {
                ...cardTransition,
                duration: 5,
                delay: 1.2,
              },
            }}
            className="absolute left-0 top-[6%] z-30 flex items-center gap-3 rounded-2xl border border-[#0B1120]/10 bg-white px-4 py-3 shadow-[0_15px_40px_rgba(11,17,32,0.10)] sm:px-5 sm:py-4"
          >
            <div className="rounded-xl bg-[#0B1120] p-2.5 text-white">
              <Search size={20} />
            </div>

            <div>
              <p className="text-sm font-semibold">SEO</p>
              <p className="text-xs text-[#0B1120]/50">Rank higher</p>
            </div>
          </motion.div>

          {/* =================================================
              WEB DESIGN CARD
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: [-4, 8, -4],
            }}
            transition={{
              opacity: {
                duration: 0.6,
                delay: 1,
              },
              x: {
                duration: 0.6,
                delay: 1,
              },
              y: {
                ...cardTransition,
                duration: 6,
                delay: 1.3,
              },
            }}
            className="absolute right-0 top-[3%] z-30 flex items-center gap-3 rounded-2xl border border-[#0B1120]/10 bg-white px-4 py-3 shadow-[0_15px_40px_rgba(11,17,32,0.10)] sm:px-5 sm:py-4"
          >
            <div className="rounded-xl bg-[#0B1120]/[0.06] p-2.5">
              <Monitor size={20} />
            </div>

            <div>
              <p className="text-sm font-semibold">Web Design</p>
              <p className="text-xs text-[#0B1120]/50">
                Modern & responsive
              </p>
            </div>
          </motion.div>

          {/* =================================================
              SOCIAL MEDIA CARD
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, -7, 0],
            }}
            transition={{
              opacity: {
                duration: 0.6,
                delay: 1.15,
              },
              x: {
                duration: 0.6,
                delay: 1.15,
              },
              y: {
                ...cardTransition,
                duration: 5.5,
                delay: 1.4,
              },
            }}
            className="absolute bottom-[13%] left-0 z-30 flex items-center gap-3 rounded-2xl border border-[#0B1120]/10 bg-white px-4 py-3 shadow-[0_15px_40px_rgba(11,17,32,0.10)] sm:px-5 sm:py-4"
          >
            <div className="rounded-xl bg-[#0B1120]/[0.06] p-2.5">
              <Share2 size={20} />
            </div>

            <div>
              <p className="text-sm font-semibold">Social Media</p>
              <p className="text-xs text-[#0B1120]/50">
                Grow your brand
              </p>
            </div>
          </motion.div>

          {/* =================================================
              PHONE
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 40,
              rotate: 4,
            }}
            animate={{
              opacity: 1,
              y: [0, -10, 0],
              rotate: [0, 1, 0],
            }}
            transition={{
              opacity: {
                duration: 0.7,
                delay: 1,
              },
              y: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2,
              },
              rotate: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2,
              },
            }}
            className="absolute bottom-[5%] right-[1%] z-40"
          >
            <div className="relative h-[260px] w-[132px] rounded-[25px] border-[6px] border-[#0B1120] bg-white p-2 shadow-2xl sm:h-[295px] sm:w-[148px]">

              {/* Speaker */}
              <div className="absolute left-1/2 top-2 z-10 h-4 w-11 -translate-x-1/2 rounded-full bg-[#0B1120]" />

              <div className="mt-7 rounded-xl bg-[#0B1120]/[0.04] p-3">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="h-2 w-12 rounded bg-[#0B1120]" />
                    <div className="mt-1.5 h-1.5 w-16 rounded bg-[#0B1120]/10" />
                  </div>

                  <BarChart3 size={14} />
                </div>

                <div className="flex h-28 items-end gap-1.5">
                  {[35, 48, 42, 64, 57, 78].map(
                    (height, index) => (
                      <motion.div
                        key={index}
                        initial={{
                          height: 0,
                        }}
                        animate={{
                          height: `${height}%`,
                        }}
                        transition={{
                          duration: 0.7,
                          delay: 1.3 + index * 0.08,
                          ease: "easeOut",
                        }}
                        className={`w-full rounded-t ${
                          index === 5
                            ? "bg-[#0B1120]"
                            : "bg-[#0B1120]/15"
                        }`}
                      />
                    )
                  )}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="h-2 w-full rounded bg-[#0B1120]/10" />
                <div className="h-2 w-4/5 rounded bg-[#0B1120]/10" />
                <div className="h-2 w-3/5 rounded bg-[#0B1120]/10" />
              </div>

              <div className="absolute bottom-1.5 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-[#0B1120]/20" />
            </div>
          </motion.div>

          {/* =================================================
              PLANT
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              rotate: [-1, 2, -1],
            }}
            transition={{
              opacity: {
                duration: 0.7,
                delay: 1.2,
              },
              rotate: {
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              },
            }}
            className="absolute bottom-[5%] right-[20%] z-10 sm:right-[23%]"
          >
            <div className="relative h-[120px] w-[100px]">

              <motion.div
                animate={{
                  rotate: [-2, 2, -2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0"
              >
                <Leaf
                  className="absolute left-2 top-1 -rotate-[38deg] fill-[#0B1120] text-[#0B1120]"
                  size={62}
                  strokeWidth={1.3}
                />

                <Leaf
                  className="absolute right-0 top-0 rotate-[35deg] fill-[#0B1120] text-[#0B1120]"
                  size={60}
                  strokeWidth={1.3}
                />

                <Leaf
                  className="absolute left-8 top-9 -rotate-[8deg] fill-[#0B1120]/80 text-[#0B1120]"
                  size={54}
                  strokeWidth={1.3}
                />

                <Leaf
                  className="absolute bottom-1 left-1 rotate-[55deg] fill-[#0B1120]/70 text-[#0B1120]"
                  size={45}
                  strokeWidth={1.3}
                />
              </motion.div>

              {/* Pot */}
              <div className="absolute bottom-0 left-1/2 h-11 w-20 -translate-x-1/2 rounded-b-2xl bg-[#0B1120]" />

              <div className="absolute bottom-9 left-1/2 h-3 w-24 -translate-x-1/2 rounded-full bg-[#0B1120]" />
            </div>
          </motion.div>

          {/* Spark */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-[3%] top-[42%] z-40"
          >
            <div className="rounded-xl bg-[#0B1120] p-2.5 text-white shadow-lg">
              <Sparkles size={16} />
            </div>
          </motion.div>

          {/* Small phone icon */}
          <motion.div
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-[34%] right-[39%] z-50 hidden rounded-full bg-white p-2 shadow-lg sm:block"
          >
            <Smartphone size={15} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}