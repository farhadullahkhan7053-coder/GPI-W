import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, GraduationCap, Briefcase, CheckCircle } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import ApplyNowButton from "@/components/ApplyNowButton";
import FallbackImage from "@/components/FallbackImage";
import { getCourseBySlug, getPublicCourses, getSettings } from "@/lib/content";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [course, settings] = await Promise.all([
    getCourseBySlug(slug),
    getSettings()
  ]);
  return { 
    title: course 
      ? `${course.title} | Courses | ${settings.short_name}` 
      : `Course Details | ${settings.short_name}` 
  };
}

export default async function CourseDetailsPage({ params }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) notFound();
  
  const related = (await getPublicCourses(4))
    .filter((item) => item.slug !== course.slug)
    .slice(0, 3);
    
  return (
    <section className="section bg-white min-h-[70vh]">
      <div className="container">
        {/* Main Grid */}
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="animate-slide-in-left">
            <p className="font-extrabold text-gold uppercase tracking-wider text-xs">Course Profile</p>
            <h1 className="section-title mt-3 text-brand-950 font-black tracking-tight leading-tight">{course.title}</h1>
            
            {/* Quick Stats */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3.5 rounded-2xl bg-brand-50/50 p-5 border border-brand-100/30">
                <div className="rounded-xl bg-brand-700 p-3 text-white">
                  <Clock size={20} className="stroke-[2.5]" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-extrabold uppercase tracking-wider">Duration</p>
                  <p className="font-extrabold text-brand-950 text-sm mt-0.5">{course.duration}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3.5 rounded-2xl bg-brand-50/50 p-5 border border-brand-100/30">
                <div className="rounded-xl bg-brand-700 p-3 text-white">
                  <GraduationCap size={20} className="stroke-[2.5]" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-extrabold uppercase tracking-wider">Eligibility</p>
                  <p className="font-extrabold text-brand-950 text-sm mt-0.5">{course.eligibility}</p>
                </div>
              </div>
            </div>
            
            {/* Full Description */}
            <h2 className="mt-10 text-xl font-black text-brand-950 tracking-tight flex items-center gap-2">
              Overview
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600 font-medium text-sm">
              {course.full_description}
            </p>
            
            {/* Skills & Learning Outcomes */}
            <h2 className="mt-10 text-xl font-black text-brand-950 tracking-tight flex items-center gap-2">
              Skills & Outcomes
            </h2>
            <div className="mt-4 bg-slate-50/50 rounded-2xl border border-slate-100 p-6">
              <ul className="grid gap-3 text-xs text-slate-600 font-semibold">
                {course.skills?.split(",").map((skill, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <CheckCircle size={14} className="text-brand-700 mt-0.5 shrink-0 stroke-[2.5]" />
                    <span className="leading-relaxed">{skill.trim()}</span>
                  </li>
                )) || <p className="text-slate-550 font-medium">Outcomes will be updated.</p>}
              </ul>
            </div>
            
            {/* Career Opportunities */}
            <h2 className="mt-10 text-xl font-black text-brand-950 tracking-tight flex items-center gap-2">
              <Briefcase size={20} className="text-brand-700 stroke-[2.5]" /> Career Opportunities
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600 font-medium text-sm">
              {course.career_opportunities}
            </p>
            
            <ApplyNowButton 
              className="mt-10 w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-lg bg-gold hover:bg-yellow-500 px-7 py-4 font-black text-brand-950 shadow-lg shadow-gold/20 transition-all hover:scale-105 active:scale-95 text-sm"
              label="Apply for Admission"
            />
          </div>
          
          {/* Right side image */}
          <div className="relative group overflow-hidden rounded-2xl shadow-soft animate-slide-in-right">
            <div className="absolute inset-0 bg-brand-900/10 mix-blend-multiply transition-opacity group-hover:opacity-0 duration-500" />
            <FallbackImage 
              className="h-[260px] md:h-[480px] w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105" 
              src={course.image} 
              alt={course.title} 
            />
          </div>
        </div>
        
        {/* Related Courses */}
        {related.length > 0 && (
          <div className="mt-20 pt-10 border-t border-slate-100">
            <h2 className="text-2xl font-black text-brand-950 tracking-tight animate-fade-in-down">Related Programs</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {related.map((item, idx) => (
                <div key={item.id} className="h-full">
                  <CourseCard 
                    course={item} 
                    style={{ animationDelay: `${(idx + 1) * 0.15}s` }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
