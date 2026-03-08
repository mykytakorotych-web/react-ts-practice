import { useQuery } from "@tanstack/react-query"
import { userService } from "../services/userService"
import { useProfile } from "./useProfile"

export const useSideBarChatPage = () => {
  const { data, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["allUsers", { limit: 10, skip: 0 }],
    queryFn: () => userService.getAllUsersRequest({ limit: 10, skip: 0 }),
  })

  const { user: currentUser, isLoading: isProfileLoading } = useProfile()

  const isLoading = isLoadingUsers || isProfileLoading

  return {
    data,
    currentUser,
    isLoading,
  }
}
