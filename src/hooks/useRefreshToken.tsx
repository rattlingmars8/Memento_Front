import axios from "@/api_call/axios";
import { useUserContext } from "@/context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const useRefreshToken = () => {
  const { setUserData } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();

  const refresh = async () => {
    try {
      const response = await axios.get("/auth/jwt/refresh", {
        withCredentials: true,
      });

      setUserData(prev => {
        console.log(JSON.stringify(prev));
        console.log(response.data.access_token);
        return response.data;
      });

      return response.data;
    } catch (error) {
      console.log(error);
      navigate('/sign-in', { state: { from: location }, replace: true });
    }
  };

  return refresh;
};

export default useRefreshToken;
