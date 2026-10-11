import { BookOpen, Brush, Building2, Computer, Scissors, Sparkles, UsersRound, Wrench, Move3d } from "lucide-react";
import DraftingLab3DSection from "@/components/DraftingLab3DSection";

export const metadata = { title: "Facilities & 3D Lab Tour | GPIW D.I. Khan" };

const facilities = [
  {
    name: "Drafting & Pattern Making Lab",
    icon: Scissors,
    tag: "3D Virtual Available",
    desc: "Precision drafting worktables, A1 metric cutting mats, L-squares, French curves, and dressmaker mannequins for vocational garment design."
  },
  {
    name: "Computer & CAD Lab",
    icon: Computer,
    tag: "Information Tech",
    desc: "Modern networked computer workstations equipped for DIT, office automation, web development, and digital graphics."
  },
  {
    name: "Fashion Design Studio",
    icon: Brush,
    tag: "Creative Arts",
    desc: "Creative space equipped for fashion illustration, fabric dyeing, color composition, and motif embroidery development."
  },
  {
    name: "Dress Making & Tailoring Workshop",
    icon: Scissors,
    tag: "Practical Stitching",
    desc: "Industrial sewing machines, overlock stations, pressing equipment, and garment fabrication workbenches."
  },
  {
    name: "Beauty Therapy & Cosmetology Lab",
    icon: Sparkles,
    tag: "Personal Care",
    desc: "Dedicated personal grooming stations, skincare apparatus, hair styling equipment, and professional aesthetic toolkits."
  },
  {
    name: "Reference Library",
    icon: BookOpen,
    tag: "Academic Resources",
    desc: "Curated collection of polytechnic textbooks, technical reference manuals, periodicals, and quiet study spaces."
  },
  {
    name: "Multimedia Classrooms",
    icon: Building2,
    tag: "Theoretical Learning",
    desc: "Well-ventilated, well-lit lecture rooms with audiovisual projectors for theoretical coursework and interactive discussions."
  },
  {
    name: "Student Support & Career Services",
    icon: UsersRound,
    tag: "Guidance & Placement",
    desc: "Counseling desk, job placement guidance, NAVTTC assessment coordination, and entrepreneurship mentoring."
  }
];

export default function FacilitiesPage() {
  return (
    <div className="bg-white">
      {/* 1. Page Header */}
      <section className="bg-brand-900 text-white py-16 border-b border-brand-800">
        <div className="container">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 border border-gold/30 px-3.5 py-1 text-xs font-black uppercase tracking-widest text-gold mb-4">
              Campus Infrastructure • GPIW D.I. Khan
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              State-of-the-Art Labs, Studios & Learning Facilities
            </h1>
            <p className="mt-4 text-slate-350 text-base md:text-lg leading-relaxed font-medium">
              Explore our technical laboratories designed to meet provincial TEVTA and national NAVTTC competency-based standards.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CENTERPIECE: 3D Visualization for Drafting & Pattern Making Lab */}
      <DraftingLab3DSection />

      {/* 3. Comprehensive Facilities Grid */}
      <section className="section bg-slate-50/50">
        <div className="container">
          <div className="mb-12">
            <span className="font-extrabold text-gold uppercase tracking-wider text-xs">All Campus Facilities</span>
            <h2 className="section-title mt-2 text-brand-950 font-black tracking-tight">
              Workshops & Student Support
            </h2>
            <p className="text-slate-600 text-sm md:text-base mt-2 max-w-2xl font-medium">
              Every workshop is strictly managed to ensure safe, hands-on experiential learning for female students.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {facilities.map((fac, idx) => {
              const Icon = fac.icon;
              return (
                <div 
                  key={fac.name} 
                  style={{ animationDelay: `${(idx + 1) * 0.08}s` }}
                  className="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-soft transition-all duration-300 hover:scale-103 hover:border-brand-500/30 hover:shadow-xl animate-fade-in-up group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="inline-flex rounded-xl bg-brand-700 group-hover:bg-brand-600 p-3.5 text-white transition-colors shadow-sm">
                        <Icon size={22} className="stroke-[2.2]" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-gold bg-gold/10 px-2 py-0.5 rounded">
                        {fac.tag}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-brand-900 group-hover:text-brand-700 transition-colors leading-snug">
                      {fac.name}
                    </h3>
                    <p className="mt-3 text-xs leading-relaxed text-slate-600 font-medium">
                      {fac.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
