"use client";

import { useSession } from "@/context/session-provider";
import Logo from "./logo";
import Menu from "./menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/users/login-actions";

const Header = () => {
  const session = useSession();
  const { cartQuantity } = useCart();
  return (
    <header className="h-20">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Logo />
          <Menu />
          {session.user ? (
            <Button
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}
        </div>
        <div className="text-black">{cartQuantity}</div>
      </nav>
    </header>
  );
};

export default Header;
