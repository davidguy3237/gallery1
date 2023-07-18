"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const LoginSchema = z.object({
  email: z.string().email({ message: "Input a valid email address" }),
  password: z.string().min(1, { message: "Input a valid password" }),
});

type LoginType = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ email, password }: LoginType) => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();
  };

  return (
    <div className="flex min-h-[40rem] w-[30rem] flex-col items-center justify-center rounded-lg px-10 md:border">
      <div className="w-full">
        <div className="my-6 text-center text-6xl font-bold">Login</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@email.com"
                      type="email"
                      {...field}
                    />
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
                    <Input placeholder="hunter2" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" mt-2 text-sm">
              <Link href={"/signup"} className="underline">
                Forgot password?
              </Link>
            </div>
            <Button type="submit" size="full">
              Login
            </Button>
          </form>
        </Form>
        <div className="my-8 text-sm">
          Not a member?{" "}
          <Link href={"/signup"} className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
