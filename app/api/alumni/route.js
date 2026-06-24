import { ok, handleError } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import { alumniSchema } from "@/lib/validators";
import { isDatabaseConfigured, getMockDB, saveMockDB } from "@/lib/content";

export async function GET() {
  try {
    await requireAdmin();
    if (!isDatabaseConfigured()) {
      return ok({ items: getMockDB().alumni || [] });
    }
    try {
      return ok({ items: await query("SELECT * FROM alumni ORDER BY created_at DESC") });
    } catch {
      return ok({ items: [] });
    }
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request) {
  try {
    const data = alumniSchema.parse({ ...(await request.json()), status: "pending" });
    if (!isDatabaseConfigured()) {
      const db = getMockDB();
      const nextId = (db.alumni || []).reduce((max, a) => Math.max(max, a.id), 0) + 1;
      const newAlum = { id: nextId, ...data };
      db.alumni = db.alumni || [];
      db.alumni.unshift(newAlum);
      saveMockDB(db);
      return ok({ id: nextId, message: "Registration received successfully in demo mode." }, 201);
    }
    const result = await query(
      "INSERT INTO alumni (full_name, father_name, course, passing_year, phone, email, current_status, organization, city, success_story, status) VALUES (:full_name, :father_name, :course, :passing_year, :phone, :email, :current_status, :organization, :city, :success_story, :status)",
      data
    );
    return ok({ id: result.insertId }, 201);
  } catch (error) {
    return handleError(error);
  }
}
