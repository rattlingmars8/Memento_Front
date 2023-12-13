import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { ForgotValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link } from "react-router-dom";
import { onForgotPassword } from "@/api_call/auth/auth";

const ForgotForm = () => {
  let isLoadind = false;

  // 1. Define your form.
  const form = useForm<z.infer<typeof ForgotValidation>>({
    resolver: zodResolver(ForgotValidation),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ForgotValidation>, e?: any) {
    e.preventDefault();
    isLoadind = true;
    console.log(values, isLoadind);
    try {
      await onForgotPassword(values.email);
      form.reset();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" className="mx-auto" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Forgot Password?
        </h2>
        <p className="text-light-3 small-medium md:base-regular text-center">
          Enter email address to reset your password
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="text-red" />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary text-dark-1">
            {isLoadind ? (
              <div className="flex-center gap-2 text-white">
                <Loader /> Loading...
              </div>
            ) : (
              "Submit"
            )}
          </Button>
          <span className="text-small-regular text-light-2 text-center">
            It's all OK?{" "}
            <Link
              to="/sign-in"
              className="text-primary-500 text-small-semibold ml-1 hover:underline"
            >
              Sign in
            </Link>
          </span>
        </form>
      </div>
    </Form>
  );
};

export default ForgotForm;
