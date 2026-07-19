import { getSettings } from "@/lib/content";

export const metadata = { title: "About | GPI W D.I. Khan" };

export default async function AboutPage() {
  const settings = await getSettings();
  return (
    <section className="section bg-white min-h-[70vh]">
      <div className="container">
        <div className="animate-fade-in-down">
          <p className="font-extrabold text-gold uppercase tracking-wider text-xs">About Us</p>
          <h1 className="section-title mt-3 text-brand-950 font-black tracking-tight leading-tight">{settings.institute_name}</h1>
        </div>
        
        <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="space-y-6 leading-relaxed text-slate-600 font-medium text-base animate-slide-in-left">
            <p>Government Polytechnic Institute for Women, D.I. Khan is dedicated to technical and vocational education for women. The institute focuses on practical training, discipline, employability, and confidence-building through professional courses and workshop-based learning.</p>
            <p>Its programs support students who want to enter employment, start small businesses, improve household income, or continue technical education with stronger foundations.</p>
            
            <div className="grid gap-6 md:grid-cols-2 pt-6">
              <Info title="Mission" text={settings.mission} delay="0.1s" />
              <Info title="Vision" text={settings.vision} delay="0.2s" />
              <Info title="Objectives" text={settings.objectives} delay="0.3s" />
              <Info title="Women in Tech" text="Technical education enables women to participate in skilled professions, entrepreneurship, digital work, and community development with dignity and independence." delay="0.4s" />
            </div>
          </div>
          
          <div className="space-y-6 animate-slide-in-right">
            <div className="relative group overflow-hidden rounded-2xl shadow-soft">
              <div className="absolute inset-0 bg-brand-900/10 mix-blend-multiply transition-opacity group-hover:opacity-0 duration-500" />
              <img className="h-56 md:h-72 w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105" src="/uploads/typing.jpg" alt="GPI W Typing Class" />
            </div>
            
            <div className="rounded-2xl bg-brand-900 p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold/10 rounded-full blur-xl pointer-events-none" />
              <h2 className="text-2xl font-black text-gold tracking-tight">Principal Message</h2>
              <p className="mt-4 leading-relaxed text-brand-50/95 font-medium italic">"{settings.principal_message}"</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Info({ title, text, delay }) {
  return (
    <div 
      style={{ animationDelay: delay }}
      className="rounded-2xl bg-brand-50/50 p-6 border border-brand-100/30 shadow-soft transition-all duration-300 hover:scale-105 hover:bg-brand-50 animate-fade-in-up"
    >
      <h2 className="font-extrabold text-brand-950 text-base">{title}</h2>
      <p className="mt-2.5 text-sm leading-relaxed text-slate-600 font-medium">{text}</p>
    </div>
  );
}
