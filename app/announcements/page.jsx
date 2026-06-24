import AnnouncementCard from "@/components/AnnouncementCard";
import { getPublicAnnouncements } from "@/lib/content";

export const metadata = { title: "Announcements | GPI W D.I. Khan" };

export default async function AnnouncementsPage() {
  const announcements = await getPublicAnnouncements(100);
  return (
    <section className="section bg-white min-h-[70vh]">
      <div className="container">
        <div className="animate-fade-in-down">
          <p className="font-extrabold text-gold uppercase tracking-wider text-xs">Announcements</p>
          <h1 className="section-title mt-3 text-brand-950 font-black tracking-tight leading-none">Latest updates and notices</h1>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {announcements.map((item, idx) => (
            <AnnouncementCard 
              key={item.id} 
              announcement={item} 
              style={{ animationDelay: `${(idx + 1) * 0.15}s` }}
            />
          ))}
        </div>
        {!announcements.length && (
          <p className="mt-12 rounded-2xl bg-brand-50 p-12 text-center text-slate-500 font-medium animate-fade-in">
            No announcements found at this time.
          </p>
        )}
      </div>
    </section>
  );
}
