export interface ServiceData {
  _id?: string;
  serviceId: string;
  title: string;
  category: "Digital Marketing" | "Web Development" | "Others" | string;
  short: string;
  description: string;
  iconName: string;
  points: string[];
  image?: string;
  location?: string;
  keywords?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export const DEFAULT_SERVICES: ServiceData[] = [
  {
    serviceId: "seo",
    title: "SEO Services",
    category: "Digital Marketing",
    short: "Improve rankings, authority, and organic traffic.",
    description:
      "Build a stronger search presence and attract people who are actively looking for your products or services with data-driven on-page, off-page, and technical optimization.",
    iconName: "Search",
    points: [
      "Technical SEO & Core Web Vitals",
      "Strategic Keyword Targeting",
      "High-Authority Link Building",
      "Continuous Organic Growth",
    ],
    image: "https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?q=80&w=800&auto=format&fit=crop",
  },
  {
    serviceId: "social",
    title: "Social Media Marketing",
    category: "Digital Marketing",
    short: "Grow your brand, community, and social audience.",
    description:
      "Create a consistent social presence that helps your brand connect with the right audience, foster loyalty, and convert active followers into customers.",
    iconName: "Share2",
    points: [
      "Cross-Platform Social Strategy",
      "Engaging Visual & Copy Content",
      "Community Management & Growth",
      "Paid Social Amplification",
    ],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop",
  },
  {
    serviceId: "google-ads",
    title: "Google Ads",
    category: "Digital Marketing",
    short: "Generate targeted leads and sales with high-ROI PPC campaigns.",
    description:
      "Reach potential customers at the exact moment they are searching for what you offer with precision-targeted Google Search, Display, and Performance Max campaigns.",
    iconName: "MousePointerClick",
    points: [
      "Precision Keyword & Search Term Targeting",
      "High-Converting Ad Copy & Creative",
      "Negative Keyword & Bid Optimization",
      "Transparent Conversion & ROI Tracking",
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
  },
  {
    serviceId: "content",
    title: "Content Marketing",
    category: "Digital Marketing",
    short: "Content that attracts, educates, and converts.",
    description:
      "Turn useful, engaging content into a sustainable growth engine that builds domain authority, educates buyers, and supports your overall marketing funnel.",
    iconName: "FileText",
    points: [
      "Editorial Planning & Content Roadmaps",
      "SEO-Optimized Blog & Pillar Articles",
      "Lead Magnets & Case Studies",
      "Conversion-Focused Copywriting",
    ],
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop",
  },
  {
    serviceId: "email",
    title: "Email Marketing",
    category: "Digital Marketing",
    short: "Build customer relationships and maximize lifetime value.",
    description:
      "Leverage personalized email workflows and drip automations to nurture leads, re-engage customers, and drive recurring revenue.",
    iconName: "Mail",
    points: [
      "Automated Welcome & Nurture Sequences",
      "Segmentation & Personalization",
      "Promotional Campaign Execution",
      "Deliverability & Open Rate Optimization",
    ],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
  },
  {
    serviceId: "web",
    title: "Web Design & Development",
    category: "Web Development",
    short: "Fast, modern, and high-converting custom websites.",
    description:
      "Design and engineer custom, responsive websites that load lightning-fast, showcase your brand beautifully, and turn curious visitors into paying clients.",
    iconName: "Monitor",
    points: [
      "Bespoke Responsive UI/UX Design",
      "Modern Next.js & React Frameworks",
      "Lightning-Fast Performance Optimization",
      "Conversion-Optimized Sales Funnels",
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
  },
];

export function categorizeServices(services: ServiceData[]) {
  const digitalMarketing: ServiceData[] = [];
  const webDevelopment: ServiceData[] = [];
  const others: ServiceData[] = [];

  services.forEach((service) => {
    const cat = (service.category || "").toLowerCase();
    if (
      cat.includes("web") ||
      cat.includes("dev") ||
      cat.includes("ui") ||
      cat.includes("code") ||
      cat.includes("frontend")
    ) {
      webDevelopment.push(service);
    } else if (
      cat.includes("other") ||
      cat.includes("gmb") ||
      cat.includes("local") ||
      cat.includes("reputation") ||
      cat.includes("consult") ||
      cat.includes("branding")
    ) {
      others.push(service);
    } else {
      digitalMarketing.push(service);
    }
  });

  return { digitalMarketing, webDevelopment, others };
}
