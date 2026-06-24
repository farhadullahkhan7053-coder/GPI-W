import { ok, handleError, readJson } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import { gallerySchema } from "@/lib/validators";
import { getPublicGallery, isDatabaseConfigured, getMockDB, saveMockDB } from "@/lib/content";

export async function GET() {
  try {
    return ok({ items: await getPublicGallery(200) });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request) {
  try {
    await requireAdmin();
    const data = await readJson(request, gallerySchema);
    if (!isDatabaseConfigured()) {
      const db = getMockDB();
      const nextId = db.gallery.reduce((max, g) => Math.max(max, g.id), 0) + 1;
      const newGal = { id: nextId, ...data };
      db.gallery.unshift(newGal);
      saveMockDB(db);
      return ok({ id: nextId }, 201);
    }
    const result = await query("INSERT INTO gallery (title, category, image) VALUES (:title, :category, :image)", data);
    return ok({ id: result.insertId }, 201);
  } catch (error) {
    return handleError(error);
  }
}
