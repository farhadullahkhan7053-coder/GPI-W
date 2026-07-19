"use client";

import { useState } from "react";
import { Check, ArrowRight, Star, Clock, Briefcase, Milestone } from "lucide-react";

const stories = [
  {
    id: 1,
    name: "Asma Iqbal",
    initials: "AI",
    badge: "Verified Student Success",
    course: "BS Computer Science",
    department: "AI & Digital Skills Training",
    batch: "Batch 2026",
    headline: "From AI Learner to Paid Design Work",
    highlight: "Paid Design Work",
    story: "Before joining the training, Asma had limited experience with digital layout workflows. Through hands-on, project-based training, she developed advanced digital skills. She began using AI tools for video ideation, scripts, YouTube thumbnails, and graphic design, securing regular paid work as a freelance designer.",
    stats: [
      { label: "Time Saved", value: "2-3h → 30m", icon: Clock },
      { label: "Career Status", value: "Freelance", icon: Briefcase },
      { label: "Projects", value: "35+ Done", icon: Star }
    ],
    tools: ["ChatGPT", "Gemini", "Canva AI", "Adobe Firefly"]
  },
  {
    id: 2,
    name: "Urooj Naz",
    initials: "UN",
    badge: "Verified Student Success",
    course: "University Student",
    department: "AI & Digital Skills Training",
    batch: "Batch 2026",
    headline: "AI Confidence Turned into Client Work",
    highlight: "Client Work",
    story: "Urooj joined the training unsure where to begin with generative tools. She quickly mastered prompts for digital layouts and now designs advertising banners and branding collateral for local commercial clients, including hotels and boutique fashion collections, boosting her earning potential.",
    stats: [
      { label: "Time Saved", value: "3h → 40 mins", icon: Clock },
      { label: "Career Status", value: "Client Projects", icon: Briefcase },
      { label: "Projects", value: "20+ Done", icon: Star }
    ],
    tools: ["ChatGPT", "Gemini", "Canva AI", "Microsoft Designer"]
  }
];

export default function SuccessStories() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="relative overflow-hidden bg-slate-50/50 py-20 border-b border-slate-100">
      
      {/* Background AI-inspired digital dots / abstract shapes */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.5" fill="#123C7A" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotPattern)" />
        </svg>
      </div>

      {/* Graduation cap illustration with extremely low opacity in the background */}
      <div className="absolute right-0 bottom-10 opacity-[0.02] text-brand-950 pointer-events-none select-none">
        <svg width="450" height="450" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
        </svg>
      </div>

      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 animate-fade-in">
          <p className="font-extrabold text-gold uppercase tracking-wider text-xs flex items-center justify-center gap-1.5">
            <Milestone size={14} className="stroke-[2.5]" /> Student Achievements
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-black text-brand-950 tracking-tight leading-tight Poppins">
            Student Success Stories
          </h2>
          <p className="mt-4 text-slate-500 font-medium text-sm md:text-base leading-relaxed">
            Discover how students at Government Polytechnic Institute (Women), D.I. Khan are transforming their skills into real-world success through AI & Digital Skills Training, freelancing, and innovation.
          </p>
        </div>

        {/* Centered 2-card Responsive Grid / Swipeable Carousel on Mobile */}
        <div 
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-6 pb-6 lg:grid lg:grid-cols-2 lg:max-w-4xl lg:mx-auto lg:overflow-x-visible lg:pb-0 scroll-smooth"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {stories.map((item, idx) => {
            const isHovered = hoveredCard === item.id;
            
            const renderHeadline = (headline, highlight) => {
              if (!highlight) return headline;
              const parts = headline.split(highlight);
              return (
                <>
                  {parts[0]}
                  <span className="text-gold font-black">{highlight}</span>
                  {parts[1]}
                </>
              );
            };

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ 
                  animationDelay: `${(idx + 1) * 0.15}s` 
                }}
                className={`snap-center shrink-0 w-[88vw] sm:w-[50vw] lg:w-auto rounded-3xl bg-white border border-slate-100 p-8 shadow-soft flex flex-col justify-between transition-all duration-300 transform preserve-3d ${
                  isHovered ? "-translate-y-2.5 shadow-xl border-brand-200/50 scale-[1.01]" : ""
                } ${idx === 0 ? "animate-[float_6s_ease-in-out_infinite]" : "animate-[float_6s_ease-in-out_infinite_1.5s]"}`}
              >
                <div>
                  
                  {/* Top Badge & Verified status */}
                  <div className="flex items-center justify-between gap-4 mb-6" style={{ transform: "translateZ(15px)" }}>
                    <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-slate-450">
                      <span>📍</span> D.I. Khan
                    </div>
                    
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-black text-brand-850 ring-1 ring-brand-100/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      {item.badge}
                    </div>
                  </div>

                  {/* Student Portrait/Initials Avatar Row */}
                  <div className="flex items-center gap-4 mb-6" style={{ transform: "translateZ(20px)" }}>
                    <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-brand-700 to-brand-500 border border-brand-100 flex items-center justify-center text-white font-black text-lg shadow-inner shrink-0">
                      {item.initials}
                      <span className="absolute -bottom-0.5 -right-0.5 bg-green-500 text-white rounded-full p-0.5 border border-white flex items-center justify-center shadow-sm">
                        <Check size={10} className="stroke-[3.5]" />
                      </span>
                    </div>
                    
                    <div>
                      <h4 className="font-black text-brand-950 text-base">{item.name}</h4>
                      <p className="text-[10px] text-slate-450 font-bold uppercase tracking-wider mt-0.5">{item.course}</p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-slate-50 my-5" />

                  {/* Achievement Headline */}
                  <h3 
                    className="text-lg md:text-xl font-black text-brand-950 tracking-tight leading-snug mb-5 Poppins"
                    style={{ transform: "translateZ(25px)" }}
                  >
                    {renderHeadline(item.headline, item.highlight)}
                  </h3>

                  {/* Achievement Statistics cards */}
                  <div className="grid grid-cols-3 gap-2.5 mb-6" style={{ transform: "translateZ(30px)" }}>
                    {item.stats.map((stat, sIdx) => {
                      const StatIcon = stat.icon;
                      return (
                        <div 
                          key={sIdx}
                          className="rounded-2xl bg-slate-50/60 border border-slate-100 p-3 text-center transition-all duration-300 hover:bg-brand-50/40"
                        >
                          <div className="inline-flex rounded-lg bg-brand-50 p-1.5 text-brand-850 mb-1">
                            <StatIcon size={12} className="stroke-[2.5]" />
                          </div>
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-wider">{stat.label}</p>
                          <p className="text-[10px] font-black text-brand-950 mt-1 whitespace-nowrap">{stat.value}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Story Text */}
                  <p 
                    className="text-xs leading-relaxed text-slate-550 font-medium mb-6"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    {item.story}
                  </p>
                </div>

                <div>
                  
                  {/* Tool Pill Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6" style={{ transform: "translateZ(20px)" }}>
                    {item.tools.map((tool) => (
                      <span 
                        key={tool} 
                        className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-bold text-slate-600 border border-slate-150 transition-colors hover:bg-slate-200"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Footer Bar */}
                  <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-[11px] font-extrabold" style={{ transform: "translateZ(15px)" }}>
                    <span className="text-green-600 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Verified Case
                    </span>
                    
                    <button 
                      onClick={() => window.dispatchEvent(new Event("open-admission-modal"))}
                      className="group/link inline-flex items-center gap-1 text-brand-700 hover:text-brand-900 transition-colors"
                    >
                      View Journey 
                      <ArrowRight size={12} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
