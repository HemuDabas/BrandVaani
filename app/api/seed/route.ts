import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Service from "@/lib/models/Service";
import Project from "@/lib/models/Project";
import Category from "@/lib/models/Category";
import FAQ from "@/lib/models/FAQ";

import { DEFAULT_SERVICES } from "@/lib/default-services";

const initialServices = DEFAULT_SERVICES;

const initialProjects = [
  {
    title: "Brand Growth Strategy",
    category: "Digital Marketing",
    description:
      "A complete digital growth strategy focused on improving visibility, engagement and customer reach.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    size: "large",
    link: "https://brandvaani.com",
  },
  {
    title: "Modern Business Website",
    category: "Web Design",
    description:
      "A clean, responsive website designed to make the brand easier to understand and trust.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    size: "small",
    link: "https://brandvaani.com",
  },
  {
    title: "Social Media Presence",
    category: "Social Media",
    description:
      "A consistent social media system built around the brand's voice and audience.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop",
    size: "small",
    link: "https://brandvaani.com",
  },
];

const initialCategories: Array<{
  name: string;
  type: "service" | "portfolio" | "blog";
  slug: string;
}> = [
  { name: "Digital Marketing", type: "portfolio", slug: "digital-marketing" },
  { name: "Web Design", type: "portfolio", slug: "web-design" },
  { name: "Social Media", type: "portfolio", slug: "social-media" },
  { name: "Search Marketing", type: "service", slug: "search-marketing" },
  { name: "Paid Advertising", type: "service", slug: "paid-advertising" },
  { name: "Web & UI/UX", type: "service", slug: "web-ui-ux" },
  { name: "Digital Marketing", type: "blog", slug: "digital-marketing" },
  { name: "Local SEO & GMB", type: "blog", slug: "local-seo-gmb" },
  { name: "Web Development", type: "blog", slug: "web-development" },
  { name: "E-Commerce", type: "blog", slug: "e-commerce" },
  { name: "Branding", type: "blog", slug: "branding" },
];

const initialFAQs = [
  {
    question: "How long does it take to see organic results from SEO?",
    answer:
      "Search Engine Optimization is a long-term compound growth strategy. Initial technical & keyword optimizations typically start reflecting in search rankings within 4 to 8 weeks, with substantial organic traffic growth achieved between 3 to 6 months.",
    category: "SEO",
  },
  {
    question: "Do you offer custom digital marketing strategies or fixed templates?",
    answer:
      "We build 100% custom growth strategies tailored around your business goals, target audience, and current market position. No cookie-cutter templates—every client receives a dedicated strategy.",
    category: "Strategy",
  },
  {
    question: "How do you track ROI and campaign performance?",
    answer:
      "Transparency is key. We set up comprehensive analytics tracking across Google Analytics, Meta Pixel, and custom conversion dashboards. You receive detailed weekly reports showing cost per acquisition (CPA) and exact revenue generated.",
    category: "Analytics",
  },
  {
    question: "Can BrandVaani redesign our website while preserving our current SEO rankings?",
    answer:
      "Yes! Our web development team works directly alongside our SEO specialists. We perform thorough URL mapping, 301 redirect management, and meta preservation to guarantee your hard-earned SEO authority remains intact during the launch.",
    category: "Web Development",
  },
];

export async function GET() {
  try {
    await connectToDatabase();

    // 1. Seed Services if empty
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany(initialServices);
    }

    // 2. Seed Projects if empty
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany(initialProjects);
    }

    // 3. Seed Categories (ensure all initial categories exist)
    for (const cat of initialCategories) {
      await Category.updateOne(
        { name: cat.name, type: cat.type },
        { $setOnInsert: cat },
        { upsert: true }
      );
    }

    // 4. Seed FAQs if empty
    const faqCount = await FAQ.countDocuments();
    if (faqCount === 0) {
      await FAQ.insertMany(initialFAQs);
    }

    return NextResponse.json({
      success: true,
      message: "Database BrandVaani seeded successfully",
    });
  } catch (error: any) {
    console.error("Seed Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to seed database" },
      { status: 500 }
    );
  }
}
