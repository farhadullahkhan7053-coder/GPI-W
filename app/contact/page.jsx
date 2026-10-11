import { Clock, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { getSettings } from "@/lib/content";

export const metadata = { title: "Contact | GTVC Parova" };

export default async function ContactPage() {
  const settings = await getSettings();
  return (
    <section className="section bg-white min-h-[70vh]">
      <div className="container">
        <div className="animate-fade-in-down">
          <p className="font-extrabold text-gold uppercase tracking-wider text-xs">Contact</p>
          <h1 className="section-title mt-3 text-brand-950 font-black tracking-tight leading-none">Contact the institute office</h1>
        </div>
        
        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-start">
          <div className="space-y-4 animate-slide-in-left">
            <Info icon={Phone} label="Phone Number" value={settings.phone} />
            <Info icon={Mail} label="Email Address" value={settings.email} />
            <Info icon={MapPin} label="Campus Address" value={settings.address} />
            <Info icon={Clock} label="Office Timing" value="Monday to Friday, 8:00 AM to 3:00 PM" />
            
            <div className="relative group overflow-hidden rounded-2xl shadow-soft border border-slate-100 mt-6 h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3393.0!2d70.9016!3d31.8314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393b7f0000000001%3A0x1!2sGovt.+Polytechnic+Institute+for+Women+D.I.+Khan!5e0!3m2!1sen!2spk!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="GPI W D.I. Khan Location Map"
              />
            </div>
          </div>
          
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="flex gap-4 rounded-2xl bg-brand-50/50 border border-brand-100/30 p-5 items-center transition-all duration-300 hover:bg-brand-50 hover:shadow-sm">
      <div className="rounded-xl bg-brand-700 p-3 text-white">
        <Icon className="shrink-0" size={18} className="stroke-[2.5]" />
      </div>
      <div>
        <p className="font-extrabold text-brand-950 text-sm">{label}</p>
        <p className="text-slate-600 mt-0.5 text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}
