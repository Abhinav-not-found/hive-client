"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Home, User } from "lucide-react";
import LogoutButton from "../sidebar/LogoutButton";
import { usePathname } from "next/navigation";
import AddButton from "../sidebar/AddPostButton";
import { getUserInfo } from "@/helpers/userHelper";
import { useUserStore } from "@/store/userStore";

type NavItemProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  activePath: string;
};

const Sidebar = () => {
  const path = usePathname();
  const { user } = useUserStore();
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <aside className='h-screen fixed w-[13.5rem] border border-r flex flex-col justify-between'>
      <div>
        <div className='px-4 py-4'>
          <Link href='/' className='text-lg font-semibold flex gap-1'>
            Hive
          </Link>
        </div>
        <div className='flex flex-col items-start gap-2 px-2'>
          <NavItem
            href='/home'
            icon={<Home className='size-5' />}
            label='Home'
            activePath={path}
          />
          {/* <NavItem
            href='/search'
            icon={<Search className='size-5' />}
            label='Search'
            activePath={path}
          /> */}
          <AddButton />
          {/* <NavItem
            href='/notifications'
            icon={<Bell className='size-5' />}
            label='Notification'
            activePath={path}
          /> */}
          <NavItem
            href={`/profile/${user?._id}`}
            icon={<User className='size-5' />}
            label='Profile'
            activePath={path}
          />
        </div>
      </div>
      <div className='px-4'>
        <LogoutButton />
      </div>
    </aside>
  );
};

const NavItem = ({ href, icon, label, activePath }: NavItemProps) => {
  const isActive =
    activePath === href || (href !== "/" && activePath.startsWith(href));
  return (
    <Link href={href} className='w-full'>
      <Button
        variant='ghost'
        className={`w-full flex justify-start py-6 items-center gap-2 ${
          isActive ? "bg-neutral-100 dark:bg-neutral-800" : ""
        }`}
      >
        {icon}
        <p
          className={`text-lg ${
            isActive ? "font-medium text-primary" : "text-foreground"
          }`}
        >
          {label}
        </p>
      </Button>
    </Link>
  );
};
export default Sidebar;
