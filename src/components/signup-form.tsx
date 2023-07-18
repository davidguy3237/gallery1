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

const SignUpSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must contain at least 3 characters" }),
    email: z.string().email({ message: "Input a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpType = z.infer<typeof SignUpSchema>;

export default function SignUpForm() {
  const form = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: SignUpType) => {
    console.log("SIGN UP CREDENTIALS: ", values);
  };

  return (
    <div className="flex min-h-[40rem] w-[30rem] flex-col items-center justify-center rounded-lg px-10 md:border">
      <div className="w-full">
        <div className="my-6 text-center text-6xl font-bold">Sign Up</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="hunter2" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="full">
              Sign Up
            </Button>
          </form>
        </Form>
        <div className="my-8 text-sm">
          Already a member?{" "}
          <Link
            href={"/login"}
            className="text-slate-700 hover:text-slate-800 hover:underline"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
