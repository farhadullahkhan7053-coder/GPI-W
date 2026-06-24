import { CalendarDays, Megaphone } from "lucide-react";

export default function AnnouncementCard({ announcement, style }) {
  const isImportant = announcement.is_important;
  return (
    <article 
      style={style}
      className={`rounded-2xl bg-white p-7 shadow-soft border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 animate-fade-in-up ${
        isImportant ? "border-l-4 border-l-gold" : "border-l-4 border-l-brand-600"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-brand-700">
            <Megaphone size={12} className="text-brand-600" /> {announcement.category}
          </span>
          {isImportant && (
            <span className="inline-flex items-center rounded-full bg-gold/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-brand-950 ring-1 ring-gold/20">
              Important
            </span>
          )}
        </div>
        <p className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
          <CalendarDays size={14} /> {String(announcement.date).slice(0, 10)}
        </p>
      </div>
      
      <h3 className="mt-4 text-xl font-black text-brand-900 leading-snug group-hover:text-brand-700 transition-colors">
        {announcement.title}
      </h3>
      
      <p className="mt-3 text-sm leading-relaxed text-slate-600 font-medium">
        {announcement.description}
      </p>
      
      {announcement.attachment && (
        <div className="mt-5 pt-4 border-t border-slate-50">
          <a 
            href={announcement.attachment} 
            className="inline-flex items-center text-sm font-extrabold text-brand-700 hover:text-brand-950 transition-colors"
          >
            📎 Download Attachment
          </a>
        </div>
      )}
    </article>
  );
}
