import { authenticate, createToken } from "@/lib/auth";
import { ok, fail, handleError, readJson } from "@/lib/api";
import { loginSchema } from "@/lib/validators";

export async function POST(request) {
  try {
    const data = await readJson(request, loginSchema);
    const user = await authenticate(data.email, data.password);
    if (!user) return fail("Invalid email or password", 401);
    const response = ok({ user });
    response.cookies.set("gpiw_admin", await createToken(user), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_SITE_URL?.startsWith("https://"),
      path: "/",
      maxAge: 60 * 60 * 8
    });
    return response;
  } catch (error) {
    return handleError(error);
  }
}
