import { LoginForm } from '@/components/login-form'
import { userQueryOptions } from '@/lib/api'
import { createFileRoute, Outlet } from '@tanstack/react-router'

const Component = () => {
    const { user } = Route.useRouteContext()
    if (!user) {
        return <LoginForm />
    }
    return <Outlet />

}

export const Route = createFileRoute('/_authenticated')({
    beforeLoad: async ({context} ) => {
        try {
            const queryClient = context.queryClient
            return await queryClient.fetchQuery(userQueryOptions)
        } catch (e) {
            console.error(e)
            return {user: null}
        }
    },
    component: Component
})