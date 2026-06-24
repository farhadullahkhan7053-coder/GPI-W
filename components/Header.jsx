"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Courses", "/courses"],
  ["Announcements", "/announcements"],
  ["Gallery", "/gallery"],
  ["Admission", "/admission"],
  ["Facilities", "/facilities"],
  ["Alumni Portal", "/alumni"],
  ["Contact", "/contact"]
];

export default function Header({ settings }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  
  return (
    <header className="sticky top-0 z-50 border-b border-brand-100 bg-white/95 backdrop-blur-md transition-all duration-300">
      <div className="container flex items-center justify-between gap-4 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-3 group">
          <img src="/logo.png" alt="Logo" className="h-12 w-12 shrink-0 object-contain rounded transition-transform duration-500 group-hover:rotate-[360deg]" />
          <div className="min-w-0">
            <p className="truncate text-sm font-black tracking-wide text-brand-900 md:text-base group-hover:text-brand-700 transition-colors">{settings.institute_name}</p>
            <p className="text-xs font-semibold text-gold md:text-sm">{settings.short_name}</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {links.map(([label, href]) => {
            const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href));
            return (
              <Link 
                key={href} 
                href={href} 
                className={`relative group rounded-md px-3 py-2 text-sm font-bold transition-all duration-300 ${
                  isActive ? "text-brand-800" : "text-slate-600 hover:text-brand-800"
                }`}
              >
                {label}
                <span className={`absolute bottom-0 left-3 right-3 h-0.5 bg-gold transition-transform duration-300 origin-left ${
                  isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`} />
              </Link>
            );
          })}
        </nav>
        <button aria-label="Open menu" className="rounded-md p-2 text-brand-800 transition hover:bg-brand-50 lg:hidden" onClick={() => setOpen((v) => !v)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-brand-100 bg-white px-4 py-3 lg:hidden">
          <div className="container grid gap-1">
            {links.map(([label, href]) => (
              <Link key={href} href={href} className="rounded-md px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-brand-50" onClick={() => setOpen(false)}>
                {label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
