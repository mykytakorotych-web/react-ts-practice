import { Link } from "@tanstack/react-router"
import { Lock, Phone } from "lucide-react"
import type { SubmitEvent } from "react"
import { useAuth } from "../../hooks/useAuth"
import { InputField } from "../ui/InputField"

interface AuthFormProps {
  type: "login" | "register"
}

export function AuthForm({ type }: AuthFormProps) {
  const { isPending, error, handleSubmit } = useAuth()

  const isLogin = type === "login"
  const buttonText = isLogin ? "Log in" : "Sign Up"
  const loadingText = isLogin ? "Logging in..." : "Signing up..."

  const errorMessage = isLogin
    ? error && `Email or password is incorrect`
    : error?.message

  const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    handleSubmit(e, type)
  }

  return (
    <form className="flex flex-col gap-2.5" onSubmit={onSubmit}>
      <InputField
        labelText="Username"
        Icon={Phone}
        placeholder="username"
        type="text"
        id="username"
        name="username"
        autoComplete="username"
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
        autoComplete={isLogin ? "current-password" : "new-password"}
        maxLength={40}
        minLength={5}
        disabled={isPending}
        required
      />

      <span className="text-red-500 h-5 truncate">{errorMessage}</span>

      <div className="flex justify-between items-center mt-2">
        <Link
          to="."
          className="text-secondary-foreground hover:text-primary transition-colors"
        >
          Forgot your password?
        </Link>
        <button
          type="submit"
          className="bg-primary text-white font-medium text-base px-8 py-2.5 rounded-lg shadow-lg shadow-primary/40 hover:bg-primary/90 hover:shadow-primary/50 transition-colors active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={isPending}
        >
          {isPending ? loadingText : buttonText}
        </button>
      </div>
    </form>
  )
}
