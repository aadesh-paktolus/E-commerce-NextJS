"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { createUser } from "@/services/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Styles from "./register-form.module.scss";

const RegisterSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(150, "Username must be at most 150 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .max(255, "Email must be at most 255 characters")
    .email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .refine((value) => !value.match(/^\s+$/), {
      message: "Password cannot be only whitespace",
    }),
});

const RegisterForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    mode: "onBlur",
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const handleSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    const enteredUsername = values.username;
    const enteredEmail = values.email;
    const enteredPassword = values.password;
    try {
      const result = await createUser(
        enteredUsername,
        enteredEmail,
        enteredPassword
      );
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  const isLoading = form.formState.isSubmitting || form.formState.isLoading;
  return (
    <div className={Styles.main_div}>
      <Card className={Styles.container}>
        <CardHeader>
          <CardTitle className={Styles.title}>Register</CardTitle>
        </CardHeader>
        <Separator className={Styles.horizontal_line} />
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className={Styles.input}>
                    <FormLabel className={Styles.label}>Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Insert your username"
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
                name="email"
                render={({ field }) => (
                  <FormItem className={Styles.input}>
                    <FormLabel className={Styles.label}>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Insert your email"
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
                        placeholder="Insert your password"
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
                  {isLoading ? <p>Submitting...</p> : "Register"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
