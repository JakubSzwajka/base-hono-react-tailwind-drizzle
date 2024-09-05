// import { Link } from '@tanstack/react-router'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

export function LoginForm() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">👋 Hello there!</CardTitle>
          <CardDescription>
            First, let's get you logged in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div> */}
            <a href="/api/auth/login">
              <Button type="submit" className="w-full">
                Login
              </Button>
            </a>
            {/* <Button variant="outline" className="w-full" disabled>
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div> */}
        </CardContent>
      </Card>
    </div>
  )
}
