import { create } from "zustand";

export const useLibrary = create((set) => ({
  liked: [],
  disliked: [],
  addLiked: (id) => set((state) => ({ liked: [...state.liked, id] })),
  addDisliked: (id) => set((state) => ({ disliked: [...state.disliked, id] })),
  removeLiked: (id) => set((state) => ({ liked: state.liked.filter((i) => i !== id) })),
  removeDisliked: (id) => set((state) => ({ disliked: state.disliked.filter((i) => i !== id) })),
  init: (data) => set({ liked: data.liked || [], disliked: data.disliked || [] }),
}));