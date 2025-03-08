import { create } from "zustand";

interface Meals {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;

}

interface StoreState {
  meals: Meals[];
  searchQuery: string;
  setMeals: (meals: Meals[]) => void;
  setSearchQuery: (query: string) => void;




}

const useStore = create<StoreState>((set) => ({
  meals: [],
  searchQuery: "",
  setMeals:(meals: Meals[]) => set({meals}),
  setSearchQuery: (query: string) => set({searchQuery: query}),

}));

export default useStore;
