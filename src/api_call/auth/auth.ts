import axios from "../axios";
import { INewUser } from "@/types";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export async function createUserAccount(user: INewUser) {
  try {
    const response = await axios.post("/auth/register", user);
    toast.success("Account created successfully");
    // const emailResponse = await sendEmailVerificationLink(user.email);
    // toast.success(emailResponse)
    // toast.success(`Check your email ${user.email} for verification link`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      toast.error(error.response?.data.detail);
    } else {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
}

export async function sendEmailVerificationLink(email: string) {
  try {
    const response = await axios.post("/auth/request-verify", { email: email });
    toast.success(response.data.detail);
    return response.data.detail;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      toast.error(error.response?.data.detail);
    } else {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
}

export async function signInUser(email: string, password: string) {
  try {
    const response = await axios.post(
      "/auth/jwt/login",
      {
        username: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    // console.log(: email, password);
    localStorage.setItem("access_token", response.data.access_token);
    return response.data;

  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      toast.error(error.response?.data.detail);
    } else {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
}
