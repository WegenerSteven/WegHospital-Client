import { useState } from 'react'
import { 
  Users, 
  Edit,
  Trash2,
  User,
  Menu,
  X,
  Home,
  UserPlus,
  Settings,
  LogOut
} from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { getPatients, deletePatient, type PatientData } from '@/lib/data-store'

export default function Dashboard() {
  const [patients, setPatients] = useState(getPatients())
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleDeletePatient = (id: number) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      if (deletePatient(id)) {
        setPatients(getPatients()) // Refresh the list
        alert('Patient deleted successfully!')
      } else {
        alert('Error deleting patient.')
      }
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 bg-blue-600">
          <h2 className="text-white text-lg font-semibold">Admin Panel</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="mt-8">
          <div className="px-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Main</p>
          </div>
          <div className="mt-2 space-y-1">
            <Link 
              to="/dashboard" 
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              activeProps={{ className: 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' }}
            >
              <Home className="h-5 w-5 mr-3" />
              Dashboard
            </Link>
            <Link 
              to="/patient-register" 
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <UserPlus className="h-5 w-5 mr-3" />
              Add Patient
            </Link>
            <Link 
              to="/dashboard" 
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <Users className="h-5 w-5 mr-3" />
              All Patients
            </Link>
          </div>

          <div className="px-6 mt-8">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Disabled Features</p>
          </div>
          <div className="mt-2 space-y-1">
            <div className="flex items-center px-6 py-3 text-gray-400 cursor-not-allowed">
              <User className="h-5 w-5 mr-3" />
              Doctors
              <span className="ml-auto text-xs bg-gray-200 px-2 py-1 rounded">Disabled</span>
            </div>
            <div className="flex items-center px-6 py-3 text-gray-400 cursor-not-allowed">
              <Settings className="h-5 w-5 mr-3" />
              Appointments
              <span className="ml-auto text-xs bg-gray-200 px-2 py-1 rounded">Disabled</span>
            </div>
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-6">
          <div className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-800 cursor-pointer">
            <LogOut className="h-5 w-5 mr-3" />
            <span>Sign out</span>
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-25 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600 hover:text-gray-900"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>
            <div className="w-6" />
          </div>
        </div>

        {/* Admin Panel Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-gray-600">Manage patients, doctors, and appointments</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 bg-blue-100 px-3 py-1 rounded-full">
                  Administrator Access
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="p-6">
            {/* Admin Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/patient-register">
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white hover:from-green-600 hover:to-green-700 transition-all cursor-pointer shadow-lg">
              <div className="flex items-center">
                <User className="h-8 w-8 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold">Register Patient</h3>
                  <p className="text-green-100">Add new patient to system</p>
                </div>
              </div>
            </div>
          </Link>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg opacity-50 cursor-not-allowed">
            <div className="flex items-center">
              <User className="h-8 w-8 mr-3" />
              <div>
                <h3 className="text-lg font-semibold">Register Doctor</h3>
                <p className="text-blue-100">Add new doctor to system</p>
              </div>
            </div>
            <div className="text-xs text-blue-200 mt-2">Feature disabled in simple mode</div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white shadow-lg opacity-50 cursor-not-allowed">
            <div className="flex items-center">
              <User className="h-8 w-8 mr-3" />
              <div>
                <h3 className="text-lg font-semibold">Book Appointment</h3>
                <p className="text-purple-100">Schedule new appointment</p>
              </div>
            </div>
            <div className="text-xs text-purple-200 mt-2">Feature disabled in simple mode</div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Patients */}
          <div className="bg-white rounded-lg shadow-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Patients</h2>
            </div>
            <div className="p-6">
              {patients.slice(0, 3).map((patient) => (
                <div key={patient.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-900">{patient.firstName} {patient.lastName}</p>
                    <p className="text-sm text-gray-600">Email: {patient.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">Gender</p>
                    <p className="text-sm text-gray-600">{patient.gender}</p>
                  </div>
                </div>
              ))}
              {patients.length === 0 && (
                <p className="text-gray-500 text-center py-4">No patients registered yet</p>
              )}
              <div className="mt-4 text-center">
                <Button variant="outline" size="sm">
                  View All Patients
                </Button>
              </div>
            </div>
          </div>

          {/* Recent Appointments - Disabled */}
          <div className="bg-white rounded-lg shadow-lg opacity-50">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Recent Appointments</h2>
            </div>
            <div className="p-6">
              <div className="text-center py-8">
                <p className="text-gray-400">Appointment system disabled in simple mode</p>
                <p className="text-sm text-gray-400 mt-2">Focus on patient management only</p>
              </div>
            </div>
          </div>
        </div>

        {/* Patients List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">All Patients</h2>
          </div>
          
          {patients.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No patients yet</h3>
              <p className="text-gray-600 mb-4">Get started by adding your first patient.</p>
              <Link to="/patient-register">
                <Button>Add Patient</Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gender
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {patients.map((patient: PatientData) => (
                    <tr key={patient.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {patient.firstName} {patient.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          DOB: {patient.dateOfBirth}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {patient.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {patient.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {patient.gender}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <Link to="/patient-edit/$id" params={{ id: patient.id.toString() }}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeletePatient(patient.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
          </div>
        </div>
      </div>
    </div>
  )
}
