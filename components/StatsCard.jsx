export default function StatsCard({ label, value, icon: Icon, style }) {
  return (
    <div 
      style={style} 
      className="group relative rounded-2xl bg-white p-6 sm:p-8 text-center border border-slate-200/80 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-brand-500/30 animate-fade-in-up"
    >
      {Icon && (
        <div className="mx-auto mb-3.5 inline-flex rounded-xl bg-brand-50 group-hover:bg-brand-700 p-3 text-brand-700 group-hover:text-white transition-all duration-300 shadow-sm">
          <Icon size={24} className="stroke-[2.2]" />
        </div>
      )}
      <p className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-900 group-hover:text-brand-700 tracking-tight transition-colors">
        {value}
      </p>
      <p className="mt-2 text-xs md:text-sm font-extrabold uppercase tracking-wider text-slate-500 group-hover:text-gold-dark transition-colors">
        {label}
      </p>
    </div>
  );
}
