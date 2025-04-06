import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-start h-screen">
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
      <div></div>
    </div>
  );
};

export default LandingPage;
