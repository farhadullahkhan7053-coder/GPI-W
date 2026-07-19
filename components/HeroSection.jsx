"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Phone, CheckCircle2 } from "lucide-react";

export default function HeroSection({ settings }) {
  const handleApplyClick = () => {
    window.dispatchEvent(new Event("open-admission-modal"));
  };

  return (
    <section className="relative isolate overflow-hidden bg-brand-900 text-white min-h-[650px] flex items-center">
      {/* Animated zoom background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,22,46,0.96),rgba(2,22,46,0.78))] bg-cover bg-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105 animate-[zoomOut_8s_ease-out_forwards]"
          style={{ backgroundImage: "url('/uploads/entrance.jpg')" }}
        />
      </div>
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-y-0 right-0 -z-10 w-1/2 bg-gradient-to-l from-brand-800/10 to-transparent pointer-events-none" />

      <div className="container grid content-center gap-12 py-20 lg:grid-cols-[1.2fr_.8fr] w-full">
        <div className="flex flex-col justify-center space-y-6">
          <div className="animate-fade-in-down">
            <p className="inline-flex rounded-full bg-gold/90 backdrop-blur-sm px-4 py-1.5 text-xs font-black uppercase tracking-widest text-brand-950 ring-1 ring-gold/30">
              {settings.short_name}
            </p>
          </div>
          
          <h1 className="max-w-4xl text-4xl font-black leading-[1.15] md:text-5xl text-white tracking-tight animate-slide-in-left">
            {settings.institute_name}
          </h1>
          
          <p className="max-w-2xl text-base md:text-lg leading-relaxed text-slate-350 font-medium animate-fade-in-up [animation-delay:0.3s]">
            {settings.tagline}. Build your technical skills, gain certified accreditation, and kickstart a professional career with confidence.
          </p>
          
          {/* Action Button Hierarchy */}
          <div className="flex flex-wrap gap-4 pt-4 animate-fade-in-up [animation-delay:0.5s]">
            
            {/* Primary Action Button */}
            <button 
              onClick={handleApplyClick}
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 rounded-lg bg-gold hover:bg-yellow-500 px-7 py-4 font-black text-brand-950 shadow-lg shadow-gold/20 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Apply Online Now 
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>

            {/* Secondary Action: Ghost Buttons */}
            <Link 
              href="/courses" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-lg border border-white/60 bg-transparent hover:border-white hover:bg-white hover:text-brand-900 px-6 py-4 font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <BookOpen size={18} /> Explore Courses
            </Link>
            
            <Link 
              href="/contact" 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-lg border border-white/30 bg-white/5 backdrop-blur-sm px-6 py-4 font-bold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:scale-105 active:scale-95"
            >
              <Phone size={18} /> Contact Us
            </Link>
          </div>
        </div>
        
        {/* Right side glassmorphic stats cards (with subtle tilt styling attributes) */}
        <div className="hidden self-center lg:block animate-slide-in-right [animation-delay:0.2s]">
          <div className="relative p-8 rounded-3xl border border-white/10 bg-brand-950/20 backdrop-blur-md shadow-2xl">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-gold/20 rounded-full blur-xl animate-pulse" />
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-brand-600/10 rounded-full blur-2xl animate-pulse" />
            
            <h3 className="text-gold font-bold uppercase tracking-wider text-xs mb-6">Key Highlights</h3>
            
            <div className="grid grid-cols-2 gap-5 relative z-10">
              {[
                { title: "Accredited Programs", desc: "Aligned with NAVTTC" },
                { title: "Practical Training", desc: "Equipped labs & workshops" },
                { title: "Women Empowerment", desc: "Dignity and independence" },
                { title: "Career Placement", desc: "100% Job readiness skills" }
              ].map((item, idx) => (
                <div 
                  key={item.title} 
                  className="group rounded-2xl bg-white/[0.04] border border-white/5 p-5 text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-white hover:text-brand-950 hover:border-gold/30"
                  style={{ animationDelay: `${(idx + 1) * 0.1}s` }}
                >
                  <p className="font-extrabold text-white group-hover:text-brand-900 transition-colors text-sm">{item.title}</p>
                  <p className="text-[10px] text-slate-450 group-hover:text-slate-500 mt-1.5 font-bold">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
