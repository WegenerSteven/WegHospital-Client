import { useForm } from '@tanstack/react-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import type { CreateAppointmentDto } from '@/types/index'
import { appointmentApi, patientApi, doctorApi} from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

interface AppointmentFormData {
  patientId: number
  doctorId: number
  appointmentDate: string
  status: string
  notes: string
}

interface AppointmentFormProps {
  onCancel?: () => void
}

const appointmentStatuses = [
  'scheduled',
  'completed',
  'cancelled'
]

export default function AppointmentForm({ onCancel }: AppointmentFormProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // Fetch patients and doctors for selection
  const { data: patients } = useQuery({
    queryKey: ['patients'],
    queryFn: patientApi.getAll,
  })

  const { data: doctors } = useQuery({
    queryKey: ['doctors'],
    queryFn: doctorApi.getAll,
  })

  const createAppointmentMutation = useMutation({
    mutationFn: async (data: AppointmentFormData) => {
      const appointmentData: CreateAppointmentDto = {
        patientId: data.patientId,
        doctorId: data.doctorId,
        appointmentDate: data.appointmentDate,
        status: data.status,
        notes: data.notes || undefined,
      }
      
      return await appointmentApi.create(appointmentData)
    },
    onSuccess: (data) => {
      toast.success(`Appointment scheduled successfully! ID: ${data.appointmentId}`)
      queryClient.invalidateQueries({ queryKey: ['appointments'] })
      form.reset()
      
      setTimeout(() => {
        if (onCancel) {
          onCancel()
        } else {
          navigate({ to: '/dashboard/appointments' })
        }
      }, 1500)
    },
    onError: (error) => {
      toast.error(`Error scheduling appointment: ${error.message}`)
    },
  })

  const form = useForm({
    defaultValues: {
      patientId: 0,
      doctorId: 0,
      appointmentDate: '',
      status: 'scheduled',
      notes: '',
    },
    onSubmit: async ({ value }) => {
      createAppointmentMutation.mutate(value)
    },
  })

  // Format date for datetime-local input
  const getMinDateTime = () => {
    const now = new Date()
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
    return now.toISOString().slice(0, 16)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Schedule New Appointment</CardTitle>
        <CardDescription>
          Create a new appointment between a patient and doctor
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
          <form.Field
            name="patientId"
            validators={{
              onChange: ({ value }) =>
                !value || value === 0 ? 'Please select a patient' : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Patient *</Label>
                <Select 
                  onValueChange={(value) => field.handleChange(parseInt(value))} 
                  value={field.state.value.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients?.map((patient) => (
                      <SelectItem key={patient.patientId} value={patient.patientId.toString()}>
                        {patient.profile?.firstName} {patient.profile?.lastName} (ID: {patient.patientId})
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
            name="doctorId"
            validators={{
              onChange: ({ value }) =>
                !value || value === 0 ? 'Please select a doctor' : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Doctor *</Label>
                <Select 
                  onValueChange={(value) => field.handleChange(parseInt(value))} 
                  value={field.state.value.toString()}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors?.map((doctor) => (
                      <SelectItem key={doctor.doctorId} value={doctor.doctorId.toString()}>
                        Dr. {doctor.firstName} {doctor.lastName} ({doctor.specialty})
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
            name="appointmentDate"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Appointment date and time is required'
                const appointmentDate = new Date(value)
                const now = new Date()
                if (appointmentDate <= now) {
                  return 'Appointment must be scheduled for a future date and time'
                }
                return undefined
              },
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Appointment Date & Time *</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="datetime-local"
                  min={getMinDateTime()}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
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
            name="status"
            validators={{
              onChange: ({ value }) =>
                !value ? 'Status is required' : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Status *</Label>
                <Select onValueChange={field.handleChange} value={field.state.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {appointmentStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
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

          <form.Field name="notes">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Notes (Optional)</Label>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Add any additional notes for this appointment..."
                  rows={3}
                />
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
                disabled={!canSubmit || isSubmitting || createAppointmentMutation.isPending}
                className="flex-1"
              >
                {createAppointmentMutation.isPending ? 'Scheduling...' : 'Schedule Appointment'}
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
