"use client";
import useAuthRedirect from "@/hooks/authRedirect";

export default function LandingPage() {
  useAuthRedirect({ redirectIfAuth: "/home", redirectIfNoAuth: "/login" });

  return (
    <main
      className='h-screen'
      style={{
        backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
      }}
    >
      LandingPage
      {/* <Navbar />
      <Hero />
      <Feature /> */}
    </main>
  );
}
