"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { LogOut } from "lucide-react";
import { handleLogout } from "@/helpers/userHelper";

const LogoutButton = () => {
  const router = useRouter();
  const { clearUser } = useUserStore();
  const [loading, setLoading] = useState(false);

  return (
    <Button
      onClick={() => handleLogout({ setLoading, router, clearUser })}
      className='w-full py-6'
    >
      {loading ? (
        "loading..."
      ) : (
        <>
          <LogOut />
          <p>Logout</p>
        </>
      )}
    </Button>
  );
};

export default LogoutButton;
