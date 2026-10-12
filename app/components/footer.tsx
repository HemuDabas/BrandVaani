"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MapPin, MailIcon, ChevronRight } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import VisitorCounter from "./visitor-counter";

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on all admin and shield portal pages
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/brandvaani/shield")) {
    return null;
  }

  return (
    <footer className="w-full bg-white text-[#0B1120]">
      {/* Top Border */}
      <div className="px-6 sm:px-8 lg:px-12">
        <hr className="h-[2px] w-full rounded-full border-0 bg-[#0B1120]" />
      </div>

      {/* Main Footer */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:px-8">
        {/* Brand */}
        <div className="flex flex-col gap-5">
          {/* Logo */}
          <Link href="/" className="flex w-fit items-center gap-2">
            <div className="relative flex h-9 w-9 items-center justify-center">
              <div className="absolute h-7 w-7 rotate-45 rounded-[5px] bg-[#0B1120]" />
              <div className="absolute h-4 w-4 rotate-45 rounded-[3px] bg-white" />
            </div>

            <div className="leading-none">
              <div className="text-[21px] font-bold tracking-tight text-[#0B1120]">
                Brand<span className="text-[#0B1120]">Vaani</span>
              </div>

              <div className="mt-1 text-[9px] font-medium tracking-wide text-gray-500">
                GROW YOUR BUSINESS ONLINE
              </div>
            </div>
          </Link>

          {/* Description */}
          <p className="max-w-sm text-sm leading-6 text-gray-600">
            BrandVaani is a digital marketing agency that helps businesses
            grow online. We provide a wide range of services including SEO,
            social media marketing, Google Ads, content marketing, email
            marketing, and web design & development.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <Link
              href="#"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-600 transition-all duration-200 hover:border-[#0B1120] hover:bg-[#0B1120] hover:text-white"
            >
              <FaFacebook />
            </Link>

            <Link
              href="#"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-600 transition-all duration-200 hover:border-[#0B1120] hover:bg-[#0B1120] hover:text-white"
            >
              <FaInstagram />
            </Link>

            <Link
              href="#"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-600 transition-all duration-200 hover:border-[#0B1120] hover:bg-[#0B1120] hover:text-white"
            >
              <FaLinkedin />
            </Link>

            <Link
              href="#"
              aria-label="Twitter"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-600 transition-all duration-200 hover:border-[#0B1120] hover:bg-[#0B1120] hover:text-white"
            >
              <FaTwitter />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col">
          <div className="flex flex-col gap-3">
            <h2 className="mb-2 text-xl font-bold tracking-tight text-[#0B1120]">
              Quick Links
            </h2>

            <a
              href="/"
              className="group flex items-center gap-2 text-sm text-gray-600 transition-colors duration-200 hover:text-[#0B1120]"
            >
              <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              <span>Home</span>
            </a>

            <a
              href="#about"
              className="group flex items-center gap-2 text-sm text-gray-600 transition-colors duration-200 hover:text-[#0B1120]"
            >
              <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              <span>About Us</span>
            </a>

            <a
              href="#portfolio"
              className="group flex items-center gap-2 text-sm text-gray-600 transition-colors duration-200 hover:text-[#0B1120]"
            >
              <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              <span>Portfolio</span>
            </a>

            <a
              href="#services"
              className="group flex items-center gap-2 text-sm text-gray-600 transition-colors duration-200 hover:text-[#0B1120]"
            >
              <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              <span>Services</span>
            </a>

            <a
              href="#contact"
              className="group flex items-center gap-2 text-sm text-gray-600 transition-colors duration-200 hover:text-[#0B1120]"
            >
              <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              <span>Contact Us</span>
            </a>
          </div>
        </div>

        {/* Services */}
        <div className="flex flex-col">
          <div className="flex flex-col gap-3">
            <h2 className="mb-2 text-xl font-bold tracking-tight text-[#0B1120]">
              Services
            </h2>

            <a
              href="#services"
              className="group flex items-center gap-2 text-sm text-gray-600 transition-colors duration-200 hover:text-[#0B1120]"
            >
              <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              <span>Web Development</span>
            </a>

            <a
              href="#services"
              className="group flex items-center gap-2 text-sm text-gray-600 transition-colors duration-200 hover:text-[#0B1120]"
            >
              <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              <span>SEO Optimization</span>
            </a>

            <a
              href="#services"
              className="group flex items-center gap-2 text-sm text-gray-600 transition-colors duration-200 hover:text-[#0B1120]"
            >
              <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              <span>Social Media Marketing</span>
            </a>

            <a
              href="#services"
              className="group flex items-center gap-2 text-sm text-gray-600 transition-colors duration-200 hover:text-[#0B1120]"
            >
              <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              <span>Content Marketing</span>
            </a>

            <a
              href="#services"
              className="group flex items-center gap-2 text-sm text-gray-600 transition-colors duration-200 hover:text-[#0B1120]"
            >
              <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
              <span>Google Ads</span>
            </a>
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-col">
          <div className="flex flex-col gap-3">
            <h2 className="mb-2 text-xl font-bold tracking-tight text-[#0B1120]">
              Get in Touch
            </h2>

            <a
              href="mailto:BrandVaani@gmail.com"
              className="group flex items-center gap-3 text-sm text-gray-600 transition-colors duration-200 hover:text-[#0B1120]"
            >
              <MailIcon className="h-4 w-4 shrink-0 text-[#0B1120]" />
              <span>BrandVaani@gmail.com</span>
            </a>

            <a
              href="tel:+919919602425"
              className="group flex items-center gap-3 text-sm text-gray-600 transition-colors duration-200 hover:text-[#0B1120]"
            >
              <Phone className="h-4 w-4 shrink-0 text-[#0B1120]" />
              <span>+91 9919602425</span>
            </a>

            <div className="flex items-start gap-3 text-sm text-gray-600">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#0B1120]" />
              <span>Dwarka, New Delhi, India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visitor Counter Section */}
      <div className="border-t border-gray-100 bg-gray-50/60 py-4 sm:py-5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <VisitorCounter />
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-sm text-gray-500 sm:flex-row lg:px-8">
          <p>
            © {new Date().getFullYear()} BrandVaani. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <a href="#" className="transition-colors hover:text-[#0B1120]">
              Privacy Policy
            </a>
            <span className="h-4 w-px bg-gray-300" />
            <a href="#" className="transition-colors hover:text-[#0B1120]">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}