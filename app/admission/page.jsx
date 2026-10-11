import Link from "next/link";
import { CalendarCheck, FileText, GraduationCap, ListChecks, Download } from "lucide-react";
import FlyerLightbox from "@/components/FlyerLightbox";
import ApplyNowButton from "@/components/ApplyNowButton";
import { getSettings } from "@/lib/content";

export const metadata = { title: "Admission | GTVC Parova" };

export default async function AdmissionPage() {
  const settings = await getSettings();
  return (
    <section className="section bg-white min-h-[70vh]">
      <div className="container">
        <div className="animate-fade-in-down">
          <p className="font-extrabold text-gold uppercase tracking-wider text-xs">Admission</p>
          <h1 className="section-title mt-3 text-brand-950 font-black tracking-tight leading-none">Admission information and process</h1>
        </div>

        {/* Advertisement Flyer Section with Lightbox */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center bg-slate-50/50 rounded-3xl p-8 border border-slate-100 shadow-soft animate-fade-in-up">
          <div>
            <p className="font-extrabold text-gold uppercase tracking-wider text-xs">Official Advertisement</p>
            <h2 className="text-3xl font-black text-brand-950 tracking-tight mt-3">Admissions Open — Current Session</h2>
            <p className="mt-4 leading-relaxed text-slate-600 font-medium text-base">
              {settings.institute_name} announces admissions for the current academic session. Explore our accredited programs and vocational courses designed to build career-ready skills.
            </p>
            <div className="mt-6 space-y-3 font-semibold text-brand-950 text-sm">
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                DAE (3-Year) in Computer & Fashion Designing
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                DIT (1-Year) & Short Courses / RPL Programs
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                Hostel and Daycare Facilities Available
              </p>
            </div>
            <div className="mt-8">
              <FlyerLightbox mode="button" />
            </div>
          </div>
          <FlyerLightbox mode="image" />
        </div>
        
        {/* Step List */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Step 
            icon={GraduationCap} 
            title="Choose Program" 
            text="Review available technical and vocational courses." 
            delay="0.1s"
          />
          <Step 
            icon={FileText} 
            title="Prepare Documents" 
            text="Bring CNIC/B-Form, photographs, certificates, and domicile if required." 
            delay="0.2s"
          />
          <Step 
            icon={ListChecks} 
            title="Submit Form" 
            text="Obtain the admission form for 500 rupees and submit it at the office before the deadline." 
            delay="0.3s"
          />
          <Step 
            icon={CalendarCheck} 
            title="Merit & Classes" 
            text="Follow announced merit lists, fee schedule, and class start dates." 
            delay="0.4s"
          />
        </div>
        
        {/* Info Grid */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Info 
            title="Eligibility Criteria" 
            items={[
              "Matric, Middle, or equivalent qualification depending on course",
              "Women applicants from D.I. Khan and surrounding areas",
              "Original documents required for verification"
            ]} 
            delay="0.2s"
          />
          <Info 
            title="Required Documents" 
            items={[
              "Educational certificates",
              "CNIC/B-Form copy",
              "Father/guardian CNIC copy",
              "Recent passport-size photographs",
              "Domicile or residence proof where applicable"
            ]} 
            delay="0.3s"
          />
          <Info 
            title="Admission Fee & Charges" 
            items={[
              "Admission Form Price: 500 Rupees",
              "Payable at the institute office upon collection",
              "Includes prospectus and processing charges"
            ]} 
            delay="0.4s"
          />
        </div>
        
        {/* Action Buttons */}
        <div className="mt-12 flex flex-wrap gap-4 animate-fade-in-up [animation-delay:0.4s]">
          <ApplyNowButton 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-brand-800 hover:bg-brand-900 px-6 py-3.5 font-bold text-white shadow-md transition-all hover:scale-105 active:scale-95 text-sm"
            label="Apply Online Now"
          />
          <a 
            href="#" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-brand-200 bg-white px-6 py-3.5 font-bold text-brand-800 transition-all duration-300 hover:bg-brand-50 hover:border-brand-350 hover:scale-105 active:scale-95 text-sm"
          >
            <Download size={18} /> Download Prospectus
          </a>
        </div>
      </div>
    </section>
  );
}

function Step({ icon: Icon, title, text, delay }) {
  return (
    <div 
      style={{ animationDelay: delay }}
      className="rounded-2xl bg-brand-50/50 p-6 border border-brand-100/30 shadow-soft transition-all duration-300 hover:scale-105 hover:bg-brand-50 hover:shadow-md animate-fade-in-up"
    >
      <div className="inline-flex rounded-xl bg-brand-700 p-3 text-white">
        <Icon size={20} className="stroke-[2.5]" />
      </div>
      <h2 className="mt-5 text-xl font-black text-brand-900 leading-snug">{title}</h2>
      <p className="mt-2.5 text-sm leading-relaxed text-slate-650 font-medium">{text}</p>
    </div>
  );
}

function Info({ title, items, delay }) {
  return (
    <div 
      style={{ animationDelay: delay }}
      className="rounded-2xl bg-white p-8 border border-slate-100 shadow-soft transition-all duration-500 hover:shadow-md animate-fade-in-up"
    >
      <h2 className="text-2xl font-black text-brand-950 tracking-tight">{title}</h2>
      <ul className="mt-6 space-y-4 text-slate-600 font-medium text-sm">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-gold font-extrabold">•</span>
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
