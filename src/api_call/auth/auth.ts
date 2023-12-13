import axios, { axiosPrivate } from "../axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
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
        withCredentials: true,
      },
    );
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

export async function getCurrentUser(){
  const axiosPrivate = useAxiosPrivate();
  try {
    const response = await axiosPrivate.get("/auth/me");
    if(response.status != 200) throw Error;
    const currentAccount = response.data
    return currentAccount.data
  } catch (error) {
    console.log(error)
  }
}

export async function onForgotPassword(email: string) {
  try {
    const response = await axios.post("/forgot/forgot-password", { email: email }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success(response.data.detail);
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

export async function signOut() {
  try{
    const response = await axiosPrivate.get("/auth/logout");
    if (response.status != 204) {
      return false
    }
  } catch (error) {
    console.log(error)
    
  }
  return true
  
}