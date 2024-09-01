import { AppSidebar } from '@/components/app-sidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_app')({
  component: AppLayout
})

function AppLayout() {
  return (
    <div>
      <div className="flex flex-row">
        <AppSidebar />
        <div className="ml-56 w-full">
          <div className="m-auto max-w-7xl w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}