"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import FallbackImage from "@/components/FallbackImage";

export default function CourseCard({ course, style }) {
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    const angleX = ((yc - y) / yc) * 7;
    const angleY = ((x - xc) / xc) * 7;

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

  return (
    <article 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...style, ...tiltStyle, transformStyle: "preserve-3d" }} 
      className="group overflow-hidden rounded-2xl bg-white shadow-soft border border-slate-100/80 transition-all duration-300 hover:shadow-xl hover:border-gold/20 flex flex-col h-full preserve-3d animate-fade-in-up"
    >
      {/* Card Image Wrapper */}
      <div className="relative h-52 bg-brand-100 overflow-hidden shrink-0" style={{ transform: "translateZ(10px)" }}>
        <FallbackImage 
          src={course.image} 
          alt={course.title} 
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Card Content Area */}
      <div className="p-6 flex flex-col flex-1" style={{ transform: "translateZ(20px)" }}>
        <div className="mb-3.5 flex flex-wrap items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-brand-700">
          <span className="flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 ring-1 ring-brand-100/50">
            <Clock size={12} /> {course.duration.split(" (")[0]}
          </span>
          {course.eligibility && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600 font-bold">
              {course.eligibility.split(" or ")[0]}
            </span>
          )}
        </div>
        
        <h3 className="text-lg font-black text-brand-900 leading-snug group-hover:text-brand-700 transition-colors duration-300 flex-1" style={{ transform: "translateZ(30px)" }}>
          {course.title}
        </h3>
        
        <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-slate-550 font-medium">
          {course.short_description}
        </p>
        
        <div className="mt-6 pt-4 border-t border-slate-50 shrink-0" style={{ transform: "translateZ(25px)" }}>
          <Link 
            href={`/courses/${course.slug}`} 
            className="inline-flex items-center gap-2 font-bold text-brand-700 hover:text-brand-900 group/link text-xs transition-all"
          >
            View Details 
            <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
