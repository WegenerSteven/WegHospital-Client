import { useForm } from '@tanstack/react-form';
import { useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { profileApi, patientApi } from '@/lib/api';

interface PatientRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  address: string;
  city?: string;
  dateOfAdmission: string;
  dateOfDischarge?: string;
}

export default function PatientRegistrationForm() {
  const navigate = useNavigate();

  const createPatientMutation = useMutation({
    mutationFn: async (data: PatientRegistrationData) => {
      // First create the profile
      const profile = await profileApi.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: 'patient',
      });

      // Then create the patient with the profile ID
      const patient = await patientApi.create({
        dateOfAdmission: data.dateOfAdmission,
        dateOfDischarge: data.dateOfDischarge,
        dateOfBirth: data.dateOfBirth,
        address: data.address,
        city: data.city || undefined,
        profileId: profile.profileId,
      });

      return { profile, patient };
    },
    onSuccess: (data) => {
      toast.success(`Patient registered successfully! ID: ${data.patient.patientId}`);
      form.reset();
      setTimeout(() => {
        navigate({ to: '/dashboard/Patients' });
      }, 1500);
    },
    onError: (error) => {
      toast.error(`Error registering patient: ${error.message}`);
    },
  });

  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      address: '',
      city: '',
      dateOfAdmission: new Date().toISOString().split('T')[0], // Today's date
      dateOfDischarge: '',
    } as PatientRegistrationData,
    onSubmit: async ({ value }) => {
      createPatientMutation.mutate(value);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4">
      <div className="max-w-2xl w-full space-y-8 p-8 bg-white rounded-xl shadow-2xl">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-green-600 rounded-full flex items-center justify-center">
            <UserPlus className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Patient Registration
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Register as a new patient in our Hospital Management System
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="mt-8 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form.Field
              name="firstName"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'First name is required' : undefined,
              }}
            >
              {(field) => (
                <div>
                  <Label htmlFor={field.name}>First Name</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="mt-1"
                    placeholder="John"
                  />
                  {field.state.meta.isTouched && field.state.meta.errors.length ? (
                    <p className="mt-1 text-sm text-red-600">
                      {field.state.meta.errors[0]}
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
                <div>
                  <Label htmlFor={field.name}>Last Name</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="mt-1"
                    placeholder="Doe"
                  />
                  {field.state.meta.isTouched && field.state.meta.errors.length ? (
                    <p className="mt-1 text-sm text-red-600">
                      {field.state.meta.errors[0]}
                    </p>
                  ) : null}
                </div>
              )}
            </form.Field>
          </div>

          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Email is required';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                  return 'Please enter a valid email address';
                }
                return undefined;
              },
            }}
          >
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Email Address</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className="mt-1"
                  placeholder="john.doe@example.com"
                />
                {field.state.meta.isTouched && field.state.meta.errors.length ? (
                  <p className="mt-1 text-sm text-red-600">
                    {field.state.meta.errors[0]}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form.Field
              name="dateOfBirth"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Date of birth is required' : undefined,
              }}
            >
              {(field) => (
                <div>
                  <Label htmlFor={field.name}>Date of Birth</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="date"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="mt-1"
                  />
                  {field.state.meta.isTouched && field.state.meta.errors.length ? (
                    <p className="mt-1 text-sm text-red-600">
                      {field.state.meta.errors[0]}
                    </p>
                  ) : null}
                </div>
              )}
            </form.Field>

            <form.Field
              name="dateOfAdmission"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Date of admission is required' : undefined,
              }}
            >
              {(field) => (
                <div>
                  <Label htmlFor={field.name}>Date of Admission</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="date"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="mt-1"
                  />
                  {field.state.meta.isTouched && field.state.meta.errors.length ? (
                    <p className="mt-1 text-sm text-red-600">
                      {field.state.meta.errors[0]}
                    </p>
                  ) : null}
                </div>
              )}
            </form.Field>
          </div>

          <form.Field name="dateOfDischarge">
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Date of Discharge (Optional)</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="date"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className="mt-1"
                />
              </div>
            )}
          </form.Field>

          <form.Field
            name="address"
            validators={{
              onChange: ({ value }) =>
                !value ? 'Address is required' : undefined,
            }}
          >
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Address</Label>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className="mt-1"
                  placeholder="123 Main Street, City, State, ZIP"
                  rows={3}
                />
                {field.state.meta.isTouched && field.state.meta.errors.length ? (
                  <p className="mt-1 text-sm text-red-600">
                    {field.state.meta.errors[0]}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>

          <form.Field name="city">
            {(field) => (
              <div>
                <Label htmlFor={field.name}>City (Optional)</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  className="mt-1"
                  placeholder="New York"
                />
              </div>
            )}
          </form.Field>

          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate({ to: '/dashboard' })}
            >
              Cancel
            </Button>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || createPatientMutation.isPending}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  {createPatientMutation.isPending ? 'Registering...' : 'Register Patient'}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </div>
    </div>
  );
}
