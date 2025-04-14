import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRouteForSignedOut = createRouteMatcher([
  "/landing",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

const isPublishRoute = createRouteMatcher(["/publish/[username]/[slug]"]);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();
  const url = new URL(request.nextUrl);

  if (userId && isPublicRouteForSignedOut(request)) {
    return NextResponse.redirect(new URL("/", url.origin));
  }

  if (isPublishRoute(request)) {
    return NextResponse.next();
  }

  if (!userId && isPublicRouteForSignedOut(request)) {
    const signInUrl = new URL("/landing", url.origin);
    signInUrl.searchParams.set("redirect", url.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
