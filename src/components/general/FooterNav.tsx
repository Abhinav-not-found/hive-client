"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Bell, Home, Plus, Search, User } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const FooterNav = () => {
  const [active, setActive] = useState(false);
  return (
    <div className='h-14 w-full bg-white dark:bg-black fixed border border-t dark:border-t-neutral-600 bottom-0 flex items-center justify-center gap-5 md:hidden'>
      <Button variant={"ghost"}>
        <Home className='size-6' />
      </Button>
      <Button variant={"ghost"}>
        <Search className='size-6' />
      </Button>
      <div className=''>
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              onClick={() => setActive(!active)}
              variant={"ghost"}
              className='rounded-full px-2 py-5.5 bg-black dark:bg-white text-white dark:text-black'
            >
              <Plus className='size-5' />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle></DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <div className='h-[40rem]'></div>
          </DrawerContent>
        </Drawer>
      </div>
      <Button variant={"ghost"}>
        <Bell className='size-6' />
      </Button>
      <Button variant={"ghost"}>
        <User className='size-6' />
      </Button>
    </div>
  );
};

export default FooterNav;
