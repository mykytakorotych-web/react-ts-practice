import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useLocation,
} from "@tanstack/react-router"
import Cookie from "js-cookie"

export const Route = createFileRoute("/_auth")({
  beforeLoad: () => {
    const token = Cookie.get("accessToken")

    if (token) {
      throw redirect({
        to: "/",
      })
    }
  },
  component: AuthLayout,
})

function AuthLayout() {
  const location = useLocation()

  return (
    <div className="flex h-full flex-col justify-center items-center gap-14 w-10/12 max-w-md mx-auto">
      <header className="flex flex-col items-center justify-center gap-6 ">
        <Link to="/">
          <img
            src="/android-chrome-192x192.png"
            alt="GigaChat logo"
            className="w-28 h-28 object-contain rounded-full shadow-2xl shadow-primary/40"
          />
        </Link>
        <h1 className="text-2xl sm:text-3xl font-medium text-foreground text-center">
          {location.pathname === "/login"
            ? "Welcome back to GigaChat!"
            : "Welcome to GigaChat!"}
        </h1>
      </header>
      <main className="w-full">
        <Outlet />
      </main>
      <footer className="text-center text-secondary-foreground">
        <span className="block">
          {location.pathname === "/login"
            ? "Don't have an account?"
            : "Already have an account?"}
        </span>

        <Link
          className="underline"
          to={location.pathname === "/login" ? "/register" : "/login"}
        >
          {location.pathname === "/login" ? "Sign up" : "Log In"}
        </Link>
      </footer>
    </div>
  )
}
