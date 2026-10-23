"use client";

import { useEffect } from "react";
import Header from "./components/header";
import BrandLogos from "./components/brand-logos";
import About from "./components/about";
import Counters from "./components/counters";
import Services from "./components/services";
import HorizontalTimeline from "./components/timeline";
import Portfolio from "./components/portfolio";
import Testimonials from "./components/testimonials";
import FAQ from "./components/faq";
import Contact from "./components/contact";

export default function Home() {
  useEffect(() => {
    // Seed initial MongoDB database data if empty
    fetch("/api/seed").catch((err) => console.log("Seed check completed", err));
  }, []);

  return (
    <div className="scroll-smooth w-full flex flex-col items-center min-h-screen text-[#0B1120] bg-white">
      <Header />
         <Counters />
      <About />
      <hr className="h-[2px] w-full max-w-6xl mx-auto rounded-full border-0 bg-[#0B1120]/10" />
      <Services />
      
      <HorizontalTimeline />
      <hr className="h-[2px] w-full max-w-6xl mx-auto rounded-full border-0 bg-[#0B1120]/10" />
      <Portfolio />
      
       <BrandLogos />
     
      <FAQ />
      <Testimonials />
      <Contact />
    </div>
  );
}
