import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import useSignOut from "@/hooks/useSignOut";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthProvider";

const Topbar = () => {
  const { signOut } = useSignOut();
  const navigate = useNavigate();
  const { userData } = useUserContext()


  // useEffect(() => {
  //   if (isSuccess) {
  //     navigate(0);
  //   }
  // }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={325}
          />
        </Link>
        <div className="flex gap-4">
          <Button variant="ghost" className="flex gap-4 items-center justify-start hover:bg-transparent hover:text-white" onClick={() => signOut()}>
            <img src="/assets/icons/logout.svg" alt="logout"/>
          </Button>
          <Link to={`/profile/${userData.user.id}`} className="flex-center gap-3">
            <img src={userData.user.avatar} className="h-8 w-8 rounded-full" alt="userAvatar" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
