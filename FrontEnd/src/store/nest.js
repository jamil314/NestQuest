import create from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const initialFilterValue = {
  Bedroom: [1, 10],
  Bathroom: [1, 10],
  Rent: [0, 500000],
  Area: [0, 10000],
  Floor: [1, 50],
  Bachelor: false,
  Lift: false,
  Furnished: false,
  Ac: false,
  Fridge: false,
  Heater: false,
  Geyser: false,
};

export const useFilterStore = create(
  persist(
    (set, get) => ({
      values: initialFilterValue,
      getValue: (label) => {
        return label in get().values ? get().values[label] : null;
      },

      setValue: (label, value) => {
        set((state) => ({
          values: {
            ...state.values,
            [label]: value,
          },
        }));
      },

      clearValue: () => {
        set(() => ({ values: { ...initialFilterValue } }));
      },

      getAll: () => {
        return get().values;
      },
    }),
    {
      name: "filter-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
