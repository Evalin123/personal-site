import { create } from 'zustand';

type MobileMenuStore = {
  isOpen: boolean;
  toggle: () => void;
};

export const useMobileMenuStore = create<MobileMenuStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
