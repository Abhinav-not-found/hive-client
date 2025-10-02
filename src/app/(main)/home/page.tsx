"use client";
import useAuthRedirect from "@/hooks/authRedirect";
import React, { useEffect } from "react";
import FeedComponent from "./_components/FeedComponent";
import { getUserInfo } from "@/helpers/userHelper";

// follow feature
// settings page
// responsive

const HomePage = () => {
  useAuthRedirect({ redirectIfNoAuth: "/", redirectIfAuth: "/home" });
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <main className='h-full min-h-screen w-full md:w-3/5'>
      {/* <StoryComponent /> */}
      <FeedComponent />
    </main>
  );
};

export default HomePage;
