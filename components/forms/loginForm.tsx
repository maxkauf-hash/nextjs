"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { LoginUserSchema } from "@/schemas/loginSchema";
import login from "@/actions/users/loginAction";
import { Button } from "../ui/button";
import { useState } from "react";
import { redirect } from "next/navigation";

const LoginForm = () => {
  const [error, setError] = useState<string>("");

  const form = useForm<z.infer<typeof LoginUserSchema>>({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginUserSchema>) => {
    login(values).then((data) => {
      if (data?.error) {
        setError(data.error);
      }
      redirect("/");
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-1/4 bg-white p-2 rounded-md text-black"
      >
        {error && <span className="text-red-500">{error}</span>}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Email..." type="email" />
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
                  <Input {...field} placeholder="******" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="rounded-md w-full bg-secondary text-primary hover:text-primary-foreground"
        >
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
