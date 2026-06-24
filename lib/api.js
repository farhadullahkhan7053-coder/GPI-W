import { NextResponse } from "next/server";

export function ok(data = {}, status = 200) {
  return NextResponse.json({ ok: true, ...data }, { status });
}

export function fail(message = "Something went wrong", status = 500, details = null) {
  return NextResponse.json({ ok: false, message, details }, { status });
}

export function handleError(error) {
  if (error?.issues) return fail("Validation failed", 422, error.issues);
  if (error?.status) return fail(error.message, error.status);
  console.error(error);
  return fail("Server error", 500);
}

export async function readJson(request, schema) {
  const body = await request.json();
  return schema ? schema.parse(body) : body;
}
