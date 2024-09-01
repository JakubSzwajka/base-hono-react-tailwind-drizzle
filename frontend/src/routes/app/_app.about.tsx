import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/about' as never)({
  component: About,
})

function About() {
  return <div className="p-2 border">Hello from About!</div>
}
