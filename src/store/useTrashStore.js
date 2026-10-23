import { create } from 'zustand';

export const useTrashStore = create((set) => ({
  score: 0,
  ecoPoints: 120,
  trashItems: [],
  isChasing: false,
  activeHotspot: null,
  
  incrementScore: () => set((state) => ({ score: state.score + 1 })),
  incrementEcoPoints: (points = 15) => set((state) => ({ ecoPoints: state.ecoPoints + points })),
  
  addTrashItem: (item) => set((state) => ({ 
    trashItems: [...state.trashItems, item] 
  })),

  updateTrashItem: (id, position) => set((state) => ({
    trashItems: state.trashItems.map((item) => item.id === id ? { ...item, ...position } : item),
  })),
  
  removeTrashItem: (id) => set((state) => ({ 
    trashItems: state.trashItems.filter(item => item.id !== id) 
  })),
  
  setIsChasing: (val) => set({ isChasing: val }),
  setActiveHotspot: (id) => set({ activeHotspot: id }),
}));