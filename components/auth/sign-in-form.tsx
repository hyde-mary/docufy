"use client";

import { useSignIn } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Eye, EyeOff, Mail } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { signInSchema } from "@/lib/schemas/authSchema";

const SignInForm = () => {
  const { signIn, isLoaded, setActive } = useSignIn();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    if (!isLoaded) return;

    setLoading(true);

    try {
      const result = await signIn.create({
        identifier: values.identifier,
        password: values.password,
      });

      if (result.status === "complete") {
        toast.success("Sign In Successful!");
        await setActive({ session: signIn.createdSessionId });
        router.replace("/");
      }
    } catch {
      toast.error("Sign In Failed! Check your Credentials");
    } finally {
      setLoading(false);
    }
  };

  const signInWith = (strategy: OAuthStrategy) => {
    if (!signIn) return null;

    if (!isLoaded) {
      return;
    }

    return signIn
      .authenticateWithRedirect({
        strategy,
        redirectUrl: "/sign-in/sso-callback",
        redirectUrlComplete: "/",
      })
      .catch((error) => {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        if (isClerkAPIResponseError(error)) toast.error(error.message);
      });
  };

  if (!signIn) return null;

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex flex-col w-full text-start"
        >
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Email or Username</FormLabel>
                <FormControl>
                  <Input placeholder="hydemary@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
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
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 hover:cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div id="clerk-captcha" />

          <span className="text-sm text-start text-muted-foreground underline">
            Forgot Password?
          </span>

          <Button
            type="submit"
            className={cn(
              "hover:cursor-pointer mt-2 flex items-center",
              loading && "bg-gray-500"
            )}
            disabled={loading}
          >
            <Mail className="w-5 h-5" />
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </Form>

      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-muted" />
        <p className="text-sm text-muted-foreground whitespace-nowrap">
          or continue with
        </p>
        <div className="h-px flex-1 bg-muted" />
      </div>

      <Button
        variant="outline"
        className="hover:cursor-pointer flex items-center w-full"
        onClick={() => signInWith("oauth_github")}
      >
        <FaGithub className="w-5 h-5" />
        Sign in with GitHub
      </Button>
    </div>
  );
};

export default SignInForm;
