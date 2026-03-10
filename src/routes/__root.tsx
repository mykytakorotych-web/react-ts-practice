import { Outlet, createRootRoute } from "@tanstack/react-router"
import { NotFoundComponent } from "../components/ui/NotFoundComponent"
import { SomethingWentWrong } from "../components/ui/SomethingWentWrong"

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: () => <SomethingWentWrong />,
  notFoundComponent: () => <NotFoundComponent />,
})

function RootComponent() {
  return (
    <>
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  )
}
