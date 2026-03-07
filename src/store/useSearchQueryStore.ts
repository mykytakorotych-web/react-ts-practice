import { create } from "zustand"

interface SearchQueryState {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export const useSearchQueryStore = create<SearchQueryState>(set => ({
  searchQuery: "",
  setSearchQuery: query => set({ searchQuery: query }),
}))
