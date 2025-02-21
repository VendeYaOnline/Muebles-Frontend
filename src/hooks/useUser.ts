import { create } from "zustand";

interface User {
  first_name: string;
  last_name: string;
  phone: string;
  department: string;
  city: string;
  address: string;
  additional_info: string;
  email: string;
  id_number: string;
}

interface Props {
  user?: User;
  setUser: (product?: User) => void;
}

export const useUser = create<Props>((set) => ({
  user: undefined,
  setUser: (user) => set((_state) => ({ user: user })),
}));
