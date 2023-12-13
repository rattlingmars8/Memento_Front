import { useEffect } from 'react';
import { signOut } from '../api_call/auth/auth';
import { useNavigate } from 'react-router-dom';

const useSignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const success = await signOut();
      if (success) {
        navigate(0);
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return { signOut: handleSignOut };
};

export default useSignOut;
