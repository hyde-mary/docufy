import SignUpForm from "@/components/auth/sign-up-form";
import Image from "next/image";

const SignUpPage = () => {
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
          <div className="mt-8">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
