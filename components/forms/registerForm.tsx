import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterUserSchema } from "@/schemas/registerSchema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { z } from "zod";
import { Input } from "../ui/input";
import register from "@/actions/users/registerAction";
import FormError from "./formError";
import FormSuccess from "./formSuccess";

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const form = useForm<z.infer<typeof RegisterUserSchema>>({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      address: "",
      zip: "",
      city: "",
      phone: "",
    },
  });
  const onSubmit = (values: z.infer<typeof RegisterUserSchema>) => {
    startTransition(() => {
      setSuccess("");
      setError("");
      register(values).then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess(data.success || "");
        }
      });
    });
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-fit mx-auto p-4 rounded-lg shadow border max-h-[calc(100vh - 160px)] grid grid-cols-2 gap-10"
        >
          {UsersModelFields.fields
            .filter((field) => field.isRequired)
            .map((field, key) => (
              <FormField
                key={key}
                control={form.control}
                name={field.name as keyof z.infer<typeof RegisterUserSchema>}
                render={({ field: formField }) => (
                  <FormItem>
                    {error ? (
                      <FormError message={error} />
                    ) : success ? (
                      <FormSuccess message={success} />
                    ) : null}
                    <FormLabel>
                      {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type={
                          field.name.toLowerCase() === "password"
                            ? "password"
                            : field.type === "String"
                            ? "text"
                            : field.type === "Int" || field.type === "Float"
                            ? "number"
                            : "text"
                        }
                        placeholder={`Enter your ${field.name}`}
                        disabled={isPending}
                        {...formField}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          <button
            type="submit"
            className="bg-slate-950 text-white p-2 rounded-md mx-auto"
            disabled={isPending}
          >
            Register
          </button>
        </form>
      </Form>
      {/* <div className="flex flex-col gap-4">
        <label
          htmlFor="floating_email"
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          Email address
        </label>
        <input
          type="email"
          name="floating_email"
          id="floating_email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
      </div>
      <div className="flex flex-col gap-4">
        <label
          htmlFor="floating_password"
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          Password
        </label>
        <input
          type="password"
          name="floating_password"
          id="floating_password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
      </div>
      <div className="flex flex-col gap-4">
        <label
          htmlFor="floating_repeat_password"
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          Confirm password
        </label>
        <input
          type="password"
          name="repeat_password"
          id="floating_repeat_password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
      </div>
      <div className="grid grid-cols-2">
        <div className="relative z-0 w-full mb-5 col-start-1">
          <input
            type="text"
            name="floating_first_name"
            id="floating_first_name"
            className="text-sm text-gray-500 dark:text-gray-400"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_first_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          >
            First name
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group col-start-2">
          <input
            type="text"
            name="floating_last_name"
            id="floating_last_name"
            className="text-sm text-gray-500 dark:text-gray-400"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_last_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          >
            Last name
          </label>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            name="floating_phone"
            id="floating_phone"
            className="text-sm text-gray-500 dark:text-gray-400"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          >
            Phone number
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="floating_company"
            id="floating_company"
            className="text-sm text-gray-500 dark:text-gray-400"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_company"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          >
            Company (Ex. Google)
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button> */}
    </>
  );
};

export default RegisterForm;
