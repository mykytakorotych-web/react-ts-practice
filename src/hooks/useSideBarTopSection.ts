import { useState } from "react"
import { useIsChatOpenStore } from "../store/useIsChatOpenStore"
import { useSearchQueryStore } from "../store/useSearchQueryStore"

export const useSideBarTopSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { searchQuery, setSearchQuery } = useSearchQueryStore()
  const { isChatOpen } = useIsChatOpenStore()

  const [prevIsChatOpen, setPrevIsChatOpen] = useState(isChatOpen)
  if (isChatOpen !== prevIsChatOpen) {
    setPrevIsChatOpen(isChatOpen)
    if (isChatOpen) {
      setIsMenuOpen(false)
    }
  }
  return {
    searchQuery,
    isMenuOpen,
    setSearchQuery,
    setIsMenuOpen,
  }
}
