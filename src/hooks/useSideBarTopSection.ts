import { useState } from "react"
import { useIsChatOpenStore } from "../store/useIsChatOpenStore"
import { useSearchQueryStore } from "../store/useSearchQueryStore"
import { useSideBarPages } from "../store/useSideBarPages"

export const useSideBarTopSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { searchQuery, setSearchQuery } = useSearchQueryStore()
  const { isChatOpen } = useIsChatOpenStore()
  const { activePage, setActivePage } = useSideBarPages()

  const handleBackButton = () => {
    setSearchQuery("")
    setActivePage("chats")
  }

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
    activePage,
    setSearchQuery,
    setIsMenuOpen,
    handleBackButton,
  }
}
