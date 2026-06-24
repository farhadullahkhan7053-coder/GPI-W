import Link from "next/link";
import { ArrowRight, BookOpen, Phone } from "lucide-react";

export default function HeroSection({ settings }) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-900 text-white min-h-[650px] flex items-center">
      {/* Animated zoom background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,53,31,0.96),rgba(8,53,31,0.75))] bg-cover bg-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-105 animate-[zoomOut_8s_ease-out_forwards]"
          style={{ backgroundImage: "url('/uploads/entrance.jpg')" }}
        />
      </div>
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-y-0 right-0 -z-10 w-1/2 bg-gradient-to-l from-brand-600/10 to-transparent pointer-events-none" />

      <div className="container grid content-center gap-12 py-20 lg:grid-cols-[1.1fr_.9fr] w-full">
        <div className="flex flex-col justify-center space-y-6">
          <div className="animate-fade-in-down">
            <p className="inline-flex rounded-full bg-gold/90 backdrop-blur-sm px-4 py-1.5 text-xs font-black uppercase tracking-widest text-brand-950 ring-1 ring-gold/30">
              {settings.short_name}
            </p>
          </div>
          
          <h1 className="max-w-4xl text-4xl font-black leading-[1.15] md:text-6xl text-white tracking-tight animate-slide-in-left">
            {settings.institute_name}
          </h1>
          
          <p className="max-w-2xl text-lg md:text-xl leading-relaxed text-brand-50/90 font-medium animate-fade-in-up [animation-delay:0.3s]">
            {settings.tagline}
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4 animate-fade-in-up [animation-delay:0.5s]">
            <Link 
              href="/courses" 
              className="inline-flex items-center gap-2.5 rounded-lg bg-white px-6 py-3.5 font-bold text-brand-900 shadow-lg shadow-black/10 transition-all duration-300 hover:bg-brand-50 hover:scale-105 active:scale-95"
            >
              <BookOpen size={18} /> View Courses
            </Link>
            <Link 
              href="/admission" 
              className="group inline-flex items-center gap-2.5 rounded-lg bg-gold px-6 py-3.5 font-bold text-brand-900 shadow-lg shadow-gold/20 transition-all duration-300 hover:bg-yellow-400 hover:scale-105 active:scale-95"
            >
              Apply Now 
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2.5 rounded-lg border border-white/30 bg-white/5 backdrop-blur-sm px-6 py-3.5 font-bold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:scale-105 active:scale-95"
            >
              <Phone size={18} /> Contact Us
            </Link>
          </div>
        </div>
        
        {/* Right side glassmorphic stats cards */}
        <div className="hidden self-center lg:block animate-slide-in-right [animation-delay:0.2s]">
          <div className="relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-gold/30 rounded-full blur-xl animate-pulse" />
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-brand-500/20 rounded-full blur-2xl animate-pulse" />
            
            <h3 className="text-gold font-bold uppercase tracking-wider text-xs mb-6">Key Highlights</h3>
            
            <div className="grid grid-cols-2 gap-5 relative z-10">
              {[
                { title: "Technical Education", desc: "Aligned with NAVTTC" },
                { title: "Practical Labs", desc: "Hands-on experience" },
                { title: "Women Empowerment", desc: "Skill excellence" },
                { title: "Career Skills", desc: "100% Job readiness" }
              ].map((item, idx) => (
                <div 
                  key={item.title} 
                  className="group rounded-xl bg-white/95 p-5 text-brand-950 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-white"
                  style={{ animationDelay: `${(idx + 1) * 0.1}s` }}
                >
                  <p className="font-extrabold text-brand-900 group-hover:text-brand-700 transition-colors">{item.title}</p>
                  <p className="text-xs text-slate-500 mt-1 font-semibold">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
