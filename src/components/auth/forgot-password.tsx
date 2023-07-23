"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

const emailSchema = z.object({
  email: z.string().email({ message: "Input a valid email address" }),
});

type emailType = z.infer<typeof emailSchema>;

export default function ForgotPasswordForm() {
  const [submittedForm, setSubmittedForm] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const supabase = createClientComponentClient();

  const form = useForm<emailType>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (emailForm: emailType) => {
    setLoading(true);
    setEmail(emailForm.email);
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      emailForm.email,
      {
        redirectTo: `${location.origin}/api/auth/callback?next=/account/update-password`,
      },
    );

    if (error) {
      setLoading(false);
      console.error("RESET PASSWORD ERROR: ", error);
      setErrorMessage("Something went wrong. Try again later.");
    } else {
      setLoading(false);
      setErrorMessage("");
      setSubmittedForm(true);
      console.log("RESET PASSWORD LINK SENT TO EMAIL: ", data);
    }
  };

  if (submittedForm) {
    return (
      <div className="mx-4 flex flex-col items-center justify-center">
        <h1 className="my-6 text-center text-4xl font-bold">
          Check your email
        </h1>
        <div>
          If there is an account associated with that email, it will receive an
          email with a link to reset the password.
        </div>
      </div>
    );
  }

  return (
    <div className="mx-4 flex flex-col">
      <h1 className="my-6 text-center text-4xl font-bold">
        Forgot your password?
      </h1>
      <div className="text-center">
        Please enter the email you use to sign in with.
        <br />
        You will receive a link to create a new password via email.
      </div>
      {errorMessage.length ? (
        <div className="text-center text-destructive">{errorMessage}</div>
      ) : null}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="my-4 w-full space-y-4"
        >
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
          <Button disabled={loading} type="submit">
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </Form>
      <div className="mb-4 text-sm">
        Go back to{" "}
        <Link href={"/login"} className="text-blue-600 hover:underline">
          Login
        </Link>
      </div>
      <div className="text-sm">
        Not a member?{" "}
        <Link href={"/signup"} className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
