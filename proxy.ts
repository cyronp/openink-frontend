import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (request.nextUrl.pathname.startsWith("/write")) {
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      url.searchParams.set("loginRequired", "true");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/write/:path*"],
};
