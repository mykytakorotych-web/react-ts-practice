export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return ""

  const [year, month, day] = dateString.split("-")

  const mm = month?.padStart(2, "0")
  const dd = day?.padStart(2, "0")

  return `${dd}.${mm}.${year}`
}
