"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Award, ShieldCheck, Cpu } from "lucide-react";

// 3D Parallax Tilt Card Component
function TiltCard({ course }) {
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Limits the tilt angles to a subtle, professional range (-8deg to 8deg)
    const angleX = ((yc - y) / yc) * 8; 
    const angleY = ((x - xc) / xc) * 8; 

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)"
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)"
    });
  };

  // Determine custom icon and theme color based on course type
  const isDae = course.slug.includes("dae");
  const isDit = course.slug.includes("dit");
  
  const typeBadge = isDae 
    ? { label: "DAE Associate Engineering", color: "bg-blue-50 text-blue-700 ring-blue-100", Icon: Cpu }
    : isDit 
    ? { label: "IT Diploma", color: "bg-amber-50 text-amber-700 ring-amber-100", Icon: Award }
    : { label: "Vocational CBT/RPL", color: "bg-emerald-50 text-emerald-700 ring-emerald-100", Icon: ShieldCheck };

  const IconComp = typeBadge.Icon;

  return (
    <article 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...tiltStyle, transformStyle: "preserve-3d" }}
      className="group overflow-hidden rounded-2xl bg-white shadow-soft border border-slate-100/80 transition-all duration-300 hover:shadow-xl hover:border-gold/20 flex flex-col h-full preserve-3d"
    >
      {/* Card Image Area */}
      <div className="relative h-48 bg-slate-100 overflow-hidden shrink-0" style={{ transform: "translateZ(10px)" }}>
        <img 
          src={course.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=900&auto=format&fit=crop"} 
          alt={course.title} 
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Floating Custom SVG Icon badge */}
        <div 
          style={{ transform: "translateZ(30px)" }}
          className={`absolute top-4 left-4 p-2 rounded-xl backdrop-blur-md bg-white/90 shadow-md ${isDae ? "text-brand-800" : isDit ? "text-gold" : "text-emerald-600"}`}
        >
          <IconComp size={20} className="stroke-[2.5]" />
        </div>
      </div>

      {/* Card Contents */}
      <div className="p-6 flex flex-col flex-1" style={{ transform: "translateZ(20px)" }}>
        <div className="mb-3.5 flex flex-wrap items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest">
          <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 ring-1 ${typeBadge.color}`}>
            {typeBadge.label}
          </span>
          <span className="flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 ring-1 ring-slate-100 text-slate-500 font-bold">
            <Clock size={12} /> {course.duration.split(" (")[0]}
          </span>
        </div>

        <h3 className="text-lg font-black text-brand-900 leading-snug group-hover:text-brand-700 transition-colors duration-300" style={{ transform: "translateZ(30px)" }}>
          {course.title}
        </h3>
        
        <p className="mt-3 text-xs leading-relaxed text-slate-550 font-medium line-clamp-3 flex-1">
          {course.short_description}
        </p>

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between" style={{ transform: "translateZ(25px)" }}>
          <Link 
            href={`/courses/${course.slug}`} 
            className="inline-flex items-center gap-1.5 font-extrabold text-xs text-brand-700 hover:text-brand-900 group/link transition-all"
          >
            Course Structure <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1.5" />
          </Link>
          <span className="text-[10px] font-bold text-slate-400">
            Eligibility: {course.eligibility.split(" or ")[0]}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function CoursesFilterGrid({ courses }) {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = [
    { id: "All", label: "All Programs" },
    { id: "DAE", label: "3-Year DAE" },
    { id: "DIT", label: "1-Year DIT" },
    { id: "Short", label: "Vocational CBT/RPL" }
  ];

  const filteredCourses = useMemo(() => {
    if (activeTab === "All") return courses;
    if (activeTab === "DAE") return courses.filter((c) => c.slug.includes("dae"));
    if (activeTab === "DIT") return courses.filter((c) => c.slug.includes("dit"));
    if (activeTab === "Short") return courses.filter((c) => !c.slug.includes("dae") && !c.slug.includes("dit"));
    return courses;
  }, [courses, activeTab]);

  return (
    <div className="space-y-10">
      {/* Responsive Tab Bar */}
      <div className="flex flex-wrap justify-center gap-2 border-b border-slate-100 pb-6">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative rounded-xl px-5 py-3 text-xs font-black tracking-wider uppercase transition-all duration-300 transform active:scale-95 ${
                isActive 
                  ? "bg-brand-900 text-white shadow-md shadow-brand-900/10" 
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-350"
              }`}
            >
              {tab.label}
              {isActive && (
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-8 h-1 bg-gold rounded-t-full hidden md:block" />
              )}
            </button>
          );
        })}
      </div>

      {/* Filtered grid of courses with fading animations */}
      <div key={activeTab} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
        {filteredCourses.map((course) => (
          <div key={course.id} className="h-full">
            <TiltCard course={course} />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-slate-500 font-medium">No programs found matching this category.</p>
        </div>
      )}
    </div>
  );
}
