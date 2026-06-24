import { requireAdmin } from "@/lib/auth";
import { handleError, ok } from "@/lib/api";
import { one } from "@/lib/db";
import { isDatabaseConfigured } from "@/lib/content";

export async function GET() {
  try {
    await requireAdmin();
    if (!isDatabaseConfigured()) {
      return ok({ stats: { courses: 5, announcements: 2, gallery: 3, alumni: 0, messages: 0 } });
    }
    try {
      const [courses, announcements, gallery, alumni, messages] = await Promise.all([
        one("SELECT COUNT(*) total FROM courses"),
        one("SELECT COUNT(*) total FROM announcements"),
        one("SELECT COUNT(*) total FROM gallery"),
        one("SELECT COUNT(*) total FROM alumni"),
        one("SELECT COUNT(*) total FROM contact_messages")
      ]);
      return ok({ stats: { courses: courses.total, announcements: announcements.total, gallery: gallery.total, alumni: alumni.total, messages: messages.total } });
    } catch {
      return ok({ stats: { courses: 5, announcements: 2, gallery: 3, alumni: 0, messages: 0 } });
    }
  } catch (error) {
    return handleError(error);
  }
}
