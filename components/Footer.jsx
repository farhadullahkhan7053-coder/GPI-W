import Link from "next/link";
import { Facebook, MapPin, Mail, Phone, ExternalLink } from "lucide-react";

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
          {(settings.facebook || settings.whatsapp) && (
            <div className="mt-5 flex gap-3">
              {settings.facebook && settings.facebook !== "#" && (
                <a 
                  className="rounded-md bg-white/10 p-2.5 transition-all duration-300 hover:bg-[#1877F2] hover:scale-110 active:scale-95" 
                  href={settings.facebook} 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
              )}
              {settings.whatsapp && settings.whatsapp !== "#" && (
                <a 
                  className="rounded-md bg-white/10 p-2.5 transition-all duration-300 hover:bg-[#25D366] hover:scale-110 active:scale-95" 
                  href={settings.whatsapp} 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon size={18} />
                </a>
              )}
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
