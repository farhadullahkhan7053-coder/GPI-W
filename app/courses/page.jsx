import CoursesFilterGrid from "@/components/CoursesFilterGrid";
import { getPublicCourses, getSettings } from "@/lib/content";
import { Award, ExternalLink } from "lucide-react";

export const metadata = { title: "Courses | GTVC Parova" };

export default async function CoursesPage() {
  const [courses, settings] = await Promise.all([
    getPublicCourses(100),
    getSettings()
  ]);
  
  return (
    <section className="section bg-white min-h-[70vh]">
      <div className="container">
        <div className="animate-fade-in-down">
          <p className="font-extrabold text-gold uppercase tracking-wider text-xs">Courses & Trades</p>
          <h1 className="section-title mt-3 text-brand-950 font-black tracking-tight leading-none">Technical and vocational programs</h1>
        </div>
        
        <div className="mt-12">
          <CoursesFilterGrid courses={courses} />
        </div>
        
        {!courses.length && <p className="mt-12 rounded-2xl bg-brand-50 p-12 text-center text-slate-500 font-medium animate-fade-in">Courses will be published soon.</p>}

        {/* NAVTTC Qualifications Alliance Banner */}
        <div className="mt-16 rounded-3xl bg-slate-50/70 border border-slate-100 p-8 md:p-10 shadow-soft animate-fade-in-up flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex gap-4 items-start">
            <div className="rounded-2xl bg-brand-100/50 p-4 text-brand-850 shrink-0">
              <Award size={32} className="stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-xl font-black text-brand-950 tracking-tight">National Qualification Standards</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 font-semibold max-w-2xl">
                All vocational, DAE, DIT, and CBT programs at {settings.institute_name} are aligned with modern standards set by the National Vocational and Technical Training Commission (NAVTTC).
              </p>
            </div>
          </div>
          <a 
            href="https://navttc.gov.pk/qualifications/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-6 py-3.5 font-bold text-white shadow-md shadow-brand-700/10 transition-all duration-300 hover:bg-brand-800 hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            NAVTTC Qualifications <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
