import GalleryGrid from "@/components/GalleryGrid";
import { getPublicGallery } from "@/lib/content";

export const metadata = { title: "Gallery | GPI W D.I. Khan" };

export default async function GalleryPage() {
  const images = await getPublicGallery(200);
  return (
    <section className="section bg-white min-h-[70vh]">
      <div className="container">
        <div className="animate-fade-in-down">
          <p className="font-extrabold text-gold uppercase tracking-wider text-xs">Gallery</p>
          <h1 className="section-title mt-3 text-brand-950 font-black tracking-tight leading-none">Institute activities and learning spaces</h1>
        </div>
        <div className="mt-12"><GalleryGrid images={images} /></div>
      </div>
    </section>
  );
}
