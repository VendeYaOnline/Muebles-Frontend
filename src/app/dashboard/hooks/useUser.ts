import { create } from "zustand";

export interface User {
  email: string;
  role: string;
  username: string;
}

interface Props {
  user?: User;
  setUser: (user?: User) => void;
}

export const useUser = create<Props>((set) => ({
  user: undefined,
  setUser: (user?: User) => set({ user }),
}));
