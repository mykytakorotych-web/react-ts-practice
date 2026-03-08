import { useEffect, useState } from "react"
import { useSearchQueryStore } from "../store/useSearchQueryStore"
import { useSideBarPages } from "../store/useSideBarPages"

export const useSearchInput = () => {
  const { setSearchQuery } = useSearchQueryStore()
  const [query, setQuery] = useState("")
  const { setActivePage } = useSideBarPages()

  useEffect(() => {
    const handler = setTimeout(() => {
      const trimmed = query.trim()

      if (trimmed.length > 0) {
        setSearchQuery(trimmed)
        setActivePage("search")
      } else {
        setSearchQuery("")
        setActivePage("chats")
      }
    }, 500)

    return () => clearTimeout(handler)
  }, [query, setSearchQuery, setActivePage])

  return { query, setQuery, setActivePage }
}
