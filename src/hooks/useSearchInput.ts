import { useEffect, useState } from "react"
import { useSearchQueryStore } from "../store/useSearchQueryStore"

export const useSearchInput = () => {
  const { setSearchQuery } = useSearchQueryStore()
  const [query, setQuery] = useState("")

  useEffect(() => {
    const handler = setTimeout(() => {
      const trimmed = query.trim()

      if (trimmed.length > 0) {
        setSearchQuery(trimmed)
        console.log("Search query updated:", trimmed)
      } else {
        setSearchQuery("")
      }
    }, 500)

    return () => clearTimeout(handler)
  }, [query, setSearchQuery])

  return { query, setQuery }
}
