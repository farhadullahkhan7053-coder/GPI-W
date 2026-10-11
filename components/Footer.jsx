"use client";

import Link from "next/link";
import { Facebook, MapPin, Mail, Phone, ArrowUpRight } from "lucide-react";

function WhatsAppIcon({ size = 18 }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.578 1.98 14.116.953 11.49.953c-5.434 0-9.858 4.37-9.862 9.8-.001 1.944.505 3.844 1.47 5.514L2.043 20.31l4.604-1.156zM15.484 13.064c-.305-.152-1.807-.892-2.087-.994-.28-.102-.485-.153-.687.152-.202.305-.783.993-.96 1.196-.177.203-.355.228-.66.076-.305-.152-1.287-.475-2.451-1.514-.906-.809-1.517-1.809-1.695-2.114-.177-.305-.019-.47.133-.621.137-.136.305-.355.457-.533.152-.177.203-.305.305-.508.102-.203.05-.38-.026-.533-.076-.152-.687-1.653-.941-2.262-.247-.595-.5-.515-.687-.525-.178-.01-.381-.01-.584-.01-.203 0-.533.076-.812.38-.28.305-1.066 1.041-1.066 2.539 0 1.498 1.091 2.946 1.243 3.149.152.203 2.148 3.28 5.204 4.602.727.314 1.293.502 1.734.643.73.232 1.393.199 1.918.121.584-.087 1.807-.738 2.061-1.452.254-.715.254-1.327.177-1.452-.077-.126-.28-.203-.585-.355z" />
    </svg>
  );
}

const affiliations = [
  { name: "KPTEVTA", label: "KP Technical Education & Vocational Training Authority", href: "https://kptevta.gov.pk/" },
  { name: "NAVTTC", label: "National Vocational & Technical Training Commission", href: "https://navttc.gov.pk/" },
  { name: "KPBTE", label: "Khyber Pakhtunkhwa Board of Technical Education", href: "https://www.kpbte.edu.pk/" },
  { name: "KPTTB", label: "Khyber Pakhtunkhwa Trade Testing Board", href: "https://www.kpttb.gov.pk/" },
];

export default function Footer({ settings }) {
  const quickLinks = [
    { label: "About", href: "/about" },
    { label: "Courses", href: "/courses" },
    { label: "Admission", href: "/admission" },
    { label: "Facilities", href: "/facilities" },
    { label: "3D Virtual Lab", href: "/#drafting-3d-lab" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <footer className="bg-brand-900 text-white relative">
      
      {/* 1. Affiliations & Accreditations Logo Strip */}
      <div className="bg-[#021124] border-b border-white/5 py-10">
        <div className="container">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-[10px] font-black text-gold uppercase tracking-widest">Accreditations & Partnerships</span>
            <h4 className="text-base font-black text-white mt-1">Our Affiliations & Accreditation</h4>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {affiliations.map((aff) => (
              <a
                key={aff.name}
                href={aff.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center text-center p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-gold/30 hover:bg-white/[0.04] transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="w-10 h-10 rounded-full bg-white/5 text-gold flex items-center justify-center font-black text-sm tracking-tighter group-hover:bg-gold group-hover:text-brand-950 transition-colors shadow-inner">
                  {aff.name[0]}
                </span>
                <span className="mt-3 block font-black text-white text-xs tracking-wider">{aff.name}</span>
                <span className="mt-1 block text-[10px] text-brand-200 group-hover:text-gold/80 transition-colors leading-relaxed font-semibold max-w-[140px]">
                  {aff.label}
                </span>
                <span className="mt-3 inline-flex items-center gap-0.5 text-[9px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Visit Site <ArrowUpRight size={10} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Main Minimal Footer (Leaner 3-Column Layout) */}
      <div className="container grid gap-10 py-16 md:grid-cols-3">
        
        {/* Left Column: Logo & Tagline */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-10 w-10 shrink-0 object-contain bg-white rounded p-0.5" />
            <div>
              <h2 className="text-sm font-black leading-tight tracking-wide">{settings.institute_name}</h2>
              <p className="font-bold text-gold text-[10px] leading-none mt-1 uppercase tracking-wider">{settings.short_name}</p>
            </div>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-slate-400 font-medium">
            {settings.tagline}. Striving to empower women of Khyber Pakhtunkhwa with professional skills, academic integrity, and business confidence.
          </p>
          
          {/* Social Platforms Hook */}
          {(settings.facebook || settings.whatsapp) && (
            <div className="pt-2 flex gap-2.5">
              {settings.facebook && settings.facebook !== "#" && (
                <a 
                  className="rounded-xl bg-white/5 p-2.5 transition-all duration-300 hover:bg-[#1877F2] hover:text-white hover:scale-110 active:scale-95" 
                  href={settings.facebook} 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <Facebook size={16} />
                </a>
              )}
              {settings.whatsapp && settings.whatsapp !== "#" && (
                <a 
                  className="rounded-xl bg-white/5 p-2.5 transition-all duration-300 hover:bg-[#25D366] hover:text-white hover:scale-110 active:scale-95" 
                  href={settings.whatsapp} 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon size={16} />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Center Column: Quick Navigation Links */}
        <div>
          <h3 className="font-black text-gold tracking-widest uppercase text-[10px] mb-4">Navigation Paths</h3>
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
            {quickLinks.map((item) => (
              <Link 
                key={item.label} 
                href={item.href}
                className="transition-all duration-300 hover:text-gold hover:translate-x-1 inline-block font-bold w-fit py-1.5"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column: Contact Details */}
        <div>
          <h3 className="font-black text-gold tracking-widest uppercase text-[10px] mb-4">Contact Desk</h3>
          <div className="grid gap-3.5 text-xs text-slate-400 font-bold">
            <p className="flex gap-2.5 items-center"><Phone size={14} className="text-gold shrink-0" /> {settings.phone}</p>
            <p className="flex gap-2.5 items-center"><Mail size={14} className="text-gold shrink-0" /> {settings.email}</p>
            <p className="flex gap-2.5 items-start"><MapPin size={14} className="text-gold shrink-0 mt-0.5" /> <span className="leading-relaxed font-semibold">{settings.address}</span></p>
          </div>
        </div>

      </div>

      {/* 3. Lean Copyright Bar */}
      <div className="border-t border-white/5 py-6 text-center text-xs text-slate-500 font-bold">
        © {new Date().getFullYear()} {settings.institute_name}. Accredited by NAVTTC / KPBTE.
      </div>
    </footer>
  );
}
