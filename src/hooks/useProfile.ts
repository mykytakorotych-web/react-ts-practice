import { useQuery } from "@tanstack/react-query"
import { userService } from "../services/userService"

import Cookies from "js-cookie"

export const useProfile = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: userService.getMeRequest,
    enabled: !!Cookies.get("accessToken"),
    retry: false,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  })

  return {
    user,
    isLoading,
  }
}
