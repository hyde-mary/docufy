"use client";

import { signUpSchema, verifySchema } from "@/lib/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import { ArrowLeftCircle, Eye, EyeOff, Github, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const SignUpForm = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const createDefaultProjectMutation = useMutation(
    api.mutations.projects.createDefaultProject
  );

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const verifyForm = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    if (!isLoaded) return;

    setLoading(true);
    setError("");

    try {
      await signUp.create({
        username: values.username,
        emailAddress: values.email,
        password: values.password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      toast.success("Verification Code Sent to your Email.");
      setVerifying(true);
    } catch {
      toast.error("An Error Occurred during Registration");
    }
  };

  const handleVerifySubmit = async (values: z.infer<typeof verifySchema>) => {
    if (!isLoaded) return;

    setVerifyLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: values.code,
      });

      if (completeSignUp.status === "complete") {
        toast.success("Code Successfully Verified!");
        await setActive({ session: completeSignUp.createdSessionId });

        const userId = completeSignUp.createdUserId;

        if (!userId) return null;

        createDefaultProjectMutation({ userId });

        router.push("/");
      } else {
        toast.error("Incorrect Verification Code");
      }
    } catch {
      toast.error(
        "An Error Occured during Verification. Please Try Again Later"
      );
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleResend = async () => {
    if (!isLoaded) return;
    try {
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
    } catch {
      toast.error(
        "An Error Occurred in Sending the Verificaiton Code. Please Try Again Later"
      );
    }
  };

  if (verifying) {
    return (
      <div>
        <div className="text-center space-y-2 mb-6">
          <h1 className="text-2xl font-bold">Verify your email address</h1>
          <p className="text-muted-foreground">
            We&apos;ve sent a 6-digit code to your email address. Enter the 6
            digit code
            <br />
            in the field below then click verify email.
          </p>
        </div>

        <Form {...verifyForm}>
          <form
            onSubmit={verifyForm.handleSubmit(handleVerifySubmit)}
            className="space-y-6 text-start"
          >
            <FormField
              control={verifyForm.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter 6-digit code" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the 6 digit Code we sent to your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className={cn(
                "w-full py-2 px-4 rounded-lg transition duration-200 hover:cursor-pointer",
                verifyLoading && "bg-gray-500 text-white"
              )}
              disabled={verifyLoading}
            >
              {verifyLoading ? "Verifying Email..." : "Verify Email"}
            </Button>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setLoading(false);
                  setVerifying(false);
                }}
                className="flex items-center space-x-2 text-muted-foreground transition duration-200 hover:cursor-pointer hover:underline"
              >
                <ArrowLeftCircle className="h-4 w-4" />
                <p className="text-sm">Back to Sign Up</p>
              </button>
              <button
                onClick={handleResend}
                className="flex items-center space-x-2 text-muted-foreground transition duration-200 hover:cursor-pointer hover:underline"
              >
                <p className="text-sm">Resend Code</p>
              </button>
            </div>
          </form>
        </Form>
      </div>
    );
  }

  return (
    <Form {...signUpForm}>
      <form
        onSubmit={signUpForm.handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col w-full text-start"
      >
        <h1 className="text-2xl font-bold text-center">
          Create an account in Docufy
        </h1>
        <p className="text-muted-foreground text-center">
          Create an account by completing the necessary information below.
          <br />
          Already have an account?{" "}
          <Link href="/sign-in" className="underline">
            Sign In
          </Link>
        </p>
        <FormField
          control={signUpForm.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Username</FormLabel>
              <FormControl>
                <Input placeholder="hydemary" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={signUpForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Email</FormLabel>
              <FormControl>
                <Input placeholder="hydemary@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={signUpForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="• • • • • • • • • • • • • • • •"
                    {...field}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </FormControl>
              <FormDescription>
                Must Contain an Uppercase, a Lowercase, a Number, and a Special
                Character.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={signUpForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="• • • • • • • • • • • • • • • •"
                    {...field}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div id="clerk-captcha" />

        <Button
          type="submit"
          className={cn(
            "hover:cursor-pointer mt-2 flex items-center",
            loading && "bg-gray-500 text-white"
          )}
          disabled={loading}
        >
          <Mail className="w-5 h-5" />
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-muted" />
          <p className="text-sm text-muted-foreground whitespace-nowrap">
            or continue with
          </p>
          <div className="h-px flex-1 bg-muted" />
        </div>
        <Button
          variant="outline"
          className="hover:cursor-pointer flex items-center"
        >
          <Github className="w-5 h-5" />
          Sign in with GitHub
        </Button>

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
      </form>
    </Form>
  );
};

export default SignUpForm;
