import * as z from "zod"

export const SignupValidation = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters"}).max(50),
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z.string().min(6, {message: "Password must be at least 6 characters"}).max(50),
})

export const LoginValidation = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z.string().min(6, {message: "Password must be at least 6 characters"}).max(50),
})
export const ForgotValidation = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),
})