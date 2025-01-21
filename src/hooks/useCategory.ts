import { create } from "zustand";

interface Categories {
  categories: string[];
  setCategories: (categories: string[]) => void;
}

export const useCategory = create<Categories>((set) => ({
  categories: [],
  setCategories: (categories) => set((_state) => ({ categories: categories })),
}));
