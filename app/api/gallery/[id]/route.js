import { ok, handleError, readJson } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import { gallerySchema } from "@/lib/validators";
import { isDatabaseConfigured, getMockDB, saveMockDB } from "@/lib/content";

export async function PUT(request, { params }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const data = await readJson(request, gallerySchema);
    if (!isDatabaseConfigured()) {
      const db = getMockDB();
      const index = db.gallery.findIndex(g => g.id === Number(id));
      if (index !== -1) {
        db.gallery[index] = { ...db.gallery[index], ...data };
        saveMockDB(db);
      }
      return ok();
    }
    await query("UPDATE gallery SET title=:title, category=:category, image=:image WHERE id=:id", { ...data, id });
    return ok();
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(_request, { params }) {
  try {
    await requireAdmin();
    const { id } = await params;
    if (!isDatabaseConfigured()) {
      const db = getMockDB();
      db.gallery = db.gallery.filter(g => g.id !== Number(id));
      saveMockDB(db);
      return ok();
    }
    await query("DELETE FROM gallery WHERE id=:id", { id });
    return ok();
  } catch (error) {
    return handleError(error);
  }
}
