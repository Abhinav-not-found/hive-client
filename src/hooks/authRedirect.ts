'use client'
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type AuthRedirectOptions = {
  redirectIfAuth?: string;     //  (for public pages)
  redirectIfNoAuth?: string;   //  (for private pages)
};

const useAuthRedirect = ({ redirectIfAuth, redirectIfNoAuth }: AuthRedirectOptions) => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user && redirectIfAuth) {
      router.replace(redirectIfAuth); // redirect authenticated users away from public pages
    } else if (!user && redirectIfNoAuth) {
      router.replace(redirectIfNoAuth); // redirect unauthenticated users from private pages
    }
  }, [user, redirectIfAuth, redirectIfNoAuth, router]);
};

export default useAuthRedirect;
