import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/",
  "/editor(.*)",
  "/projects(.*)",
  "/publish(.*)",
  "/trash(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const url = new URL(req.nextUrl);
  const { userId } = await auth();

  if (req.nextUrl.pathname === "/" && !userId) {
    return NextResponse.redirect(new URL("/landing", url.origin));
  }

  if (isProtectedRoute(req) && !userId) {
    return NextResponse.redirect(new URL("/landing", url.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|static|favicon.ico|landing).*)", "/(api|trpc)(.*)"],
};
