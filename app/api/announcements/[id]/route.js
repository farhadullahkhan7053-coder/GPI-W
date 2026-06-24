import { ok, handleError, readJson } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import { announcementSchema } from "@/lib/validators";
import { isDatabaseConfigured, getMockDB, saveMockDB } from "@/lib/content";

export async function PUT(request, { params }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const data = await readJson(request, announcementSchema);
    if (!isDatabaseConfigured()) {
      const db = getMockDB();
      const index = db.announcements.findIndex(a => a.id === Number(id));
      if (index !== -1) {
        db.announcements[index] = { ...db.announcements[index], ...data };
        saveMockDB(db);
      }
      return ok();
    }
    await query("UPDATE announcements SET title=:title, description=:description, category=:category, date=:date, is_important=:is_important, status=:status, attachment=:attachment WHERE id=:id", { ...data, id });
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
      db.announcements = db.announcements.filter(a => a.id !== Number(id));
      saveMockDB(db);
      return ok();
    }
    await query("DELETE FROM announcements WHERE id=:id", { id });
    return ok();
  } catch (error) {
    return handleError(error);
  }
}
