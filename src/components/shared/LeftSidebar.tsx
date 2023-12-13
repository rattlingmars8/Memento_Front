import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import useSignOut from "@/hooks/useSignOut";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthProvider";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";

const LeftSidebar = () => {
  const { userData } = useUserContext();
  const pathname = useLocation();
  const { signOut } = useSignOut();

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>
        <Link
          to={`/profile/${userData.user.id}`}
          className="flex gap-3 items-center"
        >
          <img
            src={userData.user.avatar}
            alt="userAvatar"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{userData.user.username}</p>
            <p className="small-regular text-light-3">
              @{userData.user.username}
            </p>
          </div>
        </Link>
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname.pathname === link.route;
            return (
              <li
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
                key={link.label}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant="ghost"
        className="flex gap-4 items-center justify-start hover:bg-transparent hover:text-white"
        onClick={() => signOut()}
      >
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
