import Link from "next/link";
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  GraduationCap, 
  HeartHandshake, 
  ShieldCheck, 
  UsersRound, 
  Wrench,
  Phone,
  Mail,
  MapPin,
  ArrowRight
} from "lucide-react";
import HeroSection from "@/components/HeroSection";
import CoursesFilterGrid from "@/components/CoursesFilterGrid";
import AnnouncementCard from "@/components/AnnouncementCard";
import GalleryGrid from "@/components/GalleryGrid";
import StatsCard from "@/components/StatsCard";
import FlyerLightbox from "@/components/FlyerLightbox";
import { getPublicAnnouncements, getPublicCourses, getPublicGallery, getSettings, getStats } from "@/lib/content";

export default async function HomePage() {
  const [settings, announcements, courses, gallery, stats] = await Promise.all([
    getSettings(),
    getPublicAnnouncements(3),
    getPublicCourses(50), // Fetch more to support interactive filtering
    getPublicGallery(6),
    getStats()
  ]);
  
  const latest = announcements[0];
  const tickerItems = announcements.length ? announcements : [{ id: 0, title: "Admissions Open for the current session - Apply Online Now!" }];
  const repeatedTicker = [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <>
      {/* Dynamic Announcement Ticker (Infinite Horizontal Loop) */}
      <div className="bg-gold py-3 text-brand-950 text-xs font-black uppercase tracking-widest relative overflow-hidden shadow-md z-10 border-b border-gold/10 flex items-center">
        <div className="w-full overflow-hidden flex">
          <div className="animate-marquee whitespace-nowrap flex gap-12">
            {repeatedTicker.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="inline-flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-brand-900 animate-pulse" />
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <HeroSection settings={settings} />
      
      {/* About Section */}
      <section className="section bg-white overflow-hidden">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-slide-in-left">
            <p className="font-extrabold text-gold uppercase tracking-wider text-xs">About Institute</p>
            <h2 className="section-title mt-3 text-brand-950 font-black tracking-tight leading-[1.15]">A professional learning space for women in D.I. Khan</h2>
            <p className="mt-6 leading-relaxed text-slate-600 font-medium text-base">Government Polytechnic Institute for Women provides technical and vocational education designed around practical skills, confidence, discipline, and employability. The institute supports women in building career-ready expertise through labs, workshops, and trained instructors.</p>
            <Link href="/about" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-700 px-6 py-3.5 font-bold text-white shadow-md shadow-brand-700/15 transition-all duration-300 hover:bg-brand-800 hover:scale-105 active:scale-95">Learn More</Link>
          </div>
          <div className="relative group overflow-hidden rounded-2xl shadow-soft animate-slide-in-right">
            <div className="absolute inset-0 bg-brand-900/10 mix-blend-multiply transition-opacity group-hover:opacity-0 duration-500" />
            <img className="h-[260px] md:h-[420px] w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105" src="/uploads/classroom.jpg" alt="Classroom at GPI W" />
          </div>
        </div>
      </section>
      
      {/* Mission / Vision / Objectives */}
      <section className="section bg-slate-50/50">
        <div className="container grid gap-6 md:grid-cols-3">
          {[["Mission", settings.mission, Award], ["Vision", settings.vision, GraduationCap], ["Objectives", settings.objectives, CheckCircle2]].map(([title, text, Icon], idx) => (
            <div 
              key={title} 
              style={{ animationDelay: `${(idx + 1) * 0.15}s` }}
              className="rounded-2xl bg-white p-8 shadow-soft border border-slate-100/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-gold/20 animate-fade-in-up"
            >
              <div className="inline-flex rounded-xl bg-brand-50 p-4 text-brand-700 ring-1 ring-brand-100/50">
                <Icon size={28} className="stroke-[2.5]" />
              </div>
              <h3 className="mt-6 text-2xl font-black text-brand-950 tracking-tight">{title}</h3>
              <p className="mt-4 leading-relaxed text-slate-600 font-medium text-sm">{text}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Interactive Courses Filter Grid */}
      <section className="section bg-white">
        <div className="container">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-extrabold text-gold uppercase tracking-wider text-xs">Courses & Fields</p>
              <h2 className="section-title mt-3 text-brand-950 font-black tracking-tight leading-none">Career-oriented vocational programs</h2>
            </div>
            <Link href="/courses" className="font-extrabold text-brand-700 hover:text-brand-900 hover:translate-x-1 transition-all flex items-center gap-1.5 text-sm group">
              View all courses <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <CoursesFilterGrid courses={courses} />
        </div>
      </section>
      
      {/* Admission Advertisement Section with Lightbox Modals */}
      <section className="section bg-slate-50/50 overflow-hidden">
        <div className="container grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="animate-slide-in-left">
            <p className="font-extrabold text-gold uppercase tracking-wider text-xs">Admissions Open</p>
            <h2 className="section-title mt-3 text-brand-950 font-black tracking-tight leading-[1.15]">Join Government Polytechnic Institute (Women) D.I. Khan</h2>
            <p className="mt-6 leading-relaxed text-slate-600 font-medium text-base">
              Applications are invited for DAE (Computer & Fashion Designing), DIT, and various vocational short courses. Hostel accommodations and daycare facilities are available for students.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link 
                href="/admission" 
                className="inline-flex items-center gap-2 rounded-lg bg-brand-700 px-6 py-3.5 font-bold text-white shadow-md shadow-brand-700/15 transition-all duration-300 hover:bg-brand-800 hover:scale-105 active:scale-95"
              >
                Admission Details <ArrowRight size={18} />
              </Link>
              <FlyerLightbox mode="button" />
            </div>
          </div>
          <FlyerLightbox mode="image" />
        </div>
      </section>

      {/* Stats Section with Credible Counter Label */}
      <section className="section bg-brand-900 relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(25,114,69,0.15),transparent_70%)] pointer-events-none" />
        <div className="container grid gap-6 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
          <StatsCard label="Total Students" value={stats.students} style={{ animationDelay: "0.1s" }} />
          <StatsCard label="Total Staff" value={stats.staff} style={{ animationDelay: "0.2s" }} />
          <StatsCard label="Total Courses" value={stats.courses} style={{ animationDelay: "0.3s" }} />
          <StatsCard label="Graduated Students" value={stats.alumni} style={{ animationDelay: "0.4s" }} />
        </div>
      </section>
      
      {/* Principal Message Section */}
      <section className="section bg-white overflow-hidden">
        <div className="container grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div className="relative group overflow-hidden rounded-2xl shadow-soft animate-slide-in-left">
            <div className="absolute inset-0 bg-brand-900/10 mix-blend-multiply transition-opacity group-hover:opacity-0 duration-500" />
            <img className="h-64 md:h-96 w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105" src="/uploads/staff_meeting.jpg" alt="GPI W Faculty Meeting" />
          </div>
          <div className="rounded-2xl bg-brand-900 p-10 text-white shadow-2xl relative overflow-hidden animate-slide-in-right">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
            <p className="font-extrabold text-gold uppercase tracking-wider text-xs">Principal Message</p>
            <p className="mt-5 text-lg leading-relaxed text-brand-50/95 font-medium italic">"{settings.principal_message}"</p>
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col">
              <span className="font-black text-white text-base">Principal</span>
              <span className="text-sm text-brand-200 mt-1 font-semibold">{settings.institute_name}</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Gallery Section */}
      <section className="section bg-slate-50/50">
        <div className="container">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-extrabold text-gold uppercase tracking-wider text-xs">Gallery</p>
              <h2 className="section-title mt-3 text-brand-950 font-black tracking-tight leading-none">Latest institute activities</h2>
            </div>
            <Link href="/gallery" className="font-extrabold text-brand-700 hover:text-brand-900 hover:translate-x-1 transition-all flex items-center gap-1.5 text-sm group">
              View Gallery <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <GalleryGrid images={gallery} />
        </div>
      </section>
      
      {/* Features Grid */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <p className="font-extrabold text-gold uppercase tracking-wider text-xs">Features</p>
            <h2 className="section-title mt-3 text-brand-950 font-black tracking-tight">Why Choose GPI W D.I. Khan</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["Skilled instructors", UsersRound], 
              ["Practical training", Wrench], 
              ["Women-focused education", HeartHandshake], 
              ["Career-oriented courses", BookOpen], 
              ["Safe environment", ShieldCheck], 
              ["Modern labs and workshops", GraduationCap]
            ].map(([label, Icon], idx) => (
              <div 
                key={label} 
                style={{ animationDelay: `${(idx + 1) * 0.1}s` }}
                className="flex items-center gap-4 rounded-2xl bg-brand-50/50 p-6 font-bold text-brand-900 border border-brand-100/30 transition-all duration-300 hover:scale-105 hover:bg-brand-50 hover:shadow-md animate-fade-in-up"
              >
                <div className="rounded-xl bg-brand-700 p-3 text-white">
                  <Icon size={20} className="stroke-[2.5]" />
                </div> 
                <span className="text-base tracking-tight font-extrabold">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="section bg-slate-50/50 overflow-hidden">
        <div className="container grid gap-10 lg:grid-cols-2 items-center">
          <div className="animate-slide-in-left">
            <p className="font-extrabold text-gold uppercase tracking-wider text-xs">Contact</p>
            <h2 className="section-title mt-3 text-brand-950 font-black tracking-tight leading-tight">Visit or contact the institute office</h2>
            <div className="mt-8 grid gap-4 text-slate-700 font-medium">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-brand-50 p-2.5 text-brand-700"><Phone size={18} /></div>
                <span className="font-extrabold">{settings.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-brand-50 p-2.5 text-brand-700"><Mail size={18} /></div>
                <span className="font-extrabold">{settings.email}</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-brand-50 p-2.5 text-brand-700 mt-0.5"><MapPin size={18} /></div>
                <span className="font-extrabold leading-relaxed">{settings.address}</span>
              </div>
            </div>
            <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-700 px-6 py-3.5 font-bold text-white shadow-md shadow-brand-700/15 transition-all duration-300 hover:bg-brand-800 hover:scale-105 active:scale-95">Get In Touch</Link>
          </div>
          <div className="w-full h-[280px] md:h-[360px] rounded-2xl overflow-hidden shadow-soft border border-slate-100 animate-slide-in-right">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3393.0!2d70.9016!3d31.8314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393b7f0000000001%3A0x1!2sGovt.+Polytechnic+Institute+for+Women+D.I.+Khan!5e0!3m2!1sen!2spk!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="GPI W D.I. Khan Location"
            />
          </div>
        </div>
      </section>
    </>
  );
}
