"use client";

import Link from "next/link";
import Contact from "@/app/components/contact";
import { motion } from "framer-motion";
import {
  MessageSquare,
  ArrowRight,
  Home,
  Layers,
  FolderKanban,
  BookOpen,
  MapPin,
  Clock,
  ShieldCheck,
  Navigation,
  Phone,
  ExternalLink,
} from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-[#0B1120]">
      {/* Contact Hero Header with Dark Banner Overlay */}
      <section className="relative bg-[#0B1120] py-16 sm:py-24 text-white overflow-hidden border-b border-gray-800">
        {/* Background Image Banner */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920&auto=format&fit=crop"
            alt="BrandVaani Contact Banner"
            className="h-full w-full object-cover object-center opacity-20 filter grayscale"
          />
          <div className="absolute inset-0 bg-[#0B1120]/80" />
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Simple Monochromatic Non-Colored Badge */}
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white/90 border border-white/15 mb-4 shadow-sm">
              <MessageSquare size={13} className="text-white" /> Contact BrandVaani
            </span>

            {/* Title */}
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white leading-tight max-w-4xl mx-auto">
              Let's Start a Conversation
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-lg text-white/70 leading-relaxed">
              Ready to scale your business with smart digital marketing, high-converting web apps, or dominating local SEO? Reach out to our team of experts.
            </p>

            {/* Monochromatic Features - No Loud Rainbow Colors */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-white/75 font-medium border-t border-white/10 pt-6">
              <div className="flex items-center gap-2">
                <Clock size={15} className="text-white/80 shrink-0" />
                <span>Response Time &lt; 24 Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-white/80 shrink-0" />
                <span>Dwarka, New Delhi, India</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-white/80 shrink-0" />
                <span>Free Strategy Consultation</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Interactive Contact Component */}
      <Contact />

      {/* Quick Navigation Below Form */}
      <section className="bg-gray-50 border-t border-gray-200 py-12 sm:py-16 px-4 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Navigation & Exploration
            </span>
            <h2 className="text-xl sm:text-2xl font-bold mt-1.5 text-[#0B1120]">
              Where would you like to go next?
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Explore our services, review live case studies, or read our growth blogs while we process your message.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/"
              className="group flex flex-col justify-between rounded-2xl bg-white p-5 sm:p-6 border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#0B1120] transition-all duration-300"
            >
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-[#0B1120] group-hover:bg-[#0B1120] group-hover:text-white transition-colors mb-3">
                  <Home size={20} />
                </div>
                <h3 className="font-bold text-base sm:text-lg text-[#0B1120] group-hover:text-blue-600 transition-colors">
                  Home Page
                </h3>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                  Return to the main homepage to see our full agency overview & features.
                </p>
              </div>
              <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-[#0B1120] group-hover:translate-x-1 transition-transform">
                Go to Home <ArrowRight size={14} />
              </div>
            </Link>

            <Link
              href="/#services"
              className="group flex flex-col justify-between rounded-2xl bg-white p-5 sm:p-6 border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#0B1120] transition-all duration-300"
            >
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-[#0B1120] group-hover:bg-[#0B1120] group-hover:text-white transition-colors mb-3">
                  <Layers size={20} />
                </div>
                <h3 className="font-bold text-base sm:text-lg text-[#0B1120] group-hover:text-blue-600 transition-colors">
                  Our Services
                </h3>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                  Explore SEO, Google Ads, Web Development, and Local GMB packages.
                </p>
              </div>
              <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-[#0B1120] group-hover:translate-x-1 transition-transform">
                Browse Services <ArrowRight size={14} />
              </div>
            </Link>

            <Link
              href="/#portfolio"
              className="group flex flex-col justify-between rounded-2xl bg-white p-5 sm:p-6 border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#0B1120] transition-all duration-300"
            >
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-[#0B1120] group-hover:bg-[#0B1120] group-hover:text-white transition-colors mb-3">
                  <FolderKanban size={20} />
                </div>
                <h3 className="font-bold text-base sm:text-lg text-[#0B1120] group-hover:text-blue-600 transition-colors">
                  View Portfolio
                </h3>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                  Inspect client success stories, live web apps, and marketing case studies.
                </p>
              </div>
              <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-[#0B1120] group-hover:translate-x-1 transition-transform">
                See Portfolio <ArrowRight size={14} />
              </div>
            </Link>

            <Link
              href="/blogs"
              className="group flex flex-col justify-between rounded-2xl bg-white p-5 sm:p-6 border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#0B1120] transition-all duration-300"
            >
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-[#0B1120] group-hover:bg-[#0B1120] group-hover:text-white transition-colors mb-3">
                  <BookOpen size={20} />
                </div>
                <h3 className="font-bold text-base sm:text-lg text-[#0B1120] group-hover:text-blue-600 transition-colors">
                  Insights & Blogs
                </h3>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                  Read free guides and expert tips on local SEO ranking & digital growth.
                </p>
              </div>
              <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-[#0B1120] group-hover:translate-x-1 transition-transform">
                Read Articles <ArrowRight size={14} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Google Maps Navigation Section - Fully Responsive */}
      <section className="bg-white py-12 sm:py-16 px-4 sm:px-8 lg:px-12 border-t border-gray-100">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#0B1120]/15 bg-[#0B1120]/[0.03] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0B1120] mb-3">
              <MapPin size={14} className="text-[#0B1120]" /> Agency Location
            </span>
            <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-[#0B1120]">
              Find Us On Google Maps
            </h2>
            <p className="text-xs sm:text-sm text-[#0B1120]/65 mt-2">
              Visit our headquarters in Dwarka, New Delhi or navigate directly using live GPS directions below.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-gray-200/80 shadow-lg bg-gray-50">
            {/* Embedded Google Map */}
            <div className="relative w-full h-[280px] sm:h-[380px] md:h-[420px]">
              <iframe
                title="BrandVaani Google Maps Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14014.593457193345!2d77.0428849!3d28.5806651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1a9c31e4ca3d%3A0x6b485e9e030a581d!2sDwarka%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale hover:grayscale-0 opacity-90 hover:opacity-100 transition-all duration-700 ease-in-out cursor-pointer"
              />
            </div>

            {/* Map Action Banner */}
            <div className="bg-[#0B1120] text-white p-5 sm:p-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5 sm:gap-6">
              <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
                  <Navigation size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-white">BrandVaani Headquarters</h3>
                  <p className="text-xs text-white/70 mt-0.5 leading-relaxed">
                    Dwarka, New Delhi, India • Open Mon-Sat (9:00 AM - 7:00 PM IST)
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                <a
                  href="https://maps.google.com/?q=Dwarka,+New+Delhi,+India"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4.5 py-3 text-xs font-bold text-[#0B1120] shadow-md transition hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                >
                  <Navigation size={14} className="text-[#0B1120]" />
                  <span>Google Maps Directions</span>
                  <ExternalLink size={13} />
                </a>

                <a
                  href="tel:+919919602425"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4.5 py-3 text-xs font-bold text-white transition hover:bg-white/20 cursor-pointer whitespace-nowrap"
                >
                  <Phone size={14} />
                  <span>+91 9919602425</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
}
