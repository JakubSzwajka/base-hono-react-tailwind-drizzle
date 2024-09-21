import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


interface RootRouteContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </>
  ),
})
