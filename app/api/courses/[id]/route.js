import { ok, handleError, readJson } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import { courseSchema } from "@/lib/validators";
import { isDatabaseConfigured, getMockDB, saveMockDB } from "@/lib/content";

export async function PUT(request, { params }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const data = await readJson(request, courseSchema);
    if (!isDatabaseConfigured()) {
      const db = getMockDB();
      const index = db.courses.findIndex(c => c.id === Number(id));
      if (index !== -1) {
        db.courses[index] = { ...db.courses[index], ...data };
        saveMockDB(db);
      }
      return ok();
    }
    await query(
      "UPDATE courses SET title=:title, slug=:slug, duration=:duration, eligibility=:eligibility, short_description=:short_description, full_description=:full_description, skills=:skills, career_opportunities=:career_opportunities, image=:image, status=:status WHERE id=:id",
      { ...data, id }
    );
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
      db.courses = db.courses.filter(c => c.id !== Number(id));
      saveMockDB(db);
      return ok();
    }
    await query("DELETE FROM courses WHERE id=:id", { id });
    return ok();
  } catch (error) {
    return handleError(error);
  }
}
