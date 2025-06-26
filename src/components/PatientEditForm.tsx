import { useForm } from '@tanstack/react-form';
import { useNavigate, useParams } from '@tanstack/react-router';
import { UserCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { PatientFormData } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { getPatientById, updatePatient } from '@/lib/data-store';



export default function PatientEditForm() {
  const navigate = useNavigate();
  const { id } = useParams({ from: '/patient-edit/$id' });
  const [selectedGender, setSelectedGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string>('');
  const [patient, setPatient] = useState<any>(null);

  useEffect(() => {
    const patientData = getPatientById(parseInt(id));
    if (patientData) {
      setPatient(patientData);
      setSelectedGender(patientData.gender);
    } else {
      setSubmitMessage('Patient not found');
    }
  }, [id]);

  const form = useForm({
    defaultValues: {
      firstName: patient?.firstName || '',
      lastName: patient?.lastName || '',
      email: patient?.email || '',
      phone: patient?.phone || '',
      dateOfBirth: patient?.dateOfBirth || '',
      gender: patient?.gender || 'Male' as 'Male' | 'Female' | 'Other',
      address: patient?.address || '',
    } as PatientFormData,
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      setSubmitMessage('');
      
      try {
        const updatedPatient = updatePatient(parseInt(id), value);
        if (updatedPatient) {
          setSubmitMessage(`Patient updated successfully!`);
          setTimeout(() => {
            navigate({ to: '/dashboard' });
          }, 2000);
        } else {
          setSubmitMessage('Error updating patient. Please try again.');
        }
      } catch (error) {
        setSubmitMessage('Error updating patient. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Update form when patient data loads
  useEffect(() => {
    if (patient) {
      form.setFieldValue('firstName', patient.firstName);
      form.setFieldValue('lastName', patient.lastName);
      form.setFieldValue('email', patient.email);
      form.setFieldValue('phone', patient.phone);
      form.setFieldValue('dateOfBirth', patient.dateOfBirth);
      form.setFieldValue('gender', patient.gender);
      form.setFieldValue('address', patient.address);
    }
  }, [patient]);

  if (!patient && !submitMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-2xl w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
            <UserCheck className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Edit Patient Information
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Update patient details in the Hospital Management System
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
              onChange: ({ value }) =>
                !value
                  ? 'Email is required'
                  : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                  ? 'Please enter a valid email'
                  : undefined,
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
                  placeholder="john.doe@email.com"
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
              name="phone"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Phone number is required' : undefined,
              }}
            >
              {(field) => (
                <div>
                  <Label htmlFor={field.name}>Phone Number</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="tel"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="mt-1"
                    placeholder="+1-555-123-4567"
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
          </div>

          <form.Field name="gender">
            {(field) => (
              <div>
                <Label htmlFor={field.name}>Gender</Label>
                <Select
                  value={selectedGender}
                  onValueChange={(value) => {
                    const gender = value as 'Male' | 'Female' | 'Other';
                    setSelectedGender(gender);
                    field.handleChange(gender);
                  }}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
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
                  placeholder="123 Main St, City, State 12345"
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

          {submitMessage && (
            <div className={`rounded-md p-4 ${
              submitMessage.includes('successfully') 
                ? 'bg-green-50 text-green-700' 
                : 'bg-red-50 text-red-700'
            }`}>
              <div className="text-sm">
                {submitMessage}
              </div>
            </div>
          )}

          <div className="flex space-x-4">
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Updating...</span>
                </div>
              ) : (
                'Update Patient'
              )}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate({ to: '/dashboard' })}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
