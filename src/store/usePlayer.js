import { create } from 'zustand'
export const usePlayer = create((set) => ({
    currVolume:  100, 
    onChangeVolume: (value) => set({currVolume: value})
}))