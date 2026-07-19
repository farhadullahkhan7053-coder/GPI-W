"use client";

import { useState } from "react";

export default function AlumniCard3D({ item, delay }) {
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    const angleX = ((yc - y) / yc) * 6; 
    const angleY = ((x - xc) / xc) * 6; 

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.01, 1.01, 1.01)`,
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
      style={{ ...tiltStyle, animationDelay: delay, transformStyle: "preserve-3d" }}
      className="rounded-2xl bg-white p-6 shadow-soft border border-slate-100 hover:border-gold/20 transition-all duration-300 hover:shadow-md animate-fade-in-up preserve-3d"
    >
      <div style={{ transform: "translateZ(20px)" }}>
        <h3 className="font-black text-brand-950 text-base">{item.full_name}</h3>
        <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase tracking-wider">{item.course} • Class of {item.passing_year} • {item.city}</p>
        
        {item.current_status && (
          <p className="mt-3 text-xs text-brand-900 font-extrabold flex items-center gap-1.5" style={{ transform: "translateZ(30px)" }}>
            <span>💼</span> {item.current_status} {item.organization ? `at ${item.organization}` : ""}
          </p>
        )}
        
        {item.success_story && (
          <p className="mt-3.5 text-xs leading-relaxed text-slate-550 font-medium italic border-l-2 border-gold/40 pl-3 py-0.5" style={{ transform: "translateZ(25px)" }}>
            "{item.success_story}"
          </p>
        )}
      </div>
    </article>
  );
}
