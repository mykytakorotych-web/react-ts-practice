import { isAxiosError } from "axios"

export const checkIs404 = (error: unknown): boolean => {
  if (!error) return false

  if (isAxiosError(error)) {
    return error.response?.status === 404 || error.response?.status === 400
  }

  if (error instanceof Error) {
    const msg = error.message.toLowerCase()
    return msg.includes("not found") || msg.includes("404")
  }

  if (typeof error === "string") {
    const msg = error.toLowerCase()
    return msg.includes("not found") || msg.includes("404")
  }

  return false
}
