"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Move3d } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Announcements", href: "/announcements" },
  { label: "Admission", href: "/admission" },
  { 
    label: "Institute", 
    dropdown: [
      { label: "Facilities & 3D Lab", href: "/facilities" },
      { label: "Gallery", href: "/gallery" }
    ]
  },
  { label: "Alumni Portal", href: "/alumni" },
  { label: "Contact", href: "/contact" }
];

export default function Header({ settings }) {
  const [open, setOpen] = useState(false);
  const [instituteOpen, setInstituteOpen] = useState(false);
  const pathname = usePathname();

  const handleApplyClick = (e) => {
    e.preventDefault();
    setOpen(false);
    window.dispatchEvent(new Event("open-admission-modal"));
  };

  return (
    <header className="sticky top-0 z-50 border-b border-brand-100 bg-white/95 backdrop-blur-md transition-all duration-300" style={{ WebkitBackdropFilter: "blur(12px)" }}>
      <div className="container flex items-center justify-between gap-4 py-3.5">
        
        {/* Brand Logo & Name */}
        <Link href="/" className="flex min-w-0 items-center gap-3 group">
          <img src="/logo.png" alt="Logo" className="h-11 w-11 shrink-0 object-contain rounded transition-transform duration-500 group-hover:rotate-[360deg]" />
          <div className="min-w-0">
            <p className="truncate text-xs font-black tracking-wide text-brand-900 md:text-sm group-hover:text-brand-700 transition-colors uppercase">{settings.institute_name}</p>
            <p className="text-[10px] font-bold text-gold uppercase tracking-wider">{settings.short_name}</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {links.map((link) => {
            if (link.dropdown) {
              const isSubActive = link.dropdown.some(item => pathname === item.href);
              return (
                <div 
                  key={link.label}
                  className="relative group py-2"
                  onMouseEnter={() => setInstituteOpen(true)}
                  onMouseLeave={() => setInstituteOpen(false)}
                >
                  <button 
                    className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                      isSubActive ? "text-brand-800" : "text-slate-650 hover:text-brand-800"
                    }`}
                  >
                    {link.label} <ChevronDown size={14} className={`transition-transform duration-300 ${instituteOpen ? "rotate-180" : ""}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className={`absolute left-0 mt-1.5 w-44 rounded-xl border border-slate-100 bg-white p-2.5 shadow-xl transition-all duration-300 origin-top-left ${
                    instituteOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                  }`}>
                    {link.dropdown.map((subItem) => {
                      const isItemActive = pathname === subItem.href;
                      return (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`block rounded-lg px-3 py-2 text-xs font-extrabold transition-all duration-200 ${
                            isItemActive ? "bg-brand-50 text-brand-900" : "text-slate-600 hover:bg-slate-50 hover:text-brand-800"
                          }`}
                        >
                          {subItem.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }

            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`relative rounded-md px-3 py-2 text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                  isActive ? "text-brand-800 font-black" : "text-slate-650 hover:text-brand-800"
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-3 right-3 h-0.5 bg-gold transition-transform duration-300 origin-left ${
                  isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`} />
              </Link>
            );
          })}
        </nav>

        {/* Action Button: Apply Now (Desktop) */}
        <div className="hidden lg:flex items-center gap-2.5">
          <Link
            href="/#drafting-3d-lab"
            className="flex items-center gap-1.5 rounded-xl border border-sky-200/80 bg-sky-50/70 hover:bg-sky-100/90 text-brand-700 px-3.5 py-2.5 text-xs font-black uppercase tracking-wider transition-all hover:scale-105"
          >
            <Move3d size={14} className="text-brand-600" />
            <span>3D Virtual Lab</span>
          </Link>

          <button 
            onClick={handleApplyClick}
            className="rounded-xl bg-gold hover:bg-yellow-500 text-brand-950 text-xs font-black uppercase tracking-wider px-5 py-3 transition-all hover:scale-105 active:scale-95 shadow-md shadow-gold/15"
          >
            Apply Now
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button 
            onClick={handleApplyClick}
            className="rounded-lg bg-gold text-brand-950 text-[10px] font-black uppercase tracking-widest px-3 py-2.5 active:scale-95 shadow-md shadow-gold/10"
          >
            Apply
          </button>
          <button aria-label="Open menu" className="rounded-md p-2 text-brand-800 transition hover:bg-brand-50" onClick={() => setOpen((v) => !v)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {open && (
        <nav className="border-t border-brand-100 bg-white px-4 py-4 lg:hidden max-h-[calc(100vh-80px)] overflow-y-auto shadow-inner">
          <div className="container grid gap-1.5">
            {links.map((link) => {
              if (link.dropdown) {
                return (
                  <div key={link.label} className="grid gap-1">
                    <p className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{link.label}</p>
                    {link.dropdown.map((subItem) => (
                      <Link 
                        key={subItem.href} 
                        href={subItem.href} 
                        className="rounded-lg px-6 py-2.5 text-sm font-bold text-slate-700 hover:bg-brand-50" 
                        onClick={() => setOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                );
              }

              return (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="rounded-lg px-3 py-2.5 text-sm font-bold text-slate-700 hover:bg-brand-50" 
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
