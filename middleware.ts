import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const { data: { session } } = await supabase.auth.getSession();

  const protectedRoutes = ["/dashboard", "/profile"];
  const pathname = req.nextUrl.pathname;

  if (protectedRoutes.some((r) => pathname.startsWith(r))) {
    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return res;
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
