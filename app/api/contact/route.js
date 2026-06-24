import { ok, handleError, readJson } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { query } from "@/lib/db";
import { contactSchema } from "@/lib/validators";
import { isDatabaseConfigured, getMockDB, saveMockDB } from "@/lib/content";

export async function GET() {
  try {
    await requireAdmin();
    if (!isDatabaseConfigured()) {
      return ok({ items: getMockDB().contact_messages || [] });
    }
    try {
      return ok({ items: await query("SELECT * FROM contact_messages ORDER BY created_at DESC") });
    } catch {
      return ok({ items: [] });
    }
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request) {
  try {
    const data = await readJson(request, contactSchema);
    if (!isDatabaseConfigured()) {
      const db = getMockDB();
      const nextId = (db.contact_messages || []).reduce((max, m) => Math.max(max, m.id), 0) + 1;
      const newMsg = { id: nextId, ...data, status: "unread", created_at: new Date().toISOString() };
      db.contact_messages = db.contact_messages || [];
      db.contact_messages.unshift(newMsg);
      saveMockDB(db);
      return ok({ id: nextId, message: "Message sent successfully in demo mode." }, 201);
    }
    const result = await query("INSERT INTO contact_messages (name, email, phone, subject, message) VALUES (:name, :email, :phone, :subject, :message)", data);
    return ok({ id: result.insertId }, 201);
  } catch (error) {
    return handleError(error);
  }
}
