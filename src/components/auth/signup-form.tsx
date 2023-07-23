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
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Loader2 } from "lucide-react";

const SignUpSchema = z
  .object({
    email: z.string().email({ message: "Input a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters" })
      .max(72, { message: "Password must not be longer than 72 characters" }),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpType = z.infer<typeof SignUpSchema>;

export default function SignUpForm() {
  const [submittedForm, setSubmittedForm] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient();

  const form = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSignUp = async (signUpForm: SignUpType) => {
    setErrorMessage("");
    setLoading(true);
    setEmail(signUpForm.email);
    const { data, error } = await supabase.auth.signUp({
      email: signUpForm.email,
      password: signUpForm.password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      setErrorMessage(`Error: ${error.message}`);
      setLoading(false);
    } else {
      console.log("DATA FROM SUPABASE: ", data);
      if (data.user?.identities?.length === 0) {
        setLoading(false);
        form.setError("email", {
          type: "server",
          message: "This email is already taken",
        });
      } else {
        await supabase.rpc("update_unverified_account_password", {
          user_id: data.user?.id,
          password: signUpForm.password,
        });
        setLoading(false);
        setSubmittedForm(true);
      }
    }
  };

  const resendConfirmationEmail = async () => {
    setErrorMessage("");
    setLoading(true);
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: email,
    });

    if (error) {
      setLoading(false);
      setErrorMessage(error.message);
    } else {
      setErrorMessage("");
      setLoading(false);
    }
  };

  if (submittedForm) {
    return (
      <div className="mx-4 flex min-h-[40rem] w-[40rem] flex-col items-center justify-center">
        <h1 className="my-6 text-center text-4xl font-bold">
          Please verify your email
        </h1>
        <div>A confirmation email was sent to:</div>
        <div className="font-bold">{email}</div>
        <p className="m-4">
          Click on the link in the email to complete your signup. <br />
          If you don&apos;t see it, you may need to check your spam folder.
        </p>
        <div className="mb-4">Didn&apos;t receive the email? </div>
        <Button disabled={loading} onClick={resendConfirmationEmail}>
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Resend Email"
          )}
        </Button>
        {errorMessage.length ? (
          <div className="mt-4 text-center text-destructive">
            {errorMessage}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="mx-4 flex min-h-[40rem] w-[30rem] flex-col items-center justify-center">
      <div className="w-full">
        <h1 className="my-6 text-center text-4xl font-bold">Sign Up</h1>
        {errorMessage.length ? (
          <div className="text-center text-destructive">{errorMessage}</div>
        ) : null}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSignUp)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input disabled={loading} type="email" {...field} />
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
                    <Input disabled={loading} type="password" {...field} />
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
                    <Input disabled={loading} type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading} type="submit" size="full">
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>
        <div className="my-8 text-sm">
          Already a member?{" "}
          <Link href={"/login"} className="text-blue-600 hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
