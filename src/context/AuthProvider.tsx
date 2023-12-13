import { getCurrentUser } from "@/api_call/auth/auth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { IUserLoggedIn } from "@/types";
import React, { createContext, useState, useContext, useEffect } from "react";

export const INITIAL_USER: IUserLoggedIn = {
  user: {
    id: "",
    email: "",
    username: "",
    avatar: "",
  },
  access_token: "",
};

export const INITIAL_STATE = {
  userData: INITIAL_USER,
  setUserData: () => {},
  isLoading: false,
  setIsLoading: () => {},
};

type IContextType = {
  userData: IUserLoggedIn;
  setUserData: React.Dispatch<React.SetStateAction<IUserLoggedIn>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // const navigate = useNavigate();
  const [userData, setUserData] = useState<IUserLoggedIn>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  
  const value = {
    userData,
    setUserData,
    isLoading,
    setIsLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useUserContext = () => useContext(AuthContext);
