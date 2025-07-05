import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useState } from 'react'
import { Heart, Eye, EyeOff } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})


function LoginPage() {
  const navigate = useNavigate()
  const { login, isLoading: authLoading, isAuthenticated } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate({ to: '/dashboard' })
    return null
  }

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true)
      
      try {
        await login(value.email, value.password)
        navigate({ to: '/dashboard' })
      } catch (error) {
        // Error is handled in AuthContext
        console.error('Login error:', error)
      } finally {
        setIsLoading(false)
      }
    },
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Test Users Info Card */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-yellow-800">Test Users</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-yellow-700 space-y-2">
            <div>
              <strong>Admin:</strong> admin@hospital.com / admin123
            </div>
            <div>
              <strong>Doctor:</strong> doctor@hospital.com / doctor123  
            </div>
            <div>
              <strong>User:</strong> test@example.com / password123
            </div>
          </CardContent>
        </Card>
        
        {/* Login Form */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-10 w-10 text-red-500 mr-2" />
            <span className="text-3xl font-bold text-gray-900">WegHospital</span>
          </div>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
          >
            <CardContent className="space-y-4">
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return 'Email is required'
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                      return 'Please enter a valid email address'
                    }
                    return undefined
                  },
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Email Address</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your email"
                    />
                    {field.state.meta.errors ? (
                      <p className="text-red-500 text-sm">
                        {field.state.meta.errors}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>

              <form.Field
                name="password"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return 'Password is required'
                    if (value.length < 6) return 'Password must be at least 6 characters'
                    return undefined
                  },
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Password</Label>
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type={showPassword ? "text" : "password"}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {field.state.meta.errors ? (
                      <p className="text-red-500 text-sm">
                        {field.state.meta.errors}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!canSubmit || isSubmitting || isLoading || authLoading}
                  >
                    {isLoading || authLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                )}
              </form.Subscribe>

              <div className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate({ to: '/register' })}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Create one here
                </button>
              </div>
            </CardFooter>
          </form>
        </Card>

      </div>
    </div>
  )
}
