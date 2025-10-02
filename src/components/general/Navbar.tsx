"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useUserStore } from "@/store/userStore";
import { Settings } from "lucide-react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { user } = useUserStore();
  const path = usePathname();
  return (
    <header className='h-14 px-2 md:px-4 flex items-center justify-between'>
      {path == "/" ? <></> : <p className='hidden md:block '></p>}
      <Link href='/' className={`text-lg font-semibold md:hidden block`}>
        Hive
      </Link>
      {path == "/" && (
        <Link href='/' className={`text-lg font-semibold block`}>
          Hive
        </Link>
      )}
      <div className='flex gap-2'>
        <ModeToggle />
        {user ? (
          <Link href='/settings'>
            <Button variant={"ghost"}>
              <Settings />
            </Button>
          </Link>
        ) : (
          <Link href='/login'>
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
