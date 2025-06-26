import { createFileRoute } from '@tanstack/react-router'
import { Shield, Settings, Users, UserCheck, Calendar, Activity } from 'lucide-react'

export const Route = createFileRoute('/dashboard/Admin/')({
  component: AdminPage,
})

function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-red-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* System Overview */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <Activity className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">System Overview</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className="text-green-600 font-medium">Online</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Uptime</span>
                <span className="text-gray-900">99.9%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Version</span>
                <span className="text-gray-900">v1.0.0</span>
              </div>
            </div>
          </div>

          {/* User Management */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-green-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
            </div>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 border">
                <div className="font-medium text-gray-900">Manage Patients</div>
                <div className="text-sm text-gray-600">Add, edit, or remove patients</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 border">
                <div className="font-medium text-gray-900">Manage Doctors</div>
                <div className="text-sm text-gray-600">Add, edit, or remove doctors</div>
              </button>
            </div>
          </div>

          {/* System Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <Settings className="w-6 h-6 text-purple-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">System Settings</h2>
            </div>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 border">
                <div className="font-medium text-gray-900">General Settings</div>
                <div className="text-sm text-gray-600">Configure system preferences</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 border">
                <div className="font-medium text-gray-900">Security Settings</div>
                <div className="text-sm text-gray-600">Manage access and permissions</div>
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6 md:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="p-4 border rounded-lg hover:bg-gray-50 text-center">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="font-medium text-gray-900">Add Patient</div>
              </button>
              <button className="p-4 border rounded-lg hover:bg-gray-50 text-center">
                <UserCheck className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="font-medium text-gray-900">Add Doctor</div>
              </button>
              <button className="p-4 border rounded-lg hover:bg-gray-50 text-center">
                <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="font-medium text-gray-900">Schedule Appointment</div>
              </button>
              <button className="p-4 border rounded-lg hover:bg-gray-50 text-center">
                <Activity className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="font-medium text-gray-900">View Reports</div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
