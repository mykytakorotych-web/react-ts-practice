import { createFileRoute } from "@tanstack/react-router"
import { AuthForm } from "../../components/auth/AuthForm"

export const Route = createFileRoute("/_auth/login")({
  component: () => <AuthForm type="login" />,
})
