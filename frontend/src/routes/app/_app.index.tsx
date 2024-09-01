import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/_app/')({
  component: Index
})


async function getTest() {
  const res = await api.test['hello'].$get()
  if (!res.ok) {
    throw new Error('Failed to fetch')
  }
  const data = await res.json()
  return data
}

function Index() {
  const [count, setCount] = useState(0)

  const {data, isPending, error} = useQuery({ queryKey: ['test-example'], queryFn: getTest })

  if (isPending) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  console.log(data)
  return (
    <>
      <Button>Test</Button>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}