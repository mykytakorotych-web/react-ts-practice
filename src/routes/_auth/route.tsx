import { createFileRoute, Link, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <div className="flex h-full flex-col justify-center items-center gap-14">
      <header className="flex flex-col items-center justify-center gap-6">
        <img
          src="/android-chrome-192x192.png"
          alt="GigaChat logo"
          className="w-28 h-28 object-contain rounded-full shadow-2xl shadow-primary/40"
        />
        <h1 className="text-2xl sm:text-3xl font-medium text-foreground text-center">
          Welcome to GigaChat
        </h1>
      </header>
      <Outlet />
      <footer className="text-center text-secondary-foreground">
        <span className="block">Don't have an account?</span>
        <Link className="underline" to="/register">
          Register
        </Link>
      </footer>
    </div>
  )
}
