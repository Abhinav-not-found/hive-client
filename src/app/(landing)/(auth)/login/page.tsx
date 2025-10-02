'use client'
import { LoginForm } from "@/components/blocks/login-form";
import ThemeToggle from "@/components/ui/theme-toggle-rta";
import useAuthRedirect from "@/hooks/authRedirect";
import { GalleryVerticalEnd } from "lucide-react";

const LoginPage = () => {
    useAuthRedirect({ redirectIfAuth: "/home" });
  return (
    <main className='grid min-h-svh lg:grid-cols-1'>
      {/* <div className='bg-muted relative hidden lg:block'>
        <img
          src='/placeholder.svg'
          alt='Image'
          className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
        />
      </div> */}
      <div className='flex flex-col items-center gap-0 p-6 md:p-10'>
        <div className='w-full md:w-1/3 flex justify-between gap-2 md:justify-between'>
          <a href='/login' className='flex items-center gap-2 font-medium'>
            <div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
              <GalleryVerticalEnd className='size-4' />
            </div>
            <p className='font-semibold'>Hive</p>
          </a>
          <div>
            <ThemeToggle/>
          </div>
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-xs'>
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
