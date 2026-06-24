import { ok, handleError } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { saveUpload } from "@/lib/upload";

export async function POST(request) {
  try {
    await requireAdmin();
    const form = await request.formData();
    const file = form.get("file");
    const folder = form.get("folder") || "general";
    return ok({ path: await saveUpload(file, folder) }, 201);
  } catch (error) {
    return handleError(error);
  }
}
