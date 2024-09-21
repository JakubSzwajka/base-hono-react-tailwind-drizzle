import { api, userQueryOptions } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PersonIcon } from '@radix-ui/react-icons'
import { Input } from '@/components/ui/input'

export const Route = createFileRoute('/_authenticated/_app/')({
  component: Index
})

async function getMessages() {
  const res = await api.messages.$get()
  if (!res.ok) {
    throw new Error('Failed to fetch')
  }
  const data = await res.json()
  return data
}

function MessageBox({message}: {message: {
  id: number
  message: string
  createdAt: string
  isUser: boolean
} }) {
  const {data: user, isPending} = useQuery(userQueryOptions)

  function getAvatar() {
    if (message.isUser) {
      if (isPending || !user || !user.picture) {
        return <PersonIcon className="w-8 h-8 border rounded-full ml-2" />
      } else {
        const {picture} = user
        return <img src={picture} alt="User Avatar" className="w-8 h-8 border rounded-full ml-2" />
      }
    }
    return <img src={'/public/avatar.jpg'} alt="User Avatar" className="w-8 h-8 border rounded-full mr-2" />
  }

  return (
    <div className={`flex items-start ${message.isUser ? 'justify-end' : 'justify-start'} my-2`}>
      {!message.isUser && getAvatar()}
      <div className={`border rounded p-2 bg-white shadow-md max-w-3xl ${message.isUser ? 'ml-auto' : 'mr-auto'}`}>
        <div className='text-sm text-gray-500'>{new Date(message.createdAt).toLocaleString()}</div>
        <div className='text-sm'>{message.message}</div>
      </div>
      {message.isUser && getAvatar()}
    </div>
  )
}

function Index() {
  const {data: messages, isPending, error} = useQuery({ queryKey: ['messages'], queryFn: getMessages })

  if (isPending) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className='p-4 flex flex-col gap-4 h-full'>
      <Card>
        <CardHeader>
          <CardTitle>
            Hello Kuba 👋
          </CardTitle>
          <CardDescription>
            This is a test description
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className='flex-grow overflow-y-auto'>
        <CardContent>
          <div className='flex flex-col gap-4'>
            {messages.items.map((message) => (
              <MessageBox key={message.id} message={message} />
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          
            <Input placeholder='Type your message here...' />
        </CardContent>
      </Card>
    </div>
  )
}