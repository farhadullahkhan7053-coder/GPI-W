import path from "path";
import { mkdir, writeFile } from "fs/promises";

const MAX_FILE_SIZE = 4 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf"]);

export async function saveUpload(file, folder = "general") {
  if (!file || file.size === 0) return "";
  if (file.size > MAX_FILE_SIZE) throw new Error("File is too large. Maximum size is 4MB.");
  if (!ALLOWED_TYPES.has(file.type)) throw new Error("Unsupported file type.");

  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name || "").toLowerCase() || ".bin";
  const safeFolder = folder.replace(/[^a-z0-9-]/gi, "").toLowerCase() || "general";
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", safeFolder);
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, fileName), bytes);
  return `/uploads/${safeFolder}/${fileName}`;
}
