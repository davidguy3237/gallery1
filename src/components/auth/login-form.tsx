"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const LoginSchema = z.object({
  email: z.string().email({ message: "Input a valid email address" }),
  password: z.string().min(1, { message: "Input a valid password" }),
});

type LoginType = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLogin = async ({ email, password }: LoginType) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error?.message === "Invalid login credentials") {
      setLoading(false);
      setErrorMessage("Invalid email or password.");
    } else if (error) {
      setLoading(false);
      console.error("OH NO: ", error.message);
      setErrorMessage("Something went wrong. Try again later.");
    }

    router.refresh();
  };

  return (
    <div className="mx-4 flex min-h-[40rem] w-[30rem] flex-col items-center justify-center">
      <div className="w-full">
        <div className="my-6 text-center text-4xl font-bold">Login</div>
        {errorMessage.length ? (
          <div className="text-center text-destructive">{errorMessage}</div>
        ) : null}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onLogin)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" disabled={loading} {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" mt-2 text-sm">
              <Link
                href={"/forgot-password"}
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <Button type="submit" disabled={loading} size="full">
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
        <div className="my-8 text-sm">
          Not a member?{" "}
          <Link href={"/signup"} className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
