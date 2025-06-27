import { createFileRoute } from '@tanstack/react-router'
import DoctorEditForm from '@/components/DoctorEditForm'

export const Route = createFileRoute('/doctor-edit/$id')({
  component: DoctorEditForm,
})

