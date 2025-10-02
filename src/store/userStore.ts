import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

interface User {
  _id: string;
  name: string;
  email: string;
  username?: string;
  bio?: string;
  profileImage?: string;
  followers?: number;
  following?: number;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

type MyPersist = <T extends UserState>(
  config: (set: any, get: any) => T,
  options: PersistOptions<T>
) => any;

export const useUserStore = create<UserState>(
  (persist as MyPersist)(
    (set) => ({
      user: null,
      setUser: (user: User) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "userStorage",
    }
  )
);
