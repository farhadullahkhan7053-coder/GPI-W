import { ok, handleError, readJson } from "@/lib/api";
import { hashPassword, requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import { isDatabaseConfigured } from "@/lib/content";

export async function PUT(request) {
  try {
    const session = await requireAdmin();
    const data = await readJson(request);
    if (!isDatabaseConfigured()) return ok({ message: "Demo mode: configure MySQL to persist profile changes." });
    const updates = { id: session.id, name: data.name || session.name, email: data.email || session.email };
    await query("UPDATE users SET name=:name, email=:email WHERE id=:id", updates);
    if (data.password) {
      await query("UPDATE users SET password=:password WHERE id=:id", { id: session.id, password: await hashPassword(data.password) });
    }
    return ok();
  } catch (error) {
    return handleError(error);
  }
}
