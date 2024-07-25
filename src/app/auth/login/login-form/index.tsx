"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Styles from "./login-form.module.scss";

type ILoginForm = {
  callbackUrl: string;
  error: string;
};

const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .max(100, "Email at least 100 characters.")
    .email("Invalid email."),
  password: z
    .string()
    .min(1, "Password is required")
    .refine((value) => !value.match(/^\s+$/), {
      message: "Please enter correct password.",
    }),
});

const LoginForm: FC<ILoginForm> = ({ callbackUrl, error }) => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    mode: "onBlur",
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof LoginSchema>) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: callbackUrl || "/products",
    });
  };

  const isLoading = form.formState.isSubmitting || form.formState.isLoading;
  return (
    <div className={Styles.main_div}>
      <Card className={Styles.container}>
        <CardHeader>
          <CardTitle className={Styles.title}>Login</CardTitle>
          {error && (
            <CardDescription className={Styles.error}>
              {error === "CredentialsSignin"
                ? "Invalid credentials"
                : undefined}
            </CardDescription>
          )}
        </CardHeader>
        <Separator className={Styles.horizontal_line} />
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className={Styles.input}>
                    <FormLabel className={Styles.label}>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter Your Email"
                        autoFocus
                        disabled={isLoading}
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
                  <FormItem className={Styles.input}>
                    <FormLabel className={Styles.label}>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter Your Password"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className={Styles.btn}>
                <Button
                  type="submit"
                  className={Styles.button}
                  disabled={isLoading}
                >
                  {isLoading ? <p>Logging...</p> : "Log in"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
