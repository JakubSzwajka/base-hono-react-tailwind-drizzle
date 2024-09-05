import { createFileRoute } from '@tanstack/react-router'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'


const getProfile = async () => {
  const response = await api.auth['me'].$get()
  if (!response.ok) {
    throw new Error('Failed to fetch')
  }
  const data = await response.json()
  return data
}

export const Route = createFileRoute('/profile' as never)({
  component: Profile,
})

function Profile() {
  const {data, isPending, error} = useQuery({ queryKey: ['profile'], queryFn: getProfile })

  if (isPending) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  console.log(data)
  return <div className="p-2 border">Hello from Profile!</div>
}
