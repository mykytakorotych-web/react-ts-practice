import { createFileRoute, Link } from "@tanstack/react-router"
import { Lock, Phone } from "lucide-react"
import { InputField } from "../../components/ui/InputField"
import { useAuth } from "../../hooks/useAuth"

export const Route = createFileRoute("/_auth/register")({
  component: RouteComponent,
})

function RouteComponent() {
  const { isPending, error, handleSubmit } = useAuth()

  return (
    <form className="flex flex-col gap-2.5" onSubmit={handleSubmit}>
      <InputField
        labelText="Username"
        Icon={Phone}
        placeholder="username"
        type="text"
        id="username"
        name="username"
        maxLength={40}
        minLength={5}
        disabled={isPending}
        required
      />

      <InputField
        labelText="Password"
        Icon={Lock}
        placeholder="password"
        type="password"
        id="password"
        name="password"
        maxLength={40}
        minLength={5}
        disabled={isPending}
        required
      />

      <span className="text-red-500 h-5 truncate">{error?.message}</span>

      <div className="flex justify-between items-center mt-2">
        <Link to="." className="text-secondary-foreground">
          Forgot your password?
        </Link>
        <button
          type="submit"
          className="bg-primary text-white font-medium text-base px-8 py-2.5 rounded-lg shadow-lg shadow-primary/40 hover:bg-primary/90 hover:shadow-primary/50 transition-all active:scale-95"
          disabled={isPending}
        >
          {isPending ? "Signing up..." : "Sign Up"}
        </button>
      </div>
    </form>
  )
}
