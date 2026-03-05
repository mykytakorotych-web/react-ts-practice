import { create } from "zustand"

interface AuthState {
  user: { id: string; username: string } | null
  isAuthenticated: boolean
  login: (userData: { id: string; username: string }) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  isAuthenticated: false,

  login: userData => set({ user: userData, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}))
