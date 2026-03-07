import { useQuery } from "@tanstack/react-query"
import { userService } from "../services/userService"
import { useSearchQueryStore } from "../store/useSearchQueryStore"
import { useProfile } from "./useProfile"

export const useSideBar = () => {
  const { data, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["allUsers", { limit: 10, skip: 0 }],
    queryFn: () => userService.getAllUsersRequest({ limit: 10, skip: 0 }),
  })

  const { user: currentUser, isLoading: isProfileLoading } = useProfile()

  const { searchQuery } = useSearchQueryStore()

  const isLoading = isLoadingUsers || isProfileLoading

  return {
    data,
    currentUser,
    searchQuery,
    isLoading,
  }
}
