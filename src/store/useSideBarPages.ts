import { create } from "zustand"
import type { TSideBarPages } from "../types/menuItems.type"

interface SideBarPagesState {
  activePage: TSideBarPages
  setActivePage: (page: TSideBarPages) => void
}
export const useSideBarPages = create<SideBarPagesState>(set => ({
  activePage: "chats",

  setActivePage: (page: TSideBarPages) => set({ activePage: page }),
}))
