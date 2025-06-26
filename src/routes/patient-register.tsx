import { createFileRoute } from '@tanstack/react-router'

import NewPatientRegistrationForm from '../components/NewPatientRegistrationForm'

export const Route = createFileRoute('/patient-register')({
  component: NewPatientRegistrationForm,
})
