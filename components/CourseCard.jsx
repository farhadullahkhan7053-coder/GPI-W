import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

export default function CourseCard({ course, style }) {
  return (
    <article style={style} className="group overflow-hidden rounded-2xl bg-white shadow-soft border border-slate-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-gold/20 animate-fade-in-up">
      <div className="relative h-52 bg-brand-100 overflow-hidden">
        <img 
          src={course.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=900&auto=format&fit=crop"} 
          alt={course.title} 
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <div className="mb-3.5 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-brand-700">
          <span className="flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 ring-1 ring-brand-100/50">
            <Clock size={14} /> {course.duration}
          </span>
          {course.eligibility && (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600 font-bold">
              {course.eligibility}
            </span>
          )}
        </div>
        <h3 className="text-xl font-black text-brand-900 leading-snug group-hover:text-brand-700 transition-colors duration-300">
          {course.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600 font-medium">
          {course.short_description}
        </p>
        <div className="mt-6 pt-4 border-t border-slate-50">
          <Link 
            href={`/courses/${course.slug}`} 
            className="inline-flex items-center gap-2 font-bold text-brand-700 hover:text-brand-900 group/link text-sm transition-all"
          >
            View Details 
            <ArrowRight size={16} className="transition-transform duration-300 group-hover/link:translate-x-1.5 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
