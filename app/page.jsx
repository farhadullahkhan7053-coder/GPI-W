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
import SuccessStories from "@/components/SuccessStories";
import StatsCard from "@/components/StatsCard";
import FlyerLightbox from "@/components/FlyerLightbox";
import ApplyNowButton from "@/components/ApplyNowButton";
import { getSettings, getPublicCourses, getPublicAnnouncements, getPublicGallery } from "@/lib/content";

export const metadata = {
  title: "Government Polytechnic Institute (Women) D.I. Khan | Technical Education for Women",
  description: "Official website of Government Polytechnic Institute (Women) Dera Ismail Khan. Offering DAE in Computer and Fashion Designing, DIT, and vocational certifications."
};

export default async function Home() {
  const settings = await getSettings();
  const courses = await getPublicCourses(10);
  const announcements = await getPublicAnnouncements(6);
  const gallery = await getPublicGallery(6);

  // Filter important announcements for the top ticker marquee
  const importantAnnouncements = announcements.filter(a => a.is_important);

  return (
    <main className="overflow-hidden">
      
      {/* 1. Infinite Announcement Marquee Ticker */}
      {importantAnnouncements.length > 0 && (
        <div className="bg-[#021124] border-b border-brand-800 text-white py-3.5 px-4 overflow-hidden relative z-30">
          <div className="container flex items-center justify-between mx-auto">
            <span className="bg-gold text-brand-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded shrink-0 mr-4 shadow-sm">
              Important Announcement
            </span>
            <div className="relative w-full overflow-hidden h-5 flex items-center">
              {/* Marquee track */}
              <div className="absolute flex gap-10 whitespace-nowrap animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused] font-semibold text-xs text-slate-200">
                {/* Duplicate announcements to allow infinite scrolling effect */}
                {[...importantAnnouncements, ...importantAnnouncements, ...importantAnnouncements].map((ann, idx) => (
                  <span key={idx} className="inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                    {ann.title} — {new Date(ann.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Hero Section (Design overhaul with actions button hierarchy) */}
      <HeroSection settings={settings} />

      {/* 3. Stats Section */}
      <section className="bg-[#ffffff] border-y border-slate-100 py-10">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatsCard value="12" label="Technical Courses" icon={BookOpen} />
          <StatsCard value="350+" label="Active Students" icon={UsersRound} />
          <StatsCard value="100%" label="Accredited Programs" icon={Award} />
          <StatsCard value="850+" label="Successful Alumni" icon={GraduationCap} />
        </div>
      </section>

      {/* 4. Dynamic Courses Tab Filter Grid */}
      <section className="section bg-white">
        <div className="container">
          <div className="mb-12">
            <p className="font-extrabold text-gold uppercase tracking-wider text-xs">Academic Programs</p>
            <h2 className="section-title mt-3 text-brand-950 font-black tracking-tight leading-none">Technical & vocational programs</h2>
          </div>
          <CoursesFilterGrid courses={courses} />
        </div>
      </section>

      {/* 5. Online Admission Funnel Advertisement Banner */}
      <section className="section bg-slate-50/50">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] items-center bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-soft">
            <div className="flex flex-col justify-center space-y-6">
              <span className="inline-flex max-w-fit rounded-full bg-gold/10 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-gold">
                Admissions Open — Session {new Date().getFullYear()}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-brand-950 tracking-tight leading-tight">
                Kickstart Your Professional Technical Career
              </h2>
              <p className="text-slate-650 leading-relaxed text-sm md:text-base font-medium">
                Enroll in our three-year DAE, DIT, or vocational competency programs. Admissions are now officially open. Explore eligibility criteria, batch details, and submit your application online immediately.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <FlyerLightbox mode="button" />
                <ApplyNowButton 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-lg bg-brand-700 hover:bg-brand-850 px-6 py-3.5 font-bold text-white shadow-md transition-all hover:scale-105 active:scale-95 text-sm"
                  label="Apply Online Now"
                />
              </div>
            </div>
            {/* Image Box wrapped in Lightbox Modal */}
            <div className="w-full flex justify-center">
              <FlyerLightbox mode="image" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Principal Message Section */}
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
      
      {/* 7. Gallery Section */}
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

      {/* 8. Premium Student Success Stories Section */}
      <SuccessStories />
      
      {/* 9. Features Grid */}
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
      
      {/* 10. Contact Section */}
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
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-brand-50 p-2.5 text-brand-700"><MapPin size={18} /></div>
                <span className="font-extrabold leading-relaxed text-sm md:text-base">{settings.address}</span>
              </div>
            </div>
          </div>
          
          <div className="relative h-[320px] md:h-[400px] rounded-3xl overflow-hidden shadow-soft border border-slate-100 animate-slide-in-right bg-slate-200">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3412.3920199736177!2d70.9064789!3d31.822238499999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3924fdbe51c68f17%3A0xc4fe6a3bfdb93a20!2sGovernment%20Polytechnic%20Institute%20for%20Women!5e0!3m2!1sen!2spk!4v1717320491029!5m2!1sen!2spk" 
              className="w-full h-full border-0" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
      
      {/* 11. Announcements Section */}
      {announcements.length > 0 && (
        <section className="section bg-white border-t border-slate-100">
          <div className="container">
            <div className="mb-12">
              <p className="font-extrabold text-gold uppercase tracking-wider text-xs">Announcements</p>
              <h2 className="section-title mt-3 text-brand-950 font-black tracking-tight leading-none">News and campus updates</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {announcements.map((ann, idx) => (
                <AnnouncementCard 
                  key={ann.id} 
                  announcement={ann} 
                  style={{ animationDelay: `${(idx + 1) * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
