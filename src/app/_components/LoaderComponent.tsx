"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Loader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(id);
  }, [pathname]);

  return loading ? (
    <div
      className='fixed top-0 left-0 h-1 bg-yellow-400 dark:bg-yellow-600 z-50'
      style={{
        width: "100%",
        animation: "grow 0.1s linear forwards",
      }}
    />
  ) : null;
}
