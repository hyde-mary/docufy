import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-start h-screen">
      {/* navbar */}
      <div className="w-full flex items-center justify-between p-4 border-b-2">
        <div className="text-lg font-bold">Docufy</div>
        <div className="flex space-x-2">
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
            <Button
              size="lg"
              variant="outline"
              className="px-8 hover:cursor-pointer"
            >
              Live Demo
            </Button>
            <SignUpButton>
              <Button size="lg" className="px-8 hover:cursor-pointer">
                Get Started
              </Button>
            </SignUpButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
