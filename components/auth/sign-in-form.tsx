"use client";

import { signInSchema } from "@/lib/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import { Eye, EyeOff, Github, Mail } from "lucide-react";
import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, isLoaded, setActive } = useSignIn();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    if (!isLoaded) return;

    setLoading(true);

    try {
      const result = await signIn.create({
        identifier: values.email,
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col w-full text-start"
      >
        <FormField
          control={form.control}
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
          {loading ? "Signing in..." : "Sign in using Email"}
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
      </form>
    </Form>
  );
};

export default SignInForm;
