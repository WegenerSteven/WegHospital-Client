import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useState } from 'react'
import { Heart, Eye, EyeOff, User, UserCheck, Stethoscope } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAuth } from '@/contexts/AuthContext'

export const Route = createFileRoute('/register')({
  component: RegisterPage,
})

const specialties = [
  'Cardiology',
  'Dermatology',
  'Emergency Medicine',
  'Family Medicine',
  'Gastroenterology',
  'General Surgery',
  'Internal Medicine',
  'Neurology',
  'Obstetrics and Gynecology',
  'Oncology',
  'Ophthalmology',
  'Orthopedics',
  'Pediatrics',
  'Psychiatry',
  'Radiology',
  'Urology'
]

function RegisterPage() {
  const navigate = useNavigate()
  const { register, isLoading: authLoading, isAuthenticated } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate({ to: '/dashboard' })
    return null
  }

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'patient' as 'patient' | 'doctor' | 'admin' | 'user',
      phoneNumber: '',
      specialty: '',
      yearsOfExperience: 0,
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true)
      
      try {
        // Basic validation
        if (!value.firstName || !value.lastName || !value.email || !value.password) {
          return
        }

        if (value.password !== value.confirmPassword) {
          return
        }

        await register({
          firstName: value.firstName,
          lastName: value.lastName,
          email: value.email,
          password: value.password,
          role: value.role,
          ...(value.role === 'doctor' && {
            specialty: value.specialty,
            yearsOfExperience: value.yearsOfExperience,
            phoneNumber: value.phoneNumber,
          }),
        })
        
        navigate({ to: '/login' })
      } catch (error) {
        console.error('Registration error:', error)
      } finally {
        setIsLoading(false)
      }
    },
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-10 w-10 text-red-500 mr-2" />
            <span className="text-3xl font-bold text-gray-900">WegHospital</span>
          </div>
          <p className="text-gray-600">Create your account to get started</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>
              Fill in your information to create a new account
            </CardDescription>
          </CardHeader>
          
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
          >
            <CardContent className="space-y-6">
              {/* Role Selection */}
              <form.Field
                name="role"
                validators={{
                  onChange: ({ value }) =>
                    !value ? 'Please select a role' : undefined,
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Account Type</Label>
                    <Select onValueChange={(value) => field.handleChange(value as typeof field.state.value)} value={field.state.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="patient">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            Patient
                          </div>
                        </SelectItem>
                        <SelectItem value="doctor">
                          <div className="flex items-center">
                            <Stethoscope className="h-4 w-4 mr-2" />
                            Doctor
                          </div>
                        </SelectItem>
                        <SelectItem value="user">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            User
                          </div>
                        </SelectItem>
                        <SelectItem value="admin">
                          <div className="flex items-center">
                            <UserCheck className="h-4 w-4 mr-2" />
                            Administrator
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {field.state.meta.errors ? (
                      <p className="text-red-500 text-sm">
                        {field.state.meta.errors}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>

              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field
                  name="firstName"
                  validators={{
                    onChange: ({ value }) =>
                      !value ? 'First name is required' : undefined,
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>First Name</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter your first name"
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
                  name="lastName"
                  validators={{
                    onChange: ({ value }) =>
                      !value ? 'Last name is required' : undefined,
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Last Name</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter your last name"
                      />
                      {field.state.meta.errors ? (
                        <p className="text-red-500 text-sm">
                          {field.state.meta.errors}
                        </p>
                      ) : null}
                    </div>
                  )}
                </form.Field>
              </div>

              {/* Email */}
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

              {/* Phone Number */}
              <form.Field
                name="phoneNumber"
                validators={{
                  onChange: ({ value }) =>
                    !value ? 'Phone number is required' : undefined,
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>Phone Number</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="tel"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your phone number"
                    />
                    {field.state.meta.errors ? (
                      <p className="text-red-500 text-sm">
                        {field.state.meta.errors}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>

              {/* Doctor-specific fields */}
              <form.Subscribe
                selector={(state) => state.values.role}
              >
                {(role) => (
                  role === 'doctor' && (
                    <>
                      <form.Field
                        name="specialty"
                        validators={{
                          onChange: ({ value }) =>
                            role === 'doctor' && !value ? 'Specialty is required for doctors' : undefined,
                    }}
                  >
                    {(field) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name}>Medical Specialty</Label>
                        <Select onValueChange={field.handleChange} value={field.state.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your specialty" />
                          </SelectTrigger>
                          <SelectContent>
                            {specialties.map((specialty) => (
                              <SelectItem key={specialty} value={specialty}>
                                {specialty}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {field.state.meta.errors ? (
                          <p className="text-red-500 text-sm">
                            {field.state.meta.errors}
                          </p>
                        ) : null}
                      </div>
                    )}
                  </form.Field>

                  <form.Field
                    name="yearsOfExperience"
                    validators={{
                      onChange: ({ value }) => {
                        if (role === 'doctor' && (value < 0 || value > 50)) {
                          return 'Years of experience must be between 0 and 50'
                        }
                        return undefined
                      },
                    }}
                  >
                    {(field) => (
                      <div className="space-y-2">
                        <Label htmlFor={field.name}>Years of Experience</Label>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="number"
                          min="0"
                          max="50"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(parseInt(e.target.value) || 0)}
                          placeholder="Enter years of experience"
                        />
                        {field.state.meta.errors ? (
                          <p className="text-red-500 text-sm">
                            {field.state.meta.errors}
                          </p>
                        ) : null}
                      </div>
                    )}
                  </form.Field>
                    </>
                  )
                )}
              </form.Subscribe>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          placeholder="Create a password"
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

                <form.Field
                  name="confirmPassword"
                  validators={{
                    onChange: ({ value, fieldApi }) => {
                      if (!value) return 'Please confirm your password'
                      if (value !== fieldApi.form.getFieldValue('password')) {
                        return 'Passwords do not match'
                      }
                      return undefined
                    },
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Confirm Password</Label>
                      <div className="relative">
                        <Input
                          id={field.name}
                          name={field.name}
                          type={showConfirmPassword ? "text" : "password"}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
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
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                  I agree to the{' '}
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </a>
                </label>
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
                    {isLoading || authLoading ? 'Creating account...' : 'Create Account'}
                  </Button>
                )}
              </form.Subscribe>

              <div className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate({ to: '/login' })}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign in here
                </button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
