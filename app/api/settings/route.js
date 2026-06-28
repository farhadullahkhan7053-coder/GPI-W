import { ok, handleError, readJson } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import { settingsSchema } from "@/lib/validators";
import { getSettings, isDatabaseConfigured, getMockDB, saveMockDB } from "@/lib/content";

export async function GET() {
  try {
    return ok({ settings: await getSettings() });
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(request) {
  try {
    await requireAdmin();
    const data = await readJson(request, settingsSchema);
    if (!isDatabaseConfigured()) {
      const db = getMockDB();
      db.settings = { ...db.settings, ...data };
      saveMockDB(db);
      return ok();
    }
    await query(
      "UPDATE site_settings SET institute_name=:institute_name, short_name=:short_name, tagline=:tagline, mission=:mission, vision=:vision, objectives=:objectives, principal_message=:principal_message, phone=:phone, email=:email, address=:address, facebook=:facebook, instagram=:instagram, youtube=:youtube, whatsapp=:whatsapp WHERE id=1",
      data
    );
    return ok();
  } catch (error) {
    return handleError(error);
  }
}
