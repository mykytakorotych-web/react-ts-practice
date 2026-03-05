import { useQuery } from "@tanstack/react-query"
import { userService } from "../services/userService"

import Cookies from "js-cookie"

export const useProfile = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: userService.getMeRequest,
    enabled: !!Cookies.get("accessToken"),
    retry: false,
  })

  return {
    user,
    isLoading,
  }
}
