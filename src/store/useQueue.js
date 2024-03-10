import { create } from 'zustand'

export const useQueue = create((set) => ({
    queue: [],
    add: (item) => set((state) => ({ queue: [...state.queue, item] })),
    remove: () => set((state) => ({ queue: state.queue.slice(1) })),
    addNext: (item) => set((state) => ({ queue: [item, ...state.queue] }))
}))
