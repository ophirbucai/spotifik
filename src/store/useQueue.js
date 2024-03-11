
import { create } from 'zustand'

export const useQueue = create((set) => ({
    queue: [],
    pastQueue: [],
    add: (item) => set((state) => ({ queue: [...state.queue, item] })),
    remove: () => set((state) => ({ queue: state.queue.slice(1), pastQueue: [...state.pastQueue, state.queue[0] ] })),
    prev: () => set((state) => ({queue: [state.pastQueue[state.pastQueue.length-1], ...state.queue], pastQueue: state.pastQueue.slice(0,-1)})),
    addNext: (item) => set((state) => ({ queue: [item, ...state.queue] }))
}))

