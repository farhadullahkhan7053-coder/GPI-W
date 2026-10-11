"use client";

import { useState } from "react";
import { X, Eye, ZoomIn } from "lucide-react";

export default function FlyerLightbox({ mode = "button", children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {mode === "image" ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="relative group w-full overflow-hidden rounded-2xl shadow-soft border border-slate-200 bg-white p-2 animate-slide-in-right text-left block"
        >
          <div className="relative overflow-hidden rounded-xl bg-slate-50">
            <img 
              src="/uploads/admission_advertisement.jpg" 
              alt="Admission Advertisement Flyer" 
              className="w-full object-contain max-h-[450px] transition-transform duration-700 group-hover:scale-[1.02]" 
            />
            {/* Hover visual cue */}
            <div className="absolute inset-0 bg-brand-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-white/90 p-3.5 rounded-full text-brand-950 scale-75 group-hover:scale-100 transition-transform duration-300 shadow-md flex items-center gap-1.5 font-bold text-xs">
                <ZoomIn size={18} /> Zoom Flyer
              </div>
            </div>
          </div>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-brand-200 bg-white px-6 py-3.5 font-bold text-brand-800 transition-all duration-300 hover:bg-brand-50 hover:border-brand-350 hover:scale-105 active:scale-95 text-sm"
        >
          <Eye size={18} /> View Advertisement Flyer
        </button>
      )}

      {/* Lightbox Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[120] grid place-items-center bg-brand-950/95 p-4 backdrop-blur-md transition-opacity duration-300 animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          {/* Close button with notch/safe area protection */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-6 top-8 sm:top-6 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-all active:scale-95 border border-white/10 shadow-lg"
            aria-label="Close flyer preview"
          >
            <X size={22} />
          </button>

          {/* Flyer container */}
          <div 
            className="relative max-h-[88vh] max-w-[92vw] overflow-hidden rounded-2xl bg-white shadow-2xl border border-white/10 animate-[zoomIn_0.3s_cubic-bezier(0.34,1.56,0.64,1)_forwards]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-1 sm:p-2 bg-slate-50 flex justify-center items-center">
              <img 
                src="/uploads/admission_advertisement.jpg" 
                alt="Admission Open Flyer" 
                className="max-h-[76vh] sm:max-h-[80vh] w-auto object-contain rounded-lg" 
              />
            </div>
            
            {/* Action Bar */}
            <div className="bg-brand-900 border-t border-brand-850 p-4 text-white flex flex-wrap justify-between items-center gap-3">
              <div>
                <h4 className="font-extrabold text-sm sm:text-base leading-tight text-white">Official Admission Flyer</h4>
                <p className="text-[10px] sm:text-xs text-gold font-bold uppercase tracking-wider mt-0.5">Government Technical And Vocational College</p>
              </div>
              <a
                href="/uploads/admission_advertisement.jpg"
                download
                className="rounded-xl bg-gold hover:bg-yellow-500 text-brand-950 font-black text-xs px-4 py-2.5 shadow transition-all hover:scale-105 active:scale-95"
              >
                Download Flyer File
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
