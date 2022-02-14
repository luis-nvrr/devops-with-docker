import create from "zustand";
import { Gift } from "../types/gift";
import giftService from "../services/gift";

type GiftStore = {
  gifts: Gift[];
  fetchAll: () => void;
  addGift: (description: string) => void;
  removeGift: (id: number) => void;
  removeAll: () => void;
};

const useStore = create<GiftStore>((set) => ({
  gifts: [],
  fetchAll: async () => {
    const initialGifts = await giftService.fetchAll(true, 500);
    set({ gifts: initialGifts });
  },
  addGift: (description: string) => {
    set((state) => ({
      gifts: [
        ...state.gifts,
        { id: state.gifts.length + 1, description: description },
      ],
    }));
  },
  removeGift: (id: number): void => {
    set((state) => ({
      gifts: state.gifts.filter((g) => g.id !== id),
    }));
  },
  removeAll: (): void => {
    set({ gifts: [] });
  },
}));

export default useStore;
