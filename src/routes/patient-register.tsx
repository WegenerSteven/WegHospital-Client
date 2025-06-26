import { createFileRoute } from '@tanstack/react-router'

import PatientRegistrationForm from '../components/PatientRegistrationForm'

export const Route = createFileRoute('/patient-register')({
  component: PatientRegistrationForm,
})
