import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Edit, Trash2, UserPlus, Stethoscope } from 'lucide-react'
import { toast } from 'sonner'
import { useState } from 'react'
import { type ColumnDef } from '@tanstack/react-table'
import type { Doctor } from '@/types/index'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { DataTable } from '@/components/ui/data-table'
import { doctorApi } from '@/lib/api'
import DoctorRegistrationForm from '@/components/DoctorRegistrationForm'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuth } from '@/contexts/AuthContext'


export const Route = createFileRoute('/dashboard/Doctors/')({
  component: DoctorsPage,
})

function DoctorsPage() {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { data: doctors = [], isLoading, error } = useQuery({
    queryKey: ['doctors'],
    queryFn: doctorApi.getAll,
  })

  const deleteMutation = useMutation({
    mutationFn: doctorApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] })
      toast.success('Doctor deleted successfully!')
    },
    onError: (error) => {
      toast.error(`Error deleting doctor: ${error.message}`)
    },
  })

  const handleDeleteDoctor = (id: number) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      deleteMutation.mutate(id)
    }
  }

  // Check if user can perform admin actions
  const canPerformAdminActions = user?.role === 'admin'

  const columns: ColumnDef<Doctor>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div>
          <div className="font-medium text-gray-900">
            Dr. {row.original.firstName} {row.original.lastName}
          </div>
          <div className="text-sm text-gray-500">
            ID: {row.original.doctorId}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => (
        <div className="text-gray-900">{row.original.email}</div>
      ),
    },
    {
      accessorKey: 'phoneNumber',
      header: 'Phone',
      cell: ({ row }) => (
        <div className="text-gray-900">{row.original.phoneNumber}</div>
      ),
    },
    {
      accessorKey: 'specialty',
      header: 'Specialty',
      cell: ({ row }) => (
        <div className="text-gray-900">{row.original.specialty}</div>
      ),
    },
    {
      accessorKey: 'yearsOfExperience',
      header: 'Experience',
      cell: ({ row }) => (
        <div className="text-gray-900">{row.original.yearsOfExperience} years</div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${row.original.status
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
          }`}>
          {row.original.status ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const doctor = row.original
        return (
          <div className="flex items-center space-x-2">
            <Link to="/doctor-edit/$id" params={{ id: doctor.doctorId.toString() }}>
              <Button
                variant="outline"
                size="sm"
                className="text-blue-600 hover:text-blue-700"
                onClick={() => (setIsDialogOpen(true))}
                disabled={!canPerformAdminActions}
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </Link>

            {canPerformAdminActions && (
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
                onClick={() => handleDeleteDoctor(row.original.doctorId)}
                disabled={deleteMutation.isPending}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
              </Button>
            )}
          </div>
        )
      },
    },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading doctors...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading doctors: {error.message}</p>
          <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['doctors'] })}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute requiredRoles={['admin', 'doctor']}>
      <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pl-16 lg:pl-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">All Doctors</h1>
            <div className="text-sm text-gray-600">
              Total Doctors: {doctors?.length || 0}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pl-16 lg:pl-8">
        <div className="mb-8">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3">
                <UserPlus className="w-5 h-5 mr-2" />
                Add New Doctor
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DoctorRegistrationForm onCancel={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {!doctors || doctors.length === 0 ? (
          <div className="bg-white rounded-lg shadow px-6 py-12 text-center">
            <Stethoscope className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors yet</h3>
            <p className="text-gray-600 mb-4">Get started by adding your first doctor.</p>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => setIsDialogOpen(true)}
            >
              Add Doctor
            </Button>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={doctors}
            searchKey="firstName"
            searchPlaceholder="Search doctors..."
            title="Doctor Management"
          />
        )}
      </main>
    </div>
    </ProtectedRoute>
  )
}
