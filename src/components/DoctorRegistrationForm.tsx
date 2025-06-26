import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { doctorApi, type CreateDoctorDto } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface DoctorFormData {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  specialty: string
  yearsOfExperience: number
  password: string
  status: boolean
}

interface DoctorRegistrationFormProps {
  onCancel?: () => void
}

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

export default function DoctorRegistrationForm({ onCancel }: DoctorRegistrationFormProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const createDoctorMutation = useMutation({
    mutationFn: async (data: DoctorFormData) => {
      const doctorData: CreateDoctorDto = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        specialty: data.specialty,
        yearsOfExperience: data.yearsOfExperience,
        password: data.password,
        status: data.status,
      }
      
      return await doctorApi.create(doctorData)
    },
    onSuccess: (data) => {
      toast.success(`Doctor registered successfully! ID: ${data.doctorId}`)
      queryClient.invalidateQueries({ queryKey: ['doctors'] })
      form.reset()
      
      setTimeout(() => {
        if (onCancel) {
          onCancel()
        } else {
          navigate({ to: '/dashboard/Doctors' })
        }
      }, 1500)
    },
    onError: (error) => {
      toast.error(`Error registering doctor: ${error.message}`)
    },
  })

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      specialty: '',
      yearsOfExperience: 0,
      password: '',
      status: true,
    },
    onSubmit: async ({ value }) => {
      createDoctorMutation.mutate(value)
    },
  })

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Register New Doctor</CardTitle>
        <CardDescription>
          Add a new doctor to the hospital management system
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <form.Field
              name="firstName"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'First name is required' : undefined,
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>First Name *</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter first name"
                  />
                  {field.state.meta.errors ? (
                    <em className="text-red-500 text-sm">
                      {field.state.meta.errors}
                    </em>
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
                  <Label htmlFor={field.name}>Last Name *</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter last name"
                  />
                  {field.state.meta.errors ? (
                    <em className="text-red-500 text-sm">
                      {field.state.meta.errors}
                    </em>
                  ) : null}
                </div>
              )}
            </form.Field>
          </div>

          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Email is required'
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                  return 'Invalid email format'
                }
                return undefined
              },
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Email *</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter email address"
                />
                {field.state.meta.errors ? (
                  <em className="text-red-500 text-sm">
                    {field.state.meta.errors}
                  </em>
                ) : null}
              </div>
            )}
          </form.Field>

          <form.Field
            name="phoneNumber"
            validators={{
              onChange: ({ value }) =>
                !value ? 'Phone number is required' : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Phone Number *</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="tel"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter phone number"
                />
                {field.state.meta.errors ? (
                  <em className="text-red-500 text-sm">
                    {field.state.meta.errors}
                  </em>
                ) : null}
              </div>
            )}
          </form.Field>

          <form.Field
            name="specialty"
            validators={{
              onChange: ({ value }) =>
                !value ? 'Specialty is required' : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Specialty *</Label>
                <Select onValueChange={field.handleChange} value={field.state.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialty" />
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
                  <em className="text-red-500 text-sm">
                    {field.state.meta.errors}
                  </em>
                ) : null}
              </div>
            )}
          </form.Field>

          <form.Field
            name="yearsOfExperience"
            validators={{
              onChange: ({ value }) => {
                if (value < 0) return 'Years of experience must be positive'
                if (value > 50) return 'Years of experience cannot exceed 50'
                return undefined
              },
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Years of Experience *</Label>
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
                  <em className="text-red-500 text-sm">
                    {field.state.meta.errors}
                  </em>
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
                <Label htmlFor={field.name}>Password *</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter password (min 6 characters)"
                />
                {field.state.meta.errors ? (
                  <em className="text-red-500 text-sm">
                    {field.state.meta.errors}
                  </em>
                ) : null}
              </div>
            )}
          </form.Field>

          <form.Field name="status">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Status</Label>
                <Select
                  onValueChange={(value) => field.handleChange(value === 'true')}
                  value={field.state.value.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Active</SelectItem>
                    <SelectItem value="false">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </form.Field>
        </CardContent>

        <CardFooter className="flex gap-4">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting || createDoctorMutation.isPending}
                className="flex-1"
              >
                {createDoctorMutation.isPending ? 'Registering...' : 'Register Doctor'}
              </Button>
            )}
          </form.Subscribe>
          
          {onCancel && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  )
}
