"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

const serviceOptions = [
  "General Inquiry",
  "SEO Services",
  "Social Media Marketing",
  "Google Ads",
  "Content Marketing",
  "Email Marketing",
  "Web Design & Development",
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "General Inquiry",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields (Name, Email, Message)");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit inquiry");
      }

      setSubmitted(true);
      toast.success("Inquiry sent successfully! Check your inbox for confirmation.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "General Inquiry",
        message: "",
      });
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="w-full bg-[#f8f9fa] px-4 sm:px-8 lg:px-12 py-12 sm:py-20 lg:py-28 text-[#0B1120]"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#0B1120]/10 bg-white mb-3 shadow-sm text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#0B1120]">
            <MessageSquare size={14} className="text-[#0B1120]" /> Get In Touch
          </div>
          <h2 className="text-3xl font-medium tracking-[-0.04em] sm:text-5xl lg:text-6xl text-[#0B1120]">
            Let's build something <span className="underline underline-offset-8 decoration-2 decoration-[#0B1120]">great together</span>.
          </h2>
          <p className="mt-4 sm:mt-5 text-sm sm:text-lg leading-relaxed sm:leading-8 text-[#0B1120]/65">
            Have a project in mind, need consultation, or want to scale your digital reach? Drop us a message below and our experts will get back to you within 24 hours.
          </p>
        </motion.div>

        {/* Contact Layout */}
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-[1fr_1.3fr] items-start">
          
          {/* Left: Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between h-full rounded-3xl bg-[#0B1120] p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden"
          >
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />

            <div>
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                Contact Details
              </span>
              <h3 className="mt-3 sm:mt-4 text-2xl sm:text-3xl font-medium tracking-tight">
                Reach out directly to Team BrandVaani
              </h3>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-white/65">
                Whether you're a startup looking for your first digital footprint or an established brand aiming for higher ROI, we're here to help.
              </p>

              <div className="mt-8 sm:mt-10 space-y-5 sm:space-y-6">
                <a
                  href="mailto:BrandVaani@gmail.com"
                  className="flex items-center gap-3.5 sm:gap-4 text-sm font-medium transition hover:text-white/80 group"
                >
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white transition group-hover:bg-white group-hover:text-[#0B1120]">
                    <Mail size={18} className="sm:w-[20px] sm:h-[20px]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-xs text-white/50">Email Us</p>
                    <p className="text-sm sm:text-base text-white font-semibold break-all">BrandVaani@gmail.com</p>
                  </div>
                </a>

                <a
                  href="tel:+919919602425"
                  className="flex items-center gap-3.5 sm:gap-4 text-sm font-medium transition hover:text-white/80 group"
                >
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white transition group-hover:bg-white group-hover:text-[#0B1120]">
                    <Phone size={18} className="sm:w-[20px] sm:h-[20px]" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-white/50">Call Us Directly</p>
                    <p className="text-sm sm:text-base text-white font-semibold">+91 9919602425</p>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 sm:gap-4 text-sm font-medium group">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
                    <MapPin size={18} className="sm:w-[20px] sm:h-[20px]" />
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs text-white/50">Headquarters</p>
                    <p className="text-sm sm:text-base text-white font-semibold">Dwarka, New Delhi, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 flex items-center justify-between">
              <div className="text-[11px] sm:text-xs text-white/50">
                ⚡ Rapid response rate within 24 hours guaranteed.
              </div>
            </div>
          </motion.div>

          {/* Right: Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-10 shadow-xl"
          >
            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-6">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-bold text-[#0B1120]">Thank You!</h3>
                <p className="mt-3 text-base text-gray-600 max-w-md">
                  Your message has been sent to our team. An automated email confirmation has been sent to your email inbox.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-8 rounded-xl bg-[#0B1120] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-medium text-[#0B1120] mb-2">Send us a message</h3>
                <p className="text-sm text-gray-500 mb-6">Fill out the details below and we will get right back to you.</p>

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="your name"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-[#0B1120] placeholder-gray-400 outline-none transition focus:border-[#0B1120] focus:bg-white focus:ring-2 focus:ring-[#0B1120]/10"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your email"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-[#0B1120] placeholder-gray-400 outline-none transition focus:border-[#0B1120] focus:bg-white focus:ring-2 focus:ring-[#0B1120]/10"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="your phone number"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-[#0B1120] placeholder-gray-400 outline-none transition focus:border-[#0B1120] focus:bg-white focus:ring-2 focus:ring-[#0B1120]/10"
                    />
                  </div>

                  {/* Service Selected */}
                  <div>
                    <label htmlFor="service" className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-[#0B1120] outline-none transition focus:border-[#0B1120] focus:bg-white focus:ring-2 focus:ring-[#0B1120]/10"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                    Your Message / Requirement <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your business, website or marketing objectives..."
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-[#0B1120] placeholder-gray-400 outline-none transition focus:border-[#0B1120] focus:bg-white focus:ring-2 focus:ring-[#0B1120]/10 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-3 rounded-xl bg-[#0B1120] px-6 py-4 text-sm font-semibold text-white shadow-lg transition duration-200 hover:bg-black hover:shadow-xl disabled:opacity-70 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Submitting Inquiry...
                    </>
                  ) : (
                    <>
                      Submit Inquiry <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
