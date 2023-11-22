import { IUserLoggedIn } from "@/types";
import { createContext, useState } from "react";


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
};

type IContextType = {
  userData: IUserLoggedIn;
  setUserData: React.Dispatch<React.SetStateAction<IUserLoggedIn>>;
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export const AuthProvider = ({ children }: { children: React.ReactNode }) =>{
  const [userData, setUserData] = useState<IUserLoggedIn>(INITIAL_USER);

  const value = {
    userData,
    setUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )

}

export default AuthContext;