import { useQuery } from "@tanstack/react-query"
import { userService } from "../services/userService"
import { useSearchQueryStore } from "../store/useSearchQueryStore"
import { useProfile } from "./useProfile"

export const useSearchPage = () => {
  const { searchQuery } = useSearchQueryStore()

  const { data, isLoading: isSearchQueryLoading } = useQuery({
    queryKey: ["searchUsers", searchQuery],
    queryFn: () => userService.searchUsersRequest(searchQuery),
    enabled: searchQuery.trim().length > 0,
  })
  const { user: currentUser, isLoading: isProfileLoading } = useProfile()

  const isLoading = isSearchQueryLoading || isProfileLoading

  return {
    data,
    currentUser,
    isLoading,
    searchQuery,
  }
}
