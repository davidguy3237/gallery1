"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LoginType = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginType) => {
    console.log("LOGIN CREDENTIALS: ", values);
  };

  return (
    <div className="flex h-1/2 w-1/4 flex-col justify-center rounded-lg border-2 border-black p-4">
      <div className="mb-6 text-5xl font-bold">Sign in to your account</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@email.com" {...field} />
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
                  <Input placeholder="hunter2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="full">
            Login
          </Button>
        </form>
      </Form>
      <div className="mt-4 text-sm">
        No account?{" "}
        <Link href={"/signup"} className="text-blue-500">
          Sign up here
        </Link>
      </div>
    </div>
  );
}
