import { ok, handleError, readJson } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import { isDatabaseConfigured, getMockDB, saveMockDB } from "@/lib/content";

export async function PATCH(request, { params }) {
  try {
    await requireAdmin();
    const { id } = await params;
    const data = await readJson(request);
    if (!isDatabaseConfigured()) {
      const db = getMockDB();
      const index = db.alumni.findIndex(a => a.id === Number(id));
      if (index !== -1) {
        db.alumni[index].status = data.status;
        saveMockDB(db);
      }
      return ok();
    }
    await query("UPDATE alumni SET status=:status WHERE id=:id", { id, status: data.status });
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
      db.alumni = db.alumni.filter(a => a.id !== Number(id));
      saveMockDB(db);
      return ok();
    }
    await query("DELETE FROM alumni WHERE id=:id", { id });
    return ok();
  } catch (error) {
    return handleError(error);
  }
}
