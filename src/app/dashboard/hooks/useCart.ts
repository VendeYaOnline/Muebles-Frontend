import { create } from "zustand";

interface Props {
  active: boolean;
  setActive: (value: boolean) => void;
}

export const useCart = create<Props>((set) => ({
  active: false,
  setActive: (value: boolean) => set({ active: value }),
}));
