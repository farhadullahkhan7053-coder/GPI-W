import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, GraduationCap, Briefcase, Award, CheckCircle } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { getCourseBySlug, getPublicCourses } from "@/lib/content";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  return { 
    title: course 
      ? `${course.title} | Courses | GPI W D.I. Khan` 
      : "Course Details | GPI W D.I. Khan" 
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
                  <p className="font-extrabold text-brand-950 text-base mt-0.5">{course.duration}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3.5 rounded-2xl bg-brand-50/50 p-5 border border-brand-100/30">
                <div className="rounded-xl bg-brand-700 p-3 text-white">
                  <GraduationCap size={20} className="stroke-[2.5]" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-extrabold uppercase tracking-wider">Eligibility</p>
                  <p className="font-extrabold text-brand-950 text-base mt-0.5">{course.eligibility}</p>
                </div>
              </div>
            </div>
            
            {/* Full Description */}
            <h2 className="mt-10 text-2xl font-black text-brand-950 tracking-tight flex items-center gap-2">
              Overview
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600 font-medium text-base">
              {course.full_description}
            </p>
            
            {/* Skills & Learning Outcomes */}
            <h2 className="mt-10 text-2xl font-black text-brand-950 tracking-tight flex items-center gap-2">
              Skills & Outcomes
            </h2>
            <div className="mt-4 bg-slate-50/50 rounded-2xl border border-slate-100 p-6">
              <ul className="grid gap-3 text-sm text-slate-600 font-semibold">
                {course.skills?.split(",").map((skill, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <CheckCircle size={16} className="text-brand-700 mt-0.5 shrink-0 stroke-[2.5]" />
                    <span className="leading-relaxed">{skill.trim()}</span>
                  </li>
                )) || <p className="text-slate-500 font-medium">Outcomes will be updated.</p>}
              </ul>
            </div>
            
            {/* Career Opportunities */}
            <h2 className="mt-10 text-2xl font-black text-brand-950 tracking-tight flex items-center gap-2">
              <Briefcase size={22} className="text-brand-700 stroke-[2.5]" /> Career Opportunities
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600 font-medium text-base">
              {course.career_opportunities}
            </p>
            
            <Link 
              href="/admission" 
              className="mt-10 inline-flex items-center gap-2 rounded-lg bg-gold px-7 py-4 font-black text-brand-950 shadow-lg shadow-gold/20 transition-all duration-300 hover:bg-yellow-400 hover:scale-105 active:scale-95"
            >
              Apply for Admission <ArrowRight size={18} />
            </Link>
          </div>
          
          {/* Right side image */}
          <div className="relative group overflow-hidden rounded-2xl shadow-soft animate-slide-in-right">
            <div className="absolute inset-0 bg-brand-900/10 mix-blend-multiply transition-opacity group-hover:opacity-0 duration-500" />
            <img 
              className="h-[480px] w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105" 
              src={course.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop"} 
              alt={course.title} 
            />
          </div>
        </div>
        
        {/* Related Courses */}
        {related.length > 0 && (
          <div className="mt-20 pt-10 border-t border-slate-100">
            <h2 className="text-3xl font-black text-brand-950 tracking-tight animate-fade-in-down">Related Programs</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {related.map((item, idx) => (
                <CourseCard 
                  key={item.id} 
                  course={item} 
                  style={{ animationDelay: `${(idx + 1) * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
