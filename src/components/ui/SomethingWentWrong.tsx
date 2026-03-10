import { Link } from "@tanstack/react-router"
import { Sticker } from "./Sticker"

export function SomethingWentWrong() {
  return (
    <div className="text-center text-secondary-foreground mt-10">
      <Sticker name="i-dont-know" fetchPriority="high" />
      <h1 className="mb-2">Something went wrong.</h1>
      <Link className="text-primary" to="/">
        Return to homepage
      </Link>
    </div>
  )
}
