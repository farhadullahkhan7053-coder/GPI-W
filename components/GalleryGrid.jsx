"use client";

import { useMemo, useState } from "react";
import { X, Eye } from "lucide-react";
import FallbackImage from "@/components/FallbackImage";

export default function GalleryGrid({ images }) {
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState(null);
  
  const categories = useMemo(() => ["All", ...Array.from(new Set(images.map((i) => i.category)))], [images]);
  const filtered = category === "All" ? images : images.filter((i) => i.category === category);
  
  return (
    <>
      {/* Category Pills */}
      <div className="mb-10 flex flex-wrap gap-2.5 animate-fade-in-down">
        {categories.map((item) => (
          <button 
            key={item} 
            onClick={() => setCategory(item)} 
            className={`rounded-full px-5 py-2.5 text-sm font-extrabold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              category === item 
                ? "bg-brand-900 text-white shadow-lg shadow-brand-900/10" 
                : "bg-white text-brand-800 border border-brand-100 hover:bg-brand-50"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div key={category} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((image) => (
          <button 
            key={image.id} 
            onClick={() => setActive(image)} 
            className="group relative overflow-hidden rounded-2xl bg-white text-left shadow-soft border border-slate-100 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl animate-fade-in"
          >
            <div className="relative h-64 w-full overflow-hidden bg-slate-100">
              <FallbackImage 
                src={image.image} 
                alt={image.title} 
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
              />
              {/* Eye overlay effect on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/90 p-3.5 rounded-full text-brand-950 scale-75 group-hover:scale-100 transition-transform duration-500 shadow-md">
                  <Eye size={20} className="stroke-[2.5]" />
                </div>
              </div>
            </div>
            
            <div className="p-5 border-t border-slate-50">
              <p className="font-extrabold text-brand-950 text-base leading-snug group-hover:text-brand-700 transition-colors">
                {image.title}
              </p>
              <p className="text-xs text-slate-400 mt-1.5 font-bold uppercase tracking-wider">
                {image.category}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Empty State */}
      {!filtered.length && (
        <p className="rounded-2xl bg-white p-12 text-center text-slate-500 border border-slate-100 font-medium shadow-soft animate-fade-in">
          No gallery images found.
        </p>
      )}

      {/* Lightbox Modal */}
      {active && (
        <div 
          className="fixed inset-0 z-[70] grid place-items-center bg-brand-950/95 p-4 backdrop-blur-sm transition-opacity duration-300 animate-fade-in" 
          onClick={() => setActive(null)}
        >
          <button 
            aria-label="Close preview" 
            className="absolute right-5 top-5 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 transition-all active:scale-95 border border-white/10"
            onClick={() => setActive(null)}
          >
            <X size={24} />
          </button>
          
          <div 
            className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-2xl bg-black shadow-2xl animate-[zoomIn_0.3s_cubic-bezier(0.34,1.56,0.64,1)_forwards]"
            onClick={(e) => e.stopPropagation()}
          >
            <FallbackImage 
              src={active.image} 
              alt={active.title} 
              className="max-h-[80vh] w-full object-contain" 
            />
            
            {/* Caption bar */}
            <div className="bg-brand-950/90 border-t border-white/5 p-5 text-white">
              <h4 className="font-extrabold text-lg leading-tight">{active.title}</h4>
              <p className="text-xs text-gold font-bold uppercase tracking-wider mt-1">{active.category}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
