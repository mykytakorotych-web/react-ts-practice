import { LoaderCircle } from "lucide-react"

export function Loader() {
  return (
    <div className="flex justify-center text-foreground">
      <LoaderCircle className="animate-spin" />
    </div>
  )
}
