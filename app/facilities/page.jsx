import { BookOpen, Brush, Building2, Computer, Scissors, Sparkles, UsersRound, Wrench } from "lucide-react";

export const metadata = { title: "Facilities | GPI W D.I. Khan" };

const facilities = [
  ["Computer Lab", Computer],
  ["Fashion Design Lab", Brush],
  ["Dress Making Workshop", Scissors],
  ["Beauty Therapy Lab", Sparkles],
  ["Library", BookOpen],
  ["Classrooms", Building2],
  ["Student Support", UsersRound],
  ["Practical Training Area", Wrench]
];

export default function FacilitiesPage() {
  return (
    <section className="section bg-white min-h-[70vh]">
      <div className="container">
        <div className="animate-fade-in-down">
          <p className="font-extrabold text-gold uppercase tracking-wider text-xs">Facilities</p>
          <h1 className="section-title mt-3 text-brand-950 font-black tracking-tight leading-none">Labs, workshops, and student support</h1>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {facilities.map(([name, Icon], idx) => (
            <div 
              key={name} 
              style={{ animationDelay: `${(idx + 1) * 0.1}s` }}
              className="rounded-2xl bg-brand-50/50 p-6 border border-brand-100/30 shadow-soft transition-all duration-300 hover:scale-105 hover:bg-brand-50 hover:shadow-md animate-fade-in-up"
            >
              <div className="inline-flex rounded-xl bg-brand-700 p-3.5 text-white">
                <Icon size={22} className="stroke-[2.5]" />
              </div>
              <h2 className="mt-5 text-xl font-black text-brand-900 leading-snug">{name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 font-medium">A clean, practical, and supportive space for hands-on learning and professional skill development.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
