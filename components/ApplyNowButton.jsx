"use client";

import { ArrowRight } from "lucide-react";

export default function ApplyNowButton({ 
  className = "inline-flex items-center gap-2 rounded-lg bg-brand-700 px-6 py-3.5 font-bold text-white shadow-md transition-all hover:scale-105 active:scale-95 justify-center",
  label = "Apply Online Now",
  showIcon = true
}) {
  const handleClick = (e) => {
    e.preventDefault();
    window.dispatchEvent(new Event("open-admission-modal"));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
    >
      {label} {showIcon && <ArrowRight size={18} />}
    </button>
  );
}
