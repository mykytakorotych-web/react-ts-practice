import { Link } from "@tanstack/react-router"
import { Sticker } from "./Sticker"

export function NotFoundComponent() {
  return (
    <div className="text-center text-secondary-foreground mt-10">
      <Sticker name="i-dont-know" fetchPriority="high" />
      <h1 className="mb-2">404 - Page not found 🕵️‍♂️</h1>
      <Link className="text-primary" to="/">
        Return to homepage
      </Link>
    </div>
  )
}
