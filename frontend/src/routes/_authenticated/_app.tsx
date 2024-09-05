import { AppSidebar } from '@/components/app-sidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_app')({
  component: AppLayout
})

function AppLayout() {
  return (
      <div className="flex flex-row bg-gray-100 h-screen">
        <AppSidebar />
        <div className="ml-56 w-full">
          <div className="m-auto max-w-7xl w-full">
            <Outlet />
          </div>
        </div>
      </div>
  )
}