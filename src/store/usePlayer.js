import { create } from 'zustand'

export const usePlayer = create((set) => ({
    isMuted: false,
    setIsMuted: (value) => set({ isMuted: value }),
    currentVolume: 100,
    setCurrentVolume: (value) => set({ currentVolume: value })
}))