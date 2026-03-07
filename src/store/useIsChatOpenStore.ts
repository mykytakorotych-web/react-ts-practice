import { create } from "zustand"

interface ChatOpenState {
  isChatOpen: boolean
  openChat: () => void
  closeChat: () => void
}

export const useIsChatOpenStore = create<ChatOpenState>(set => ({
  isChatOpen: false,

  openChat: () => set({ isChatOpen: true }),
  closeChat: () => set({ isChatOpen: false }),
}))
