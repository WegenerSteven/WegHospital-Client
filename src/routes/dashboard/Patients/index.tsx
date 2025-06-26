import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Users, Edit, Trash2, UserPlus, Calendar, MapPin, Mail } from 'lucide-react'
import { toast } from 'sonner'
import type { ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { patientApi, type Patient } from '@/lib/api'

export const Route = createFileRoute('/dashboard/Patients/')({
  component: PatientsPage,
})

function PatientsPage() {
  const queryClient = useQueryClient()
  
  const { data: patients, isLoading, error } = useQuery({
    queryKey: ['patients'],
    queryFn: patientApi.getAll,
  })

  const deleteMutation = useMutation({
    mutationFn: patientApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] })
      toast.success('Patient deleted successfully!')
    },
    onError: (error) => {
      toast.error(`Error deleting patient: ${error.message}`)
    },
  })

  const handleDeletePatient = (id: number) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      deleteMutation.mutate(id)
    }
  }

  const columns: ColumnDef<Patient>[] = [
    {
      accessorKey: "profile.firstName",
      header: "Name",
      cell: ({ row }) => {
        const patient = row.original
        return (
          <div className="space-y-1">
            <div className="font-medium text-gray-900">
              {patient.profile?.firstName || 'N/A'} {patient.profile?.lastName || ''}
            </div>
            <div className="text-sm text-gray-500">ID: {patient.patientId}</div>
          </div>
        )
      },
    },
    {
      accessorKey: "profile.email",
      header: "Contact",
      cell: ({ row }) => {
        const patient = row.original
        return (
          <div className="space-y-1">
            <div className="flex items-center text-sm">
              <Mail className="w-3 h-3 mr-1 text-gray-400" />
              {patient.profile?.email || 'N/A'}
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "dateOfBirth",
      header: "Date of Birth",
      cell: ({ row }) => {
        const patient = row.original
        return (
          <div className="flex items-center text-sm">
            <Calendar className="w-3 h-3 mr-1 text-gray-400" />
            {new Date(patient.dateOfBirth).toLocaleDateString()}
          </div>
        )
      },
    },
    {
      accessorKey: "address",
      header: "Location",
      cell: ({ row }) => {
        const patient = row.original
        return (
          <div className="space-y-1">
            <div className="flex items-center text-sm">
              <MapPin className="w-3 h-3 mr-1 text-gray-400" />
              <span className="truncate max-w-[200px]">{patient.address}</span>
            </div>
            {patient.city && (
              <div className="text-xs text-gray-500">{patient.city}</div>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: "dateOfAdmission",
      header: "Admission",
      cell: ({ row }) => {
        const patient = row.original
        return (
          <div className="text-sm">
            {new Date(patient.dateOfAdmission).toLocaleDateString()}
          </div>
        )
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const patient = row.original
        return (
          <div className="flex items-center gap-2">
            <Link to="/patient-edit/$id" params={{ id: patient.patientId.toString() }}>
              <Button
                variant="outline"
                size="sm"
                className="text-blue-600 hover:text-blue-700"
              >
                <Edit className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Edit</span>
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700"
              onClick={() => handleDeletePatient(patient.patientId)}
              disabled={deleteMutation.isPending}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">
                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
              </span>
            </Button>
          </div>
        )
      },
    },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading patients...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading patients: {error.message}</p>
          <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['patients'] })}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">All Patients</h1>
              <p className="text-gray-600 mt-1">
                Manage and view all registered patients
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                Total: {patients?.length || 0}
              </div>
              <Link to="/patient-register">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Patient
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!patients || patients.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No patients yet</h3>
            <p className="text-gray-600 mb-6">Get started by adding your first patient.</p>
            <Link to="/patient-register">
              <Button>
                <UserPlus className="w-4 h-4 mr-2" />
                Add Patient
              </Button>
            </Link>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={patients}
            searchKey="profile.firstName"
            searchPlaceholder="Search patients..."
          />
        )}
      </div>
    </div>
  )
}


