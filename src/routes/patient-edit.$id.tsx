import { createFileRoute } from '@tanstack/react-router'

import PatientEditForm from '../components/PatientEditForm'

export const Route = createFileRoute('/patient-edit/$id')({
  component: PatientEditForm,
})
