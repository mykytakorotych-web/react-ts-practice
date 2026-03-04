import { createFileRoute, Link } from "@tanstack/react-router"
import { Lock, Phone } from "lucide-react"
import { InputField } from "../../components/ui/InputField"

export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="p-4 w-11/12 max-w-md">
      <form className="flex flex-col gap-2.5">
        <InputField
          labelText="Username"
          Icon={Phone}
          placeholder="username"
          type="text"
          id="username"
        />

        <InputField
          labelText="Password"
          Icon={Lock}
          placeholder="password"
          type="password"
          id="password"
        />

        <div className="flex justify-between items-center mt-6">
          <Link to="." className="text-secondary-foreground">
            Forgot your password?
          </Link>
          <button
            type="submit"
            className="bg-primary text-white font-medium text-base px-8 py-2.5 rounded-lg shadow-lg shadow-primary/40 hover:bg-primary/90 hover:shadow-primary/50 transition-all active:scale-95"
          >
            Log In
          </button>
        </div>
      </form>
    </main>
  )
}
