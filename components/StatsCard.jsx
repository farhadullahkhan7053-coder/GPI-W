export default function StatsCard({ label, value, style }) {
  return (
    <div style={style} className="rounded-2xl bg-white/5 backdrop-blur-md p-8 text-center border border-white/10 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:border-gold/40 hover:bg-white/[0.08] animate-fade-in-up">
      <p className="text-4xl md:text-5xl font-black text-gold tracking-tight">{value}</p>
      <p className="mt-2.5 text-xs md:text-sm font-extrabold uppercase tracking-widest text-brand-100/90">{label}</p>
    </div>
  );
}
