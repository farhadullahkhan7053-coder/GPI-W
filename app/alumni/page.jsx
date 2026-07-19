import AlumniForm from "@/components/AlumniForm";
import AlumniCard3D from "@/components/AlumniCard3D";
import { query } from "@/lib/db";

export const metadata = { title: "Alumni Portal | GPI W D.I. Khan" };

export default async function AlumniPage() {
  let alumni = [];
  try {
    alumni = await query("SELECT * FROM alumni WHERE status = 'approved' ORDER BY created_at DESC LIMIT 50");
  } catch {}
  
  return (
    <section className="section bg-white min-h-[70vh]">
      <div className="container">
        <div className="animate-fade-in-down">
          <p className="font-extrabold text-gold uppercase tracking-wider text-xs">Alumni Portal</p>
          <h1 className="section-title mt-3 text-brand-950 font-black tracking-tight leading-none">Register and connect with GPI W alumni</h1>
        </div>
        
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr] items-start">
          <AlumniForm />
          
          <div className="animate-slide-in-right">
            <h2 className="text-2xl font-black text-brand-950 tracking-tight">Alumni Directory</h2>
            <p className="text-slate-500 text-sm mt-1 font-medium">Inspiring success stories from our graduates.</p>
            
            <div className="mt-6 grid gap-4 max-h-[600px] overflow-y-auto pr-2">
              {alumni.map((item, idx) => (
                <AlumniCard3D 
                  key={item.id} 
                  item={item} 
                  delay={`${(idx + 1) * 0.1}s`} 
                />
              ))}
              
              {!alumni.length && (
                <p className="rounded-2xl bg-brand-50/50 p-8 text-center text-slate-500 border border-brand-100/30 font-medium">
                  Approved alumni profiles will appear here.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
