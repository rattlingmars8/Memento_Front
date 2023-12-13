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
import { LoginValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link, useLocation } from "react-router-dom";
import { signInUser } from "@/api_call/auth/auth";
import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
import {useUserContext} from "@/context/AuthProvider";

const SigninForm = () => {
 
  const { setUserData, setIsLoading, isLoading: isUserLoading} = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof LoginValidation>>({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof LoginValidation>, e?: any) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const userData = await signInUser(values.email, values.password);
      if (userData) {
        console.log(userData);
        setUserData(userData);
        form.reset();
        setTimeout(() =>  navigate("/", { state: { from: location }, replace: true }), 750);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" className="mx-auto" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Sign in to an account
        </h2>
        <p className="text-light-3 small-medium md:base-regular">
          Please sign in to use Memento
        </p>

        <form
          noValidate={true}
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="text-red" />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary text-dark-1">
            {isUserLoading ? (
              <div className="flex-center gap-2 text-dark-1">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign in"
            )}
          </Button>
          <span className="text-small-regular text-light-2 text-center">
            Not have account yet?{" "}
            <Link
              to="/sign-up"
              className="text-primary-500 text-small-semibold ml-1 hover:underline"
            >
              Sign up{" "}
            </Link>
            <p>
              <Link
                to="/forgot-password"
                className="text-primary-500 text-small-semibold ml-1 hover:underline"
              >
                Forgot password?
              </Link>
            </p>
          </span>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;
