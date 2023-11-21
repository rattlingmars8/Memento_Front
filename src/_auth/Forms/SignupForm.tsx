import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"


import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { SignupValidation } from "@/lib/validation";
import Loader from "@/components/ui/shared/Loader";
import { Link } from "react-router-dom";
import { createUserAccount, sendEmailVerificationLink } from "@/api_call/auth/auth";
import { useNavigate } from "react-router-dom";

 
const SignupForm = () => {
  const isLoadind = false;

   // 1. Define your form.
   const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })
  
  const navigate = useNavigate();
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>, e ?: any) {
    e.preventDefault();
    try{
      const newUser = await createUserAccount(values);
      if (newUser) {
        // await sendEmailVerificationLink(values.email);
        form.reset()
        setTimeout(() =>  navigate("/sign-in"), 3000);
        console.log(newUser);
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" className="mx-auto" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create an account</h2>
        <p className="text-light-3 small-medium md:base-regular">Register to use Memento</p>

      
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="text-red"/>
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
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="text-red"/>
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
                <FormMessage className="text-red"/>
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary text-dark-1">
            {isLoadind ? (
              <div className="flex-center gap-2 text-dark-1">
                <Loader /> Loading...
              </div>
            ) : "Sign up"}
          </Button>
          <p className="text-small-regular text-light-2 text-center">
            Already have an account?{" "}
           <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Login</Link>

          </p>
        </form>
      </div>
    </Form>
    
  );
};

export default SignupForm;
