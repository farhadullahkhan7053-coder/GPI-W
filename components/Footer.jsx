import Link from "next/link";
import { Facebook, MapPin, Mail, Phone, ExternalLink } from "lucide-react";

const officialLinks = [
  { label: "KPTEVTA", sublabel: "Head Office", href: "https://kptevta.gov.pk/" },
  { label: "NAVTTC", sublabel: "Curriculum", href: "https://navttc.gov.pk/" },
  { label: "KPBTE", sublabel: "Board of Technical Education", href: "https://www.kpbte.edu.pk/" },
  { label: "KPTTB", sublabel: "Trade Testing Board", href: "https://www.kpttb.gov.pk/" },
];

export default function Footer({ settings }) {
  const quickLinks = ["About", "Courses", "Admission", "Facilities", "Gallery", "Contact"];
  return (
    <footer className="bg-brand-900 text-white">
      <div className="container grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.png" alt="Logo" className="h-10 w-10 shrink-0 object-contain bg-white rounded p-0.5" />
            <div>
              <h2 className="text-base font-black leading-tight">{settings.institute_name}</h2>
              <p className="font-semibold text-gold text-xs leading-none mt-1">{settings.short_name}</p>
            </div>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-7 text-brand-50">{settings.tagline}</p>
          {settings.facebook && settings.facebook !== "#" && (
            <div className="mt-5 flex gap-3">
              <a 
                className="rounded-md bg-white/10 p-2.5 transition-all duration-300 hover:bg-white/20 hover:scale-110 active:scale-95" 
                href={settings.facebook} 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          )}
        </div>
        <div>
          <h3 className="font-bold text-gold tracking-wider uppercase text-xs mb-4">Quick Links</h3>
          <div className="mt-4 grid gap-2.5 text-sm text-brand-100">
            {quickLinks.map((item) => (
              <Link 
                key={item} 
                href={`/${item.toLowerCase()}`}
                className="transition-all duration-300 hover:text-gold hover:translate-x-1.5 inline-block font-medium w-fit"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-gold tracking-wider uppercase text-xs mb-4">Contact</h3>
          <div className="mt-4 grid gap-3.5 text-sm text-brand-100 font-medium">
            <p className="flex gap-2.5 items-center"><Phone size={16} className="text-gold shrink-0" /> {settings.phone}</p>
            <p className="flex gap-2.5 items-center"><Mail size={16} className="text-gold shrink-0" /> {settings.email}</p>
            <p className="flex gap-2.5 items-start"><MapPin size={16} className="text-gold shrink-0 mt-0.5" /> <span className="leading-relaxed">{settings.address}</span></p>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-gold">Official Links</h3>
          <div className="mt-4 grid gap-3 text-sm">
            {officialLinks.map(({ label, sublabel, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-2 text-brand-50 hover:text-gold transition-colors"
              >
                <ExternalLink size={14} className="mt-0.5 shrink-0 opacity-60 group-hover:opacity-100" />
                <span>
                  <span className="font-semibold block leading-tight">{label}</span>
                  <span className="text-xs text-brand-200 group-hover:text-gold/80">{sublabel}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-sm text-brand-100">
        © {new Date().getFullYear()} Government Polytechnic Institute (Women) Dera Ismail Khan. All Rights Reserved.
      </div>
    </footer>
  );
}
