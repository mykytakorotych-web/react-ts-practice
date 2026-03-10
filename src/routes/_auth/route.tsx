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
  const isLogin = location.pathname === "/login"

  return (
    <div className="flex h-full flex-col justify-center items-center gap-14 w-10/12 max-w-md mx-auto">
      <header className="flex flex-col items-center justify-center gap-6">
        <Link to="/">
          <img
            src="/android-chrome-192x192.png"
            alt="GigaChat logo"
            className="w-28 h-28 object-contain rounded-full shadow-2xl shadow-primary/40"
          />
        </Link>
        <h1 className="text-2xl sm:text-3xl font-medium text-foreground text-center">
          {isLogin ? "Welcome back to GigaChat!" : "Welcome to GigaChat!"}
        </h1>
      </header>

      <main className="w-full">
        <Outlet />
      </main>

      <footer className="text-center text-secondary-foreground flex flex-col gap-1">
        <span>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </span>
        <Link
          className="underline font-medium hover:text-primary transition-colors"
          to={isLogin ? "/register" : "/login"}
        >
          {isLogin ? "Sign up" : "Log In"}
        </Link>
      </footer>
    </div>
  )
}
