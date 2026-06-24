import { ok, handleError, readJson } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import { courseSchema } from "@/lib/validators";
import { getPublicCourses, isDatabaseConfigured, getMockDB, saveMockDB } from "@/lib/content";

export async function GET(request) {
  try {
    const admin = request.nextUrl.searchParams.get("admin");
    if (admin) await requireAdmin();
    if (admin && !isDatabaseConfigured()) return ok({ items: await getPublicCourses(100) });
    if (!admin) return ok({ items: await getPublicCourses(100) });
    const sql = admin ? "SELECT * FROM courses ORDER BY created_at DESC" : "SELECT * FROM courses WHERE status = 'published' ORDER BY created_at DESC";
    try {
      return ok({ items: await query(sql) });
    } catch {
      return ok({ items: await getPublicCourses(100) });
    }
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request) {
  try {
    await requireAdmin();
    const data = await readJson(request, courseSchema);
    if (!isDatabaseConfigured()) {
      const db = getMockDB();
      const nextId = db.courses.reduce((max, c) => Math.max(max, c.id), 0) + 1;
      const newCourse = { id: nextId, ...data };
      db.courses.unshift(newCourse);
      saveMockDB(db);
      return ok({ id: nextId }, 201);
    }
    const result = await query(
      "INSERT INTO courses (title, slug, duration, eligibility, short_description, full_description, skills, career_opportunities, image, status) VALUES (:title, :slug, :duration, :eligibility, :short_description, :full_description, :skills, :career_opportunities, :image, :status)",
      data
    );
    return ok({ id: result.insertId }, 201);
  } catch (error) {
    return handleError(error);
  }
}
