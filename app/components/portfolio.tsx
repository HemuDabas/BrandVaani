"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

interface ProjectItem {
  _id?: string;
  title: string;
  category: string;
  description: string;
  image: string;
  size: "large" | "small";
  link?: string;
}

const defaultProjects: ProjectItem[] = [
  {
    title: "Brand Growth Strategy",
    category: "Digital Marketing",
    description:
      "A complete digital growth strategy focused on improving visibility, engagement and customer reach.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    size: "large",
    link: "https://brandvaani.com",
  },
  {
    title: "Modern Business Website",
    category: "Web Design",
    description:
      "A clean, responsive website designed to make the brand easier to understand and trust.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    size: "small",
    link: "https://brandvaani.com",
  },
  {
    title: "Social Media Presence",
    category: "Social Media",
    description:
      "A consistent social media system built around the brand's voice and audience.",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop",
    size: "small",
    link: "https://brandvaani.com",
  },
];

export default function Portfolio() {
  const [projectsList, setProjectsList] =
    useState<ProjectItem[]>(defaultProjects);
  const [dbCategories, setDbCategories] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    fetchProjects();
    fetchCategories();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data.success && data.projects && data.projects.length > 0) {
        setProjectsList(data.projects);
      }
    } catch (err) {
      console.error("Failed to fetch portfolio projects:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (data.success && data.categories) {
        const portCatNames = data.categories
          .filter((c: any) => c.type === "portfolio" || !c.type)
          .map((c: any) => c.name);
        setDbCategories(portCatNames);
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const categories = [
    "All",
    ...Array.from(
      new Set([
        ...projectsList.map((p) => p.category),
        ...dbCategories,
      ])
    ),
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projectsList
      : projectsList.filter((project) => project.category === activeFilter);

  return (
    <section
      id="portfolio"
      className="bg-white px-5 py-20 text-[#0B1120] sm:px-8 lg:px-12 md:py-24 py-10 w-full"
    >
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
              Our Work
            </p>

            <h2 className="text-4xl font-medium leading-[1.06] tracking-[-0.045em] sm:text-5xl lg:text-[56px]">
              Work that speaks
              <br className="hidden sm:block" />
              for itself.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-md text-base leading-7 text-[#0B1120]/55"
          >
            A selection of projects where strategy, design and digital marketing
            came together to help businesses move forward.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="mt-12 flex flex-wrap gap-2 border-b border-[#0B1120]/10 pb-4 overflow-x-auto scrollbar-none no-scrollbar">
          {categories.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-2 text-sm transition-colors cursor-pointer ${
                activeFilter === filter
                  ? "bg-[#0B1120] text-white font-semibold"
                  : "text-[#0B1120]/55 hover:bg-[#0B1120]/5 hover:text-[#0B1120]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-200 bg-gray-50/60 p-12 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#0B1120] shadow-md mb-4">
              <Sparkles size={28} className="text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-[#0B1120]">
              More {activeFilter} Projects Coming Soon
            </h3>
            <p className="mt-2 text-sm text-gray-500 max-w-md leading-relaxed">
              We are currently curating and uploading live case studies for the {activeFilter} category. In the meantime, feel free to contact our team for live client demos!
            </p>
            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0B1120] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-black cursor-pointer"
            >
              Inquire About {activeFilter} Projects
              <ArrowUpRight size={16} />
            </a>
          </motion.div>
        ) : (
          <motion.div layout className="mt-10 grid gap-10 md:grid-cols-2">
            {filteredProjects.map((project, index) => (
              <motion.article
                layout
                key={project._id || project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex flex-col h-full">
                  {/* Full Width Image Header - Flush with top, no slate border or bg */}
                  <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] overflow-hidden bg-transparent">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover object-top m-0 p-0 block border-0 transition-transform duration-700 ease-out"
                    />

                    {/* Dark Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Floating Action Button */}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute right-4 top-4 sm:right-5 sm:top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#0B1120] opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:opacity-100 hover:bg-[#0B1120] hover:text-white"
                        title="View Live Project"
                      >
                        <ArrowUpRight size={18} />
                      </a>
                    )}
                  </div>

                  {/* Details Section */}
                  <div className="p-5 sm:p-8 flex flex-col justify-between grow">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
                        <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-[#0B1120] group-hover:text-blue-600 transition-colors duration-300">
                          {project.title}
                        </h3>

                        <span className="w-fit shrink-0 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white bg-[#0B1120] px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full shadow-xs">
                          {project.category}
                        </span>
                      </div>

                      {/<[a-z][\s\S]*>/i.test(project.description) ? (
                        <div
                          className="mt-3 text-xs sm:text-base leading-relaxed text-gray-600 line-clamp-2"
                          dangerouslySetInnerHTML={{
                            __html: project.description.replace(/<[^>]+>/g, " "),
                          }}
                        />
                      ) : (
                        <p className="mt-3 text-xs sm:text-base leading-relaxed text-gray-600 line-clamp-2">
                          {project.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 flex flex-col justify-between gap-5 border-t border-[#0B1120]/10 pt-8 sm:flex-row sm:items-center"
        >
          <p className="text-lg font-medium">Have a project in mind?</p>

          <a
            href="#contact"
            className="group flex w-fit items-center gap-2 text-sm font-semibold hover:underline"
          >
            Start a conversation
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
