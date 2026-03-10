import { createFileRoute } from "@tanstack/react-router"
import { AuthForm } from "../../components/auth/AuthForm"

export const Route = createFileRoute("/_auth/register")({
  component: () => <AuthForm type="register" />,
})
