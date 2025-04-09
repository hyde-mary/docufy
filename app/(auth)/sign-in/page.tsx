import SignInForm from "@/components/auth/sign-in-form";
import Image from "next/image";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="bg-[#18181b] text-[#f0f0f0] border-r flex flex-col p-8 px-12">
        <div className="flex-grow text-xl font-bold">
          <div className="flex items-center space-x-4">
            <Image
              src="/logo.png"
              alt="Docufy Logo"
              width={35}
              height={35}
              className="light:invert"
            />
            <p>Docufy</p>
          </div>
        </div>
        <div className="text-lg text-[#f0f0f0] font-medium text-justify">
          &quot; With Documenti-fy, your company do not need to worry about
          creating another web application for your documentation. We, at
          Docufy, handle it all for you. You can use our built-in Documentation
          Editor, or provide your own using a structure .json format &quot;
          <br />
          <br />
          <span className="text-white">hyde-mary</span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="max-w-5xl text-center space-y-4">
          <h1 className="text-2xl font-bold">Sign in to your account</h1>
          <p className="text-muted-foreground">
            Enter your email and your password to sign in to your account.
            <br />
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline">
              Create an account.
            </Link>
          </p>
          <div className="mt-8">
            <SignInForm />
          </div>
          <p className="text-sm text-muted-foreground text-center px-8 leading-5 mt-8">
            By continuing, you agree to our{" "}
            <Link href="#" className="underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
