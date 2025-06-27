import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { patientApi, doctorApi, appointmentApi } from '@/lib/api'
import { Users, UserCheck, Calendar, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardOverview,
})

function DashboardOverview() {
  const { data: patients, isLoading: patientsLoading } = useQuery({
    queryKey: ['patients'],
    queryFn: patientApi.getAll,
  })

  const { data: doctors, isLoading: doctorsLoading } = useQuery({
    queryKey: ['doctors'],
    queryFn: doctorApi.getAll,
  })

  const { data: appointments, isLoading: appointmentsLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: appointmentApi.getAll,
  })

  const stats = [
    {
      title: 'Total Patients',
      value: patients?.length || 0,
      icon: Users,
      color: 'bg-blue-500',
      link: '/dashboard/patients',
    },
    {
      title: 'Total Doctors',
      value: doctors?.length || 0,
      icon: UserCheck,
      color: 'bg-green-500',
      link: '/dashboard/doctors',
    },
    {
      title: 'Appointments',
      value: appointments?.length || 0,
      icon: Calendar,
      color: 'bg-purple-500',
      link: '/dashboard/appointments',
    },
    {
      title: 'Active Today',
      value: appointments?.filter(apt => 
        new Date(apt.appointmentDate).toDateString() === new Date().toDateString()
      ).length || 0,
      icon: Activity,
      color: 'bg-orange-500',
      link: '/dashboard/appointments',
    },
  ]

  const isLoading = patientsLoading || doctorsLoading || appointmentsLoading

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pl-16 lg:pl-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-2">Welcome to your hospital management system</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pl-16 lg:pl-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Link key={stat.title} to={stat.link}>
                <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center">
                    <div className={`${stat.color} p-3 rounded-full text-white`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {isLoading ? '...' : stat.value}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/patient-register">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Users className="w-4 h-4 mr-2" />
                Add New Patient
              </Button>
            </Link>
            <Link to="/dashboard/Doctors">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <UserCheck className="w-4 h-4 mr-2" />
                Manage Doctors
              </Button>
            </Link>
            <Link to="/dashboard/appointments">
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Appointment
              </Button>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Appointments</h2>
          {appointmentsLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading appointments...</p>
            </div>
          ) : appointments && appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments.slice(0, 5).map((appointment) => (
                <div key={appointment.appointmentId} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg gap-3">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {appointment.patient?.profile?.firstName} {appointment.patient?.profile?.lastName}
                    </p>
                    <p className="text-sm text-gray-600">
                      Dr. {appointment.doctor?.firstName} {appointment.doctor?.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(appointment.appointmentDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium self-start sm:self-center ${
                    appointment.status === 'completed' 
                      ? 'bg-green-100 text-green-800'
                      : appointment.status === 'scheduled'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments yet</h3>
              <p className="text-gray-600">Schedule your first appointment to get started.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
