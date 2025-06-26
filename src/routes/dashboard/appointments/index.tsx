import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Calendar, Edit, Trash2, CalendarPlus, Clock } from 'lucide-react'
import { toast } from 'sonner'
import { useState } from 'react'
import { type ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { DataTable } from '@/components/ui/data-table'
import { appointmentApi } from '@/lib/api'
import AppointmentForm from '@/components/AppointmentForm'

interface Appointment {
  appointmentId: number
  appointmentDate: string
  status: string
  notes?: string
  patient?: {
    patientId: number
    profile?: {
      firstName: string
      lastName: string
    }
  }
  doctor?: {
    firstName: string
    lastName: string
    specialty: string
  }
}

export const Route = createFileRoute('/dashboard/appointments/')({
  component: AppointmentsPage,
})

function AppointmentsPage() {
  const queryClient = useQueryClient()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
  const { data: appointments = [], isLoading, error } = useQuery({
    queryKey: ['appointments'],
    queryFn: appointmentApi.getAll,
  })

  const deleteMutation = useMutation({
    mutationFn: appointmentApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] })
      toast.success('Appointment deleted successfully!')
    },
    onError: (error) => {
      toast.error(`Error deleting appointment: ${error.message}`)
    },
  })

  const handleDeleteAppointment = (id: number) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      deleteMutation.mutate(id)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const columns: ColumnDef<Appointment>[] = [
    {
      accessorKey: 'patient',
      header: 'Patient',
      cell: ({ row }) => (
        <div>
          <div className="font-medium text-gray-900">
            {row.original.patient?.profile?.firstName || 'N/A'} {row.original.patient?.profile?.lastName || ''}
          </div>
          <div className="text-sm text-gray-500">
            ID: {row.original.patient?.patientId || 'N/A'}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'doctor',
      header: 'Doctor',
      cell: ({ row }) => (
        <div>
          <div className="font-medium text-gray-900">
            Dr. {row.original.doctor?.firstName || 'N/A'} {row.original.doctor?.lastName || ''}
          </div>
          <div className="text-sm text-gray-500">
            {row.original.doctor?.specialty || 'N/A'}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'appointmentDate',
      header: 'Date & Time',
      cell: ({ row }) => (
        <div>
          <div className="text-gray-900">
            {new Date(row.original.appointmentDate).toLocaleDateString()}
          </div>
          <div className="text-sm text-gray-500 flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {new Date(row.original.appointmentDate).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(row.original.status)}`}>
          {row.original.status}
        </span>
      ),
    },
    {
      accessorKey: 'notes',
      header: 'Notes',
      cell: ({ row }) => (
        <div className="text-gray-900 max-w-xs truncate">
          {row.original.notes || 'No notes'}
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="text-blue-600 hover:text-blue-700"
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700"
            onClick={() => handleDeleteAppointment(row.original.appointmentId)}
            disabled={deleteMutation.isPending}
          >
            <Trash2 className="w-4 h-4 mr-1" />
            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      ),
    },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading appointments...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading appointments: {error.message}</p>
          <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['appointments'] })}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Appointments</h1>
            <div className="text-sm text-gray-600">
              Total Appointments: {appointments?.length || 0}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3">
                <CalendarPlus className="w-5 h-5 mr-2" />
                Schedule New Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <AppointmentForm onCancel={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {!appointments || appointments.length === 0 ? (
          <div className="bg-white rounded-lg shadow px-6 py-12 text-center">
            <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments yet</h3>
            <p className="text-gray-600 mb-4">Get started by scheduling your first appointment.</p>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => setIsDialogOpen(true)}
            >
              Schedule Appointment
            </Button>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={appointments}
            searchKey="status"
            searchPlaceholder="Search appointments..."
            title="Appointment Management"
          />
        )}
      </main>
    </div>
  )
}
