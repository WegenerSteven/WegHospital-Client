import { createFileRoute } from '@tanstack/react-router'

import SimpleDashboard from './SimpleDashboard'

export const Route = createFileRoute('/dashboard')({
  component: SimpleDashboard,
})
