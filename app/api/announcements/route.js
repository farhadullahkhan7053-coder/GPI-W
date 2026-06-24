import { ok, handleError, readJson } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import { announcementSchema } from "@/lib/validators";
import { getPublicAnnouncements, isDatabaseConfigured, getMockDB, saveMockDB } from "@/lib/content";

export async function GET(request) {
  try {
    const admin = request.nextUrl.searchParams.get("admin");
    if (admin) await requireAdmin();
    if (admin && !isDatabaseConfigured()) return ok({ items: await getPublicAnnouncements(100) });
    if (!admin) return ok({ items: await getPublicAnnouncements(100) });
    const sql = admin ? "SELECT * FROM announcements ORDER BY date DESC" : "SELECT * FROM announcements WHERE status='published' ORDER BY is_important DESC, date DESC";
    try {
      return ok({ items: await query(sql) });
    } catch {
      return ok({ items: await getPublicAnnouncements(100) });
    }
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request) {
  try {
    await requireAdmin();
    const data = await readJson(request, announcementSchema);
    if (!isDatabaseConfigured()) {
      const db = getMockDB();
      const nextId = db.announcements.reduce((max, a) => Math.max(max, a.id), 0) + 1;
      const newAnn = { id: nextId, ...data };
      db.announcements.unshift(newAnn);
      saveMockDB(db);
      return ok({ id: nextId }, 201);
    }
    const result = await query("INSERT INTO announcements (title, description, category, date, is_important, status, attachment) VALUES (:title, :description, :category, :date, :is_important, :status, :attachment)", data);
    return ok({ id: result.insertId }, 201);
  } catch (error) {
    return handleError(error);
  }
}
