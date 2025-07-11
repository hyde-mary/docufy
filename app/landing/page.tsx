"use client";

import { useConvexAuth } from "convex/react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";

import { ChevronRight } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

const LandingPage = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col items-center justify-start h-screen">
      {/* navbar */}
      <div className="w-full flex items-center justify-between p-4 border-b-2">
        <div className="text-lg font-bold flex items-center justify-center space-x-2">
          <Image
            src="/logo.png"
            alt="Docufy Logo"
            width={35}
            height={35}
            className="invert dark:invert-0"
          />
          <p>Docufy</p>
        </div>
        <div className="flex space-x-4">
          <div className="flex space-x-4">
            {/* not authenticated and is done loading */}
            {!isAuthenticated && !isLoading && (
              <>
                <SignInButton>
                  <Button
                    variant="ghost"
                    className="px-3 text-sm hover:cursor-pointer font-medium"
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button className="px-3 text-sm hover:cursor-pointer font-medium">
                    Get Started
                  </Button>
                </SignUpButton>
              </>
            )}

            {/* is auth and is done loading */}
            {isAuthenticated && !isLoading && (
              <Link href={"/"}>
                <Button
                  variant={"default"}
                  className="flex items-center justify-center font-bold hover:cursor-pointer"
                >
                  Go to Dashboard
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* main content goes here */}
      <div className="h-screen w-full flex items-center justify-center px-4 bg-gradient-to-br from-background to-muted/10">
        <div className="max-w-4xl text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary shadow-sm ring-1 ring-primary/20 backdrop-blur-sm">
            🚀 Documentify • Now in Beta
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
            Design <span className="text-primary">Beautiful</span>, Minimalist
            <br className="hidden md:block" /> Documentation.
            <br />
            Share It in Seconds.{" "}
            <span className="underline decoration-primary/30 underline-offset-8 hover:decoration-primary transition-all duration-300">
              Docufy.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Simplify your documentation process with Docufy. Create, edit, and
            share your technical docs effortlessly with our intuitive platform.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            {!isAuthenticated ? (
              <SignUpButton>
                <Button className="px-3 text-sm hover:cursor-pointer font-medium">
                  Get Started
                </Button>
              </SignUpButton>
            ) : (
              <Link href="/">
                <Button className="px-3 text-sm hover:cursor-pointer font-medium">
                  Go to Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
