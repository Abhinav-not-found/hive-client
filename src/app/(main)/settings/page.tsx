"use client";
import React, { useState } from "react";
import AccountSettings from "./_components/AccountSettings";

const SettingsPage = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <main className='flex'>
      <div className='w-[20rem] h-screen px-5'>
        <SettingsButton
          label={"account-settings"}
          active={active}
          setActive={setActive}
        />
        <SettingsButton
          label={"something"}
          active={active}
          setActive={setActive}
        />
      </div>
      <div className='w-full'>
        {active == "account-settings" && <AccountSettings />}
        {active == "something" && (
          <div className='bg-green-50 dark:bg-green-900 w-full h-screen'></div>
        )}
      </div>
    </main>
  );
};

const SettingsButton = ({
  label,
  active,
  setActive,
}: {
  label: string;
  active: any;
  setActive: any;
}) => {
  return (
    <button
      onClick={() => setActive(label)}
      className={`w-full mt-1 text-xl first-letter:uppercase cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900 py-2 px-4 text-left rounded-md ${
        active == label && "bg-neutral-100 dark:bg-neutral-800"
      }`}
    >
      {label}
    </button>
  );
};
export default SettingsPage;
