import { createMessage, getMessagesQueryOptions, userQueryOptions } from '@/lib/api'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PersonIcon } from '@radix-ui/react-icons'
import { Input } from '@/components/ui/input'
import { FieldApi, useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { createMessageSchema } from '@server/sharedTypes'

export const Route = createFileRoute('/_authenticated/_app/')({
  component: Index
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(", ")}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  )
}



function MessageBox({message}: {message: {
  id: string
  userId: string
  message: string
  createdAt: string

} }) {
  const {data: user, isPending} = useQuery(userQueryOptions)
  const isUser = message.userId === user?.id
  function getAvatar() {
    if (isUser) {
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
    <div className={`flex items-start ${isUser ? 'justify-end' : 'justify-start'} my-2`}>
      {!isUser && getAvatar()}
      <div className={`border rounded p-2 bg-white shadow-md max-w-3xl ${isUser ? 'ml-auto' : 'mr-auto'}`}>
        <div className='text-sm text-gray-500'>{new Date(message.createdAt).toLocaleString()}</div>
        <div className='text-sm'>{message.message}</div>
      </div>
      {isUser && getAvatar()}
    </div>
  )
}

function MessageInput() {
  const queryClient = useQueryClient()
  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      message: ''
    },
    onSubmit: async (values) => {
      const result = await createMessage(values.value.message)
      const existingData = await queryClient.ensureQueryData(getMessagesQueryOptions)
      queryClient.setQueryData(getMessagesQueryOptions.queryKey, ({
        ...existingData,
        items: [result.item, ...existingData.items]
      }))
      form.reset()
    }
  })
  
  
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <form.Field
        name="message"
        validators={{
          onChange: createMessageSchema.shape.message
        }}
        children={(field) => (
            <>
              <Label htmlFor={field.name}>Message</Label>
              <Input id={field.name} placeholder='Type your message here...'  value={field.state.value} onChange={(e) => field.handleChange(e.target.value)}/>
              <FieldInfo field={field} />
            </>
        )}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button disabled={!canSubmit} type="submit">
              {isSubmitting ? 'Sending...' : 'Send'}
            </Button>
          )}
        />
      </form>
    </div>
  )
}

function Index() {
  const {data: messages, isPending, error} = useQuery(getMessagesQueryOptions)

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
          <MessageInput />
        </CardContent>
      </Card>
    </div>
  )
}