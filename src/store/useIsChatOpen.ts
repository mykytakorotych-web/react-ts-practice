import { create } from "zustand"

interface ChatOpenState {
  isOpen: boolean
  openChat: () => void
  closeChat: () => void
}

export const useIsChatOpen = create<ChatOpenState>(set => ({
  isOpen: false,

  openChat: () => set({ isOpen: true }),
  closeChat: () => set({ isOpen: false }),
}))
